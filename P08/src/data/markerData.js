export const markerImage = new window.google.maps.MarkerImage("https://i.imgur.com/lI5qWCV.png");
export const addInfoWindow = new window.google.maps.InfoWindow({
          content:contentString
        });
export const map = new window.google.maps.Map(document.getElementById('map'),
      {
        styles: this.state.styles,
        center: this.state.center,
      });