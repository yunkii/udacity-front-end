import React, { Component } from 'react';

 class FilteredLocation extends React.Component {



   render() {
    return (
              <ol aria-labelledby="location list" tabIndex="1">
                {filteredLocations.map((location, index)=>
                  <li key={index} 
                  onKeyPress={this.handleKeyPress.bind(this,location)} 
                  onClick={this.showMarker.bind(this,location)
                  }>{location.name}</li>)}
              </ol>
    )
   }
 }

 export default FilteredLocation;