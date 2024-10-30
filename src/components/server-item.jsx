import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// CSS
import '../styles/server-item.css'


// Service
import serverService from "../services/apiService";

export default function ServerItem({ server }) {
    const navigate = useNavigate();

    const [ IsRun, setIsRun ] = useState(false);

    useEffect(() => {
        serverService.getStatusServer(server.containerId)
        .then(statusServer => {
            setIsRun(statusServer);
        })
    },[])
    
    function deleteServer() {
        console.log('test');
        console.log(server);
        serverService.deleteServer(server._id);
       // window.location.reload();
    }

    function OpenServer() {
        navigate(`/main-server`, { state: server })
    }

    return (
        <div className="serverItem" onClick={OpenServer}>
            
            <div className="serverStatus" style={{background: IsRun ? "#4CAF50" : "#D32F2F"}}/>
            
            <p className="nameServer">{server.name}</p>
            <p className="serverDescription">Description: none</p>

            <div className="serverItemTxt">     
                <p>Version: {server.version}</p>
                <p>Core: {server.core}</p>
                <p>Port: {server.ports}</p>
            </div>

            <button className="serverDelete" onClick={deleteServer}></button>
        </div>
    );
};