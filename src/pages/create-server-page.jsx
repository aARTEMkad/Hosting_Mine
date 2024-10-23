import { useState } from "react"
import { useNavigate } from "react-router-dom";

// Service
import serverService from "../services/apiService";


export default function CreateServerPage() {
    const navigate = useNavigate();


    const [nameServ, setNameServ] = useState();
    const [memoryServ, setMemoryServ] = useState(null);
    const [cpusServ, setCpusServ] = useState(null);
    const [portsServ, setPortsServ] = useState(null);
    const [coreServ, setCoreServ] = useState(null);
    const [versionServ, setVersionServ] = useState(null);
    const [javaVersionServ, setJavaVersionServ] = useState(null);


    function sumbitCreateServer() {
        serverService.createServer({
            name: nameServ,
            memory: memoryServ,
            cpus: cpusServ,
            ports: portsServ,
            core: coreServ,
            version: versionServ,
            javaVersion: javaVersionServ
        })
        navigate('/')
    }


    function OnChangeName(e) {
        setNameServ(e.target.value)
    }

    function OnChangeMemory(e) {
        setMemoryServ(e.target.value)
    }

    function OnChangeCpus(e) {
        setCpusServ(e.target.value)
    }

    function OnChangePorts(e) {
        setPortsServ(e.target.value)
    }

    function OnChangeCore(e) {
        setCoreServ(e.target.value)
    }

    function OnChangeVersion(e) {
        setVersionServ(e.target.value)
    }

    function OnChangeJavaVersion(e) {
        setJavaVersionServ(e.target.value)
    }



    return (
        <div className="create-server-page">
            <form>
                Name: <input name="name" onChange={OnChangeName} />
                Memory: <input name="memory" onChange={OnChangeMemory} />
                cpus: <input name="cpus" onChange={OnChangeCpus} />
                ports: <input name="ports" onChange={OnChangePorts} />
                core: <input name="core" onChange={OnChangeCore} />
                version: <input name="version" onChange={OnChangeVersion} />
                java version: <input name="javaVersion" onChange={OnChangeJavaVersion} />
                <button type="Button" onClick={sumbitCreateServer}>Create server</button>
            </form>
        </div>
    )
}