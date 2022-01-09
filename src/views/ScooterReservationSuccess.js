import React, {Component} from "react";
import styled from 'styled-components';

import escooterimg_sw from './escooter_sw.jpg';
import './ScooterReservation.css';

import 'bootstrap/dist/css/bootstrap.min.css';

//const ContentContainer = styled.div`

//`;

class ScooterReservationSuccess extends Component {

 
    constructor(props) {
        super(props);

        this.state = {};

    }



    componentDidMount() {
        document.body.style.backgroundColor = "rgba(203,203,210,.15)"
    }

    render() {
        return (
          
            <div class="successRental">
                <img id="scooterImageSuccess" src={escooterimg_sw} alt="E-Scooter"></img>
                <div class="text">
                    <p class="heading">Reservierung erfolgreich.</p>
                    <p>Der <span class="highlighted">E-Scooter Nr. {this.props.scooterId}</span> steht nun bis zum  <span class="highlighted">{this.props.enddate}</span> für Sie bereit</p>
                    <button id="btnBack" onClick={this.props.goBackCallback}>Zurück</button>
                </div>
            </div>
        
        );
    }
}

ScooterReservationSuccess.propTypes = {};

export default ScooterReservationSuccess;