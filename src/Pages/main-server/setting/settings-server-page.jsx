import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";



export default function SettingServerPage() {
    const location = useLocation()
    const [ properties, setProperties ] = useState(null);
    //const [ updateProperties, setUpdateProperties ] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3333/api/server/server_properties`, {
            params: {
                name: location.state.name
            }
        })
        .then(res => {
            console.log(res);
            setProperties(res.data.properties);
            //setUpdateProperties(res.data.properties);
        })
        .catch((err) => {   
            console.log(err);
        })
    }, [location.state.name])
    


    useEffect(() => {
        console.log(properties)
    }) // ----

    function onChangeProperties(key, value) {
        console.log(value); 
        setProperties(prevState => ({
            ...prevState,
            [key]: value.toString()
        }))
       // console.log(properties);
    }
    
    function onSaveInformation() {
        axios.post(`http://localhost:3333/api/server/server_properties`, {
            name: location.state.name,
            server_properties: properties
        })
        console.log('done send')
    }

    if(!properties) {
        return <div>Loading...</div>
    }

    return (    
        <div className="setting-server-page">
            <p>{properties['allow-nether']}aa</p>
            <h1>Setting server: {location.state.name}</h1>
            <div className="properties">
                <form onSubmit={(e) => { e.preventDefault(); onSaveInformation()}} >
                    Slots: 
                    <input 
                        name="max-players" 
                        type="number" 
                        value={properties['max-players']} 
                     
                        onChange={e => onChangeProperties('max-players', e.target.value)} />
                    |Nether: 
                    <input 
                        name="allow-nether" 
                        type="checkbox" 
                        checked={properties['allow-nether'] === 'true'} 
                        onChange={e => onChangeProperties('allow-nether', e.target.checked)} />
                    |Cracked: 
                    <input 
                        name="online-mode" 
                        type="checkbox" 
                        checked={properties['online-mode'] === 'true'} 
                        onChange={e => onChangeProperties('online-mode', e.target.checked)}/>
                    |Pvp: 
                    <input 
                        name="pvp" 
                        type="checkbox" 
                        checked={properties.pvp === 'true'} 
                        onChange={e => onChangeProperties('pvp', e.target.checked)}/>
                    |Command-block:
                    <input 
                        name="enable-command-block"    
                        type="checkbox" 
                        checked={properties['enable-command-block'] === 'true'} 
                        onChange={e => onChangeProperties('enable-command-block', e.target.checked)}/>
                    <p>{properties['enable-command-block']}</p>
                    |Fly: 
                    <input 
                        name="allow-flight" 
                        type="checkbox" 
                        checked={properties['allow-flight'] === 'true'} 
                        onChange={e => onChangeProperties('allow-flight', e.target.checked)}/>
                    |Animals:
                    <input 
                        name="spawn-animals" 
                        type="checkbox" 
                        checked={properties['spawn-animals'] === 'true'} 
                        onChange={e => onChangeProperties('spawn-animals', e.target.checked)}/>
                    |Monsters:
                    <input 
                        name="spawn-monsters" 
                        type="checkbox" 
                        checked={properties['spawn-monsters'] === 'true'} 
                        onChange={e => onChangeProperties('spawn-monsters', e.target.checked)}/>
                    |Villages:
                    <input 
                        name="spawn-npcs" 
                        type="checkbox" 
                        checked={properties['spawn-npcs'] === 'true'} 
                        onChange={e => onChangeProperties('spawn-npcs', e.target.checked)}/>
                    |Spawn protection:
                    <input 
                        name="spawn-protection" 
                        type="number" 
                        value={properties['spawn-protection']} 
                        onChange={e => onChangeProperties('spawn-protection', e.target.value)}/>
                    

                    |Sumbit
                    <button type="sumbit" >Save</button>
                </form>
            </div>
        </div>
    )
    
}

// don't finish
/*

{properties ? (
                <pre>{JSON.stringify(properties, null, 2)}</pre> // show properties the server
            ) : (
                <p>Loading server properties...</p>
            )}
*/