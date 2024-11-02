import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
// --
import { io } from "socket.io-client";

// Service
import serverService from "../services/apiService";
import MenuNavBar from "../components/menu-navbar";
import ProgressBar from "../components/progress-bar";

// CSS
import '../styles/main-server.css'

//--
const BACKEND_ADDRESSES = process.env.REACT_APP_BACKEND_ADDRESSES
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT
//--


export default function MainServerPage() {
// --
    const [ logs, setLogs ] = useState([]);

    const [ ramUsage, setRamUsage ] = useState(0);
    const [ ramLimit, setRamLimit ] = useState(0);
    const [ cpuUsage, setCpuUsage ] = useState(0);
// --

    const location = useLocation();
    const { name, memory, cpus, ports, core, version, javaVersion, containerId } = location.state

    const [ isRun, setIsRun ] = useState(false);

    useEffect(() => {
        serverService.getStatusServer(containerId)
        .then(statusServer => {
            setIsRun(statusServer);
        })
    }, [containerId])

    useEffect(() => {


       
        if(isRun) {
            const socket = io(`http://${BACKEND_ADDRESSES}:${BACKEND_PORT}`,
                {
                    transports: ["websocket"]
                }
            );
    
            socket.emit("join", name);
            
            socket.on("log", (log_) => {
                setLogs((prevState) => [...prevState, log_.toString()]);
            })  
    
            socket.on("cpuUsage", (cpuUsage) => {
                setCpuUsage(cpuUsage);
                console.log(`Cpu usage; ${cpuUsage}`);
            })
    
            socket.on("ramUsage", (ram) => {
                setRamUsage(ram);
                console.log(ram);
            })
    
            socket.on("ramLimit", (_ramlimit) => {
                setRamLimit(_ramlimit);
                console.log(`ram limit: ${_ramlimit}`);
            })

            console.log('try')

            setTimeout(3000);
            serverService.getOldLog(name)
            .then(logs => {
                if(logs !== -1) {
                    logs.forEach(element => {
                        setLogs((prevState) => [...prevState, element]);
                    })
                }
            })
            location.state.isRun = isRun;


            return () => {
                socket.disconnect();
                setLogs([]);
            }
        }
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
        setCpuUsage(0);
        setRamUsage(0);
        setRamLimit(0);
    }

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
                    <div className="server-stats">
                        <div>CPU {cpuUsage}%</div>
                        <ProgressBar color__fill={'#991613'} color={'#360807'} progress={cpuUsage}></ProgressBar>
                        <div>RAM {ramUsage} MB / {ramLimit} MB</div>
                        <ProgressBar color__fill={'#154296'} color={'#06142e'} progress={(ramUsage/ramLimit) * 100}></ProgressBar>
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