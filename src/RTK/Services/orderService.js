import axios from "axios";
const getAllOrders = async () => {
    try{
        // console.log()
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getallorder`);
        // console.log("res is orderservice",res.data)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
const deleteOrder = async (id) => {
    try{
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteorder/${id}`);
        // console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
const addOrder = async (order) => {
    try{
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addorder`,order);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

const updateOrder = async (data) => {
    try{
        const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/updateorder/${data.id}`,{data}
        // {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     }
        // }
        );
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export default {
    getAllOrders,deleteOrder,addOrder,updateOrder
}