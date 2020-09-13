let dbInputData = false; 
let openRequest = indexedDB.open('storage', 1);
openRequest.onupgradeneeded = (e)=> {
    console.log('upgrade db needed');
    db = openRequest.result;
    db.createObjectStore('imageSaved');
    db.createObjectStore('asteroidsSaved');
    db.createObjectStore('videoSaved');
    db.createObjectStore('presetImages');
    dbInputData = true;
}
openRequest.onerror = () => {
    console.log(`There was an error loading indexedDB ${openRequest.error}`);
};

openRequest.onsuccess = () => {
    db = openRequest.result;
    console.log('db running');
    console.log(dbInputData);
    //Installs Preset Images if needed to make it easier to play around with the gallery with having to waste time picking images
    if(dbInputData){
        console.log('updating')
        const presetImages = [
            {
            title: 'A Roll Cloud Over Uruguay',
            date: '2016-06-12',
            explanation: 'What kind of cloud is this? A type of arcus cloud called a roll cloud. These rare long clouds may form near advancing cold fronts. In particular, a downdraft from an advancing storm front can cause moist warm air to rise, cool below its dew point, and so form a cloud. When this happens uniformly along an extended front, a roll cloud may form. Roll clouds may actually have air circulating along the long horizontal axis of the cloud. A roll cloud is not thought to be able to morph into a tornado. Unlike a similar shelf cloud, a roll cloud is completely detached from their parent cumulonimbus cloud. Pictured above, a roll cloud extends far into the distance in 2009 January above Las Olas Beach in Maldonado, Uruguay.',
            url: 'https://apod.nasa.gov/apod/image/1606/rollcloud_eberl_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1606/rollcloud_eberl_2572.jpg'
            },
            {
            title: 'A Sagittarius Triplet',
            date: '2017-07-27',
            explanation: 'These three bright nebulae are often featured on telescopic tours of the constellation Sagittarius and the crowded starfields of the central Milky Way. In fact, 18th century cosmic tourist Charles Messier cataloged two of them; M8, the large nebula above and left of center, and colorful M20 near the bottom of the frame. The third emission region includes NGC 6559, right of M8 and separated from the larger nebula by a dark dust lane. All three are stellar nurseries about five thousand light-years or so distant. Over a hundred light-years across the expansive M8 is also known as the Lagoon Nebula. M20\'s popular moniker is the Trifid. Glowing hydrogen gas creates the dominant red color of the emission nebulae. In striking contrast, blue hues in the Trifid are due to dust reflected starlight. The colorful composite skyscape was recorded with two different telescopes to capture a widefield image of the area and individual close-ups at higher resolution.',
            url: 'https://apod.nasa.gov/apod/image/1707/TOA1-M8M20-SL-DCP01andB600-09-Final7-Cc1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1707/TOA1-M8M20-SL-DCP01andB600-09-Final7-Cc2048.jpg'
            },
            {
            title: 'A Sundial that Shows Solstice',
            date: '2012-06-26',
            explanation: 'What time is it? If the time and day are right, this sundial will tell you: SOLSTICE. Only then will the Sun be located just right for sunlight to stream through openings and spell out the term for the longest and shortest days of the year. And that happened last week and twice each year. The sundial was constructed by Jean Salins in 1980 and is situated at the Ecole Sup\ufffdrieure des Mines de Paris in Valbonne Sophia Antipolis of south-eastern France. On two other days of the year, watchers of this sundial might get to see it produce another word: EQUINOXE. Resource Guide: NASA Education and Public Outreach',
            url: 'https://apod.nasa.gov/apod/image/1206/solsticedial_mari_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1206/solsticedial_mari_5616.jpg'
            },
            {
            title: 'A Total Eclipse at the End of the World',
            date: '2017-07-30',
            explanation: 'Would you go to the end of the world to see a total eclipse of the Sun? If you did, would you be surprised to find someone else there already? In 2003, the Sun, the Moon, Antarctica, and two photographers all lined up in Antarctica during an unusual total solar eclipse. Even given the extreme location, a group of enthusiastic eclipse chasers ventured near the bottom of the world to experience the surreal momentary disappearance of the Sun behind the Moon. One of the treasures collected was the featured picture -- a composite of four separate images digitally combined to realistically simulate how the adaptive human eye saw the eclipse. As the image was taken, both the Moon and the Sun peeked together over an Antarctic ridge. In the sudden darkness, the magnificent corona of the Sun became visible around the Moon. Quite by accident, another photographer was caught in one of the images checking his video camera. Visible to his left are an equipment bag and a collapsible chair. A more easily visible solar eclipse will occur in about three weeks and be visible from the USA.',
            url: 'https://apod.nasa.gov/apod/image/1707/AntarcticEclipse_bruenjes_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1707/AntarcticEclipse_bruenjes_650.jpg'
            },
            {
            title: 'Alborz Mountain Star Trails',
            date: '2018-03-02',
            explanation: 'Colourful star trails arc through the night in this wide-angle mountain and skyscape. From a rotating planet, the digitally added consecutive exposures were made with a camera fixed to a tripod and looking south, over northern Iran\'s Alborz Mountain range. The stars trace concentric arcs around the planet\'s south celestial pole, below the scene\'s rugged horizon. Combined, the many short exposures also bring out the pretty star colours. Bluish trails are from stars hotter than our Sun, while yellowish trails are from cooler stars. Near the center, the remarkably pinkish trail was traced by the star-forming Orion Nebula.',
            url: 'https://apod.nasa.gov/apod/image/1803/SGU-Colourful_Alboraz_Startrails-900-cp60.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1803/SGU-Colourful_Alboraz_Startrails-1600-cp70.jpg'
            },
            {
            title: 'Aphelion Sunrise',
            date: '2017-07-05',
            explanation: 'On July 3rd, planet Earth reached aphelion, the farthest point in its elliptical orbit around the Sun. Each year, this day of the most distant Sun happens to occur during winter in the southern hemisphere. That\'s where this aphelion sunrise from 2015 was captured in a time series composite against the skyline of Brisbane, Australia. Of course, seasons for our fair planet are not determined by distance to the Sun, but by the tilt of Earth\'s rotational axis with respect to the ecliptic, the plane of its orbit. Fondly known as the obliquity of the ecliptic, the angle of the tilt is about 23.4 degrees from perpendicular to the orbital plane. So the most distant sunrise occurs during northern summer, when the planet\'s north pole is tilted toward the Sun and the north enjoys longer, warmer days.',
            url: 'https://apod.nasa.gov/apod/image/1707/AphelionSunrise_StephenMudge1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1707/AphelionSunrise_StephenMudge.jpg'
            },
            {
            title: 'Apollo 11: Catching Some Sun',
            date: '2017-07-22',
            explanation: 'Bright sunlight glints and long dark shadows mark this image of the lunar surface. It was taken July 20, 1969 by Apollo 11 astronaut Neil Armstrong, the first to walk on the Moon. Pictured is the mission\'s lunar module, the Eagle, and spacesuited lunar module pilot Buzz Aldrin unfurling a long sheet of foil also known as the Solar Wind Composition Experiment. Exposed facing the Sun, the foil trapped particles streaming outward in the solar wind, catching a sample of material from the Sun itself. Along with moon rocks and lunar soil samples, the solar wind collector was returned for analysis in earthbound laboratories.',
            url: 'https://apod.nasa.gov/apod/image/1707/AS11-40-5872HR1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1707/AS11-40-5872HR.jpg'
            },
            {
            title: 'Aurora Slathers up the Sky',
            date: '2017-07-29',
            explanation: 'Like salsa verde on your favorite burrito, a green aurora slathers up the sky in this June 25 snapshot from the International Space Station. About 400 kilometers (250 miles) above Earth, the orbiting station is itself within the upper realm of the auroral displays. Aurorae have the signature colors of excited molecules and atoms at the low densities found at extreme altitudes. Emission from atomic oxygen dominates this view. The tantalizing glow is green at lower altitudes, but rarer reddish bands extend above the space station\'s horizon. The orbital scene was captured while passing over a point south and east of Australia, with stars above the horizon at the right belonging to the constellation Canis Major, Orion\'s big dog. Sirius, alpha star of Canis Major, is the brightest star near the Earth\'s limb.',
            url: 'https://apod.nasa.gov/apod/image/1707/aurora_iss052e007857_1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1707/aurora_iss052e007857.jpg'
            },
            {
            title: 'Birds During a Total Solar Eclipse',
            date: '2019-07-09',
            explanation: 'What do birds do during a total solar eclipse? Darkness descends more quickly in a total eclipse than during sunset, but returns just as quickly -- and perhaps unexpectedly to the avians -- just a few minutes later. Stories about the unusual behavior of birds during eclipses have been told for centuries, but bird reactions were recorded and studied systematically by citizen scientists participating in an eBird project during the total solar eclipse that crossed the USA in 2017 August. Although some unusual behaviors were observed, many observers noted birds acting like it was dusk and either landing or flying low to the ground. Radar confirmed a significant decrease in high-flying birds and insects during and just after totality. Conversely, several sightings of normally nocturnal birds were reported. Pictured, a flock of birds in La Serena, Chile flew through the air together during the total solar eclipse that crossed South America last week. The photographer captured the scene in frames from an eclipse video. The next total solar eclipse in 2020 December will also cross South America, while in 2024 April a total solar eclipse will cross North America from Mexico through New England, USA. Gallery 2019: Notable total eclipse images submitted to APOD',
            url: 'https://apod.nasa.gov/apod/image/1907/BirdsEclipse_Caldas_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1907/BirdsEclipse_Caldas_3240.jpg'
            },
            {
            title: 'Carina Nebula Close Up',
            date: '2020-02-15',
            explanation: 'A jewel of the southern sky, the Great Carina Nebula, also known as NGC 3372, spans over 300 light-years, one of our galaxy\'s largest star forming regions. Like the smaller, more northerly Great Orion Nebula, the Carina Nebula is easily visible to the unaided eye, though at a distance of 7,500 light-years it is some 5 times farther away. This gorgeous telescopic close-up reveals remarkable details of the region\'s central glowing filaments of interstellar gas and obscuring cosmic dust clouds in a field of view nearly 20 light-years across. The Carina Nebula is home to young, extremely massive stars, including the still enigmatic and violently variable Eta Carinae, a star system with well over 100 times the mass of the Sun. In the processed composite of space and ground-based image data a dusty, two-lobed Homunculus Nebula appears to surround Eta Carinae itself just below and left of center. While Eta Carinae is likely on the verge of a supernova explosion, X-ray images indicate that the Great Carina Nebula has been a veritable supernova factory.',
            url: 'https://apod.nasa.gov/apod/image/2002/Eta-HST-ESO-New-LL1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2002/Eta-HST-ESO-New-LL.jpg'
            },
            {
            title: 'Carina over Lake Ballard',
            date: '2018-01-05',
            explanation: 'A jewel of the southern sky, the Great Carina Nebula, also known as NGC 3372, is one of our galaxy\'s largest star forming regions. Easily visible to the unaided eye it stands high above the signature hill of Lake Ballard, ephemeral salt lake of Western Australia, in this serene night skyscape from December 25, 2017. The Milky Way itself stretches beyond the southern horizon. Along the Milky Way, bright stars Alpha and Beta Centauri lie just above the hill\'s right flank, with the Southern Cross and dark Coalsack Nebula above the hill top. Based on a 22 panel mosaic, the scene was cropped to reveal more closely the beauty of this region of the southern Milky Way. On that short summer night, a star tracking camera mount was used to record the mosaic images of the sky, but turned off to image the foreground in moonlight.',
            url: 'https://apod.nasa.gov/apod/image/1801/CarinaLakeBallard_vrbasso_WebCrop1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1801/CarinaLakeBallard_vrbasso_WebCrop2048.jpg'
            },
            {
            title: 'Close-up of The Great Red Spot',
            date: '2017-07-15',
            explanation: 'On July 11, the Juno spacecraft once again swung near to Jupiter\'s turbulent cloud tops in its looping 53 day orbit around the Solar System\'s ruling gas giant. About 11 minutes after perijove 7, its closest approach on this orbit, it passed directly above Jupiter\'s Great Red Spot. During the much anticipated fly over, it captured this close-up image data from a distance of less than 10,000 kilometers. The raw JunoCam data was subsequently processed by citizen scientists. Very long-lived but found to be shrinking, the Solar System\'s largest storm system was measure to be 16,350 kilometers wide on April 15. That\'s about 1.3 times the diameter of planet Earth.',
            url: 'https://apod.nasa.gov/apod/image/1707/redspotDetailJuno_EichstadtDoran_crop.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1707/redspotDetailJuno_EichstadtDoran_crop.jpg'
            },
            {
            title: 'Clouds, Birds, Moon, Venus',
            date: '2018-03-04',
            explanation: 'Sometimes the sky above can become quite a show. In early September of 2010, for example, the Moon and Venus converged, creating quite a sight by itself for sky enthusiasts around the globe. From some locations, though, the sky was even more picturesque. In the featured image taken in Spain, a crescent Moon and the planet Venus, on the far right, were captured during sunset posing against a deep blue sky. In the foreground, dark storm clouds loom across the image bottom, while a white anvil cloud shape appears above. Black specks dot the frame, caused by a flock of birds taking flight. Very soon after this picture was taken, however, the birds passed by, the storm ended, and Venus and the Moon set. Bright Venus is again visible just after sunset this month (2018 March) and will appear quite near Mercury tonight and the rest of this week.',
            url: 'https://apod.nasa.gov/apod/image/1803/venusmoon_pascual_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1803/venusmoon_pascual_3000b.jpg'
            },
            {
            title: 'Comet CG Evaporates',
            date: '2020-01-27',
            explanation: 'Where do comet tails come from? There are no obvious places on the nuclei of comets from which the jets that create comet tails emanate. One of the best images of emerging jets is shown in the featured picture, taken in 2015 by ESA\'s robotic Rosetta spacecraft that orbited Comet 67P/Churyumov-Gerasimenko (Comet CG) from 2014 to 2016. The picture shows plumes of gas and dust escaping numerous places from Comet CG\'s nucleus as it neared the Sun and heated up. The comet has two prominent lobes, the larger one spanning about 4 kilometers, and a smaller 2.5-kilometer lobe connected by a narrow neck. Analyses indicate that evaporation must be taking place well inside the comet\'s surface to create the jets of dust and ice that we see emitted through the surface. Comet CG (also known as Comet 67P) loses in jets about a meter of radius during each of its 6.44-year orbits around the Sun, a rate at which will completely destroy the comet in only thousands of years. In 2016, Rosetta\'s mission ended with a controlled impact onto Comet CG\'s surface. Outreach Astronomers: Future APOD writers sought.',
            url: 'https://apod.nasa.gov/apod/image/2001/Comet67P_Rosetta_1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2001/Comet67P_Rosetta_1024.jpg'
            },
            {
            title: 'Crescent Saturn',
            date: '2019-07-07',
            explanation: 'Saturn never shows a crescent phase -- from Earth. But when viewed from beyond, the majestic giant planet can show an unfamiliar diminutive sliver. This image of crescent Saturn in natural color was taken by the robotic Cassini spacecraft in 2007. The featured image captures Saturn\'s majestic rings from the side of the ring plane opposite the Sun -- the unilluminated side -- another vista not visible from Earth. Pictured are many of Saturn\'s photogenic wonders, including the subtle colors of cloud bands, the complex shadows of the rings on the planet, and the shadow of the planet on the rings. A careful eye will find the moons Mimas (2 o\'clock) and Janus (4 o\'clock), but the real challenge is to find Pandora (8 o\'clock). Saturn is now nearly opposite from the Sun in the Earth\'s sky and so can be seen in the evening starting just after sunset for the rest of the night.',
            url: 'https://apod.nasa.gov/apod/image/1907/CrescentSaturn_cassini_1080.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1907/CrescentSaturn_cassini_4824.jpg'
            },
            {
            title: 'Eagle Aurora over Norway',
            date: '2019-07-14',
            explanation: 'What\'s that in the sky? An aurora. A large coronal mass ejection occurred on our Sun five days before this 2012 image was taken, throwing a cloud of fast moving electrons, protons, and ions toward the Earth. Although most of this cloud passed above the Earth, some of it impacted our Earth\'s magnetosphere and resulted in spectacular auroras being seen at high northern latitudes. Featured here is a particularly photogenic auroral corona captured above Grotfjord, Norway. To some, this shimmering green glow of recombining atmospheric oxygen might appear as a large eagle, but feel free to share what it looks like to you. Although the Sun is near Solar Minimum, streams of the solar wind continue to impact the Earth and create impressive auroras visible even last week.',
            url: 'https://apod.nasa.gov/apod/image/1610/eagleaurora_jorgensen_900.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1610/eagleaurora_jorgensen_900.jpg'
            },
            {
            title: 'Earth at Night',
            date: '2017-07-09',
            explanation: 'Can you find your favorite country or city? Surprisingly, on this world-wide nightscape, city lights make this task quite possible. Human-made lights highlight particularly developed or populated areas of the Earth\'s surface, including the seaboards of Europe, the eastern United States, and Japan. Many large cities are located near rivers or oceans so that they can exchange goods cheaply by boat. Particularly dark areas include the central parts of South America, Africa, Asia, and Australia. The featured composite was created from images that were collected during cloud-free periods in April and October 2012 by the Suomi-NPP satellite, from a polar orbit about 824 kilometers above the surface, using its Visible Infrared Imaging Radiometer Suite (VIIRS).',
            url: 'https://apod.nasa.gov/apod/image/1707/EarthAtNight_SuomiNPP_1080.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1707/EarthAtNight_SuomiNPP_3600.jpg'
            },
            {
            title: 'Edge-On Galaxy NGC 5866',
            date: '2016-03-09',
            explanation: 'Why is this galaxy so thin? Many disk galaxies are actually just as thin as NGC 5866, pictured above, but are not seen edge-on from our vantage point. One galaxy that is situated edge-on is our own Milky Way Galaxy. Classified as a lenticular galaxy, NGC 5866 has numerous and complex dust lanes appearing dark and red, while many of the bright stars in the disk give it a more blue underlying hue. The blue disk of young stars can be seen extending past the dust in the extremely thin galactic plane, while the bulge in the disk center appears tinged more orange from the older and redder stars that likely exist there. Although similar in mass to our Milky Way Galaxy, light takes about 60,000 years to cross NGC 5866, about 30 percent less than light takes to cross our own Galaxy. In general, many disk galaxies are very thin because the gas that formed them collided with itself as it rotated about the gravitational center. Galaxy NGC 5866 lies about 50 million light years distant toward the constellation of the Dragon (Draco). Follow APOD on: Facebook, Google Plus, Twitter, or Instagram',
            url: 'https://apod.nasa.gov/apod/image/1603/ngc5866_hubble_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1603/ngc5866_hubble_4096.jpg'
            },
            {
            title: 'Halo of the Cat\'s Eye',
            date: '2020-06-07',
            explanation: 'The Cat\'s Eye Nebula (NGC 6543) is one of the best known planetary nebulae in the sky. Its haunting symmetries are seen in the very central region of this stunning false-color picture, processed to reveal the enormous but extremely faint halo of gaseous material, over three light-years across, which surrounds the brighter, familiar planetary nebula. Made with data from the Nordic Optical Telescope in the Canary Islands, the composite picture shows extended emission from the nebula. Planetary nebulae have long been appreciated as a final phase in the life of a Sun-like star. Only much more recently however, have some planetaries been found to have halos like this one, likely formed of material shrugged off during earlier active episodes in the star\'s evolution. While the planetary nebula phase is thought to last for around 10,000 years, astronomers estimate the age of the outer filamentary portions of this halo to be 50,000 to 90,000 years.',
            url: 'https://apod.nasa.gov/apod/image/2006/catseye2_not_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2006/catseye2_not_2048.jpg'
            },
            {
            title: 'IC 1396: Emission Nebula in Cepheus',
            date: '2017-07-20',
            explanation: 'Stunning emission nebula IC 1396 mixes glowing cosmic gas and dark dust clouds in the high and far off constellation of Cepheus. Energized by the bright central star seen here, this star forming region sprawls across hundreds of light-years, spanning over three degrees on the sky while nearly 3,000 light-years from planet Earth. Among the intriguing dark shapes within IC 1396, the winding Elephant\'s Trunk nebula lies just below center. Stars could still be forming inside the dark shapes by gravitational collapse. But as the denser clouds are eroded away by powerful stellar winds and radiation, any forming stars will ultimately be cutoff from the reservoir of star stuff. The gorgeous color view is a composition of image data from narrowband filters, mapping emission from the nebula\'s atomic oxygen, hydrogen, and sulfur into blue, green, and red hues.',
            url: 'https://apod.nasa.gov/apod/image/1707/MOSAIC_IC1396_HaSHO_blanco1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1707/MOSAIC_IC1396_HaSHO_blanco.jpg'
            },
            {
            title: 'In the Shadow of the Moon',
            date: '2019-07-04',
            explanation: 'On July 2 denizens of planet Earth could stand in the Moon\'s dark umbral shadow during South America\'s 2019 total solar eclipse. It first touched down in the Southern Pacific Ocean, east of New Zealand. Racing toward the east along a narrow track, the shadow of the Moon made landfall along the Chilean coast with the Sun low on the western horizon. Captured in the foreground here are long shadows still cast by direct sunlight though, in the final moments before totality began. While diffraction spikes are from the camera lens aperture, the almost totally eclipsed Sun briefly shone like a beautiful diamond ring in the clear, darkened sky.',
            url: 'https://apod.nasa.gov/apod/image/1907/eclipse_2019_beletsky.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1907/eclipse_2019_beletsky.jpg'
            },
            {
            title: 'Int-Ball Drone Activated on the Space Station',
            date: '2017-07-25',
            explanation: 'What if you were followed around by a cute floating ball that kept taking your picture? Then you might be an astronaut on today\'s International Space Station (ISS). Designed by the Japan Aerospace Exploration Agency (JAXA), the JEM Internal Ball Camera -- informally "Int-Ball" -- is a bit larger than a softball, can float and maneuver by itself but also be controlled remotely, can take high resolution images and videos, and is not related to Hello Kitty. Int-Ball was delivered to the ISS in early June and is designed to allow ground-control to increase the monitoring of ISS equipment and activities while decreasing time demands on human astronauts. Int-Ball moves by turning on small internal fans and sees with a camera located between its two dark eyes.',
            url: 'https://apod.nasa.gov/apod/image/1707/ISSdrone_jaxa_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1707/ISSdrone_jaxa_4928.jpg'
            },
            {
            title: 'Ireson Hill on Mars',
            date: '2017-07-19',
            explanation: 'What created this unusual hill on Mars? Its history has become a topic of research, but its shape and two-tone structure makes it one of the more unusual hills that the robotic Curiosity rover on Mars has rolled near. Dubbed Ireson Hill, the mound rises about 5 meters high and spans about 15 meters across. Ireson Hill is located on the Bagnold Dune field on the slope of Mount Sharp in Gale Crater on Mars. The featured 41-image panorama has been horizontally compressed to include the entire hill. The image was taken on February 2 and released last week. Because Mars is moving behind the Sun as seen from the Earth, NASA will soon stop sending commands to its Martian orbiters and rovers until about August 1. Explore the Universe: Random APOD Generator',
            url: 'https://apod.nasa.gov/apod/image/1707/IresonHill_Curiosity_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1707/IresonHill_Curiosity_6720.jpg'
            },
            {
            title: 'Jupiter and the Moons',
            date: '2020-09-02',
            explanation: 'How many moons do you see? Many people would say one, referring to the Earth\'s Moon, prominent on the lower left. But take a closer look at the object on the upper right. That seeming-star is actually the planet Jupiter, and your closer look might reveal that it is not alone – it is surrounded by some of its largest moons. From left to right these Galilean Moons are Io, Ganymende, Europa and Callisto. These moons orbit the Jovian world just like the planets of our Solar System orbit the Sun, in a line when seen from the side. The featured single shot was captured from Cancun, Mexico last week as Luna, in its orbit around the Earth, glided past the distant planet. Even better views of Jupiter are currently being captured by NASA\'s Juno spacecraft, now in a looping orbit around the Solar System\'s largest planet. Earth\'s Moon will continue to pass nearly in front of both Jupiter and Saturn once a month (moon-th) as the two giant planets approach their own great conjunction in December. Almost Hyperspace: Random APOD Generator',
            url: 'https://apod.nasa.gov/apod/image/2009/JupiterAndMoons_Fedez_1080.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2009/JupiterAndMoons_Fedez_1600.jpg'
            },
            {
            title: 'Jupiter\'s Swimming Storm',
            date: '2020-09-10',
            explanation: 'A bright storm head with a long turbulent wake swims across Jupiter in these sharp telescopic images of the Solar System\'s ruling gas giant. Captured on August 26, 28, and September 1 (left to right) the storm approximately doubles in length during that period. Stretching along the jetstream of the planet\'s North Temperate Belt it travels eastward in successive frames, passing the Great Red Spot and whitish Oval BA, famous storms in Jupiter\'s southern hemisphere. Galilean moons Callisto and Io are caught in the middle frame. In fact, telescopic skygazers following Jupiter in planet Earth\'s night have reported dramatic fast moving storm outbreaks over the past few weeks in Jupiter\'s North Temperate Belt.',
            url: 'https://apod.nasa.gov/apod/image/2009/Jupiters1_swimmingstormsACasely1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2009/Jupiters1_swimmingstormsACasely.jpg'
            },
            {
            title: 'La Silla Eclipse Sequence',
            date: '2019-07-05',
            explanation: 'The road to the high mountaintop La Silla Observatory in the Chilean Atacama Desert also led in to the path of July 2nd\'s total solar eclipse. Recorded at regular intervals before and after the total eclipse phase, the frames in this composite sequence include the moment the Moon\'s dark shadow fell across some of planet Earth\'s advanced large telescopes. The dreamlike view looks west toward the setting Sun and the approaching Moon shadow. In fact La Silla was a little north of the shadow track\'s center line, so the region\'s stunning, clear skies are slightly brighter to the north (right) in the scene.',
            url: 'https://apod.nasa.gov/apod/image/1907/2019_07_02_TSE_LaSilla_Sequence_1024px.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1907/2019_07_02_TSE_LaSilla_Sequence_1500px.jpg'
            },
            {
            title: 'Lunar Shadow Transit',
            date: '2016-03-11',
            explanation: 'This snapshot from deep space captures planet Earth on March 9. The shadow of its large moon is falling on the planet\'s sunlit hemisphere. Tracking toward the east (left to right) across the ocean-covered world the moon shadow moved quickly in the direction of the planet\'s rotation. Of course, denizens of Earth located close to the shadow track centerline saw this lunar shadow transit as a brief, total eclipse of the Sun. From a spacebased perspective between Earth and Sun, the view of this shadow transit was provided by the Deep Space Climate Observatory (DSCOVR) spacecraft\'s Earth Polychromatic Imaging Camera (EPIC).',
            url: 'https://apod.nasa.gov/apod/image/1603/eclipse_epc_2016068_4_1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1603/eclipse_epc_2016068_4.jpg'
            },
            {
            title: 'M2-9: Wings of a Butterfly Nebula',
            date: '2020-09-13',
            explanation: 'Are stars better appreciated for their art after they die? Actually, stars usually create their most artistic displays as they die. In the case of low-mass stars like our Sun and M2-9 pictured here, the stars transform themselves from normal stars to white dwarfs by casting off their outer gaseous envelopes. The expended gas frequently forms an impressive display called a planetary nebula that fades gradually over thousands of years. M2-9, a butterfly planetary nebula 2100 light-years away shown in representative colors, has wings that tell a strange but incomplete tale. In the center, two stars orbit inside a gaseous disk 10 times the orbit of Pluto. The expelled envelope of the dying star breaks out from the disk creating the bipolar appearance. Much remains unknown about the physical processes that cause and shape planetary nebulae. Almost Hyperspace: Random APOD Generator',
            url: 'https://apod.nasa.gov/apod/image/2009/M2D9_HubbleSchmidt_985.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2009/M2D9_HubbleSchmidt_985.jpg'
            },
            {
            title: 'Magellanic Galaxy NGC 55',
            date: '2019-07-12',
            explanation: 'Irregular galaxy NGC 55 is thought to be similar to the Large Magellanic Cloud (LMC). But while the LMC is about 180,000 light-years away and a well-known satellite of our own Milky Way Galaxy, NGC 55 is more like 6 million light-years distant, a member of the Sculptor Galaxy Group. Classified as an irregular galaxy, in deep exposures the LMC itself resembles a barred disk galaxy. Spanning about 50,000 light-years, NGC 55 is seen nearly edge-on though, presenting a flattened, narrow profile in contrast with our face-on view of the LMC. Just as large star forming regions create emission nebulae in the LMC, NGC 55 is also seen to be producing new stars. This highly detailed galaxy portrait highlights a bright core crossed with dust clouds, telltale pinkish star forming regions, and young blue star clusters in NGC 55.',
            url: 'https://apod.nasa.gov/apod/image/1907/NGC55-LRGB_hager1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1907/NGC55-LRGB_hager2048.jpg'
            },
            {
            title: 'Mercury as Revealed by MESSENGER',
            date: '2017-07-23',
            explanation: 'Mercury had never been seen like this before. In 2008, the robotic MESSENGER spacecraft buzzed past Mercury for the second time and imaged terrain mapped previously only by comparatively crude radar. The featured image was recorded as MESSENGER looked back 90 minutes after passing, from an altitude of about 27,000 kilometers. Visible in the image, among many other newly imaged features, are unusually long rays that appear to run like meridians of longitude out from a young crater near the northern limb. MESSENGER entered orbit around Mercury in 2011 and finished its primary mission in 2012, but took detailed measurements until 2015, at which time it ran out of fuel and so was instructed to impact Mercury\'s surface. New Moon Tonight: The next New Moon will block the Sun.',
            url: 'https://apod.nasa.gov/apod/image/1707/mercuryflyby2_messenger_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1707/mercuryflyby2_messenger_1024.png'
            },
            {
            title: 'Messier 5',
            date: '2012-08-03',
            explanation: '"Beautiful Nebula discovered between the Balance [Libra] & the Serpent [Serpens] ..." begins the description of the 5th entry in 18th century astronomer Charles Messier\'s famous catalog of nebulae and star clusters. Though it appeared to Messier to be fuzzy and round and without stars, Messier 5 (M5) is now known to be a globular star cluster, 100,000 stars or more, bound by gravity and packed into a region around 165 light-years in diameter. It lies some 25,000 light-years away. Roaming the halo of our galaxy, globular star clusters are ancient members of the Milky Way. M5 is one of the oldest globulars, its stars estimated to be nearly 13 billion years old. The beautiful star cluster is a popular target for earthbound telescopes. Even close to its dense core, the cluster\'s red and blue giant stars stand out with yellowish and blue hues in this sharp color image.',
            url: 'https://apod.nasa.gov/apod/image/1208/m5_block900.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1208/m5_block.jpg'
            },
            {
            title: 'Messier 63: The Sunflower Galaxy',
            date: '2017-07-12',
            explanation: 'A bright spiral galaxy of the northern sky, Messier 63 is about 25 million light-years distant in the loyal constellation Canes Venatici. Also cataloged as NGC 5055, the majestic island universe is nearly 100,000 light-years across. That\'s about the size of our own Milky Way Galaxy. Known by the popular moniker, The Sunflower Galaxy, M63 sports a bright yellowish core in this sharp composite image from space- and ground-based telescopes. Its sweeping blue spiral arms are streaked with cosmic dust lanes and dotted with pink star forming regions. A dominant member of a known galaxy group, M63 has faint, extended features that are likely star streams from tidally disrupted satellite galaxies. M63 shines across the electromagnetic spectrum and is thought to have undergone bursts of intense star formation.',
            url: 'https://apod.nasa.gov/apod/image/1707/M63-HST-Subaru-S1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1707/M63-HST-Subaru-LL.jpg'
            },
            {
            title: 'Milky Way Over Piton de l\'Eau',
            date: '2012-06-25',
            explanation: 'Sometimes, if you wait long enough for a clear and moonless night, the stars will come out with a vengeance. One such occasion occurred earlier this month at the Piton de l\'Eau on Reunion Island. In the foreground, surrounded by bushes and trees, lies a water filled volcanic crater serenely reflecting starlight. A careful inspection near the image center will locate Piton des Neiges, the highest peak on the island, situated several kilometers away. In the background, high above the lake, shines the light of hundreds of stars, most of which are within 100 light years, right in our stellar neighborhood. Far in the distance, arching majestically overhead, is the central band of our home Milky Way Galaxy, shining by the light of millions of stars each located typically thousands of light years away. The astrophotographer reports waiting for nearly two years for the sky and clouds to be just right to get the above shot. Help Evaluate APOD: Has viewing APOD increased your interest in NASA?',
            url: 'https://apod.nasa.gov/apod/image/1206/cratersky_perrot_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1206/cratersky_perrot_1000.jpg'
            },
            {
            title: 'Milky Way over Pyramid of the Feathered Serpent',
            date: '2019-06-17',
            explanation: 'To see the feathered serpent descend the Mayan pyramid requires exquisite timing. You must visit El Castillo -- in Mexico\'s Yucat\ufffdn Peninsula -- near an equinox. Then, during the late afternoon if the sky is clear, the pyramid\'s own shadows create triangles that merge into the famous illusion of the slithering viper. Also known as the Temple of Kukulkan, the impressive step-pyramid stands 30 meters tall and 55 meters wide at the base. Built up as a series of square terraces by the pre-Columbian civilization between the 9th and 12th century, the structure can be used as a calendar and is noted for astronomical alignments. To see the central band of our Milky Way Galaxy descend overhead the Mayan pyramid, however, requires less exquisite timing. Even the ancient Mayans might have been impressed, though, to know that the exact positions of the Milky Way, Saturn (left) and Jupiter (right) in the featured image give it a time stamp more specific than equinox -- in fact 2019 April 7 at 5 am.',
            url: 'https://apod.nasa.gov/apod/image/1906/MayanMilkyWay_Fernandez_1080.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1906/MayanMilkyWay_Fernandez_1600.jpg'
            },
            {
            title: 'NGC 2359: Thor\'s Helmet',
            date: '2020-06-12',
            explanation: 'NGC 2359 is a helmet-shaped cosmic cloud with wing-like appendages popularly called Thor\'s Helmet. Heroically sized even for a Norse god, Thor\'s Helmet is about 30 light-years across. In fact, the helmet is more like an interstellar bubble, blown as a fast wind from the bright, massive star near the bubble\'s center inflates a region within the surrounding molecular cloud. Known as a Wolf-Rayet star, the central star is an extremely hot giant thought to be in a brief, pre-supernova stage of evolution. NGC 2359 is located about 15,000 light-years away in the constellation of the Great Overdog. The remarkably sharp image is a mixed cocktail of data from broadband and narrowband filters using three different telescopes. It captures natural looking stars and the details of the nebula\'s filamentary structures. The predominant bluish hue is strong emission from doubly ionized oxygen atoms in the glowing gas.',
            url: 'https://apod.nasa.gov/apod/image/2006/ThorsHelmet800.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2006/ThorsHelmet.jpg'
            },
            {
            title: 'NGC 2392: Double-Shelled Planetary Nebula',
            date: '2020-02-16',
            explanation: 'To some, this huge nebula resembles a person\'s head surrounded by a parka hood. In 1787, astronomer William Herschel discovered this unusual planetary nebula: NGC 2392. More recently, the Hubble Space Telescope imaged the nebula in visible light, The featured image of the nebula shows gas clouds so complex they are not fully understood. NGC 2392 is a double-shelled planetary nebula, with the more distant gas having composed the outer layers of a Sun-like star only 10,000 years ago. The outer shell contains unusual light-year long orange filaments. The inner filaments visible are being ejected by strong wind of particles from the central star. The NGC 2392 Nebula spans about 1/3 of a light year and lies in our Milky Way Galaxy, about 3,000 light years distant, toward the constellation of the Twins (Gemini).',
            url: 'https://apod.nasa.gov/apod/image/2002/NGC2392_HubbleSchmidt_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2002/NGC2392_HubbleSchmidt_960.jpg'
            },
            {
            title: 'NGC 2442: Galaxy in Volans',
            date: '2020-08-04',
            explanation: 'Distorted galaxy NGC 2442 can be found in the southern constellation of the flying fish, (Piscis) Volans. Located about 50 million light-years away, the galaxy\'s two spiral arms extending from a pronounced central bar have a hook-like appearance in wide-field images. But this mosaicked close-up, constructed from Hubble Space Telescope and European Southern Observatory data, follows the galaxy\'s structure in amazing detail. Obscuring dust lanes, young blue star clusters and reddish star forming regions surround a core of yellowish light from an older population of stars. The sharp image data also reveal more distant background galaxies seen right through NGC 2442\'s star clusters and nebulae. The image spans about 75,000 light-years at the estimated distance of NGC 2442.',
            url: 'https://apod.nasa.gov/apod/image/2008/NGC2442_HstGendler_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2008/NGC2442_HstGendler_2400.jpg'
            },
            {
            title: 'NGC 4449: Close-up of a Small Galaxy',
            date: '2017-07-14',
            explanation: 'Grand spiral galaxies often seem to get all the glory. Their young, blue star clusters and pink star forming regions along sweeping spiral arms are guaranteed to attract attention. But small irregular galaxies form stars too, like NGC 4449, about 12 million light-years distant. Less than 20,000 light-years across, the small island universe is similar in size, and often compared to our Milky Way\'s satellite galaxy, the Large Magellanic Cloud (LMC). This remarkable Hubble Space Telescope close-up of the well-studied galaxy was reprocessed to highlight the telltale reddish glow of hydrogen gas. The glow traces NGC 4449\'s widespread star forming regions, some even larger than those in the LMC, with enormous interstellar arcs and bubbles blown by short-lived, massive stars. NGC 4449 is a member of a group of galaxies found in the constellation Canes Venatici. It also holds the distinction of being the first dwarf galaxy with an identified tidal star stream.',
            url: 'https://apod.nasa.gov/apod/image/1707/N4449DPestanaRVillaverdeHLA1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1707/N4449DPestanaRVillaverdeHLA2048.jpg'
            },
            {
            title: 'NGC 4676: The Mighty Mice',
            date: '2019-06-14',
            explanation: 'These two mighty galaxies are pulling each other apart. Known as The Mice because they have such long tails, each large spiral galaxy has actually passed through the other. Their long tails are drawn out by strong gravitational tides rather than collisions of their individual stars. Because the distances are so large, the cosmic interaction takes place in slow motion -- over hundreds of millions of years. They will probably collide again and again over the next billion years until they coalesce to form a single galaxy. NGC 4676 lies about 300 million light-years away toward the constellation of Bernice\'s Hair (Coma Berenices) and are likely members of the Coma Cluster of Galaxies. Not often imaged in small telescopes, this field of view catches the faint tidal tails several hundred thousand light-years long.',
            url: 'https://apod.nasa.gov/apod/image/1906/Mice_LRGB_web.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1906/Mice_LRGB_web.jpg'
            },
            {
            title: 'NGC 6357: Cathedral to Massive Stars',
            date: '2020-08-30',
            explanation: 'How massive can a normal star be? Estimates made from distance, brightness and standard solar models had given one star in the open cluster Pismis 24 over 200 times the mass of our Sun, making it one of the most massive stars known. This star is the brightest object located just above the gas front in the featured image. Close inspection of images taken with the Hubble Space Telescope, however, have shown that Pismis 24-1 derives its brilliant luminosity not from a single star but from three at least. Component stars would still remain near 100 solar masses, making them among the more massive stars currently on record. Toward the bottom of the image, stars are still forming in the associated emission nebula NGC 6357. Appearing perhaps like a Gothic cathedral, energetic stars near the center appear to be breaking out and illuminating a spectacular cocoon. Teachers & Students: Ideas for Utilizing APOD in the Classroom',
            url: 'https://apod.nasa.gov/apod/image/2008/ngc6357_hubble_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2008/ngc6357_hubble_3140.jpg'
            },
            {
            title: 'Northern Lights above Lofoten',
            date: '2016-06-16',
            explanation: 'The Aurora Borealis or northern lights are familiar visitors to night skies above the village of Reine in the Lofoten Islands, Norway, planet Earth. In this scene, captured from a mountaintop camp site, the auroral curtains do seem to create an eerie tension with the coastal lights though. A modern perspective on the world at night, the stunning image was chosen as the over all winner in The World at Night\'s 2016 International Earth and Sky Photo Contest. Selections were made from over 900 entries highlighting the beauty of the night sky and its battle with light pollution.',
            url: 'https://apod.nasa.gov/apod/image/1606/TWAN6108-03LConu.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1606/TWAN6108-03LConu.jpg'
            },
            {
            title: 'Novel Coronavirus Attacks Humanity',
            date: '2020-06-02',
            explanation: 'Humanity is under attack. The attack is not from large tentacle-flailing aliens, but from invaders so small they can barely be seen, and so strange they are not even clearly alive. All over planet Earth, the human home world, DNA-based humans are being invaded by the RNA-based SARS-CoV2. The virus, which creates a disease known as COVID-19, specializes in reprogramming human cells into zombies that manufacture and release copies of itself. Pictured here is a high magnification image of a human cell covered by attacking novel coronavirus SARS-CoV2 (orange). Epic battles where two species square off in a fight to the death are not unusual on Earth, with several just involving humans typically ongoing at any time. Even so, most humans are predicted to survive. After several years, humanity expects to win this war -- but only after millions of humans have died and trillions of coronaviruses have been destroyed. Wash your hands: Tips for humans on how to survive this SARS-CoV2 assault',
            url: 'https://apod.nasa.gov/apod/image/2006/SarsCov2_Niaid_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2006/SarsCov2_Niaid_4096.jpg'
            },
            {
            title: 'Orion over Argentine Mountains',
            date: '2020-06-09',
            explanation: 'Do you recognize the constellation of Orion? It may be harder than usual in today\'s featured image because the camera has zoomed in on the center, and the exposure is long enough to enhance nebulas beyond what the unaided human eye can see. Still, once you become oriented, you can see Orion\'s three belt stars lined up vertically near the image center, and even locate the familiar Orion Nebula on the upper left. Famous faint features that are also visible include the dark Horsehead Nebula indentation near the image center, and the dusty Flame Nebula just to its right. Part of the Orion-encircling Barnard\'s Loop can also be found on the far right. The image combines multiple sky-tracking shots of the background in different colors with a single static foreground exposure taken at twilight -- all captured with the same camera and from the same location. The picturesque scene was captured early last year from mountains in San Juan, Argentina. Next picture: June 11 < | Archive | Submissions | Index | Search | Calendar | RSS | Education | About APOD | Discuss | > Authors & editors: Robert Nemiroff (MTU) & Jerry Bonnell (UMCP) NASA Official: Phillip Newman Specific rights apply. NASA Web Privacy Policy and Important Notices A service of: ASD at NASA / GSFC & Michigan Tech. U.',
            url: 'https://apod.nasa.gov/apod/image/2006/OrionMountains_Tabbush_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2006/OrionMountains_Tabbush_2048.jpg'
            },
            {
            title: 'Perseids Around the Milky Way',
            date: '2020-08-17',
            explanation: 'Why would meteor trails appear curved? The arcing effect arises only because the image artificially compresses (nearly) the whole sky into a rectangle. The meteors are from the Perseid Meteor Shower that peaked last week. The featured multi-frame image combines not only different directions from the 360 projection, but different times when bright Perseid meteors momentarily streaked across the sky. All Perseid meteors can be traced back to the constellation Perseus toward the lower left, even the seemingly curved (but really straight) meteor trails. Although Perseids always point back to their Perseus radiant, they can appear almost anywhere on the sky. The image was taken from Inner Mongolia, China, where grasslands meet sand dunes. Many treasures also visible in the busy night sky including the central arch of our Milky Way Galaxy, the planets Saturn and Jupiter toward the right, colorful airglow on the central left, and some relatively nearby Earthly clouds. The Perseid Meteor Shower peaks every August. Perseid Meteor Shower: Notable images submitted to APOD',
            url: 'https://apod.nasa.gov/apod/image/2008/PerseidBridge_Zhang_1080.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2008/PerseidBridge_Zhang_4032.jpg'
            },
            {
            title: 'Pleiades: The Seven Sisters Star Cluster',
            date: '2020-09-09',
            explanation: 'Have you ever seen the Pleiades star cluster? Even if you have, you probably have never seen it as large and clear as this. Perhaps the most famous star cluster on the sky, the bright stars of the Pleiades can be seen without binoculars from even the depths of a light-polluted city. With a long exposure from a dark location, though, the dust cloud surrounding the Pleiades star cluster becomes very evident. The featured exposure covers a sky area several times the size of the full moon. Also known as the Seven Sisters and M45, the Pleiades lies about 400 light years away toward the constellation of the Bull (Taurus). A common legend with a modern twist is that one of the brighter stars faded since the cluster was named, leaving only six of the sister stars visible to the unaided eye. The actual number of Pleiades stars visible, however, may be more or less than seven, depending on the darkness of the surrounding sky and the clarity of the observer\'s eyesight. Teachers & Students: Ideas for utilizing APOD in the classroom.',
            url: 'https://apod.nasa.gov/apod/image/2009/Pleiades_Fraile_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2009/Pleiades_Fraile_3413.jpg'
            },
            {
            title: 'Shadow Rise on the Inside Passage',
            date: '2018-07-05',
            explanation: 'At sunset look east not west. As Earth\'s dark shadow rises from the eastern horizon, faint and subtle colors will appear opposite the setting Sun. This beautiful evening sea and skyscape records the reflective scene from a cruise on the well-traveled Alaskan Inside Passage in the Pacific Northwest. Along the horizon the fading sunset gives way to the pinkish anti-twilight arch, more poetically known as the Belt of Venus. Often overlooked at sunset in favor of the brighter western horizon, the lovely arch is tinted by filtered sunlight backscattered in the dense atmosphere, hugging the planet\'s rising blue-grey shadow.',
            url: 'https://apod.nasa.gov/apod/image/1807/BeltofVenus062718_Cullen1067.jpeg',
            hdurl: 'https://apod.nasa.gov/apod/image/1807/BeltofVenus062718_Cullen.jpeg'
            },
            {
            title: 'SpaceX Demo-2 Launch',
            date: '2020-06-13',
            explanation: 'Clouds are white but the sky is dark in this snapshot of Launch Complex 39A at the Kennedy Space Center. The dramatic daytime sky is partly due to the black and white photo captured with a digital camera at near-infrared wavelengths. Taken at 3:22 p.m. EDT Saturday May 30 the launch was pretty dramatic too as a Falcon 9 rocket lofted a Crew Dragon spacecraft towards low-Earth orbit. Astronauts Robert Behnken and Douglas Hurley were onboard, the first crew launched from a United States spaceport since the conclusion of the Space Shuttle Program in 2011. A few minutes after launch, the Falcon 9 first stage returned to land on Of Course I Still Love You (that\'s an autonomous spaceport drone ship ...) patiently waiting off the Florida coast. The two astronauts guided their craft to a successfull docking with the International Space Station’s Harmony module at 10:16 a.m. EDT Sunday May 31.',
            url: 'https://apod.nasa.gov/apod/image/2006/demo-2_crewedlaunchIR1100.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2006/demo-2_crewedlaunchIR.jpg'
            },
            {
            title: 'Spiral Galaxy NGC 1512: The Nuclear Ring',
            date: '2017-07-10',
            explanation: 'What\'s happening around the center of this spiral galaxy? Seen in total, NGC 1512 appears to be a barred spiral galaxy -- a type of spiral that has a straight bar of stars across its center. This bar crosses an inner ring, though, a ring not seen as it surrounds the pictured region. Featured in this Hubble Space Telescope image is a "nuclear ring" -- one that surrounds the nucleus of the spiral. The two rings are connected not only by a bar of bright stars but by dark lanes of dust. Inside of this nuclearring, dust continues to spiral right into the very center -- possibly the location of a large black hole. The rings are bright with newly formed stars.',
            url: 'https://apod.nasa.gov/apod/image/1707/NGC1512_Schmidt_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1707/NGC1512_Schmidt_1342.jpg'
            },
            {
            title: 'Star Cluster Omega Centauri in HDR',
            date: '2017-07-11',
            explanation: 'Behold the largest ball of stars in our galaxy. Omega Centauri is packed with about 10 million stars, many older than our Sun and packed within a volume of only about 150 light-years in diameter. The star cluster is the largest and brightest of 200 or so known globular clusters that roam the halo of our Milky Way galaxy. Though most star clusters consist of stars with the same age and composition, the enigmatic Omega Cen exhibits the presence of different stellar populations with a spread of ages and chemical abundances. In fact, Omega Cen may be the remnant core of a small galaxy merging with the Milky Way. The featured image shows so many stars because it merged different exposures with high dynamic range (HDR) techniques. Omega Centauri, also known as NGC 5139, lies about 15,000 light-years away toward the southern constellation of the Centaurus.',
            url: 'https://apod.nasa.gov/apod/image/1707/OmegaCentauri_ODay_1080.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1707/OmegaCentauri_ODay_4620.jpg'
            },
            {
            title: 'TYC 8998-760-1: Multiple Planets around a Sun Like Star',
            date: '2020-08-18',
            explanation: 'Do other stars have planets like our Sun? Previous evidence shows that they do, coming mostly from slight shifts in the star\'s light created by the orbiting planets. Recently, however, and for the first time, a pair of planets has been directly imaged around a Sun-like star. These exoplanets orbit the star designated TYC 8998-760-1 and are identified by arrows in the featured infrared image. At 17 million years old, the parent star is much younger than the 5-billion-year age of our Sun. Also, the exoplanets are both more massive and orbit further out than their Solar System analogues: Jupiter and Saturn. The exoplanets were found by the ESO\'s Very Large Telescope in Chile by their infrared glow – after the light from their parent star was artificially blocked. As telescope and technology improve over the next decade, it is hoped that planets more closely resembling our Earth will be directly imaged. Experts Debate: How will humanity first discover extraterrestrial life?',
            url: 'https://apod.nasa.gov/apod/image/2008/TYC8998_ESO_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2008/TYC8998_ESO_960.jpg'
            },
            {
            title: 'The Colors and Magnitudes of M13',
            date: '2019-06-13',
            explanation: 'M13 is modestly recognized as the Great Globular Star Cluster in Hercules. A ball of stars numbering in the hundreds of thousands crowded into a region 150 light years across, it lies some 25,000 light-years away. The sharp, color picture of M13 at upper left is familiar to many telescopic imagers. Still, M13\'s Color vs Magnitude Diagram in the panel below and right, made from the same image data, can offer a more telling view. Also known as a Hertzsprung Russell (HR) diagram it plots the apparent brightness of individual cluster stars against color index. The color index is determined for each star by subtracting its brightness (in magnitudes) measured through a red filter from its brightness measured with a blue filter (B-R). Blue stars are hot and red stars are cool so that astronomical color index ranging from bluer to redder follows the relative stellar temperature scale from left (hot) to right (cool). In M13\'s HR diagram, the stars clearly fall into distinct groups. The broad swath extending diagonally from the bottom right is the cluster\'s main sequence. A sharp turn toward the upper right hand corner follows the red giant branch while the blue giants are found grouped in the upper left. Formed at the same time, at first M13\'s stars were all located along the main sequence by mass, lower mass stars at the lower right. Over time higher mass stars have evolved off the main sequence into red, then blue giants and beyond. In fact, the position of the turn-off from the main sequence to the red giant branch indicates the cluster\'s age at about 12 billion years.',
            url: 'https://apod.nasa.gov/apod/image/1906/M13_and_HR_diag_updated6_1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1906/M13_and_HR_diag_updated6.jpg'
            },
            {
            title: 'The Four Suns of HD 98800',
            date: '2007-07-30',
            explanation: 'How would it look to have four suns in the sky? Planets of the HD 98800 system, if they exist, would experience such a view. HD 98800 is a multiple star system about 150 light years from Earth -- right in our section of the Milky Way Galaxy. For years it has been known that HD 98800 consists of two pairs of double stars, with one pair surrounded by a disk of dust. The star pairs are located about 50 AU from each other -- in comparison just outside the orbit of Pluto. Recent data from the Earth-trailing Spitzer Space Telescope in infrared light, however, indicate that the dust disk has gaps that appear consistent with being cleared by planets orbiting in the disk. If so, one planet appears to be orbiting at a distance similar to Mars of our own Solar System. Pictured above is an artist\'s drawing of how the HD 98800 system might appear to a nearby observer.',
            url: 'https://apod.nasa.gov/apod/image/0707/foursuns_spitzer.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/0707/foursuns_spitzer_big.jpg'
            },
            {
            title: 'The Galactic Center in Radio from MeerKAT',
            date: '2019-07-08',
            explanation: 'What\'s happening at the center of our galaxy? It\'s hard to tell with optical telescopes since visible light is blocked by intervening interstellar dust. In other bands of light, though, such as radio, the galactic center can be imaged and shows itself to be quite an interesting and active place. The featured picture shows the inaugural image of the MeerKAT array of 64 radio dishes just completed in South Africa. Spanning four times the angular size of the Moon (2 degrees), the image is impressively vast, deep, and detailed. Many known sources are shown in clear detail, including many with a prefix of Sgr, since the Galactic Center is in the direction of the constellation Sagittarius. In our Galaxy\'s Center lies Sgr A, found here just to the right of the image center, which houses the Milky Way\'s central supermassive black hole. Other sources in the image are not as well understood, including the Arc, just to the left of Sgr A, and numerous filamentary threads. Goals for MeerKAT include searching for radio emission from neutral hydrogen emitted in a much younger universe and brief but distant radio flashes.',
            url: 'https://apod.nasa.gov/apod/image/1808/GCenter_MeerKAT_1080.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1907/GCenter_MeerKAT_5000.jpg'
            },
            {
            title: 'The Ghost of Jupiter\'s Halo',
            date: '2019-07-11',
            explanation: 'Close-up images of NGC 3242 show the cast off shroud of a dying, sun-like star fancifully known as The Ghost of Jupiter nebula. But this deep and wide telescopic view also finds the seldom seen outer halo of the beautiful planetary nebula at the upper left, toward Milky Way stars and background galaxies in the serpentine constellation Hydra. Intense and otherwise invisible ultraviolet radiation from the nebula\'s central white dwarf star powers its illusive glow in visible light. In fact, planets of NGC 3242\'s evolved white dwarf star may have contributed to the nebula\'s symmetric features and shape. Activity beginning in the star\'s red giant phase, long before it produced a planetary nebula, is likely the cause of the fainter more extensive halo. About a light-year across NGC 3242 is some 4,500 light-years away. The tenuous clouds of glowing material at the right could well be interstellar gas, by chance close enough to the NGC 3242\'s white dwarf to be energized by its ultraviolet radiation.',
            url: 'https://apod.nasa.gov/apod/image/1907/NGC3242haloChart32_1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1907/NGC3242haloChart32.jpg'
            },
            {
            title: 'The Great Carina Nebula',
            date: '2007-10-27',
            explanation: 'A jewel of the southern sky, the Great Carina Nebula, aka NGC 3372, spans over 300 light-years, one of our galaxy\'s largest star forming regions. Like the smaller, more northerly Orion Nebula, the Carina Nebula is easily visible to the naked eye, though at a distance of 7,500 light-years it is some 5 times farther away. This stunning telescopic view reveals remarkable details of the region\'s glowing filaments of interstellar gas and dark cosmic dust clouds. The Carina Nebula is home to young, extremely massive stars, including the still enigmatic variable Eta Carinae, a star with well over 100 times the mass of the Sun. Eta Carinae is the bright star left of the central dark notch in this field and just below the dusty Keyhole Nebula (NGC 3324).',
            url: 'https://apod.nasa.gov/apod/image/0710/EtacarinaeSGS_gendler_800.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/0710/EtacarinaeSGL_gendler.jpg'
            },
            {
            title: 'The Milky Way over Monument Valley',
            date: '2017-07-26',
            explanation: 'You don\'t have to be at Monument Valley to see the Milky Way arc across the sky like this -- but it helps. Only at Monument Valley USA would you see a picturesque foreground that includes these iconic rock peaks called buttes. Buttes are composed of hard rock left behind after water has eroded away the surrounding soft rock. In the featured image taken a month ago, the closest butte on the left and the butte to its right are known as the Mittens, while Merrick Butte can be seen farther to the right. Green airglow fans up from the horizon. High overhead stretches a band of diffuse light that is the central disk of our spiral Milky Way Galaxy. The band of the Milky Way can be spotted by almost anyone on almost any clear night when far enough from a city and surrounding bright lights, but a sensitive digital camera is needed to capture these colors in a dark night sky.',
            url: 'https://apod.nasa.gov/apod/image/1707/MonumentValley_Masterson_1080.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1707/MonumentValley_Masterson_2048.jpg'
            },
            {
            title: 'The Reappearance of Mars',
            date: '2020-09-11',
            explanation: 'Mars reappears just beyond the Moon\'s dark limb in this stack of sharp video frames captured on September 6. Of course to reappear it had to disappear in the first place. It did that over an hour earlier when the sunlit southern edge of the waning gibbous Moon passed in front of the Red Planet as seen from Maceio, Brazil. The lunar occultation came as the Moon was near apogee, about 400,000 kilometers away. Mars was almost 180 times more distant. It was the fourth lunar occultation of Mars visible from planet Earth in 2020. Visible from some southern latitudes, the fifth lunar occultation of Mars in 2020 will take place on October 3 when the Moon and Mars are both nearly opposite the Sun in planet Earth\'s sky.',
            url: 'https://apod.nasa.gov/apod/image/2009/MarsReappearanceDuarte1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2009/MarsReappearanceDuarte.jpg'
            },
            {
            title: 'The Space Station Crosses a Spotless Sun',
            date: '2019-07-15',
            explanation: 'That\'s no sunspot. It\'s the International Space Station (ISS) caught passing in front of the Sun. Sunspots, individually, have a dark central umbra, a lighter surrounding penumbra, and no solar panels. By contrast, the ISS is a complex and multi-spired mechanism, one of the largest and most sophisticated machines ever created by humanity. Also, sunspots occur on the Sun, whereas the ISS orbits the Earth. Transiting the Sun is not very unusual for the ISS, which orbits the Earth about every 90 minutes, but getting one\'s timing and equipment just right for a great image is rare. Strangely, besides that fake spot, in this recent two-image composite, the Sun lacked any real sunspots. The featured picture combines two images -- one capturing the space station transiting the Sun -- and another taken consecutively capturing details of the Sun\'s surface. Sunspots have been rare on the Sun since the dawn of the current Solar Minimum, a period of low solar activity. For reasons not yet fully understood, the number of sunspots occurring during both the previous and current solar minima have been unusually low.',
            url: 'https://apod.nasa.gov/apod/image/1907/SpotlessSunIss_Colacurcio_960.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1907/SpotlessSunIss_Colacurcio_2048.jpg'
            },
            {
            title: 'The Tulip in the Swan',
            date: '2012-07-26',
            explanation: 'Framing a bright emission region this telescopic view looks out along the plane of our Milky Way Galaxy toward the nebula rich constellation Cygnus the Swan. Popularly called the Tulip Nebula the glowing cloud of interstellar gas and dust is also found in the 1959 catalog by astronomer Stewart Sharpless as Sh2-101. About 8,000 light-years distant the nebula is understandably not the only cosmic cloud to evoke the imagery of flowers. The complex and beautiful nebula is shown here in a composite image that maps emission from ionized sulfur, hydrogen, and oxygen atoms into red, green, and blue colors. Ultraviolet radiation from young, energetic O star HDE 227018 ionizes the atoms and powers the emission from the Tulip Nebula. HDE 227018 is the bright star very near the blue arc at image center.',
            url: 'https://apod.nasa.gov/apod/image/1207/TulipBYU900.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/1207/TulipBYU1800.jpg'
            },
            {
            title: 'The Wizard Nebula',
            date: '2020-09-04',
            explanation: 'Open star cluster NGC 7380 is still embedded in its natal cloud of interstellar gas and dust popularly known as the Wizard Nebula. Seen on the left, with foreground and background stars along the plane of our Milky Way galaxy it lies some 8,000 light-years distant, toward the constellation Cepheus. In apparent size on the sky, a full moon would cover the 4 million year young cluster and associated nebula, normally much too faint to be seen by eye. Made with telescope and camera firmly planted on Earth, the image reveals multi light-year sized shapes and structures of cosmic gas and dust within the Wizard though, in a color palette made popular in Hubble Space Telescope images. Recorded with narrowband filters, the visible wavelength light from the nebula\'s hydrogen, oxygen, and sulfur atoms is transformed into green, blue, and red colors in the final digital composite.',
            url: 'https://apod.nasa.gov/apod/image/2009/AndrewKlinger_wizard_sho_res25_sig1024.jpg',
            hdurl: 'https://apod.nasa.gov/apod/image/2009/AndrewKlinger_wizard_sho_res25_sig.jpg'
            }
        ];
    let objectStore = "presetImages";
        presetImages.forEach( item =>{
                let transaction = db.transaction("presetImages",'readwrite');
                    let items = transaction.objectStore("presetImages")
                    let request = items.add(item, item.title);

        });
    
    }
    callback();
};

