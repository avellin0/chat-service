"use client"

import './LoginPage.css'
import { useState } from "react"
import { useNavigate } from 'react-router'

export function LoginPage() {

    const [email, setEmail] = useState('')

    let navigate = useNavigate()

    const LoginUser = async () => {

        const query = {
            "email": email
        }
        try {
            const response = await fetch("https://chat-service-tjzg.onrender.com/verify", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(query)
            })

            const data = await response.json()


            if (Array.isArray(data) && data.length === 0) {
                console.error("Email errado")
                window.alert("Usuario não encontrado :( Tente novamente")
            }

            console.log("this is the data of user:", data.id);

            const userId = data.username

            navigate(`chat/${userId}`)

        } catch (error) {
            console.log(error);
            throw new Error("Problema ao buscar dados")
        }

    }


    return (
        <>
            <div id="Login-Scope">
                <div id="login-form-scope">
                    <div id='login-title-scope'>
                        <h1 id='login-title'>
                            <span>Welcome</span>  <br /> back  to the <br /> <span>exTude</span>
                        </h1>

                    </div>

                    <div id="login-input-scope">
                        <button onClick={() => navigate('/chat/demo')}>Recrutadores</button>
                        <input type="email" className='login-input' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" className='login-input' placeholder='Senha' onChange={(e) => console.log(e.target.value)} />
                        <div id='login-btn-scope'>
                            <button id='login-btn' onClick={() => LoginUser()}>Entrar</button>
                            <p onClick={() => navigate('Sign')}>Cadastre-se</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}