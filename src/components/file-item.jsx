import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Service
import fileManagerService from "../services/fileManagerService";


export default function FileItem({ nameServer, filename, onInfoFile, pathFile }) {

    function onClickFile() {
        console.log(`Filename: '${filename}' pathFIle: ${pathFile}`)
        
        if(filename === '..') { // return before path
            console.log(pathFile.substring(0, pathFile.lastIndexOf('/')));
            console.log(pathFile.lastIndexOf("/"));

            fileManagerService.getDir(nameServer, `/${pathFile.substring(0, pathFile.lastIndexOf('/'))}`)
            .then(data => {
                onInfoFile(data, pathFile.substring(0, pathFile.lastIndexOf('/')))
            })
        } else if((filename.indexOf(".") === 0 && filename.lastIndexOf(".") === 0) || filename.indexOf(".") === -1) { // GO
            fileManagerService.getDir(nameServer, `/${pathFile}/${filename}`)
            .then(data => {
                onInfoFile(data, pathFile+`/${filename}`); // ---------
            })
        } else {
            console.log(`don't open directory because aren't directory`)
        }
    }

    const navigate = useNavigate();

    function onClickValueFile() { // get info file
        console.log("adda");
        if(filename.toString('utf8').indexOf('.') !== -1) { // Get value in file. Do open file with two '.'
            console.log(filename.toString('utf8').indexOf('.'));
            
            fileManagerService.getInfoFile(nameServer, pathFile, filename)
            .then(data => {
                navigate("/edit-file-value", {
                    state: {
                        data: data,
                        filename: filename,
                        path: nameServer + "/" + pathFile
                    }
                })
            })
        } else {
            console.log(`the isn't file`);
        }
    }


// -- prv
    function relSite() {
        fileManagerService.getDir(nameServer, pathFile)
        .then(data => {
            onInfoFile(data, pathFile);
        })
    }

//



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

    function onClickDeleteFile() {
        fileManagerService.deleteFile(nameServer, filename, pathFile, relSite);
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
                    <li onClick={onClickDeleteFile}>Delete 3</li>
                </ul>
            )}
        </div>
    );
};

// user-select: none; 
//<div id="Fileitem" onClick={onClickFile}></div>