import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import FileItem from "../components/file-item";

// Service
import fileManagerService from "../services/fileManagerService";

let currentPath = ''

export default function FileManagerPage() {

    const { state } = useLocation()
    const [ listFile, setListFile ] = useState([]);
    const [ file, setFile ] = useState();


    console.log(currentPath);

    useEffect(() => {
        currentPath = '';

        fileManagerService.getDir(state.name)
        .then(data => {
            setListFile(data !== -1 ? data : []);
        }) 
    },[state.name])


// -- prv
function relSite() {
    console.log('rel');
    
    fileManagerService.getDir(state.name, currentPath)
    .then(data => {
        setListFile(data !== -1 ? data : []);
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


        fileManagerService.uploadFile(formData, config)
        .then(() => {
            relSite();
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


