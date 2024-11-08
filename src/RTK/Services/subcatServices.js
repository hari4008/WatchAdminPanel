import axios from "axios";

const getAllSubCat = async ()=>{
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getallsubcategory`)
        // console.log("in cate --------- services",res);
        return res;
    } catch (error) {
        throw error;
    }
}
const addSubcate = async (data)=>{
    try{
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addsubcategory`,data)
        return res.data;
    } catch( error ){
        throw error;
    }
}
const deleteSubcate = async (id)=>{
    try{
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/removesubcate/${id}`)
        return res.data;
    } catch( error ){
        throw error;
    }
}
const updateSubCate = async (data) => {
    try{
        console.log("update sub cate ",data);
        const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/updatesubcat/${data.id}`,data)
        // conso
        return res.data;
    } catch( error ){
        throw error;
    }
}
const getCate = async (id)=>{
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getCateId/${id}`)
        // console.log("in sub cate cate_name ",res.data);
        return res.data;
    } catch( error ){
        throw error;
    }
}
export default {
    getAllSubCat,addSubcate,getCate,deleteSubcate,updateSubCate
}
