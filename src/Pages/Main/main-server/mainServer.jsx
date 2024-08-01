import { useLocation } from "react-router-dom"


export default function MainServerPage() {
    const location = useLocation();
    const { state } = location;


    function startServer() {
        console.log('Start server');
    }

    function restartServer() {
        console.log('Restart server');
    }

    function stopServer() {
        console.log('Stop server');
    }

    return (
        <div>
            <p>TGEs</p>
            <p>{state.name}</p>
            <p>{state.version}</p>
            <p>{state.core}</p>


            <button onClick={startServer}>Start</button>
            <button onClick={restartServer}>Restart</button>
            <button onClick={stopServer}>Stop</button>

        </div>
    )

}