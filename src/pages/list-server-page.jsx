import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

// CSS
import '../styles/list-server.css'

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
        <div className="listServerPage">
            <p className="namePage">Servers</p>

            <div className="container" >
                <button className="create-button" type="button" onClick={goToCreateServer} >Create</button>
                <ul className="two-column-list">
                    {servers.map(server => (
                        <li key={server._id} >
                            <ServerItem server={server} ></ServerItem>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}