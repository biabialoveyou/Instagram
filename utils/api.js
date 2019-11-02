
const base_url = 'https://api.unsplash.com/'
const CLIENT_ID='04d30b64effa52cb6b92a2c82e71f210405c4e2ac8b0f0ad7f09469e4435f462'



export const getImageFromId = id => {
    // const response = await fetch(
    //   `https://unsplash.it/600/600/?image=`,
    // );
    // const image = response.json();
    // return image;
    uri = 'https://unsplash.it/600/600/?image=' + id
    return uri;
  };
  

export const fetchPhotos = async () => {
  const url = base_url + 'photos/?client_id=' + CLIENT_ID;
  const response = await fetch(url);
  const photos = await response.json()
  console.log("API HIT")
  return photos.slice(0, 5);
}

export const fetchPhotosByUser = async (link) => {
  link = link + '/?client_id=' + CLIENT_ID;
  const response = await fetch(link);
  const photos = await response.json()
  return photos
}

export const fetchPhotoById = async (id) => {
  url = base_url + "photos/" + id + "/?client_id=" + CLIENT_ID;
  console.log(url)
  const response = await fetch(url);
  const photo = await response.json()
  return photo
}

  //users/alejandroescamilla/photos




  // Object {
  //   "alt_description": "gray concrete building",
  //   "categories": Array [],
  //   "color": "#F5E3CE",
  //   "created_at": "2019-10-26T10:47:16-04:00",
  //   "current_user_collections": Array [],
  //   "description": "A sunset stroll",
  //   "height": 5000,
  //   "id": "LFLusGxjhg0",
  //   "liked_by_user": false,
  //   "likes": 42,
  //   "links": Object {
  //     "download": "https://unsplash.com/photos/LFLusGxjhg0/download",
  //     "download_location": "https://api.unsplash.com/photos/LFLusGxjhg0/download",
  //     "html": "https://unsplash.com/photos/LFLusGxjhg0",
  //     "self": "https://api.unsplash.com/photos/LFLusGxjhg0",
  //   },
  //   "promoted_at": "2019-10-26T12:25:59-04:00",
  //   "updated_at": "2019-10-30T15:06:02-04:00",
  //   "urls": Object {
  //     "full": "https://images.unsplash.com/photo-1572101215817-c9eb777a0743?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjk4ODIxfQ",
  //     "raw": "https://images.unsplash.com/photo-1572101215817-c9eb777a0743?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjk4ODIxfQ",
  //     "regular": "https://images.unsplash.com/photo-1572101215817-c9eb777a0743?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjk4ODIxfQ",
  //     "small": "https://images.unsplash.com/photo-1572101215817-c9eb777a0743?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjk4ODIxfQ",
  //     "thumb": "https://images.unsplash.com/photo-1572101215817-c9eb777a0743?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjk4ODIxfQ",
  //   },
  //   "user": Object {
  //     "accepted_tos": true,
  //     "bio": "Software developer. Freelance photographer. Creator of the Vurger App. Follow me on Instagram @clay.banks ",
  //     "first_name": "Clay",
  //     "id": "rUXhgOTUmb0",
  //     "instagram_username": "clay.banks",
  //     "last_name": "Banks",
  //     "links": Object {
  //       "followers": "https://api.unsplash.com/users/claybanks/followers",
  //       "following": "https://api.unsplash.com/users/claybanks/following",
  //       "html": "https://unsplash.com/@claybanks",
  //       "likes": "https://api.unsplash.com/users/claybanks/likes",
  //       "photos": "https://api.unsplash.com/users/claybanks/photos",
  //       "portfolio": "https://api.unsplash.com/users/claybanks/portfolio",
  //       "self": "https://api.unsplash.com/users/claybanks",
  //     },
  //     "location": "Charlotte NC",
  //     "name": "Clay Banks",
  //     "portfolio_url": "http://instagram.com/clay.banks",
  //     "profile_image": Object {
  //       "large": "https://images.unsplash.com/profile-1569934327975-f7e6f5a8962cimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128",
  //       "medium": "https://images.unsplash.com/profile-1569934327975-f7e6f5a8962cimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
  //       "small": "https://images.unsplash.com/profile-1569934327975-f7e6f5a8962cimage?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
  //     },
  //     "total_collections": 4,
  //     "total_likes": 364,
  //     "total_photos": 169,
  //     "twitter_username": "ClayBanks",
  //     "updated_at": "2019-10-30T12:42:42-04:00",
  //     "username": "claybanks",
  //   },
  //   "width": 3333,
  // }