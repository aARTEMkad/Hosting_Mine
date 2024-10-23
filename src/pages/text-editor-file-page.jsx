//import { useState } from "react"
//import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"

const BACKEND_ADDRESSES = process.env.REACT_APP_BACKEND_PORT
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT

export default function TextEditorFile() {
    const { filename, path, data } = useLocation().state;
    const [ dataFile, setDataFile] = useState('');

    const navigate = useNavigate();


    useEffect(e => {
        setDataFile(data);
    }, [data])


    function onHandleChangeData(e) {
        setDataFile(e.target.value);
    }

    function onSaveButton() {
        axios.put(`http://${BACKEND_ADDRESSES}:${BACKEND_PORT}/api/server/saveFile`, 
            { 
                data: dataFile, 
                path: path,
                file: filename
            })
            .then((res) => {
                console.log('Save information');
            })
            .catch(err => {
                console.log(`error save information: ${err}`);
            })
    } 

    function onResetButton() {
        setDataFile(data);
    }

    return (
        <div className="textEditor">
            <form onSubmit={e => e.preventDefault()}>
                <textarea name="Info" value={dataFile} onChange={onHandleChangeData} cols="70" rows="50"></textarea>
                <button onClick={() => { navigate(-1) }}>Exit</button>
                <button onClick={onResetButton}>Reset</button>
                <button onClick={onSaveButton}>Save</button>
            </form>
        </div>
    )
}