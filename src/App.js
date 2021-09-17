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
    zoom: 15,
  };

  createMapOptions(){
    return{
      minZoom: 15,
      maxZoom:17,
      restriction:{
        latLngBounds:{
          north: 39.135855,
          south: 39.116743,
          east: -76.995111,
          west: -77.036545
        }
      }
    }
  }
  getDataFromLambda() {
    let wsUri = "wss://2g54sjwc90.execute-api.us-east-1.amazonaws.com/dev/";
    var output;

    function init() {
        output = document.getElementById("output");
        testWebSocket();
    }

    function testWebSocket() {
        let websocket = new WebSocket(wsUri);

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
        writeToScreen('<span style = "color: blue;">RESPONSE: ' +
          lat+'</span>');
    }

    function onError(evt) {
        writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }

    function doSend(message) {
        writeToScreen("SENT: " + message); testWebSocket.websocket.send(message);
    }

    function writeToScreen(message) {
        var pre = document.createElement("p");
        pre.style.wordWrap = "break-word";
        pre.innerHTML = message; output.appendChild(pre);
    }

    window.addEventListener("load", init, false);
  }
	  
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
          options={this.createMapOptions}
        >
          <img
            src= {pic}
            className="photo2"
            alt={"test"}
            lat={36}
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