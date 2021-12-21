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
        this.handleClickCommitScooterrental = this.handleClickCommitScooterrental.bind(this);
        this.handleClickScooterRentalBack = this.handleClickScooterRentalBack.bind(this);
        
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

        if (this.state.scooterAvailable) {
            document.getElementById("start_page").classList.toggle('rotated');
            document.getElementById("back_page").classList.toggle('rotated');
        }
//
       // let data = {
       //     "scooterid": this.state.availableScooterId,
       //     "userid": 1,
       //     "enddate": ""
       // };
//
       // axios.post('http://localhost/BUSINESSSW/addleihe.php', data)
       // .then(response => response.data)
       // .then(data => console.log(data));
    }

    handleClickCommitScooterrental() {
        document.getElementById("back_page").classList.toggle('rotated');
        document.getElementById("success_page").classList.toggle('rotated');
    }

    handleClickScooterRentalBack() {
        this.setState({
            scooterAvailable: false,
            availableScooterId: -1
        })
        document.getElementById("success_page").classList.toggle('rotated');
        document.getElementById("start_page").classList.toggle('rotated');
        this.scooterAvailable();
    }

    componentDidMount() {
        document.body.style.backgroundColor = "rgba(203,203,210,.15)"

        this.scooterAvailable();
    }

    render() {
        return (
            <div class="container">
                <h1>Scooter Leihen</h1>
                <div class="pages">
                    <div id="start_page" class="page">
                        <div class="rentScooter" onClick={this.handleClickRentScooter}>
                            <img id="scooterImage" src={escooterimg_sw} alt="E-Scooter"></img>
                            <p id="scooterText"></p>
                        </div>
                    </div>
                    <div id="back_page" class="page rotated">
                        <div class="commitRental">
                            <p id="page_headline">E-Scooter reservieren</p>
                            <p id="label_enddate">Enddatum:</p>
                            <input type={"datetime-local"}></input>
                            <div class="buttons">
                                <button id="btnReserve" onClick={this.handleClickCommitScooterrental}>Jetzt Reservieren</button>
                                <button id="btnCancel" onClick={this.handleClickRentScooter}>Abbrechen</button>
                            </div>
                        </div>

                    </div>
                    <div id="success_page" class="page rotated">
                        <div class="successRental">
                            <img id="scooterImageSuccess" src={escooterimg_sw} alt="E-Scooter"></img>
                            <div class="text">
                                <p class="heading">Reservierung erfolgreich.</p>
                                <p>Der <b>E-Scooter Nr. {this.state.availableScooterId}</b> steht nun für Sie bereit</p>
                                <button id="btnBack" onClick={this.handleClickScooterRentalBack}>Zurück</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

ScooterReservation.propTypes = {};

export default ScooterReservation;