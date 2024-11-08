import axios from 'axios';

const getAllAddress = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getalladdress`);
        console.log('res is addressservice', res.data);
        return res.data; // Ensure you're returning res.data
    } catch (error) {
        console.log(error);
        throw error; // Ensure errors are thrown so they can be handled
    }
};

const deleteAddress = async (id) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteadress/${id}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const addAddress = async (address) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addadress`, address);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateAddress = async (data) => {
    try {
        const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/updateadress/${data.id}`, data);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    getAllAddress,
    deleteAddress,
    addAddress,
    updateAddress
};
