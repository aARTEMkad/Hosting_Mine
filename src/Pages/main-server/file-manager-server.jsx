import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FileItem from "../../components/file-item";


let currentPath = ''

export default function FileManagerPage() {

    const { state } = useLocation()
    const [ listFile, setListFile ] = useState([]);
    const [ file, setFile ] = useState();


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
            //currentPath += state.name
            setListFile(res.data.data);
            console.log(currentPath);
        })
        
    },[])


// -- prv
function relSite() {
    console.log('rel');
    axios.get("http://localhost:3333/api/server/fileManager", {
        params: {
            name: state.name + "/" + currentPath
        }
    })
    .then((res) => {
        console.log(res.data.data);
        setListFile(res.data.data); // ---------
    })
}

//

    function handleInfoFile(info, newPath) {
        setListFile(info);
        currentPath = newPath;
    }




    function onSumbitFile() {
        console.log(currentPath);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('dir', state.name + currentPath);
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };
        axios.post('http://localhost:3333/api/server/file/upload', formData, config)
        .then(res => {
            console.log("File upload")
            relSite();
        })
        .catch(err => {
            console.log(`Error upload file: ${err}`);
        })
    }


    function onChangeFile(event) {
        setFile(event.target.files[0])
    }


    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); onSumbitFile()}}>
                <input type="file" name="file" onChange={onChangeFile} />
                <button>sumbit</button>
            </form>
            <ul>    
                {listFile.map(file => (
                    <li>
                        <FileItem nameServer={state.name} onInfoFile={handleInfoFile} filename={file} pathFile={currentPath}/>
                    </li>
                ))}
            </ul>
        </div>
    )

}


