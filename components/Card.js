import React from 'react'
import {StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native'
import PropTypes from 'prop-types'
import Constants from 'expo-constants'
import AuthorRow from './AuthorRow'

export default class Card extends React.Component {
    static propTypes = {
        fullname: PropTypes.string.isRequired,
        //image: PropTypes.Image.source.isRequired,
    };

    static defaultProps = {
        linkText: '',
        onPressLinkText: () => {}
    };

    state = {
        loading: true,
    };

    shouldComponentUpdate(nextProps) { //better performance
        return this.props.linkText !== nextProps.linkText;
    };

    handleLoad = () => {
        this.setState({
            loading: false
        });
    };

    handlePressComments = () => {
        const { onPressComments, id } = this.props;

        onPressComments(id)
    };

    render() {
        const { fullname, image } = this.props;
        const loading = this.state;

        return (
            <View style={styles.container}>
                <AuthorRow 
                    fullname={fullname}
                    linkText={"Comments"} 
                    onPressLinkText={this.handlePressComments} />
                <View style={styles.imageStyle}>
                    {
                        loading && (<ActivityIndicator style={StyleSheet.absoluteFill} size={'large'}/>)
                    }
                    <Image style={StyleSheet.absoluteFill} source={image} onLoad={this.handleLoad}/>
                </View>
           
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: 'flex-start'
    },
    imageStyle: {
        resizeMode: 'stretch',
        aspectRatio: 1,
        backgroundColor: 'rgba(0,0,0,0.02)',
    }
  });
  