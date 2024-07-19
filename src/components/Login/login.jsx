import {useState} from 'react'
import {login, isAdmin} from '../../services/user'
import { useNavigate } from "react-router-dom";

import "./login.css"


export function Login(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")

    const navigate = useNavigate()

    async function loginUser(username, password)
    {
       try{
        const res = await login(username, password);
        if (res){
            const admin =  await isAdmin(res)
            admin ? localStorage.setItem("admin", true) : localStorage.setItem("admin", false)
            return navigate("/",{ state: { newLogin: true }})
        } 
       } catch (e) {
        console.error("Login failed:", e);
        setError("Mauvais username ou mot de passe")    
    }

    }


    return(
        <main className='login'>
            <div className="h1-container">
                <h1 >LOGIN</h1>
            </div>
            <div className='login-container'>

            {error && <p className="error-message">{error}</p>}

                <label>
                    Username:
                </label>
                    <input type="text"  onChange={(e) => setUsername(e.target.value)} />
            
                <label>
                    Password:
                </label>
            
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
            
                <button value="Login" onClick={() => loginUser(username, password)}>Login </button>
            </div>
        </main>
    )
}