import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FileItem from "../../components/file-item";


let currentPath = ''

export default function FileManagerPage() {

    const { state } = useLocation()
    const [ listFile, setListFile ] = useState([]);

    console.log(currentPath);

    useEffect(() => {
        currentPath = '';
        axios.get("http://localhost:3333/api/server/fileManager", {
            params: {
                name: state.name
            }
        })
        .then((res) => {
            console.log(res.data.data);
            currentPath += state.name
            setListFile(res.data.data);
            console.log(currentPath);
        })
        
    },[])




    function handleInfoFile(info, newPath) {
        setListFile(info);
        currentPath = newPath;
    }







    return (
        <div>
            <ul>    
                {listFile.map(file => (
                    <li>
                        <FileItem onInfoFile={handleInfoFile} filename={file} pathFile={currentPath}/>
                    </li>
                ))}
            </ul>
        </div>
    )

}


