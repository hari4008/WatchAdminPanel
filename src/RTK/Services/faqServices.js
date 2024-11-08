import axios from "axios";

const getAllFaq = async ()=>{
    try {
        return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllFaq`);
    } catch (error) {
        console.log("error",error);
        throw error;
    }
};

const addFaq = async (data)=>{
    try {
        console.log("faq addservices", data);
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addFaq`,data);
        console.log("faq after addservices", res);
        // res.status(200).json(res.data);
        return res.data
    } catch (error) {
        console.log("error",error);
        throw error;
    }
};

const deleteFaq = async (id)=>{
    try {
        return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteFaq/${id}`,id);
    } catch (error) {
        console.log("error",error);
        throw error;
    }
};

export default{
    getAllFaq,
    addFaq,
    deleteFaq
}