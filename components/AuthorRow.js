import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import Geocoder from 'react-native-geocoding';

import Avatar from './Avatar'


export default function AuthorRow({ fullname, avatar, location, linkText, onPressUsername, onPressLocation }){
    handlePressLocation('New York')
    
    return (
        <View style={styles.container}>
            <Avatar fullname={fullname} avatar={avatar} />
            <View style={styles.nameLocation}>
                <TouchableOpacity>
                    <Text style={styles.username} numberOfLines={1}>{fullname}</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text numberOfLines={1}>{fullname}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                    <Text>{"· · ·"}</Text>
            </TouchableOpacity>
        </View>
        
    )
}

handlePressLocation = (location) => {
    // TODO
 
}

const styles = StyleSheet.create({
    container : {
        height: 50,
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal: 10,
    },
    nameLocation: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems : 'flex-start',
        marginLeft: 10
    },
    username : { 
        fontWeight: 'bold'
    },
    dots: {
        fontWeight: '900',
    },
});

AuthorRow.propTypes = {
    fullname : PropTypes.string.isRequired,
    onPressUsername : PropTypes.func.isRequired,
    onPressLocation : PropTypes.func.isRequired
}