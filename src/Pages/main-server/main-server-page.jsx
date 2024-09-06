//import { useState } from "react"
//import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom"

export default function MainServerPage() {
    const location = useLocation();
    const { _id, name, memory, cpus, ports, core, version, javaVersion } = location.state

    const [ isRun, setIsRun ] = useState(false);


    function startServer() {
        axios.post('http://localhost:3333/api/server/start', location.state);
        setIsRun(true);
    }

    function restartServer() {
        if(isRun) {
            axios.post('http://localhost:3333/api/server/restart', location.state);
        } else {
            console.log('don\'t restart server' )
        }
    }

    function stopServer() {
        axios.post('http://localhost:3333/api/server/stop', location.state);
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
                        <Link to="/server-setting">Setting</Link>
                    </li>
                    <li>
                        <Link to="/server-logs">Logs</Link>
                    </li>
                    
                </ul>
            </nav>

          
        </div>
    )
}