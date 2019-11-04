# Instagram
## Dependencies:
react-native-fonts  
react-navigation: "^1.5.2",  
react-native-vector-icons  
react-native-keyboard-aware-scroll-view  
react-native-flash-message  


## Endpoints Used:
API DOC: https://unsplash.com/documentation#get-a-photo
GET /photos/:id
GET /photos
GET /users/:username/photos


## Functions
# FEED Screen
Showing the images fetched from /photos
1. No Internect Connect:
    - A text showing error 
    - Tap text to try reload
2. 

# USER Screen
1. If no user selected, by default it shows all photos of one user
2. If select user from "Feed" by clicking username or title, it shows all photos of selected user.
3. Display 6 photos by default, loads more on reach end.


# Liked Screen
1. No liked images - Text showing "Your liked photo will show up here"
2. Liked images - all show up there, update automatically if user unlike old or like new images.






