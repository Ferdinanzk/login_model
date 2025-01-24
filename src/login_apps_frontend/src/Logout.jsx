import React from 'react'
import { useAuth } from './AuthProvider'

export default function Logout() {
    const { login } = useAuth();
    return (
        <div>
            <center>
                <h1>CLick Button Below To Login</h1>
                <button type="button" onClick={login}>
                    Log In
                </button>
            </center>
        </div>
    )
}
