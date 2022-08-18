import React from 'react';
import Axios from 'axios';
import { Divider } from '@chakra-ui/react';

const HotNews = () => {
    const [data, setData] = React.useState([]);

    const getData = () => {
        Axios.get("https://newsapi.org/v2/top-headlines?country=id&apiKey=706b3af81f5548d1b6a54a26af1377a9").
            then((res) => {
                setData(res.data.articles)
            }).catch((err) => {
                console.log(err)
            })
    }

    const printHotNews = () => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        console.log(data)
        return data.map((val, idx) => {
            if (idx == 0) {
                return <div className='col-8'>
                    <div className='position-absolute w-100'>
                        <img src={val.urlToImage} className='bg-transparant' alt="" width={850} height={500}></img>
                    </div>
                    <div className='d-sm-table position-relative btn-danger w-25 text-center fs-3'>Featured Story</div>
                    <div className='position-relative w-100 ms-1' style={{ marginTop: 300 }}>
                        <div className='col-12'>
                            <span className='fs-3 fw-bold text-white'>{val.title}</span>
                            <br />
                            <span className='fw-bold text-white'>{monthNames[val.publishedAt.split('-')[1]]} {val.publishedAt.split('-')[2].split(('T')[0])},{val.publishedAt.split('-')[0]}</span>
                            <span className='fw-bold text-white'> - {val.description} </span>
                        </div>
                    </div>
                </div>
            }
        })
    }

    const printNews = () => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return data.map((val, idx) => {
            if (idx > 0 && idx < 5) {
                return <div className='mb-3'>
                    <div className='position-relative d-flex'>
                        <img src={val.urlToImage} className='img-fluid border' alt="" width={130}></img>
                        <div className='ms-2'>
                            <span className='text-muted'>{monthNames[val.publishedAt.split('-')[1]]} {val.publishedAt.split('-')[2].split(('T')[0])},{val.publishedAt.split('-')[0]}</span>
                            <br />
                            <span className='fw-bold'>{val.title}</span>
                        </div>
                    </div>
                    <Divider />
                </div>
            }
        })
    }

    React.useEffect(() => {
        getData()
    }, [])

    return <div className='container mt-5'>
        <div className='row d-flex'>
            {printHotNews()}
            <div className='col-4'>
                {printNews()}
            </div>
        </div>
    </div>
}

export default HotNews