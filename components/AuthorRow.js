import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import Avatar from './Avatar'


export default function AuthorRow({ fullname, avatar, handlePressUsername, }){
    return (
        <View style={styles.container}>
            <Avatar fullname={fullname} avatar={avatar} />
            <View style={styles.nameLocation}>
                <TouchableOpacity onPress={handlePressUsername}>
                    <Text style={styles.username} numberOfLines={1}>{fullname}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                    <Text>{"· · ·"}</Text>
            </TouchableOpacity>
        </View>
    )
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
    avatar: PropTypes.string.isRequired,
    handlePressUsername: PropTypes.func.isRequired
}