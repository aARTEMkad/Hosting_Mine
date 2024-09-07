import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";



export default function SettingServerPage() {
    const location = useLocation()
    const [ properties, setProperties ] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3333/api/server/server_properties`, {
            params: {
                name: location.state.name
            }
        })
        .then(res => {
            console.log(res.data);
            setProperties(res.data);
        })
        .catch((err) => {   
            console.log(err);
        })
    }, [location.state.name])


    console.log()
    return (
        <div className="setting-server-page">
            <h1>Налаштування сервера: {location.state.name}</h1>
            <div className="properties">
                <form>
                    {/* Slots: <input name="max-players" type="number" step="1" min="1" max="1000000" value={properties.max-players}/> */}
                    {/* Nether: <input name="allow-nether" type="checkbox" value={properties['allow-nether']}/> */}
                </form>
            </div>
        </div>
    )
}


/*

{properties ? (
                <pre>{JSON.stringify(properties, null, 2)}</pre> // show properties the server
            ) : (
                <p>Loading server properties...</p>
            )}
*/