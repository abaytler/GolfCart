import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import pic from './pic.png';
import ButtonAppBar from './toolbar.js';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const client = new W3CWebSocket('wss://2g54sjwc90.execute-api.us-east-1.amazonaws.com/dev/')
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 39.126499,
      lng: -77.000748
    },
    zoom: 13,
  };

  createMapOptions(){
    return{
      minZoom: 15,
      maxZoom:17,
      restriction:{
        latLngBounds:{
          north: 39.135855,
          south: 39.116743,
          east: -76.985111,
          west: -77.026545
        }
      }
    }
  }
  getDataFromLambda() {
    let wsUri = "wss://2g54sjwc90.execute-api.us-east-1.amazonaws.com/dev/";
    init();
    function init() {
        testWebSocket();
    }

    function testWebSocket() {
        const websocket = new WebSocket(wsUri);

        websocket.onopen = function(evt) {
          onOpen(evt)
        };

        websocket.onmessage = function(evt) {
          onMessage(evt)
        };

        websocket.onerror = function(evt) {
          onError(evt)
        };
    }

    function onOpen(evt) {
        writeToScreen("CONNECTED");
        doSend('{"message": "hey this is a websocket message", "action": "message"}');
    }

    function onMessage(evt) {
      let data = evt.data;
      let seperatedData = data.split(" ");
      let lat = seperatedData[0];
      let long = seperatedData[1];
      let received_at = seperatedData[2];
      console.log(lat);
        //writeToScreen('<span style = "color: blue;">RESPONSE: ' +lat+'</span>');
    }

    function onError(evt) {
        //writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }

    function doSend(message) {
        //writeToScreen("SENT: " + message); client.send(message);
        
    }

    function writeToScreen(message) {
        //var pre = document.createElement("p");
        //pre.style.wordWrap = "break-word";
        //pre.innerHTML = message; output.appendChild(pre);
    }

    window.addEventListener("load", init, false);
  }
	  
  render() {
    this.getDataFromLambda();
    return (
      // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%', margin:"auto" }}>
        <ButtonAppBar></ButtonAppBar>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDAOaA61-Ik4j5wJibuRK_PEzREvyEpZ4w"}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={this.createMapOptions}
        >
          <img
            src= {pic}
            className="photo2"
            alt={"test"}
            // lat={39.123793}
            latdevice={this.lat}
            // lng={-77.000748}
            lngdevice={this.long}
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