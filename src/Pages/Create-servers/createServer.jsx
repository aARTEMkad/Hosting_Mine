import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function CreateServer() {
    const navigate = useNavigate()
    const [nameServ, setNameServ] = useState(null);
    const [versServ, setVersServ] = useState(null);
    const [coreServ, setCoreServ] = useState(null);

    function goToAbout() {

        axios.post('http://localhost:3333/api/server', {
            name: nameServ,
            version: versServ,
            core: coreServ,
        })

        navigate('/')
    }

    function OnChangeName(e) {
        setNameServ(e.target.value)
    }

    function OnChangeVers(e) {
        setVersServ(e.target.value)
    }

    function OnChangeCore(e) {
        setCoreServ(e.target.value)
    }

    return (
        <div>
            <h1>Create server</h1>
            <form>
                Name: <input name="nameServer" onChange={OnChangeName}/>
                Version: <input name="versionServer" onChange={OnChangeVers}/>
                Core: <input name="coreServer" onChange={OnChangeCore}/>
                <button type="button" onClick={goToAbout}>Create</button>
            </form>
        </div>
    )
}