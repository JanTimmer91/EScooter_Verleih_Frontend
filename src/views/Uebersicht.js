import React, {Component} from "react";
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.min.css';


const ContentContainer = styled.div`

`;

class Uebersicht extends Component {

    constructor(props) {
        super(props);

        this.state = {};

    }

    componentDidMount() {
        document.body.style.backgroundColor = "rgba(203,203,210,.15)"
    }

    render() {
        return (
            <div>Test</div>

        );
    }
}

Uebersicht.propTypes = {};

export default Uebersicht;