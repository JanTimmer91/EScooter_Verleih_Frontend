import React, {Component} from "react";
import styled from 'styled-components';

import escooterimg_sw from './escooter_sw.jpg';
import escooterimg from './escooter.jpg';
import './ScooterReservation.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import ScooterReservationSuccess from "./ScooterReservationSuccess";

//const ContentContainer = styled.div`

//`;

class ScooterReservation extends Component {

    scooters = {};
    userid = 1;

    goBackCallbackFunction = () => {this.handleClickScooterRentalBack();};
    
    constructor(props) {
        super(props);

        this.state = {
            scooterAvailable: false,
            availableScooterId: -1,
            enddate_printable: "",
            input_days: 0,
            input_hours: 1 
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
                        availableScooterId: parseInt(scooter.SCOOTER_ID)
                    });
                }

                if (this.state.scooterAvailable) {
                    document.getElementById("scooterText").innerText = "Jetzt E-Scooter ausleihen";
                    document.getElementById("scooterImage").src = escooterimg;
                } else {
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
            document.getElementById("input_days").classList.remove("invalid");
            document.getElementById("input_hours").classList.remove("invalid");
        }
    }

    handleClickCommitScooterrental() {

        
        // Validation
        const input_days = document.getElementById("input_days");
        const input_hours = document.getElementById("input_hours");
        const days = parseInt(document.getElementById("input_days").value);
        const hours = parseInt(document.getElementById("input_hours").value);
        
        input_hours.classList.remove("invalid");
        input_days.classList.remove("invalid");

        if (days >= 0 && hours >= 0 && (days+hours)>0) {
            
            var currentDate = new Date();

            var enddate = currentDate;
            var total_hours = hours + (days * 24)
            enddate.setTime(enddate.getTime() + (total_hours*60*60*1000));
            
            var enddate_formatted = enddate.getFullYear() + "-" + enddate.getMonth() + "-" + enddate.getDate() 
                    + " " + enddate.getHours() + ":" + enddate.getMinutes() + ":" + enddate.getSeconds();
                    
            this.setState({
                enddate_printable: enddate.getDate()+"."+enddate.getMonth()+"."+enddate.getFullYear() + " um " + enddate.getHours() + ":" + enddate.getMinutes() + " Uhr"
            });


            let post_data = {
                "scooterid": this.state.availableScooterId,
                "userid": this.userid,
                "enddate": enddate_formatted
            };

            axios.post('http://localhost/BUSINESSSW/addleihe.php', post_data)
            .then(response => response.data)
            .then((data) => {
                var ok = data.ok;
                console.log(data)
                console.log(ok)
                if (ok) {

                    axios.post('http://localhost/BUSINESSSW/updatescooter.php', {
                        "status": "Besetzt",
                        "id": this.state.availableScooterId
                    })
                    .then(response => response.data)
                    .then(data => {
                        if (data.ok) {
                            input_days.value = "";
                            input_hours.value = "";
                            document.getElementById("back_page").classList.toggle('rotated');
                            document.getElementById("success_page").classList.toggle('rotated');
                        } else {
                            alert("Der E-Scooter konnte nicht ausgeliehen werden!");
                        }
                    });


                } else {
                    alert("Der E-Scooter konnte nicht ausgeliehen werden!");
                }            
            });

        } else {
            input_hours.classList.add("invalid");
            input_days.classList.add("invalid");
        }

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
                <h1>E-Scooter Leihen</h1>
                <div class="pages">
                    <div id="start_page" class="page">
                        <div class="rentScooter" onClick={this.handleClickRentScooter}>
                            <img id="scooterImage" src={escooterimg_sw} alt="E-Scooter"></img>
                            <p id="scooterText">Zur Zeit ist leider kein E-Scooter verfügbar.</p>
                        </div>
                    </div>
                    <div id="back_page" class="page rotated">
                        <div class="commitRental">
                            <p id="page_headline">E-Scooter reservieren</p>
                            <div class="content">
                                <p id="label">Tage:</p>
                                <input id="input_days" type={"number"} min="0" value={this.state.input_days} onChange={(e) => {this.setState({input_days: e.target.value})}}></input>
                                <p id="label">Stunden:</p>
                                <input id="input_hours" type={"number"} min="0" value={this.state.input_hours} onChange={(e) => {this.setState({input_hours: e.target.value})}}></input>
                            </div>
                            <div class="buttons">
                                <button id="btnReserve" onClick={this.handleClickCommitScooterrental}>Jetzt Reservieren</button>
                                <button id="btnCancel" onClick={this.handleClickRentScooter}>Abbrechen</button>
                            </div>
                        </div>

                    </div>
                    <div id="success_page" class="page rotated">
                        <ScooterReservationSuccess scooterId={this.state.availableScooterId} enddate={this.state.enddate_printable} goBackCallback={this.goBackCallbackFunction} />
                    </div>
                </div>

            </div>

        );
    }
}

ScooterReservation.propTypes = {};

export default ScooterReservation;