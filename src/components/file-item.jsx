import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FileItem({ filename, onInfoFile, pathFile }) {

    function onClickFile() {

        if(filename.toString().exi)
        axios.get("http://localhost:3333/api/server/fileManager", {
            params: {
                name: pathFile+`/${filename}`
            }
        })
        .then((res) => {
            console.log(res.data.data);
            onInfoFile(res.data.data, filename); // ---------
        })
    }



    return (
        <div id="serverItem" onClick={onClickFile} >
            <p>File: {filename}</p>
        </div>
    );
};