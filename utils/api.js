export const getImageFromId = id => {
    // const response = await fetch(
    //   `https://unsplash.it/600/600/?image=`,
    // );
    // const image = response.json();
    // return image;
    uri = 'https://unsplash.it/600/600/?image=' + id
    return uri;
  };
  
export const fetchImages = async () => {
    const response = await fetch(`https://unsplash.it/list`);
    const images = await response.json()
    return images.slice(0, 50);
  };