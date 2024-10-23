import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";


// Components
import ServerItem from "../components/server-item"

const BACKEND_ADDRESSES = process.env.REACT_APP_BACKEND_PORT
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT


export default function ListServerPage() {
    const [ servers, setServers ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://${BACKEND_ADDRESSES}:${BACKEND_PORT}/api/server`)
        .then( res => {
            console.log(res.data)
            setServers(res.data);
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
            
            
            
            
            <ul>
                {servers.map(server => (
                    <li key={server._id} >
                        <ServerItem server={server} ></ServerItem>
                    </li>
                ))}
                <li>
                    <button type="button" onClick={goToCreateServer} >Add server</button>
                </li>
            </ul>
        </div>
    )
}