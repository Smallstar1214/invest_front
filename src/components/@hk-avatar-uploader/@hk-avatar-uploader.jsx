import axios from 'axios';
import React, { useEffect, useState } from 'react'


const HkAvatarUploader = ({ id, defaultImg, firstName }) => {
    const [imageSrc, setImageSrc] = useState(defaultImg);
    const [role, setRole] = useState("");

    const onUpload = (e) => {
        e.preventDefault();
        setImageSrc(URL.createObjectURL(e.target.files[0]));
        const formdata = new FormData();
        formdata.append('file', e.target.files[0]);
        formdata.append('id', id);
        // axios.post('http://localhost:8080/download/image', formdata)
        axios.post('https://autoinvest.ai/download/image', formdata)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        setRole(localStorage.getItem("jampackRole"))
    },[]);

    return (
        <>
            <label htmlFor="photo-upload" className="avtuploder- circle">
                {
                    imageSrc === "" ? (
                        <div className='avatar avatar-xl avatar-rounded avatar-soft-primary'>
                            <span className='initial-wrap'>
                                {firstName[0]}
                            </span>
                        </div>
                    ) : (
                        <div className='avtuploder-wrapper'>
                            <img src={imageSrc} alt='demo Img' className='avtuploder-preview' width={115} height={115} />
                        </div>
                    )
                }
                {
                    role === "admin" ? (
                        <input id="photo-upload" type="file" onChange={onUpload} className="d-none" />
                    ) : (
                        <></>
                    )
                }
                
            </label>
        </>
    )
}

export default HkAvatarUploader
