import axios from "axios";

export default function ServerItem({ server }) {

    function deleteServer() {
        axios.delete(`http://localhost:3333/api/server/${server._id}`)
        window.location.reload();
    }

    return (
        <div id="serverItem">
            <h1>{server.name}</h1>
            <p>version: {server.version}</p>
            <p>core: {server.core}</p>

            <button onClick={deleteServer}>Delete</button>
        </div>
    );
};

