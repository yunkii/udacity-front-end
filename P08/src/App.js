import React from 'react';
import scriptLoader from 'react-async-script-loader';
import escapeRegExp from 'escape-string-regexp';
import fetchJsonp from 'fetch-jsonp';
import mapStyle from './data/mapStyle';
import {locations, MAP_API_KEY, Paris} from './data/mapData';
import Map from './Map';
import './styles/App.css';

class App extends React.Component {

  // Constructor
  constructor(props) {
    super(props);
    // Initial states
    this.state = {
      locations: locations,
      data:[],
      map: [],
      styles: mapStyle,
      center: Paris,
      query: '',
      allMarkers:[],
      infoWindows:[],
      filteredLocations:[],
      mapReady: true,
    }
  }

  componentWillReceiveProps({isScriptLoaded, isScriptLoadSucceed}){

  // conditional to check if script is loaded successfully

    if (isScriptLoaded && isScriptLoadSucceed) {
      this.initMap();
      console.log("Map was loaded successfully");
    }
    else {
      this.setState({
        mapReady: false
      });
      console.log("Failed to load the map");
    }
  }

  initMap = () => {

  // Init Google Maps

    var map = new window.google.maps.Map(document.getElementById('map'),
      {
        styles: this.state.styles,
        center: this.state.center,
      });
    this.setState({
      map:map
    });
  }


  // Click on the list to show marker on the MAP

  showMarker = (place, event) => {

    const clickedMarker = this.state.allMarkers.filter(
      (thisMarker)=> thisMarker.name === place.name)
      window.google.maps.event.trigger(clickedMarker[0], 'click');

  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.showMarker(event)
    }
  }


  updateAllData = (updatedData) => {
    this.setState({
      data:updatedData,
    });
  }


  updateSearchQuery =(query) => {
    this.setState({
      query: query.trim()
    });
  }

  componentDidMount(){
    
    // Fetch Wiki API for description and link when loaded
    this.state.locations.map((location)=>{
      return fetchJsonp(
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=${location.name}`
        )
      .then(response => response.json())
      .then((dataJson) => {
        let description = dataJson[2][0];
        let link = dataJson[3][0];
        let updatedData = [...this.state.data,[dataJson, description, link ]]
        this.updateAllData(updatedData)
      })
      .catch(error => console.error(error)      
      )
    })
  }


  componentDidUpdate(){
    let {map, locations, data} = this.state;
    this.state.filteredLocations = locations
    this.state.allMarkers.forEach(mark => { mark.setMap() });
    this.state.allMarkers = [];
    this.state.infoWindows = [];

    this.state.filteredLocations.map((marker,index)=> {
        let markerImage = new window.google.maps.MarkerImage("https://i.imgur.com/lI5qWCV.png");
        let addMarker = new window.google.maps.Marker({
          map: map,
          position: marker.location,
          name : marker.name,
          animation: window.google.maps.Animation.DROP,
          icon: markerImage,
        });

        let getWikiDescription = 
          data.filter((info)=>marker.name === info[0][0]).map(i=>
          {if (i[1]) 
            return i[1]
            else return 'No content found'
          })

        let getWikiLink = 
          data.filter((info)=>marker.name === info[0][0]).map(i=>
          {if (i[1]) 
            return i[2]
            else return 'https://www.wikipedia.org/'
          })

        let contentString = 
        `<div class="info-window">
                <h4>${marker.name}</h4>
            <p class="founded-year">Founded <strong>${marker.founded}</strong></p>
            <p>${getWikiDescription}</p>
            <a href=${getWikiLink} target="_blank">Read Wiki</a>
         </div>`

        let addInfoWindow = new window.google.maps.InfoWindow({
          content:contentString
        });

        //Add the marker to the list of marker
        this.state.allMarkers.push(addMarker);
        this.state.infoWindows.push(addInfoWindow);

        const infoWindows = this.state.infoWindows;

        addMarker.addListener('click', function() {
            infoWindows.map(
              info => { 
                info.close() 
            });

        addInfoWindow.open(map, addMarker);
          if (addMarker.getAnimation() !== null) {
            addMarker.setAnimation(null);
          } else {
        addMarker.setAnimation(window.google.maps.Animation.BOUNCE);

        setTimeout(() => {
            addMarker.setAnimation(null);
          }, 1000)
        }
    })

      // Marker Bounds
      const bounds = new window.google.maps.LatLngBounds();
 
      this.state.allMarkers.forEach((marker)=>
        bounds.extend(marker.position))
        map.fitBounds(bounds)
    })
  }


 render() {
  let {locations, query} = this.state;
    if (query){
      const match = new RegExp(escapeRegExp(query),'i')
      this.state.filteredLocations = locations.filter((location)=> match.test(location.name))
    }
    else{
      this.state.filteredLocations = locations;
    }
    return (

      (
        <div>
            <Map />
            <div className='location-list'>
              <h1>Paris Attractions</h1>
              <input role="Search" 
                     aria-labelledby="filter"
                     className='search-input'
                     type='text'
                     placeholder='Enter an attraction'
                     value={this.state.query}
                     onChange={(e)=> this.updateSearchQuery(e.target.value)}/>

              <ol aria-labelledby="location list">
                {this.state.filteredLocations.map((location,id)=>
                  <li key={id} 
                      onClick={this.showMarker.bind(this,location)}>
                      {location.name}
                  </li>
                  )
                }
              </ol>
            </div>
        </div>
      )
    )
    
    }
  }


  export default scriptLoader(
    [
    `https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}`
    ]
  )(App);