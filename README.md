# NASA APi Website project




## Summary

This project is designed to fetch information from  NASA's astronomical picture of the day and asteroid api and be able to collect them to a gallery using IndexedDb to view at a later date.

I wanted to do this as [NASA's APOD](https://apod.nasa.gov/apod/astropix.html) website is limited with very little features apart from viewing the daily pictures so I created my own version with features such as being able to save information that you like into a collection/gallery to be able to go back on the picture or information you are interested in without trying to remember the date of of the images and asteroids.


### Table of content
1. [Things used]()
2. [References]()
3. [Parts of the Website]()
    1. [Daily images API]()
    2. [Asteroid API]()  
    3. [Gallery]()
4. [Issues I had and changes I made]()
5. [Improvements]()


### Things used

#### Languages
1. Vanilla JavaScript
    1. indexedDb (Gallery)
    2. intersectionObservers (Asteroid API)
2. HTML
3. CSS


#### References
* [Adaptive Photo Layout with Flexbox](https://css-tricks.com/adaptive-photo-layout-with-flexbox/)
* [Remove the X from Internet Explorer and Chrome input type search](https://blog.maximerouiller.com/post/remove-the-x-from-internet-explorer-and-chrome-input-type-search/)


### Parts of the Website
#### Daily Images Page

[daily Image image]
##### How it works
Uses the NASA APOD API to show NASA's daily image and information about the image using a fetch request. I also used a date input to allow to user to select a date of their choosing as well as a next day and previous day button to speed up the process of selecting a new date.



#### Asteroid Page
[asteroid page image]

##### How it works
Displays a collection of asteroids that will pass by the earth on a certain day. I used the intersection Observer here to be able to show previous days as you scroll down. There is also a save button which will save certain asteroid's information such as  speed, size and time of closest approach to your asteroid collection in the gallery.




#### Gallery/collection

[Gallery/collection image]

#### How it works
Gets all key value pairs in the indexedDB objectStores and displays the information in a responsive format on the screen. This page also a nav tab to divide the different objectStores.



### Issues I had and changes I made

#### Tainted canvas (blobbed images)
At the start I wanted the option to be able to download these images offline. However I quickly learnt that due to the canvas being tainted because of there being no Access-Control-Allow-Origin header sent from the NASA API configured to permit cross-origin access to the image files. This stopped me from doing this so instead I just used the indexedDB objectstores for storing information and the image Urls to display the gallery with.

#### SVG Image animation
I originaly used SVG animation for a menu button using anime.js, however I found it wasn't needed and did not fit with the page design and content.

#### Gallery
When I was made the original responsive layout I divided my images into 4 div elements which responsively moved when the picture got to narrower. However the images were normally different sizes causing the div elements to have different heights which caused gaps between certain div elements as they had to start at the same height when the displayed next to each other when stacked 2x2. Instead I found a [Adaptive Photo Layout with Flexbox article](https://css-tricks.com/adaptive-photo-layout-with-flexbox/) about using a list of images with flex and flex-wrap to fill all the space with the images without any gaps using which I used as a guide to make my image gallery responsive without any gaps.


#### Improvements


##### Next time I would like to:

* Use React to render the UI and perhaps create a single page application. This would decrease the amount of .appendChild() and .createElement() I use to load the infomation on certain pages such as the asteroid API page and its Collection in the gallery.

* Recycle the DOM on Asteroid API page to decrease the size of the DOM and save memory. This allows us to re-use DOM elements removing the ones that are far away from the viewport. Low-end devices can get slower if not completely unusable if the website has too big of a DOM to manage.

* Have lazy loading support on all devices. Currently I just set the loading attribute on images and iframes in the gallery to lazy, however this feature is [not supported in most browsers](https://caniuse.com/loading-lazy-attr) at the time of writing this and only works with many limited devices. Next time I would like to use the intersection observer to lazy load the images and iframes to support most browsers, still [intersectionObservers are not fully supported](https://caniuse.com/intersectionobserver) so I would need to use a polyfill as well to get around this.















