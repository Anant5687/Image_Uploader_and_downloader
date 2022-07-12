import { Button } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { removeUserData } from '../Slice/authSlice';
import { useDispatch} from 'react-redux';

const UploadFile = () => {
    const dispatch = useDispatch()
    const {_id} = useSelector(state => state.authSlice.userInfo)
    console.log(_id)
    const navigate = useNavigate()
    const [file, setFile] = useState("")
    const [iamgePreview, setImagePreview] = useState(null)

    const FileSubmitHandeler = (e) => {
        setFile(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const onClickHandeler = () => {
        const formData = new FormData()
        formData.append('file', file)

        const configAxios = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post(`http://localhost:8989/product/${_id}/post`, formData, configAxios).then((response) => {
            navigate('/home')
            setFile('')
            setImagePreview('')
        }).catch((err) => {
            console.log(err)
        })
    }

    const onWatch = () => {
        navigate('/home')
    }

    const onLogoutHandeler = (i) => {
        dispatch(removeUserData(i))
        navigate('/')
    }
    return (
        <>
            <h1 align='center'> Upload your good memories here</h1>
            <Button variant="outlined" onClick={onLogoutHandeler} color="error" style={{ marginLeft: "2%", marginTop: "2%" }}>Logout</Button>
          
            <Button variant='contained' onClick={onWatch} style={{ marginLeft: '80%' }}>See your uploaded files</Button>
            <div className='signup-profile-pic_container' style={{ marginTop: '3%', marginLeft: '10%' }}>
                <label htmlFor="image-upload" className='image-upload-label'>
                    <img style={{ height: "20%", width: "20%" }} src={iamgePreview || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaXwQvoIAFB4vAjEEqtGJXGMHga5Ax7AbpfA&usqp=CAU"} className="signup-profile-pic"  alt="img"/>
                    Choose your image
                </label>
                <input type="file" id='image-upload' name='file' hidden onChange={FileSubmitHandeler} />
            </div><br />
            <Button variant='contained' color='success' onClick={onClickHandeler} style={{ marginTop: '3%', marginLeft: '50%' }}>Upload</Button>
        </>
    )
}

export default UploadFile
