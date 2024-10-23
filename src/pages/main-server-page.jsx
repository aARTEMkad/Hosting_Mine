//import { useState } from "react"
//import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"

const BACKEND_ADDRESSES = process.env.REACT_APP_BACKEND_PORT
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT

export default function MainServerPage() {
    const location = useLocation();
    const { _id, name, memory, cpus, ports, core, version, javaVersion, containerId } = location.state

    const [ isRun, setIsRun ] = useState(false);

    useEffect(() => {
        axios.get(`http://${BACKEND_ADDRESSES}:${BACKEND_PORT}/api/server/status`, {
            params: {
                containerId: location.state.containerId
            }
        }).then((res) => {
            setIsRun(res.data.isRunning)
        })

        
    }, [])

    function startServer() {
        axios.post(`http://${BACKEND_ADDRESSES}:${BACKEND_PORT}/api/server/start`, location.state);
        setIsRun(true);
    }

    function restartServer() {
        if(isRun) {
            axios.post(`http://${BACKEND_ADDRESSES}:${BACKEND_PORT}/api/server/restart`, location.state);
        } else {
            console.log('don\'t restart server' )
        }
    }

    function stopServer() {
        axios.post(`http://${BACKEND_ADDRESSES}:${BACKEND_PORT}/api/server/stop`, location.state);
        setIsRun(false);
    }

    return (
        <div className="main-server-page">
            <h1>{name} - {_id}</h1>
            <p>memory: {memory}</p>
            <p>cpus: {cpus}</p>
            <p>ports: {ports}</p>
            <p>core: {core}</p>
            <p>version: {version}</p>
            <p>java version: {javaVersion}</p>

            <p>server status: {isRun ? 'started' : 'stop'}</p>
            <button onClick={startServer}>Start</button>
            <button onClick={restartServer}>Restart</button>
            <button onClick={stopServer}>Stop</button>


            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/server-setting" state={{ name }}>Setting</Link>
                    </li>
                    <li>
                        <Link to="/server-logs" state={{ name, containerId, isRun }}>Logs</Link>
                    </li>
                    <li>
                        <Link to="/file-manager-server" state={{ name, containerId, isRun }}>File manager</Link>
                    </li>
                    
                </ul>
            </nav>

          
        </div>
    )
}