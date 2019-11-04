import React from 'react'
import Proptypes from 'prop-types'
import { StyleSheet, View, Text, Image } from 'react-native'


export default function Avatar({ fullname, avatar }) {
    regexp = /^((https):\/\/)/;

    if(regexp.test(avatar)){
        return (
            <View style={styles.container}>
                <Image style={styles.avatar} source={{uri: avatar}} />    
            </View>
        )
    }
    else {
        // Get inititals
        names = fullname.split(" ")
        initials = names[0].charAt(0)
        if (names.length > 1){
            initials += names[1].charAt(0)
        }

        // Generate backgroud color
        const hexCode = fullname
              .split('')
              .reduce((acc, char) => (acc * char.charCodeAt(0)) % 0xffffff, 1)
              .toString(16);
        const backgroundColor = `#${'0'.repeat(6 - hexCode.length) + hexCode}`

        return (
            <View style={[styles.container, styles.avatar, {backgroundColor: backgroundColor}]}>
                <Text style={styles.initials}>{initials}</Text>
            </View>
    
        )
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    initials: {
        fontSize : 20,
    }
});


Avatar.Proptypes ={
    avatar: Proptypes.string.isRequired,
    fullname: Proptypes.number.isRequired,
};