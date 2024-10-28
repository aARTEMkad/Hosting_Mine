import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";


// Components
import ServerItem from "../components/server-item"

// Service
import serverService from "../services/apiService";


export default function ListServerPage() {
    const [ servers, setServers ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        serverService.getListServers()
        .then(data => {
            setServers(data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    function goToCreateServer() {
       navigate('create-server')
    }


    return (
        <div id="list-server-page">
            <h1>List servers</h1>
            <button type="button" onClick={goToCreateServer} >Add server</button>

            
            
            
            <ul>
                {servers.map(server => (
                    <li key={server._id} >
                        <ServerItem server={server} ></ServerItem>
                    </li>
                ))}
            </ul>
        </div>
    )
}