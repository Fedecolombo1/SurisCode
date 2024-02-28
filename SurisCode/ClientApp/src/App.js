import React from 'react';
import Test from './components/Test';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/app.css'

const App = () => {

    const [intentos, setIntentos] = useState(1)
    const [intentosRestantes, setIntentosRestantes] = useState(9)
    const [numeroIngresado, setNumeroIngresado] = useState(0)
    const [numero, setNumero] = useState(0)
    const [mensaje, setMensaje] = useState("")

    const fetchData = async () => {
        const response = await fetch("/numero/getNumber");
        if (response.ok) {
            const data = await response.json();
            setNumero(data);
            console.log(data)
        } else {
            console.log("error");
        }
    }

    useEffect(() => {
        fetchData()
    },[])

    const intentar = async () => {
        if (intentosRestantes == 0) {
            setMensaje("Perdiste")
        } else {
            const response = await fetch("/numero/postNumber", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(numeroIngresado),
            });

            if (response.ok) {
                const resultado = await response.json();
                if (resultado === 0) {
                    setMensaje(`¡Felicidades! Has adivinado el número correcto en ${intentos} intentos.`);
                } else if (resultado === -1) {
                    setIntentos(intentos + 1);
                    setIntentosRestantes(intentosRestantes - 1);
                    setMensaje(`El número que estoy pensando es menor. Te quedan ${intentosRestantes} intentos.`);
                } else {
                    setIntentos(intentos + 1);
                    setIntentosRestantes(intentosRestantes - 1);
                    setMensaje(`El número que estoy pensando es mayor. Te quedan ${intentosRestantes} intentos.`);
                }
            } else {
                console.log("Error");
            }
        }
    }


    return (
        <div className="container-fluid">
            <div className="row align">
                <p className="col-8">Bienvenido al juego de las adivinanzas.
                Estoy pensando en un número entero entre 1 y 100.
                Tienes 10 intentos para adivinarlo.                </p>

                <p className="col-8">
                    Intento {intentos} - Ingresa un número:
                </p>
                <input className="col-5" onChange={(e) => setNumeroIngresado(e.target.value)}></input>
                <div className="col-12 align">
                    <button className="col-4" onClick={() => intentar()}>Intentar</button>
                </div>
                <p className="align">{mensaje}</p>
            </div>
        </div>
    )
}

export default App;
