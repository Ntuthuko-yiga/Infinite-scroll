const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let photosArray = [];

// Unsplash API
const count = 30;
const apiKey ='JJcvBTy0yfozakOPYfTRvlao4XN32zzuSJ34QPMXdMQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Check if all images were loaded
function imageLoaded(){
    console.log('image loaded');
}

// Create Elements From LInks & Photos, Add to DOM
function displayPhotos() {
    // Run function for each object in photoArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // Creat <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

         // Event listerners, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a> then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });  
}


// Get photo from API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray  = await response.json();
        displayPhotos(); 
    } catch (error) {
        
    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
        getPhotos();
        console.log('load more')
    }
});

// On load
getPhotos();