import React, { useState } from 'react'

import { useAuth } from './AuthProvider' // sama kayak laravel buat authnya dlu

export default function Home() {


    const [result, setResult] = useState("");

    const { callFucntion, logout } = useAuth();//with this type call can acces the fucntion on the Authrpovide result

    const handleClick = async () => {
        const id = await callFunction.idprincipal();

        setResult(id);
    }//this have the correlation with backend 

    return (

        <div>
            <center>
                <h1> Welcome Page</h1>
                <button
                    type="button"
                    onClick={handleClick}
                >

                    Show ID?
                </button>

                <h2>This is Your id Principal: {result}</h2>

                <button id="logout" onClick={logout}>
                    log out
                </button>
            </center>
        </div>











    )
}
