import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Uebersicht from "../Uebersicht";
import './login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          password: "",
          test: null,
        }

        this.handleClickLogin = this.handleClickLogin.bind(this);
    }

    handleClickLogin() {
            alert('test click');
            console.log("tesesest");
        
        // Validation
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;
        alert("name "+name); 
        alert("password "+password); 

            const loginInformation = { name: "name", password: "password" }; 
            console.log("loginInfo "+loginInformation.password);     
            alert("loginInformation "+loginInformation);   
            axios.post('http://localhost:8888/BUSINESSSW/login.php')
            .then(console.log("test Variable "));
         
            
            ;


        }
    render() {
        const { name, password } = this.state;
            return(
                <div className='div-login'>
                    <h1>Anmelden</h1>
                    <div>
                        <form onSubmit = {this.handleSubmit}>
                            <input type='email' name='email' placeholder='email...' required onChange={this.handleChange}/>
                            <input type='password' name='pwd' placeholder='password...' required onChange={this.handleChange}/>
                            <button onSubmit={this.handleSubmit}>Log In</button>
                        </form>
                    </div>
                </div>
            )
        }
    }