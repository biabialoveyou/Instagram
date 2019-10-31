import React from 'react'
import {StyleSheet, View, Text, Image, ActivityIndicator} from 'react-native'
import PropTypes from 'prop-types'
import Constants from 'expo-constants'
import AuthorRow from './AuthorRow'
import timeSince from '../utils/time.js'


export default class CommentsSection extends React.Component {
    static propTypes = {
        comments : PropTypes.array.isRequired,
        
    };

    render () {

    };
}