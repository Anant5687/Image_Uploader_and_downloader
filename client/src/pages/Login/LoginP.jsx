import React, { useState } from 'react';
import style from './Login.module.css'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { storingUserData } from '../../Slice/authSlice';

const LoginP = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.authSlice.userInfo)
    console.log(selector)
    const navigate = useNavigate()
    const [value, setValue] = useState({
        email: "",
        password: ""
    })

    const changeHandeler = (e) => {
        setValue({ ...value, [e.target.id]: e.target.value })
    }
    const Clickandelr = () => {
        axios.post("http://localhost:8989/auth/postLogin", value).then((response) => {
            dispatch(storingUserData(response.data))
            setValue({
                email: "",
                password: ""
            })
            navigate('/home')
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <>
            <div className={style.body}>
                <TextField id="email" label="E-mail" variant="outlined" style={{ marginTop: "10%", marginLeft: "26%" }}
                    onChange={changeHandeler} value={value.email} className={style.input} /><br />
                <TextField id="password" label="Password" variant="outlined" type="password" style={{ marginTop: "3%", marginLeft: "26%" }}
                    onChange={changeHandeler} value={value.password} className={style.input} autoComplete="current-password" /><br />
                <Button className={style.input} variant="contained" onClick={Clickandelr}
                    style={{ marginTop: "3%", marginLeft: "26%" }}>Login</Button>

                <Typography style={{ marginTop: "4%", marginLeft: '30%', opacity: 0.6, marginBottom: "2%", backgroundColor: 'blue', color: 'white', width: "40%" }} onClick={() => { navigate('/signup') }}>
                    <span style={{ marginLeft: "26%" }}>Don't </span>have an account <span className={style.loginBtn}>Signup</span>
                </Typography>

            </div>
        </>
    );
}

export default LoginP;