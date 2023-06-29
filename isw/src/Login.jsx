import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import App from './App'

const Login = ({ onSend })=> {
    const [username, setUsername] = useState('');
    const [number, setNumber] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const handleNumberChange = (e) => {
        setNumber(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        console.log('Login submitted:', number);
        try {
            const response = await fetch("http://localhost:5001/usuarios/"+number);
            const data = await response.json();
            setUsername(data[0].username)
            if(data.length !== 0){
                setLoggedIn(true);
            }else{
                throw new Error('Número ingresado es incorrecto');
            }
        } catch (error) {
            setError(error.message);
            console.error('Login failed:', error);
        }
    };
    
    if (loggedIn) {
        return <App userid={number} username = {username}/>;
    }

    return (
        <MDBContainer className="d-flex justify-content-center align-items-center vh-100">
            <form onSubmit={handleSubmit} >
                <p className="h4 text-center mb-4">Ingrese su número telefónico</p>
                <div className="grey-text">
                    <MDBInput
                        label="Número"
                        icon="envelope"
                        group
                        type="tel"
                        value={number}
                        onChange={handleNumberChange}
                    />
                </div>
                <div className="text-center mt-3" >
                    <MDBBtn color="primary" type="submit">Ingresar</MDBBtn>
                    {error && <p>{error}</p>}
                </div>
            </form>
        </MDBContainer>
    );
};

export default Login;