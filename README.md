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
2. Click on username on the top, or in the description to go to user details page with all photos user posted.  
3. Click on "heart icon" or double tap to like/unlike.  
4. Share with default share API.  
5. Comments:  
    - View all comments open a new screen and new comments can be added there  
    - Add comment directly from text input, and will show up on comments detail page.  
    
  
# USER Screen  
1. If no user selected, by default it shows all photos of one user  
2. If select user from "Feed" by clicking username or title, it shows all photos of selected user.  
3. Display 6 photos by default, loads more on reach end.  


# Liked Screen  
1. No liked images - Text showing "Your liked photo will show up here"  
2. Liked images - all show up there, update automatically if user unlike old or like new images.  
  





