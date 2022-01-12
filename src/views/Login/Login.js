import React, { Component } from "react";
import axios from "axios";

import './login.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          password: ""
        }

        this.handleClickLogin = this.handleClickLogin.bind(this);
    }

    handleClickLogin() {
        alert('test');
        // Validation
        const name = document.getElementById("name").value;
        const password = document.getElementById("password").value;

            axios.post('http://localhost:8888/BUSINESSSW/login.php')
            .then(response => response.data)
            .then(data => {
                if (data) {
                    alert("OK!");
                } else {
                    alert("Nicht ok!");
                }
            });
         
            
            ;


        }
    render() {
        const { name, password } = this.state;
            return(
                <div className='div-login'>
                    <h1>Anmelden</h1>
                    <div>
                        <form>
                            <input type='text' name='name' placeholder='name...'/>
                            <input type='password' name='password' placeholder='password...'/>
                            <button onSubmit={this.handleClickLogin}>Log In</button>
                        </form>
                    </div>
                </div>
            )
        }
    }