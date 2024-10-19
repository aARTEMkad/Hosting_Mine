import axios from "axios";
import { useState } from "react";
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
        } else if((filename.indexOf(".") === 0 && filename.lastIndexOf(".") === 0) || filename.indexOf(".") === -1) { // GO
            axios.get("http://localhost:3333/api/server/fileManager", {
                params: {
                    name: nameServer + "/" + pathFile+`/${filename}`
                }
            })
            .then((res) => {
                console.log(res.data.data);
                onInfoFile(res.data.data, pathFile+`/${filename}`); // ---------
            })
        } else {
            console.log(`don't open directory because aren't directory`)
        }
    }


    function onClickValueFile() {
        if(filename.toString('utf8').indexOf('.') !== -1) { // Get value in file. Do open file with two '.'
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
        } else {
            console.log(`the isn't file`);
        }
    }






    const [ menuPosition, setMenuPosition ] = useState(null);

    function handlContextMenu(event) {
        event.preventDefault();
        console.log(event.pageX + ' ' + event.pageY);
        setMenuPosition({
            x: event.pageX,
            y: event.pageY
        })
    }
 
    function handleClickOutSide(event) {
        setMenuPosition(null);
    }

    function handleMenuClick(event) {
        console.log("Clicked menu");
    }


    return (
        <div id="serverItem" 
           onClick={handleClickOutSide}
           onDoubleClick={onClickFile}
            onContextMenu={handlContextMenu}
            >
            
            <p>File: {filename}</p>
            
        
            {menuPosition && (
                <ul>
                    <li onClick={onClickValueFile}>Open</li> {/*Get value file */}
                    <li onClick={handleMenuClick}>ACtion 2</li>
                    <li onClick={handleMenuClick}>ACtion 3</li>
                </ul>
            )}
        </div>
    );
};

// user-select: none; 
//<div id="Fileitem" onClick={onClickFile}></div>