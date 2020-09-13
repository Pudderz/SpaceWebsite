# NASA APi Website project




## Summary

This project is designed to fetch images from  NASA's astronomical picture of the day and asteroid api and collect them to a gallery using IndexedDb to view at a later date.

I wanted to do this as [NASA's APOD](https://apod.nasa.gov/apod/astropix.html) website is limited with very little features apart from viewing the daily pictures so I created my own version with features such as being able to save information that you like into a collection/gallery to be able to go back on the picture or information you are interested in without trying to remember the date of of the images and asteroids.


### Table of content
1. [Things I used]()
2. [References]()
3. [Daily images API]()
4. [Asteroid API]()    
5. [Gallery]()
6. [Issues I had and changes I made]()
7. [What I learnt]()

 
 (link to cs trick website for responsive layout)



### Things I used

1. Vanilla JavaScript
    1. indexedDb
    2. intersectionObservers
2. HTML
3. CSS


### What I learnt

### Daily Images Page

#### How it works
This page uses the NASA APOD API to show NASA's daily image and information about the image using a fetch request. I also used a date input to allow to user to select a date of their choosing as well as a next day and previous day button to speed up the process of selecting a new date.

### Asteroid Page

#### What it does
This page displays a collection of asteroids that will pass by the earth on a certain day. I used the intersection Observer here to be able to show previous days as you scroll. There is also a save button which will save certain asteroid's information such as  speed, size and time of closest approach to your asteroid collection in the gallery.


### Gallery/collection


#### What it does
This page gets all key value pairs in the indexedDB objectStores and displays the information in a responsive format on the screen. This page also a nav tab to divide the different objectStores.

### Issues I had
1. Originaly wanted to be able to download the images
2. responsive format
    1. Made a layout where the images where divided into 4 sets 
    2. ul reponsive format link
 
#### tainted canvas (blobbed images)

#### svg image animation


#### Changes I made

#### Improvements














