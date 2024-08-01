
export default function ServerItem({ server }) {


    return (
        <div id="serverItem">
            <h1>{server.name}</h1>
            <p>version: {server.version}</p>
            <p>core: {server.core}</p>
        </div>
    );
};

