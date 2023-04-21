import { useEffect, useState } from "react"
import API, { endpoints } from "../configs/API"
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
    const [car, setCar] = useState([])
    const [q, setQ] = useState()
    const nav = useNavigate(    )
    
    useEffect(() => {
        const loadCar = async () => {
            let res = await API.get(endpoints['car'])
            setCar(res.data)
        }
        loadCar()
    }, [])
    const search = (evt) => {
        evt.preventDefault()
        nav(`/?q=${q}`)
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="nav-link" href="http://localhost:3000/">Trang chủ</Link>
                            {car.map(c => {
                                return <Link className="nav-link" to={`/?carId=${c.id}`}>{c.car}</Link>
                            })}
                            <Link to="/login" className="nav-link text-success" href="http://localhost:3000/">Đăng nhập</Link>
                        </Nav>
                        <Form onSubmit={search} className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Tìm kiếm..."
                                className="me-2"
                                aria-label="Search"
                                value={q}
                                onChange={(evt) => setQ(evt.target.value)}
                            />
                            <Button type="submit" variant="outline-success">Tìm</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header