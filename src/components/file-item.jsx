import axios from "axios";
//import { useNavigate } from "react-router-dom";

export default function FileItem({ nameServer, filename, onInfoFile, pathFile }) {

    function onClickFile() {
        console.log(`Filename: '${filename}' pathFIle: ${pathFile}`)
        
        if(filename == '..') { // return before path
            console.log(pathFile.substring(0, pathFile.lastIndexOf('/')));
            console.log(pathFile.lastIndexOf("/"));
            axios.get("http://localhost:3333/api/server/fileManager", {
                params: {
                    name: nameServer + "/" + pathFile.substring(0, pathFile.lastIndexOf('/'))
                }
            })
            .then((res) => {
                console.log(res.data.data);
                onInfoFile(res.data.data, pathFile.substring(0, pathFile.lastIndexOf('/'))); // ---------
            })
        } else if(filename.toString('utf8').indexOf('.') !== -1) { // Get value in file. Do open file with two '.'
            console.log(filename.toString('utf8').indexOf('.'));
            axios.get("http://localhost:3333/api/server/infoFile", {
                params: {
                    name: nameServer + "/" + pathFile,
                    file: filename
                }
            })
            .then((res) => {
                console.log(res.data.data);
                
            })
        } else { // GO
            axios.get("http://localhost:3333/api/server/fileManager", {
                params: {
                    name: nameServer + "/" + pathFile+`/${filename}`
                }
            })
            .then((res) => {
                console.log(res.data.data);
                onInfoFile(res.data.data, pathFile+`/${filename}`); // ---------
            })
        }
    }



    return (
        <div id="serverItem" onClick={onClickFile} >
            <p>File: {filename}</p>
        </div>
    );
};