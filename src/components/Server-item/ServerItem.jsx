import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ServerItem({ server }) {
    const navigate = useNavigate();


    function deleteServer() {
        axios.delete(`http://localhost:3333/api/server/${server._id}`)
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

            <button onClick={deleteServer}>Delete</button>
        </div>
    );
};

