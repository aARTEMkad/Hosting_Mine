import axios from "axios";

const url_API = `http://${process.env.REACT_APP_BACKEND_ADDRESSES}:${process.env.REACT_APP_BACKEND_PORT}/api/server`

class FileManagerService {

    async getDir(serverName, path = "") {
        try {
            const res = await axios.get(url_API + "/fileManager", {
                params: {
                    name: serverName + (path !== "" ? `/${path}` : "")
                }
            })
            return res.data.data;
        } catch(err) {
            console.log(`Error function getDir: ${err}`);
            return -1;
        }
    }

    async uploadFile(formData, config) {
        try {
            await axios.post(url_API + "/file/upload", formData, config)
        } catch(err) {
            console.log(`Error function uploadFile: ${err}`);
            return -1;
        }
    }
    
    async getInfoFile(nameServer, path, fileName) {
        try {
            console.log(nameServer, path, fileName)
            const res = await axios.get(url_API + "/infoFile", {
                params: {
                    name: nameServer + (path !== "" ? `/${path}` : ""),
                    file: fileName
                }
            })
            return res.data.data;
        } catch(err) {
            console.log(`Error function info file: ${err}`);
            return -1;
        }
    }

    deleteFile(nameServer, fileName, filePath, handleFunction) {
        axios.delete(url_API + "/file", {
            params: {
                name: nameServer,
                file: filePath !== "" ? filePath + '/' + fileName : fileName
            }
        }).then(res => {
            console.log("Delete file");
            handleFunction();
        }).catch(err => {
            console.log(`Can't delete file: ${err}`);
        })
    }

    updateInformationFile(data) {
        axios.put(url_API + "/saveFile", data)
        .then(() => {
            console.log('File saved');
        }).catch(err => {
            console.log(`Don't save file: ${err}`);
        }) 
    }

}


const fileManagerService = new FileManagerService();
export default fileManagerService
