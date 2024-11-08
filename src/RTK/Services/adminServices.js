import axios from "axios";

const loginServices = async (data)=>{
    try {
        console.log("in services",data)
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,data);
        console.log("in loginservices",res.data)
        return res.data
        // return data     
    } catch (error) {
        console.log("Error",error);
    }
}

export default {
    loginServices
}