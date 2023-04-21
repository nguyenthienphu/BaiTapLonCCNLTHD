import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import API, { endpoints } from "../configs/API"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = (evt) => {
        evt.preventDefault()
        
        const process = async () => {
            let res = await API.post(endpoints["login"],{
                'username' : username,
                'password' : password,
                'client_id':'eeeYxpy8XQrt8vZNMwOIMeWadA5HTzF8DRNLzv0g',
                'client_secret':'Lwmn4pbS0e2KYeAIuXjAkqewgosMkMQ7dTyD5IzdsdHwBXz8fdZbU9SAE2QJZFD3GefUNJoD9COjJMlAoXRUbA4gkqkW8Rzt2bGTdplnopj7N62bKme6iabnBs6WyRrX',
                'grant_type':'password'

            })
            console.info(res.data)
        }
        process()
    }
    return (
        <>
            <h1 className="text-center text-success">ĐĂNG NHẬP NGƯỜI DÙNG</h1>
            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                 placeholder="Tên đăng nhập..." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="password" 
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Mật khẩu..." />
                </Form.Group>
    
                <Button variant="primary" type="submit">
                    Đăng nhập
                </Button>
            </Form>
        </>

    )
}

export default Login 