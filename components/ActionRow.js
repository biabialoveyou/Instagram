import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity, TextInput} from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather';
import { showMessage, } from "react-native-flash-message";

import store from '../store'
import timeSince from '../utils/time.js'
import { fetchPhotoById } from '../utils/api'; 


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
        onPressUsername: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
    };

    static defaultProps = {
        instagram_username: '',
        description: '',
    }

    state = {
        liked: store.getState().liked,
        text: ''
    };

    componentWillMount() { 
        this.unsubscribe = store.onChange(() => {
            this.setState({
                liked: store.getState().liked,
            })
        });
    }

    getLikedImages (id) {
        return fetchPhotoById(id);
    }

    handlePressLike = () => {
        const { id } = this.props;
        const liked = store.getState().liked;
        if(liked.findIndex(item=>item.id===id) === -1){
            this.getLikedImages(id).then(
                newImage=>{store.setState({liked: [...liked, {id, info: newImage}]})}
            )
            showMessage({
                message: "Saved in your liked collection.",
                type: "info",
                backgroundColor: '#fc0349'
            });
        }
        else{
            store.setState({liked: liked.filter(item=>item.id!==id)});
            showMessage({
                message: "You've unliked this photo.",
                type: "info",
                backgroundColor: '#000000'
            });
        }
        console.log(store.getState().liked)
    };

    handleChangeText = (text) => {
        this.setState({text: text});
    };

    handleSubmitEditing = () => {
        const { onPressFinishComments } = this.props;
        const { text } = this.state;

        if (!text) return;

        onPressFinishComments(text);
        this.setState({text: ''});
        showMessage({
            message: "Comment Added!",
            type: "info",
            backgroundColor: '#66b3ff'
        });
    };

    componentWillUnmount() {
        this.unsubscribe();
        this.setState({text: ''});
    };

    render () {
        const { id, updated_at, likes, description, instagram_username,
                onPressComments, onPressShare, onPressUsername, onPressInputComments } = this.props;
        const { text } = this.state;
        const liked = store.getState().liked;
        isLiked = liked.find(item=>item.id===id)

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
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={onPressUsername}>
                        <Text style={styles.boldText}>{instagram_username}</Text>
                    </TouchableOpacity>
                    <Text style={{paddingTop: 10}}>{"  "+ description}</Text>
                </View>
                <Text style={styles.viewCommentsText} onPress={onPressComments}>View all comments</Text>

                {/* Comments */}
                <View style={styles.comments}>
                    <Image style={styles.commentsAvatar} source={require('../assets/profile.jpg')} />
                    <TextInput 
                        placeholder={"Add a comment..."}
                        value={text}
                        blurOnSubmit={false}
                        onTouchStart={onPressInputComments}
                        onChangeText={this.handleChangeText}
                        onSubmitEditing={this.handleSubmitEditing}
                     /> 
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
        marginLeft: 'auto',
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
