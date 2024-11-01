import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
// --
import { io } from "socket.io-client";

// Service
import serverService from "../services/apiService";

// CSS
import '../styles/main-server.css'
import MenuNavBar from "../components/menu-navbar";

//--
const BACKEND_ADDRESSES = process.env.REACT_APP_BACKEND_ADDRESSES
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT
//--


export default function MainServerPage() {
// --
    const [ logs, setLogs ] = useState([]);

// --

    const location = useLocation();
    const { _id, name, memory, cpus, ports, core, version, javaVersion, containerId } = location.state

    const [ isRun, setIsRun ] = useState(false);

    useEffect(() => {
        // --

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


        serverService.getStatusServer(location.state.containerId)
        .then(statusServer => {
            setIsRun(statusServer);
            if(isRun) {
                console.log('try')
                serverService.getOldLog(location.state.name)
                .then(logs => {
                    if(logs !== -1) {
                        logs.forEach(element => {
                            setLogs((prevState) => [...prevState, element]);
                        })
                    }
                })
            }
        })
       
        
        return () => {
            socket.disconnect();
            setLogs([]);
        }
        // --
    }, [isRun])

    function startServer() {
        serverService.startServer(location.state);
        setIsRun(true);
        // ---
        setLogs([])
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

console.log(logs)
    return (
        <div className="main-server-page">

            <MenuNavBar state={location.state}/>

            <div className="main-side">
                <p className="name-server">{name}</p>
                <div className="description-field">
                    <h1>Description</h1>
                </div>


                <div className="information-field">
                    <div className="scroll-console">
                        <div>{logs.map((value, index) => {
                            return (
                                <div key={index} >
                                    {index} - {value}
                                </div>
                            )
                        })}</div>
                    </div>
                    <div className="status-serv" style={{background: isRun ? "#4CAF50" : "#D32F2F"}}/>
                    <h1 className="specs-txt">Specification</h1>
                    <div className="specs-server">
                       <p className="info-name">memory</p> <p className="info-value">{memory} MB</p>
                       <p className="info-name">cpus</p> <p className="info-value">{cpus}</p>
                       <p className="info-name">ports</p> <p className="info-value">{ports}</p>
                       <p className="info-name">core</p> <p className="info-value">{core}</p>
                       <p className="info-name">version</p> <p className="info-value">{version} MC</p>
                       <p className="info-name">java version</p> <p className="info-value">{javaVersion} java</p>
                    </div>
                    <div className="control-serv">
                        <button onClick={startServer}>Start</button>
                        <button onClick={restartServer}>Restart</button>
                        <button onClick={stopServer}>Stop</button>
                    </div>
                </div>
            </div>
        </div>
    )
}