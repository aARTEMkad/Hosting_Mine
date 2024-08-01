import React, { useEffect, useState } from "react"
import axios from "axios"

// components
import ServerItem from "../../components/Server-item/ServerItem";
import { useNavigate } from "react-router-dom";


export default function ListServers() {
    const [ servers, setServers ] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        axios.get('http://localhost:3333/api/server')
        .then( res => {
            console.log(res.data)
            setServers(res.data);
        })
        .catch(err => {
            console.log(err);
        })

        
    }, [])

    function goToAbout() {
       navigate('create-server')
    }

    return (
        <div id="Servers">
            <h1>List servers</h1>
            
            
            
            
            <ul>
                {servers.map(server => (
                    <li key={server._id} >
                        <ServerItem server={server} ></ServerItem>
                    </li>
                ))}
                <li>
                    <button type="button" onClick={goToAbout} >Add server</button>
                </li>
            </ul>
        </div>
    )
}