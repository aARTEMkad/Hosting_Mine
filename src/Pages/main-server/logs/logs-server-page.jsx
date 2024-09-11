import axios from "axios";
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
//import { useNavigate } from "react-router-dom";


const socket = io('http://localhost:3333');

export default function LogsServerPage() {
    const location = useLocation()
    const [ logs, setLogs ] = useState([]);
    
    useEffect(() => { // don't give logs
        if(location.state.isRun) {
            socket.emit("join", location.state.name);

            axios.get('http://localhost:3333/api/server/logView', {
                params: {
                    name: location.state.name,
                    containerId: location.state.containerId
                }
            })
    
    
    
           socket.on("log", (log_) => {
            console.log(log_);
           })
    
           socket.on("log-end", (log_) => {
            console.log('end');
           })
    
        //    return () => {
        //     // Від'єднуємо від кімнати
        //     socket.off("log");
        //     socket.off("log-end");
        //     socket.disconnect();
        //     };
        } else {
            console.log('server not run ')
        }

        
       
    }, [socket])

    console.log(location.state);
    return (
        <div className="logs-server-page">
            <p>test</p>
        </div>
    )
}