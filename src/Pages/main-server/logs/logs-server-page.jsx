import axios from "axios";
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io('http://localhost:3333');

export default function LogsServerPage() {
    const location = useLocation()
    const [ logs, setLogs ] = useState([]);
    
    useEffect(() => { 
        //if(location.state.isRun) {
            socket.emit("join", location.state.name);
    
           
                axios.get('http://localhost:3333/api/server/logView', {
                    params: {
                        name: location.state.name,
                        containerId: location.state.containerId
                    }
                })

            
    
    
    
           socket.on("log", (log_) => {
            setLogs((prevState) => [...prevState, log_.toString()]);
            console.log(log_.toString());
            console.log(logs);
           })
    
           socket.on("log-end", (log_) => {
            //setLogs(logs.push(logs));
            console.log('end');
           })

        // } else {
        //     console.log('server not run ')
        // }       
    }, [])

    useEffect(() => { 
        console.log(logs)
    });

    console.log(location.state);
    return (
        <div className="logs-server-page">
            <p>{logs.map((value, index) => {
                return (
                    <p>{index} - {value}</p>
                )
            })}</p>

            <p>ete</p>
        </div>
    )
}