import React, { useEffect, useState } from "react"
import axios from "axios"

// components
import ServerItem from "../../components/Server-item/ServerItem";


export default function ListServers() {
    const [ servers, setServers ] = useState([]);

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

    

    return (
        <div id="Servers">
            <h1>List servers</h1>
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