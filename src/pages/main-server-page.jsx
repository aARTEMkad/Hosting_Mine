import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import serverService from "../services/apiService";

export default function MainServerPage() {
    const location = useLocation();
    const { _id, name, memory, cpus, ports, core, version, javaVersion, containerId } = location.state

    const [ isRun, setIsRun ] = useState(false);

    useEffect(() => {
        serverService.getStatusServer(location.state.containerId)
        .then(statusServer => {
            setIsRun(statusServer);
        })
    }, [])

    function startServer() {
        serverService.startServer(location.state);
        setIsRun(true);
    }

    function restartServer() {
        if(isRun) {
            serverService.restartServer(location.state);
        } else {
            console.log('don\'t restart server is not run' )
        }
    }

    function stopServer() {
        serverService.stopServer(location.state)
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