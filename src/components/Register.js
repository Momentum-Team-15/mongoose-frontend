import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { requestNewUser, requestLogin } from "./BackdoorHelp"

export const Register = ({ setLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        requestNewUser(username, password)
            .then((res) => res.data.id && (
                requestLogin(username, password)
                    .then((res) => {
                        const token = res.data.auth_token
                        setLogin(token, username)
                        navigate("/all")
                    })
            ))
    }

    return (
        <div>
            <header className='hero is-small is-info'>
                <h1 className='hero-body title is-1 has-text-centered'>Social Sushi</h1>
            </header>

            <form className="login-box box" onSubmit={handleSubmit}>
                <div className="field">
                    <input className="input" type="text" placeholder="username" minlength="3" required
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="field">
                    <input className="input" type="password" placeholder="password" minlength="8" required

                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="field is-flex is-justify-content-space-between">

                    <button className='button has-background-danger-light' type="submit"
                        >Register</button>
                </div>
            </form>
        </div>
    )
}