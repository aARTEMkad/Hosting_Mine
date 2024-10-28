import axios from "axios";
import { useNavigate } from "react-router-dom";

// CSS
import '../styles/server-item.css'

const BACKEND_ADDRESSES = process.env.REACT_APP_BACKEND_PORT
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT

export default function ServerItem({ server }) {
    const navigate = useNavigate();

    console.log(server);
    
    function deleteServer() {
        axios.delete(`http://${BACKEND_ADDRESSES}:${BACKEND_PORT}/api/server/${server._id}`)
        window.location.reload();
    }

    function OpenServer() {
        navigate(`/main-server`, { state: server })
    }

    return (
        <div className="serverItem" onClick={OpenServer}>
            
            <div className="serverStatus" style={{background: "#D32F2F"}}/>
            
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