import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

// Service
import serverService from "../services/apiService";
import MenuNavBar from "../components/menu-navbar";

// CSS
import '../styles/logs-server.css';

const BACKEND_ADDRESSES = process.env.REACT_APP_BACKEND_ADDRESSES
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT


export default function LogsServerPage() {
    const location = useLocation()
    const [ logs, setLogs ] = useState([]);
    const [ command, setCommand ] = useState(null);

    useEffect(() => { 
        console.log(location.state);
        const socket = io(`http://${BACKEND_ADDRESSES}:${BACKEND_PORT}`,
            {
                transports: ["websocket"]
            }
        );
        console.log(socket);
        socket.emit("join", location.state.name);
        
        socket.on("log", (log_) => {
            console.log('qerqwr');
            setLogs((prevState) => [...prevState, log_.toString()]);
            console.log(log_);
        })  

        if(location.state.isRun) {
            serverService.getOldLog(location.state.name)
            .then(logs => {
                if(logs !== -1) {
                    logs.forEach(element => {
                        setLogs((prevState) => [...prevState, element]);
                    })
                }
            })
        }
        
        return () => {
            socket.disconnect();
            setLogs([]);
        }
    }, [])

    function onChangeCommand(e) {
        setCommand(e.target.value);
    }

    function sendCommand() {
        serverService.sendCommandToServer(location.state.containerId, command)
    }

    return (
        <div className="logs-server-page">
            <MenuNavBar className="menu-logs" state={location.state}/>
            <div className="console-server">
                <div>{logs.map((value, index) => {
                    return (
                        <div key={index} >
                            {index} - {value}
                        </div>
                    )
                })}</div>
            </div>
            <div className="form-command">
                <form onSubmit={(e) => { e.preventDefault()}} >
                    <input type="text" onChange={onChangeCommand} />
                    <button type="sumbit" onClick={sendCommand}>send</button>
                </form> 
            </div>
        </div>
    )
}