import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { StackNavigator, TabNavigator } from 'react-navigation'; 

import User from './screens/User';
import Feed from './screens/Feed';
import Liked from './screens/Liked';


const UserScreens = StackNavigator (
    {   
        User: {
            screen: User,  
        },
    }, 
    {
        initialRouteName: 'User',
        navigationOptions: {
            tabBarIcon: <Icon name="users" size={30} />,
        },
    },
);

const FeedScreens = StackNavigator (
    {   
        Feed: {
            screen: Feed,  
        },
        // Favorites: {
        //     screen: Favorites,
        // },
    }, 
    {
        initialRouteName: 'Feed',
        navigationOptions: {
            tabBarIcon: <Icon name="home" size={30}  />,
        },
    },
);

const LikedScreens = StackNavigator (
    {   
        Liked: {
            screen: Liked,  
        },
        // Favorites: {
        //     screen: Favorites,
        // },
    }, 
    {
        initialRouteName: 'Liked',
        navigationOptions: {
            tabBarIcon: <Icon name="heart" size={30}  />,
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
                activeBackgroundColor: '#EFEFEF',
                inactiveBackgroundColor: '#ffffff',
                showLabel: false,
                showIcon: true,
                renderIndicator: () => null,
            },
        },
);




// const UserScreens = StackNavigator (
//     {   
//         User: {
//             screen: User,
//         },
//         Options: {
//             screen: Options,
//         }
//     }, 
//     {
//         initialRouteName: 'User',
//         navigationOptions: {
//             tabBarIcon: getTabBarIcon('person'),
//         },
//     },
// );