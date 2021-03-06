# Leaflet - Visualizing Data with Leaflet

## Background

![1-Logo](Leaflet-Step-1/static/images/1-Logo.png)

Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

### Level 1: Basic Visualization

![2-BasicMap](Leaflet-Step-1/static/images/2-BasicMap.png)

Earthquake data set was visualized.


   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. The [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page was visited and a data set was visualize. When you click on a data setyou will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualization.

<!--    ![4-JSON](Leaflet-Step-1/static/images/4-JSON.png) -->

2. **Import & Visualize the Data**

   A map was created using Leaflet that plots all of the earthquakes from the data set based on the longitude and latitude.

   * The data markers reflect the magnitude of the earthquake by it's size and and depth of the earth quake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.

 
