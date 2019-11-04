import React from 'react'
import {StyleSheet, FlatList, View, Text, Image, ActivityIndicator, TouchableOpacity,} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';

import store from '../store'


export default class Liked extends React.Component {
    static navigationOptions = {
        title: 'Liked Photos',
      };

    state = {
        liked: store.getState().liked,
    };

    async componentWillMount() { 
        this.unsubscribe = store.onChange(() => {
            this.setState({
                liked: store.getState().liked,
            })
        });
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    renderItem= liked => {
        const { item: {info: {urls}} } = liked;
        
        return (
            <View>
                <TouchableOpacity  activeOpacity={0.75}>
                    <Image style={styles.image} source={{uri: urls.regular}}/>
                </TouchableOpacity>
            </View>
        )
        };
    

    render (){
        const { liked } = store.getState();
        keyExtractor = item => item.id;
        if(liked.length===0){
            return (
                <View style={styles.textContainer}>
                    <Icon name="heart" size={30} color='#edd3e8' />
                        <Text style={styles.text}>Your liked photo will show up here</Text>
                    <Icon name="heart" size={30} color='#edd3e8' />
                </View>
            )
        }
        return (
            <View style={styles.container}> 
                <FlatList 
                        numColumns={2}
                        data={liked}
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
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 300,
    },
    image: {
        width: 190,
        height: 190,
    },
    text: {
        fontFamily: 'GillSans-SemiBold',
        fontSize: 18,
        color: '#615b60',
        marginLeft: 10,
        marginRight: 10
    }
})
