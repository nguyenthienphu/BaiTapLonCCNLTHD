import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Loading from "../layouts/Loading"
import API, { endpoints } from "../configs/API"
import { Card, Col, Row } from "react-bootstrap"

const CarName = () => {
    const [carname, setCarname] = useState(null)
    const { tripId } = useParams()

    useEffect(() => {
        const loadCarname = async () => {
            let res = await API.get(endpoints['carname'](tripId))
            setCarname(res.data)
        }
        loadCarname()
    }, [])

    if (carname === null)
        return <Loading />
    return (
        <>
            <h1 className="text-center text-info">CHI TIẾT CHUYẾN XE SỐ {tripId}</h1>
            <Row>
                {carname.map(c => {
                    return (
                        <Col md={3} xs={12} className="p-1">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={c.image} />
                                <Card.Body>
                                    <Card.Title>{c.carName}</Card.Title>
                                    <Link to={`/carname/${c.id}`} className="btn btn-primary">Xem chi tiết</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}

export default CarName