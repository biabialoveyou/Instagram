import React from 'react'
import {StyleSheet, FlatList, View, Text, Image, ActivityIndicator, TouchableOpacity,} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import { fetchPhotos, fetchPhotosByUser, fetchPhotoById } from '../utils/api'; 
import timeSince from '../utils/time'; 


export default class User extends React.Component {
    // static propTypes = {

    // };

    state = {
       photos: [],
       cursor: 0
    }

    async componentWillMount (){
        response = await fetchPhotosByUser("https://api.unsplash.com/users/claybanks/photos")
        
        this.setState({
            photos: response,
            cursor: 0,
            length: response.length,
        })
    };

    getImages = () => {
        const { cursor, length } = this.state;
        this.setState({
            cursor: Math.min(cursor+20, length),
        })
    }

    async getImageById (id) {
        return await fetchPhotoById(id)
    }

    renderItem = (item) => {
        const { item: { urls, likes, created_at } } = item
        return (

            <View style={styles.imageContainer}> 
                <TouchableOpacity style={styles.image}
                    activeOpacity={0.75}>
                    {/* //onPress={()=> this.props.onPress(item.uri)}> */}
                    <Image source={{uri: urls.regular}} style={styles.image}/>
                </TouchableOpacity>
                {/* <Text style={styles.location}>{location}</Text> */}
            <Text style={styles.created}>{timeSince(created_at)}</Text>
            </View>
        )
    };

    render () {
        const { cursor, photos } = this.state;
        keyExtractor = item => item.id;

        return (
            <View style={styles.container}>
                <Text style={styles.username}>Jike Zhang</Text>
                <View style={{flexDirection:'row', justifyContent: 'center'}}>
                    <Icon name="location-pin" size={30} color="#4F8EF7" />
                    <Text> New York</Text>
                    <Icon name="heart" size={30} color="#d80000" />
                    <Text> New York</Text>
                </View>
                <FlatList 
                    numColumns={2}
                    data={photos.slice(0, cursor+20)}
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
    imageContainer:{
        height: 220,
        marginBottom: 20,
        alignItems: 'center'
    },
    image: {
        marginLeft: 1,
        width: 200,
        height: 200,
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