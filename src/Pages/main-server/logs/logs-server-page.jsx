import axios from "axios";
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";



export default function LogsServerPage() {
    const location = useLocation()
    const [ logs, setLogs ] = useState([]);
    const [ command, setCommand ] = useState(null);

    // axios.get('http://localhost:3333/api/server/logView', {
    useEffect(() => { 
        const socket = io('http://localhost:3333',
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
            axios.get(`http://localhost:3333/api/server/logView`, {
                params: {
                    name: location.state.name
                }
            })
            .then(res => {
                res.data.logs.forEach(element => {
                    setLogs((prevState) => [...prevState, element])
                });
            })
            .catch(err => {
                console.log(err);
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
        console.log('tt');
        axios.post('http://localhost:3333/api/server/send_command', {
            containerId: location.state.containerId,
            command: command,
        })
    }

    return (
        <div className="logs-server-page">
            <div>{logs.map((value, index) => {
                return (
                    <div key={index} >
                        {index} - {value}
                    </div>
                )
            })}</div>
            <form onSubmit={(e) => { e.preventDefault()}} >
                <input type="text" onChange={onChangeCommand} />
                <button type="sumbit" onClick={sendCommand}>send</button>
            </form> 
        </div>
    )
}