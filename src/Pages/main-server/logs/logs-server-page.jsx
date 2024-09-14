import axios from "axios";
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

export default function LogsServerPage() {
    const location = useLocation()
    const [ logs, setLogs ] = useState([]);
    const [ command, setCommand ] = useState(null);
    const socket = io('http://localhost:3333');


    useEffect(() => { 
        socket.emit("join", location.state.name);
        axios.get('http://localhost:3333/api/server/logView', {
            params: {
                name: location.state.name,
                containerId: location.state.containerId
            }
        })
        console.log(location.state);
           
        

       socket.on("log", (log_) => {
        setLogs((prevState) => [...prevState, log_.toString()]);
       //onsole.log(logs);
       })
       console.log('ww');
       socket.on("log-end", (log_) => {
        //setLogs(logs.push(logs));
        setLogs((prevState) => [...prevState, log_.toString()]);
        console.log('end');
       })
       return () => {
        socket.disconnect();
       }
    }, [location.state.name, location.state.containerId])

    useEffect(() => { 
        //setLogs((prevState) => [...prevState, "log_.toString()"]);
        console.log(logs)
    }, []);

    function onChangeCommand(e) {
        setCommand(e.target.value);
    }

    function sendCommand() {
        axios.post('http://localhost:3333/api/server/send_command', {
            containerId: location.state.containerId,
            command: command,
        })
    }

    return (
        <div className="logs-server-page">
            <p>{logs.map((value, index) => {
                return (
                    <div key={index} >
                        {index} - {value}
                    </div>
                )
            })}</p>
            <form onSubmit={(e) => { e.preventDefault()}} >
                <input type="text" onChange={onChangeCommand} />
                <button type="sumbit" onClick={sendCommand}>send</button>
            </form> 
        </div>
    )
}