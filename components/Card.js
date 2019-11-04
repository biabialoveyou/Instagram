import React from 'react'
import {StyleSheet, View, Text, Image, ActivityIndicator, TouchableWithoutFeedback} from 'react-native'
import PropTypes from 'prop-types'
import { Share, Button } from 'react-native';
import { showMessage, } from "react-native-flash-message";

import AuthorRow from './AuthorRow'
import ActionRow from './ActionRow'
import store from '../store'


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

    handleInputComments = () => {
        const { onPressInputComments, data: { id } } = this.props;
        onPressInputComments(id)
    }

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
        const { onPressUsername, data: { user } } = this.props;
        onPressUsername(user)
    };

    lastTap = null;
    handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        const { data: { id } } = this.props;
        const liked = store.getState().liked;

        if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
             if(liked.findIndex(item=>item===id) === -1){
                store.setState({liked: [...liked, id]});
                showMessage({
                    message: "Saved in your liked collection.",
                    type: "info",
                    backgroundColor: '#fc0349'
                });
            }
            else{
                // TODO GET 
                store.setState({liked: liked.filter(item=>item!==id)});
                showMessage({
                    message: "You've unliked this photo.",
                    type: "info",
                    backgroundColor: '#000000'
                });
            }
        } 
        else {
            this.lastTap = now;
        }
    }

    render() {
        let { data: { id, user, updated_at, urls, likes, description, } } = this.props;
        const { onPressFinishComments } = this.props;
        const loading = this.state;

        if(!description) description = " " 
        return (
            <View style={styles.container}>
                <AuthorRow 
                    fullname={user.name}
                    avatar={user.profile_image.large}
                    location={user.location}
                    handlePressUsername={this.handlePressUsername} 
                />        
                <View style={styles.imageStyle}>
                    {
                        loading && (<ActivityIndicator style={StyleSheet.absoluteFill} size={'large'}/>)
                    }
                    <TouchableWithoutFeedback onPress={this.handleDoubleTap}  >
                        <Image style={StyleSheet.absoluteFill} source={{uri: urls.regular}} onLoad={this.handleLoad}/>
                    </TouchableWithoutFeedback>
                </View>
           
                <ActionRow 
                    description={description}
                    updated_at={updated_at}
                    instagram_username={user.instagram_username}
                    likes={likes}
                    onPressComments={this.handlePressComments}
                    onPressInputComments={this.handleInputComments}
                    onPressFinishComments={onPressFinishComments}
                    onPressShare={this.handlePressShare}
                    onPressUsername={this.handlePressUsername}
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
  