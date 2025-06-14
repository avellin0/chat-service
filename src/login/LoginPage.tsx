"use client"

import './LoginPage.css'
import { useState } from "react"
import { useNavigate} from 'react-router'

export function LoginPage() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    let navigate = useNavigate()

    const LoginUser = async () => {
        // console.log("email:", email, "senha:", senha);

        const query = {
            "email": email
        }

        try {
        

            const response = await fetch("https://extude.onrender.com/students", {
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

           const userId = data[0].userid
        
            navigate(`chat/${userId}`)

        } catch (error) {
            console.log(error);
            throw new Error("Problema ao buscar dados")
        }

        //email: ploglamador@hotmail.com
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
                        <input type="email" className='login-input' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" className='login-input' placeholder='Senha' onChange={(e) => setSenha(e.target.value)} />
                        <button id='login-btn' onClick={() => LoginUser()}>Entrar</button>
                    </div>
                </div>
            </div>
        </>
    )
}