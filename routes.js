import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { StackNavigator, TabNavigator } from 'react-navigation'; 

import User from './screens/User';
import Feed from './screens/Feed';
import Liked from './screens/Liked';


const getTabBarIcon = name => ({ tintColor }) => (
    <Icon name={name} size={30} style={{ color: tintColor }} />
);

const FeedScreens = StackNavigator (
    {   
        Feed: {
            screen: Feed,  
        },
        Route1: {
            screen: User,
        },
    }, 
    {
        initialRouteName: 'Feed',
        navigationOptions: {
            tabBarIcon: getTabBarIcon('home'),
        },
    },
);

const UserScreens = StackNavigator (
    {   
        User: {
            screen: User,  
        },
    }, 
    {
        initialRouteName: 'User',
        navigationOptions: {
            tabBarIcon: getTabBarIcon('users'),
        },
    },
);

const LikedScreens = StackNavigator (
    {   
        Liked: {
            screen: Liked,  
        },
    }, 
    {
        initialRouteName: 'Liked',
        navigationOptions: {
            tabBarIcon: getTabBarIcon('heart'),
        },
    },
);

export default TabNavigator(
    { 
        Feed: {
            screen: FeedScreens,
        },
        User: {
            screen: UserScreens,
        },
        Liked: {
            screen: LikedScreens,
        },
       
    },
        {
            initialRouteName: 'Feed',
            tabBarPosition: 'bottom',
            tabBarOptions: {
                style: {
                    backgroundColor: '#fffdfc',
                },
                activeTintColor: '#e07575', 
                inactiveTintColor: 'black',
                showLabel: false,
                showIcon: true,
                renderIndicator: () => null,
            },
        },
);
