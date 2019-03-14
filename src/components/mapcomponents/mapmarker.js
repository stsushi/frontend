import React, {Component} from "react";
import {Marker, Popup} from "react-leaflet";
import L from "leaflet"
import util from "util"
import "../map.css"
import battle from "./battlemarker.png"
import location from "./locationmarker.png"
import event from "./eventmarker.png"
// remember to put these in another folder

class MapMarker extends Component {

    state = {
        extract: ""
    }
    componentDidMount() {
        this.getExtract(this.props.title);
    }
    icontype(data, title) {
        var type = Mtype(data, title);
        if (type.localeCompare("battle")){    
            const icon = L.icon({
                iconRetinaUrl: require(battle),
                iconUrl: require(battle)
            });
            return(L.icon)
        }
        if (type.localeCompare("event")){    
            const icon = L.icon({
                iconRetinaUrl: require(event),
                iconUrl: require(event)
            });
            return(L.icon)
        }
        if (type.localeCompare("location")){    
            const icon = L.icon({
                iconRetinaUrl: require(location),
                iconUrl: require(location)
            });
            return(L.icon)
        }
        if (type.localeCompare("person")){    
            const icon = L.icon({
                iconRetinaUrl: require(event),
                iconUrl: require(event)
            });
            return(L.icon)
        }
	    if (type.localeCompare("default")){
		    const icon=L.icon({
			    iconRetinaUrl: require('lealet/dist/images/marker-icon-2x.png'),
			    iconUrl: require('leaflet/dist/images/marker-icon.png')
		    });
        }
    }
    Mtype(data, title) {
        string = title.concat(" ")
        string = string.concat(data)
        words = string.split(" ")
        const battlewords = ["skirmish","battle","fight","army"]
        const eventwords = ["3rd","1st","held","during"]
        const locationwords = ["region", "state", "city", "located"]
        const personwords = ["born","he","she", "member"]
        for (i in string) {
            for(j in battlewords) {
                if (string[i].localeCompare(battlewords[j])==0) {
                    return "battle";
                } else if (string[i].localeCompare(eventwords[j])==0) {
                    return "event";
                }
                else if (string[i].localeCompare(locationwords[j])==0) {
                    return "location";
                }
                else if (string[i].localeCompare(personwords[j])==0) {
                    return "person";
                }
		    }
	        if (i == (string.length -1)) {
			    return "default";
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
