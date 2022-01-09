import React, {useState} from 'react';
import Menu from "./components/Menu/Menu";
import Reservierungen from "./views/Reservierungen";

import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
            <Menu userName={localStorage.getItem('userName')}/>
            <Switch>
                <Route path='/' component={Reservierungen}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
