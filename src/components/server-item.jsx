import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <div id="serverItem" onClick={OpenServer}>
            <h1>{server.name}</h1>
            <p>version: {server.version}</p>
            <p>core: {server.core}</p>
            <p>port: {server.ports}</p>

            <button onClick={deleteServer}>Delete</button>
        </div>
    );
};