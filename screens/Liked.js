import React from 'react'
import {StyleSheet, FlatList, View, Text, Image, ActivityIndicator, TouchableOpacity,} from 'react-native'
import { fetchPhotoById } from '../utils/api'; 

import store from '../store'


export default class Liked extends React.Component {
    state = {
        liked: store.getState().liked,
        images: [],
        loading: true,
        error: false,
        displayed: [],
    };

    async componentWillMount() { 
        this.unsubscribe = store.onChange(() => {
            this.setState({
                liked: store.getState().liked,
            })
        });

       const { liked } = store.getState();
        console.log("liked")
        console.log(liked)

        try {
            for(let i = 0; i < liked.length; i++){
                const { images } = this.state;
                const newImage = await fetchPhotoById(liked[i])
                this.setState({ images: [...images, newImage], loading: false });
            };

        } 
        catch (e) {
            this.setState({ loading: false, error: true });
        }

        this.setState({displayed: liked}) 
    };

    shouldComponentUpdate(){
        return displayed != liked;
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    renderItem= ({item}) => {
        const { urls } = item;
        return (
            <View>
                <TouchableOpacity  activeOpacity={0.75}>
                    <Image style={styles.image} source={{uri: urls.regular}}/>
                </TouchableOpacity>
            </View>
        )
        };
    

    render (){
        const { images, loading, error } = this.state;
        keyExtractor = item => item.id;
        if (loading) {
            return <ActivityIndicator size="large" />;
        }
        if (error) {
            return <Text>dddd</Text>  
        }
        return (
            <View style={styles.container}> 
                <FlatList 
                        numColumns={2}
                        data={images}
                        renderItem={this.renderItem}
                        keyExtractor={keyExtractor}
                />
            </View>
        );
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