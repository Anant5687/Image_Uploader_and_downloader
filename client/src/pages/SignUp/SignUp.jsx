import React, { useState } from 'react'
import style from './SignUp.module.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const SignUp = () => {
    const navigate = useNavigate()
    const [userDetail, setUserDetail] = useState({
        username: "",
        email: "",
        password: "",
        repassword: ""
    })
    const changeHandeler = (e) => {
        setUserDetail({ ...userDetail, [e.target.id]: e.target.value })
    }

    const signUpHandeler = () => {
        if (userDetail.password !== userDetail.repassword) {
           alert("Password mismatched")
        } else {
            axios.post("http://localhost:8989/auth/postRegister", userDetail).then((response) => {
                console.log(response.data)
                navigate('/')
                setUserDetail({
                    username: "",
                    email: "",
                    password: "",
                    repassword: ""
                })
                alert("You can log in your account. your account is created")
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <div className={style.body}>
            <Card style={{ width: "40%" }} className={style.card}>
                <CardContent>
                    <TextField id="username" label="Username" variant="outlined" style={{ marginTop: "10%", width: "60%", marginLeft:'20%' }}
                        onChange={changeHandeler} value={userDetail.username} className={style.input} /><br />
                    <TextField id="email" label="E-mail" variant="outlined" style={{ marginTop: "3%", width: "60%", marginLeft:'20%' }}
                        onChange={changeHandeler} value={userDetail.email} className={style.input} /><br />
                    <TextField id="password" label="Password" variant="outlined" style={{ marginTop: "3%", width: "60%", marginLeft:'20%' }}
                        onChange={changeHandeler} value={userDetail.password} type="password"  className={style.input} /><br />
                    <TextField id="repassword" label="Re-password" variant="outlined" style={{ marginTop: "3%", width: "60%", marginLeft:'20%' }}
                        onChange={changeHandeler} value={userDetail.repassword}  type="password"  className={style.input} /><br />
                </CardContent>
                <CardActions>
                    <Button size="small" variant="contained" style={{ marginLeft: "120px", width: "50%" }}
                        onClick={signUpHandeler}>
                        Signup
                    </Button>
                </CardActions>
                <Typography style={{ marginTop: "4%", marginBottom: "2%", marginLeft:'20%' }}>
                    Having an account <span className={style.loginBtn} onClick={() => { navigate('/') }}>Login</span>
                </Typography>
            </Card>
        </div >
    )
}

export default SignUp