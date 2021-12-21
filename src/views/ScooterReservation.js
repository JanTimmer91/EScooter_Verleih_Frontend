import React, {Component} from "react";
import styled from 'styled-components';

import escooterimg_sw from './escooter_sw.jpg';
import escooterimg from './escooter.jpg';
import './ScooterReservation.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

//const ContentContainer = styled.div`

//`;

class ScooterReservation extends Component {

    scooters = {};

    constructor(props) {
        super(props);

        this.state = {
            scooterAvailable: false,
            availableScooterId: -1
        };

        this.handleClickRentScooter = this.handleClickRentScooter.bind(this);

        // this.getScooters();

        
    }


    scooterAvailable() {
        axios.get('http://localhost/BUSINESSSW/scooteroverview.php')
        .then(response => {
            this.scooters = response.data;
            this.scooters.forEach((scooter) => {
                if (scooter.RESERVATION_STATUS == "Frei") {
                    this.setState({
                        scooterAvailable: true,
                        availableScooterId: scooter.SCOOTER_ID
                    });
                }

                if (this.state.scooterAvailable) {
                    console.log("verfügbar");
                    document.getElementById("scooterText").innerText = "Jetzt E-Scooter ausleihen";
                    document.getElementById("scooterImage").src = escooterimg;
                } else {
                    console.log("nicht verfügbar");
                    document.getElementById("scooterText").innerText = "Zur Zeit ist leider kein E-Scooter verfügbar.";
                    document.getElementById("scooterImage").src = escooterimg_sw;
                }
            });
        });
        
    }


    handleClickRentScooter() {
        let data = {
            "scooterid": this.state.availableScooterId,
            "userid": 1,
            "enddate": ""
        };

        axios.post('http://localhost/BUSINESSSW/addleihe.php', data)
        .then(response => response.data)
        .then(data => console.log(data));
    }

    componentDidMount() {
        document.body.style.backgroundColor = "rgba(203,203,210,.15)"

        this.scooterAvailable();
    }

    render() {
        return (
            <div class="container">
                <div id="start_page">
                    <h1>Scooter Leihen</h1>
                    <div class="rentScooter" onClick={this.handleClickRentScooter}>
                        <img id="scooterImage" src={escooterimg_sw} alt="E-Scooter"></img>
                        <p id="scooterText"></p>
                    </div>
                </div>
                <div id="back_page">
                    <p>E-Scooter reservieren</p>
                    <p>Enddatum:</p>
                    <input type={"datetime-local"}></input>
                    <div>
                        <button>Jetzt Reservieren</button>

                    </div>

                </div>
            </div>

        );
    }
}

ScooterReservation.propTypes = {};

export default ScooterReservation;