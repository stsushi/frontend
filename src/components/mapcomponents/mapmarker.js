import React, {Component} from "react";
import {Marker, Popup} from "react-leaflet";
import L from "leaflet"
import util from "util"
import "../map.css"

class MapMarker extends Component {

    state = {
        extract: ""
    }
    componentDidMount() {
        this.getExtract(this.props.title);
    }
    icontype(data, title) {
        if (Mbattle(data, title)==true){    
            const icon = L.icon({
                iconRetinaUrl: require('leaflet/dist/images/battle-marker-icon-2x.png'),
                iconUrl: require('leaflet/dist/images/battle-marker-icon.png'),
                shadowUrl: require('leaflet/dist/images/battle-marker-shadow.png')
            });
            return(L.icon)
        }
        if (Mevent(data, title)==true){    
            const icon = L.icon({
                iconRetinaUrl: require('leaflet/dist/images/event-marker-icon-2x.png'),
                iconUrl: require('leaflet/dist/images/event-marker-icon.png'),
                shadowUrl: require('leaflet/dist/images/event-marker-shadow.png')
            });
            return(L.icon)
        }
        if (Mlocation(data, title)==true){    
            const icon = L.icon({
                iconRetinaUrl: require('leaflet/dist/images/local-marker-icon-2x.png'),
                iconUrl: require('leaflet/dist/images/local-marker-icon.png'),
                shadowUrl: require('leaflet/dist/images/loca-marker-shadow.png')
            });
            return(L.icon)
        }
        if (Mperson(data, title)==true){    
            const icon = L.icon({
                iconRetinaUrl: require('leaflet/dist/images/person-marker-icon-2x.png'),
                iconUrl: require('leaflet/dist/images/person-marker-icon.png'),
                shadowUrl: require('leaflet/dist/images/person-marker-shadow.png')
            });
            return(L.icon)
        }
    
    }
    Mbattle(data, title) {
        string = title.concat(" ")
        string = string.concat(data)
        words = string.split(" ")
        const battlewords = ["skirmish","battle","fight","army","Skirmish","Battle","Fight","Army"]
        for (i in string) {
            for(j in battlewords) {
                if (string[i].localeCompare(battlewords[j])==0) {
                    return(true)
                }
            }
        }
        
    }
    // add more of the same

    getExtract = title => {
        title = title.replace(/ /g, "_");
        fetch(util.format("https://en.wikipedia.org/api/rest_v1/page/summary/%s", title))
            .then(response => response.json())
            .then(data => {
                this.setState({extract: data.extract});
                this.setState({icon: icontype(data.extract,data.title)});
            });
    }

    render () {
        return(
            <Marker position={this.props.position} icon={this.state.icon}
                    onMouseOver={e => {
                        e.target.openPopup();
                    }}
            >
                <Popup autoPan={false}>
                    <button className="btn btn-primary btn-marker" onClick = {() => window.open(this.props.url, "_blank")}> {this.props.title} </button>
                    <p>{this.state.extract}</p>
                </Popup>
            </Marker>
        );
    }
}

export default MapMarker;
