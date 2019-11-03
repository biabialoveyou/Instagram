import React from 'react'
import {StyleSheet, View, Text, Image, Modal, TouchableOpacity, TextInput} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

 
import { Share, Button } from 'react-native';
import Constants from 'expo-constants'

import store from '../store'
import AuthorRow from './AuthorRow'
import CommentsSection from './CommentsSection'

import timeSince from '../utils/time.js'


export default class ActionRow extends React.Component {
    constructor(props){
        super(props);
        this.heartIcon = React.createRef();
    };

    static propTypes = {
        updated_at: PropTypes.string.isRequired,
        instagram_username: PropTypes.string,
        description: PropTypes.string,
        likes: PropTypes.number.isRequired,
        onPressComments: PropTypes.func.isRequired,
        onPressShare: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
    };

    static defaultProps = {
        instagram_username: '',
        description: '',
    }

    state = {
        liked: store.getState().liked,
    };

    componentWillMount() { 
        this.unsubscribe = store.onChange(() => {
            this.setState({
                liked: store.getState().liked,
            })
        });
    }

    handlePressLike = () => {
        const { id } = this.props;
        const liked = store.getState().liked;
        if(liked.findIndex(item=>item===id) === -1){
            store.setState({liked: [...liked, id]});
            showMessage({
                message: "Saved in your liked collection.",
                type: "info",
                backgroundColor: '#fc0349'
            });
        }
        else{
            store.setState({liked: liked.filter(item=>item!==id)});
            showMessage({
                message: "You've unliked this photo.",
                type: "info",
                backgroundColor: '#000000'
            });
        }
    };

    componentWillUnmount() {
        this.unsubscribe();
    };

    render () {
        const { id, updated_at, likes, description, instagram_username, onPressComments, onPressShare } = this.props;
        const liked = store.getState().liked;
        isLiked = liked.find(item=>item===id)
        return (
        <View style={styles.container}>
            {/* icons */}
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.icons} onPress={this.handlePressLike}>
                   {isLiked ? <Icon ref={this.heartIcon} name="heart" size={40} color='#fc0349'/> : 
                              <Icon ref={this.heartIcon} name="heart" size={40}/>}
                </TouchableOpacity>
                <TouchableOpacity style={styles.icons} onPress={onPressComments}>
                    <Icon name="message-circle" size={40} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icons} onPress={onPressShare}>
                    <Icon name="send" size={40} />  
                </TouchableOpacity >
                <TouchableOpacity style={styles.bookmark}>
                    <Icon name="bookmark" size={40} />
                </TouchableOpacity>
            </View>
        
            {/* text */}
            <Text style={styles.boldText}>{likes + " likes"}</Text>
            <Text>
                <Text style={styles.boldText}>{instagram_username}</Text>
                <Text>{"  "+ description}</Text>
            </Text>
            <Text style={styles.viewCommentsText} onPress={onPressComments}>View all comments</Text>

            {/* Comments */}
            <View style={styles.comments}>
                <Image style={styles.commentsAvatar} source={require('../assets/profile.jpg')} />
                <TextInput 
                    placeholder={"Add a comment..."} /> 
            </View>

            {/* time */}
            <Text style={styles.updated}>{timeSince(updated_at)}</Text>
        </View>

        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
    },
    icons: {
        marginRight: 10,
    },
    bookmark: {
        marginLeft: 200,
        justifyContent: 'center',
    },
    boldText: {
        fontWeight: "bold",
        marginTop: 10,
    },
    viewCommentsText: {
        marginTop: 10,
        color: 'grey',
    },
    comments: {
        flexDirection: 'row',
        marginTop: 10
    },
    commentsAvatar: {
        width: 40, 
        height: 40, 
        borderRadius: 20,
        marginRight: 20,
    },
    updated: {
        marginTop: 10,
        color: 'grey',
    }
});
