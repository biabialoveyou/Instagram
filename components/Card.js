import React from 'react'
import {StyleSheet, View, Text, Image, ActivityIndicator, TouchableOpacity, TextInput} from 'react-native'
import PropTypes from 'prop-types'
import Constants from 'expo-constants'
import AuthorRow from './AuthorRow'
import CommentsSection from './CommentsSection'
import timeSince from '../utils/time.js'


export default class Card extends React.Component {
    // static propTypes = {
        
    // };

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
        let { data: { user, updated_at, urls, likes, description} } = this.props;
        const loading = this.state;
        if(!description) description = " " 
        return (
            <View style={styles.container}>
                <AuthorRow 
                    fullname={user.name}
                    avatar={user.profile_image.large}
                    linkText={"Comments"} 
                    onPressLinkText={this.handlePressComments} />
                <View style={styles.imageStyle}>
                    {
                        loading && (<ActivityIndicator style={StyleSheet.absoluteFill} size={'large'}/>)
                    }
                    <Image style={StyleSheet.absoluteFill} source={{uri: urls.regular}} onLoad={this.handleLoad}/>
                </View>
                
                {/* icons */}
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={()=>{}}>
                        <Image source={require('../assets/like.png')} /> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlePressComments}>
                        <Image source={require('../assets/comment.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{}}>
                        <Image source={require('../assets/share.png')} />
                    </TouchableOpacity>
                   
                </View>
                
                {/* text */}
                <Text style={{fontWeight: "bold"}}>{likes + " likes"}</Text>
                <Text>
                    <Text style={{fontWeight: "bold"}}>{user.instagram_username}</Text>
                    <Text>{"  "+ description}</Text>
                </Text>

                {/* Comments */}
                <View style={{flexDirection: 'row'}}>
                    <Image style={{width: 40, height: 40, borderRadius: 20,}} source={require('../assets/profile.jpg')} />
                    <TextInput placeholder={"Add a comment..."} /> 
                </View>

                {/* time */}
                <Text>{timeSince(updated_at)}</Text>
           
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: 'flex-start',
      marginBottom: 20
    },
    imageStyle: {
        resizeMode: 'stretch',
        aspectRatio: 1,
        backgroundColor: 'rgba(0,0,0,0.02)',
    }
  });
  