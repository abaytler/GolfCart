import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import pic from './pic.png';

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
      <div style={{ height: '75vh', width: '85%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDAOaA61-Ik4j5wJibuRK_PEzREvyEpZ4w"}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <img
            src= {pic}
            className="photo2"
            alt={"test"}
            lat={39.126499}
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
            lat={39.126493}
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
            lat={39.213808}
            lng={-76.798169}
          />          
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;