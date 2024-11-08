import axios from "axios";

const addStaff = async (data) => {
  try {
    console.log("in Staffservices", data);
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addstaff`, data);
    console.log("in after StaffServices", res.data);
    return res.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const getAllStaff = async () => {
  try {
    return await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getstaffs`);
    // console.log("in after StaffServices", res);
    // return res.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

export default {
    addStaff,
    getAllStaff
}
