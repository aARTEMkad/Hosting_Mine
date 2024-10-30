import axios from "axios"

const url_API = `http://${process.env.REACT_APP_BACKEND_ADDRESSES}:${process.env.REACT_APP_BACKEND_PORT}/api`

class ServerService {

    
    createServer(data) {
        axios.post(url_API + "/server", data)
        .then(() => {
            console.log("Server created");
        })
        .catch(err => {
            console.log(`Don't create server: ${err}`)
        })
    }
    
    
    sendCommandToServer(containerIdT, commandT) {
        axios.post(url_API + "/server/send_command", {
            containerId: containerIdT,
            command: commandT
        })
    }
    
    
    startServer(infoServer) {
        axios.post(url_API + "/server/start", infoServer)
        .then(res => {
            console.log(`Server started: ${infoServer.containerId}`)
        }).catch(err => {
            console.log(`don't start server error: ${err}`);
        })
    }
    
    restartServer(infoServer) {
        axios.post(url_API + "/server/restart", infoServer)
        .then(res => {
            console.log(`Server restarted: ${infoServer.containerId}`)
        }).catch(err => {
            console.log(`don't restarted server error: ${err}`);
        })
    }
    
    stopServer(infoServer) {
        axios.post(url_API + "/server/stop", infoServer)
        .then(res => {
            console.log(`Server stopped: ${infoServer.containerId}`)
        }).catch(err => {
            console.log(`don't stopped server error: ${err}`);
        })
    }

    deleteServer(idServer) {
        axios.delete(url_API + `/server`, {
            data: {
                id: idServer
            }
        });
    }
    
    saveServerProperties(nameServer, properties) {
        axios.post(url_API + "/server/server_properties", {
            name: nameServer,
            server_properties: properties
        })
        .then(res => {
            console.log(`save server properties`)
        }).catch(err => {
            console.log(`don't save server properties, error: ${err}`);
        })
    }
    
    async getServerProperties(nameServer) {
        try {
            const res = await axios.get(url_API + "/server/server-properties", {
                params: {
                    name: nameServer
                }
            })
            return res.data.properties;
        } catch(err) {
            console.log(`Error function getStatusServer: ${err}`);
            return -1;
        }
    }
    
    async getStatusServer(containerIdT) {
        try {
            const res = await axios.get(url_API + "/server/status", {
                params: {
                    containerId: containerIdT
                }
            })
            return res.data.isRunning;
        } catch(err) {
            console.log(`Error function getStatusServer: ${err}`);
            return -1;
        }
    }
    
    async getOldLog(nameServer) {
        try {
            const res = await axios.get(url_API + "/server/logView", {
                params: {
                    name: nameServer
                }
            })
            return res.data.logs;
        } catch(err) {
            console.log(`Error function getOldLog: ${err}`);
            return -1;
        }    
    }
    
    async getListServers() {
        try {
            const res = await axios.get(url_API + "/server")
            return res.data;
        } catch(err) {
            console.log(`Error function getListServers: ${err}`);
            return -1;
        }
    }
}


const serverService = new ServerService();

export default serverService;