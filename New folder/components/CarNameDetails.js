import { useEffect, useState } from "react"
import Loading from "../layouts/Loading"
import API, { endpoints } from "../configs/API"
import { useParams } from "react-router-dom"
import { Badge } from "react-bootstrap"

const CarNameDetails = () => {
    const [carname, setCarname] = useState(null)
    const { carnameId } = useParams()

    useEffect(() => {
        let loadCarname = async () => {
            let res = await API.get(endpoints['carname-details'](carnameId))
            setCarname(res.data)
        }
        loadCarname()
    }, [])

    if (carname === null)
        return <Loading />

    return (
        <>
            <h1 className="text-center text-success">{carname.carName}</h1>
            <div>
                <img src="http://127.0.0.1:8000/static/carname/2023/04/gjq1376708262_3h7I8Lt.jpg" />
                <div className="mt-1">
                    {carname.seats.map(s => <Badge key={s.id} bg="danger">{s.number}</Badge>)}
                    {carname.tags.map(t => <Badge key={t.id} bg="primary" >{t.tags}</Badge>)}
                </div>
            </div>
            <img src="{carname.image}" />
            <p>{carname.image}</p>
            <p dangerouslySetInnerHTML={{ __html: carname.description }}></p>
        </>
    )
}

export default CarNameDetails