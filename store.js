let state = {
    // feed
    isFetchingFeed: true,
    isFetchingFeedError: false,
    feedItems: [],
    commentsForItem: [],
    showComments: false, 
    selectedItemId: null,

    // liked
    liked: [],

    // user
    isFetchingUserPhotos: true,
    isFetchingUserPhotosError: false,

    
    // contacts: [],
    // user: [],
    
    // error: false,
}

const listeners = [];

export default {
    getState() {
        return state;
    },
    setState(newState) {
        state = { ...state, ...newState };
        listeners.forEach(listener => listener());
    },
    onChange(newListener) {
        listeners.push(newListener);
        return () => listeners.filter(listener => listener !== newListener);
    },
};
