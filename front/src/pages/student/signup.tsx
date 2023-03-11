import { Component } from 'solid-js';
import './signup.css'

const signup: Component = () => {
    return (
        <div class='container'>
            <div class="form">
                <h1 class='header'>Inscription</h1>
                <input type="text" class='matricule'  placeholder='votre matricule'/><br />
                <button class='sign'>Sign up</button>
            </div>
        </div>
    )
}

export default signup;