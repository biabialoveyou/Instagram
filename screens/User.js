import React from 'react'
import {StyleSheet, FlatList, View, Text, Image, Dimensions, } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import { fetchPhotosByUser, } from '../utils/api'; 
import timeSince from '../utils/time'; 


imageWidth = Dimensions.get('window').width / 2;

export default class User extends React.Component {
    static navigationOptions = {
        title: 'User',
      };
      
    state = {
        username: '',
        photos: [],
        cursor: 0,
        length: 0,
        total: 0,
        likes: 0,
    };

    async componentWillMount (){
        if(this.props.navigation.state.params){
            const { navigation: { state: {params: {user}}}} = this.props;
           
            const { links :{ photos }, instagram_username, total_photos, total_likes } = user;
            this.setState({
                username: instagram_username
            });
            response = await fetchPhotosByUser(photos)
            this.setState({
                photos: response,
                cursor: 0,
                length: response.length,
                total: total_photos,
                likes: total_likes,
            })
        }
        else{ // Show default user screen
            this.setState({
                username: '12tan34'
            });
            response = await fetchPhotosByUser('https://api.unsplash.com/users/12tan34/photos')
            this.setState({
                photos: response,
                cursor: 0,
                length: response.length,
                total: 27,
                likes: 2,
            })
        };
    };

    getImages = () => {
        const { cursor, length } = this.state;
        this.setState({
            cursor: Math.min(cursor+20, length),
        })
    }

    renderItem = (item) => {
        const { item: { urls, created_at } } = item
        return (

            <View style={styles.imageContainer}> 
                <Image source={{uri: urls.regular}} style={styles.image}/>
            <Text style={styles.created}>{timeSince(created_at)}</Text>
            </View>
        )
    };

    render () {
        const { cursor, photos, username, total, likes} = this.state;
        keyExtractor = item => item.id;

        return (
            <View style={styles.container}>
                <Text style={styles.username}>{username}</Text>
                <View style={styles.data}>
                    <Icon style={styles.icon} name="camera" size={20} color="#4F8EF7" />
                    <Text>{total+" Photos"}</Text>
                    <Icon style={styles.icon} name="heart" size={20} color="#d80000" />
                    <Text>{likes + " Likes"}</Text>
                </View>
                <FlatList 
                    numColumns={2}
                    data={photos.slice(0, cursor+6)}
                    renderItem={this.renderItem}
                    keyExtractor={keyExtractor}
                    onEndReached={this.getImages}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 50 
    },
    username: {
        height: 40,
        fontSize: 30,
        fontFamily: 'GillSans-SemiBold',
    },
    data: {
        flexDirection:'row', 
        justifyContent: 'space-between',
        padding: 5,
    },
    icon: {
        marginLeft: 10,
        marginRight: 10
    },
    imageContainer:{
        height: 220,
        marginBottom: 20,
        alignItems: 'center'
    },
    image: {
        width: imageWidth,
        height: imageWidth,
    },
    location: {
        fontWeight: 'bold',
        fontSize: 10,
    },
    created: {
        fontSize: 15,
        fontFamily: 'GillSans-SemiBold',
    }
})
