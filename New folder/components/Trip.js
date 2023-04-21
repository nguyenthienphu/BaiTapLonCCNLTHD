import { useEffect, useState } from "react"
import API, { endpoints } from "../configs/API"
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap"
import { Link, useSearchParams } from "react-router-dom"
import Loading from "../layouts/Loading"

const Trip = () => {
    const [trip, setTrip] = useState(null)
    const [page, setPage] = useState(1)
    const [q] = useSearchParams()

    useEffect(() => {
        const loadTrip = async () => {
            try {
                let e = `${endpoints['trip']}?page=${page}`
                let kw = q.get('q')
                if (kw !== null)
                    e += `&trip=${kw}`
                let carId = q.get('carId')
                if (carId !== null)
                    e += `&car_id=${carId}`
                let res = await API.get(e)
                setTrip(res.data.results)
            } catch (ex) {
                setPage(1)
            }
        }
        setTrip(null)
        loadTrip()
    }, [page, q])

    const nextPage = () => setPage(current => current + 1)
    const prevPage = () => setPage(current => current - 1)
    if (trip === null)
        return <Loading />

    if (trip.length === 0)
        return <div className="alert alert-info">KHÔNG CÓ CHUYẾN XE NÀO!!</div>

    return (
        <>
            <ButtonGroup aria-label="Basic example">
                <Button onClick={prevPage} variant="secondary">&#9194;</Button>
                <Button onClick={nextPage} variant="secondary">&#9193;</Button>
            </ButtonGroup>
            <Row>
                {trip.map(c => {
                    return (
                        <Col md={3} xs={12} className="p-1">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={c.image} />
                                <Card.Body>
                                    <Card.Title>{c.trip}</Card.Title>
                                    <Link to={`/trip/${c.id}/carname`} className="btn btn-primary">Xem chi tiết</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}
export default Trip 