import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"

// Service
import fileManagerService from "../services/fileManagerService";


export default function TextEditorFile() {
    const { filename, path, data } = useLocation().state;
    const [ dataFile, setDataFile] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        setDataFile(data);
    }, [data])


    function onHandleChangeData(e) {
        setDataFile(e.target.value);
    }

    function onSaveButton() {
        fileManagerService.updateInformationFile({ 
            data: dataFile, 
            path: path,
            file: filename
        });
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