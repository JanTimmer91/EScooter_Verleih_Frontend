import React, {useState} from 'react';
import Menu from "./components/Menu/Menu";
import Reservierungen_All_Users from "./views/Reservierungen_All_Users";
import Reservierungen_Single_User from "./views/Reservierungen_Single_User";

import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
            <Menu userName={localStorage.getItem('userName')}/>
            <Switch>
                <Route path='/' exact component={Reservierungen_All_Users}/>
                <Route path='/reservierungshistorie' component={Reservierungen_Single_User}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
