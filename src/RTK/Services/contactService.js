import axios from "axios";

const getAllContact = async ()=>{
    try {
        return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllcontact`);
    } catch (error) {
        console.log("error",error);
        throw error;
    }
};

const addContact = async (data)=>{
    try {
        console.log("Contact addservices", data);
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addcontact`,data);
        console.log("Contact after addservices", res);
        // res.status(200).json(res.data);
        return res.data
    } catch (error) {
        console.log("error",error);
        throw error;
    }
};

const deleteContact = async (id)=>{
    try {
        return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deletecontact/${id}`,id);
    } catch (error) {
        console.log("error",error);
        throw error;
    }
};

export default{
    getAllContact,
    addContact,
    deleteContact
}