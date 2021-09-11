import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import pic from './pic.png';
import ButtonAppBar from './toolbar.js';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 39.126499,
      lng: -77.000748
    },
    zoom: 15
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      
      <div style={{ height: '75vh', width: '85%', margin:"auto" }}>
        <h1 style={{textAlign:'center',color:'black'}}>Golf Cart Dinos</h1>
        <ButtonAppBar></ButtonAppBar>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDAOaA61-Ik4j5wJibuRK_PEzREvyEpZ4w"}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <img
            src= {pic}
            className="photo2"
            alt={"test"}
            lat={39.121499}
            lng={-77.000748}
          />
          <img
            src= {pic}
            className="photo2"
            alt={"test"}
            lat={39.123493}
            lng={-77.000748}
          />
          <img
            src= {pic}
            className="photo2"
            alt={"test"}
            lat={39.126993}
            lng={-77.010748}
          />
          <img
            src= {pic}
            className="photo2"
            alt={"test"}
            lat={39.122493}
            lng={-77.010748}
          />
          <img
            src= {pic}
            className="photo2"
            alt={"test"}
            lat={39.126499}
            lng={-77.006748}
          />
          <AnyReactComponent
            text="Hampshire Greens Club House"
            lat={39.126499}
            lng={-77.000748}  
          />       
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;