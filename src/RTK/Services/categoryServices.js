import axios from "axios";

const addCate = async (data) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addCategory`, data);
    console.log("in categoryServices", res.data);
    return res.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const getAllCate = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getallcategory`);
    //   console.log("in categoryServices", res.data);
      return res.data;
    } catch (error) {
      console.log("Error", error);
    }
}
const deleteCate = async (id) => {
  try {
      const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deletecategory/${id}`);
      console.log('del cate ',res.data)
      return res.data;
  } catch (err) {
      console.log("error in delete category ", err);
      throw err
  }
}

const getSingleCate = async (id) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getcategory/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
}
const editCategory = async (data) => {
  try {
    console.log("data is ",data)
    const category_name= data.category_name
    const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/updatecategory/${data.id}`, {category_name});
    console.log("data  after services  ",res)
    return res.data;
  } catch (error) {
    console.log("Error", error);
  }
}

export default {
  addCate,
  getAllCate,
  deleteCate,
  getSingleCate,
  editCategory
}
