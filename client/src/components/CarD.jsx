import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserData } from '../Slice/authSlice';
import { saveAs } from "file-saver";
import SkeLEton from './SkeLeton/SkeLeton';

const CarD = () => {
    const dispatch = useDispatch()
    const { _id } = useSelector(state => state.authSlice.userInfo)
    const navigate = useNavigate()
    const [apiData, setApiData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8989/product/get/${_id}`).then((response) => {
            setApiData(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [apiData, _id])

    const onUpload = () => {
        navigate('/upload')
    }

    const onLogoutHandeler = (i) => {
        dispatch(removeUserData(i))
        navigate('/')
    }

    const saveFile = (i) => {
        console.log(i)
        saveAs(i, "image.png"
        );
    };

    const RemoveAllMemories = () => {
        axios.delete(`http://localhost:8989/product/delete/${_id}`).then((response) => {
            console.log(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            {apiData.length < 1 ?
                <>
                    <SkeLEton />
                    <Button variant="contained" onClick={onUpload} style={{ marginLeft: "84%" }}>Upload new pic</Button>
                </>
                :
                <>
                    <Button variant="outlined" onClick={onLogoutHandeler} color="error" style={{ marginLeft: "2%", marginTop: "2%" }}>Logout</Button>
                    <Button variant="contained" onClick={onUpload} style={{ marginLeft: "84%" }}>Upload new pic</Button>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {Array.from(apiData).map((ele, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                <Card sx={{ maxWidth: 345 }} style={{ marginLeft: "10%", marginTop: "5%" }}>
                                    <CardMedia
                                        component="img"
                                        style={{ height: 80, width: 80 }}
                                        image={ele.img}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Unique Code:- {ele.value}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {/* <a href={ele.img} download style={{ textDecoration: "none" }}>Download Pic */}
                                        <Button size="small" color='error' onClick={() => saveFile(ele.img)} variant="contained">Download Pic</Button>
                                        {/* </a> */}
                                    </CardActions>
                                </Card>

                            </Grid>
                        ))}
                    </Grid>
                    <Button variant='contained' color="error" onClick={RemoveAllMemories} style={{ marginTop: "2%", marginLeft: "90%", marginBottom: "2%" }}>Remove all</Button>
                </>
            }
        </>
    )
}

export default CarD
