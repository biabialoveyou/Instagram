import React from 'react'
import {StyleSheet, View, Text, Image, ActivityIndicator, TextInput} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather';
import { Share, Button } from 'react-native';
import Constants from 'expo-constants'

import AuthorRow from './AuthorRow'
import ActionRow from './ActionRow'

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
        const { onPressComments, data: { id } } = this.props;

        onPressComments(id)
    };

    handlePressShare = async () => {
        try {
          const result = await Share.share({
             message: 'Share this image with friends',
            // url: "data:image/" + type + ";base64," + data,
            // type: 'image/' + type,
            // title: 'Gread'
          });
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
               alert("Done sharing");
            } 
          } 
          else if (result.action === Share.dismissedAction) {
            alert("Cancelled Sharing");
          }
        } catch (error) {
          alert(error.message);
        }
      };

    handlePressUsername = () => {

    };

    handlePressLocation = () => {

    };

    render() {
        let { data: { id, user, updated_at, urls, likes, description} } = this.props;
        const loading = this.state;
        if(!description) description = " " 
        return (
            <View style={styles.container}>
                <AuthorRow 
                    fullname={user.name}
                    avatar={user.profile_image.large}
                    location={user.location}
                    onPressUsername={this.handlePressUsername} 
                    onPressLocation={this.handlePressLocation} 
                />
                <View style={styles.imageStyle}>
                    {
                        loading && (<ActivityIndicator style={StyleSheet.absoluteFill} size={'large'}/>)
                    }
                    
                    <Image style={StyleSheet.absoluteFill} source={{uri: urls.regular}} onLoad={this.handleLoad}/>
                </View>
           
                <ActionRow 
                    description={description}
                    updated_at={updated_at}
                    instagram_username={user.instagram_username}
                    likes={likes}
                    onPressComments={this.handlePressComments}
                    onPressShare={this.handlePressShare}
                    id={id}
                />
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
    },
  });
  