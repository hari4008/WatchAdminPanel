import axios from "axios";

const addProduct = async (data) => {
    try {
        console.log("add pro ", data);
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("price", data.price)
        formData.append("description", data.description)
        formData.append("categ", data.categ)
        formData.append('place',data.place)
        formData.append('uploadby',data.uploadby)

        for (let i = 0; i < data.image.length; i++) {
            formData.append(`image`, data.image[i]);
        }
        formData.append("subcateId", data.subcateId)
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addProduct`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('tokenAuth')
            }
        });
        console.log("res in err ", res.data)   
        return res.data;
    } catch (err) {
        console.log("error in add product ", err);
        throw err
    }
}

const addBulkProduct = async (data) => {
    try {
        console.log("add pro ", data);
        const formData = new FormData();
        formData.append("csv", data.csv)

        for (let i = 0; i < data.image.length; i++) {
            formData.append(`image`, data.image[i]);
        }
        formData.append("subcateId", data.subcateId)
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addProduct`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('tokenAuth')
            }
        });
        console.log("res in err ", res.data)
        return res.data;
    } catch (err) {
        console.log("error in add product ", err);
        throw err
    }
}
const getAllProduct = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllProduct`);
        // console.log("getservices",res)
        return res.data;
    } catch (err) {
        console.log("error in get all product ", err);
        throw err
    }
}

const getProManageByCate = async (data) => {
    try {
        // console.log("data in cate Services",data)
        const vandor = data.vandor;
        const category = data.category
        const page = data.currentPage;
        // console.log("data----","vandor",vandor,"Page",page,"category",category)
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getProManageByCate?page=${page}&pageSize=10&vandor=${vandor}&category=${category}`,vandor,page,category)
        // console.log("getProManageByCate",res)
        return res.data;
    } catch (err) {
        console.log("error in get all product ", err);
        throw err
    }
}

const getProByVenCateSubCate = async (data) => {
    try {
        console.log("data in prosubcate",data)
        const vandor = data.vandor;
        const page = data.currentPage;
        const category = data.category;
        const subcate  = data.subcate;
        console.log("vandor===",vandor,"Page",page,"category",category,"subcate",subcate)
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getProManageBySub?page=${page}&pageSize=10&vandor=${vandor}&category=${category}&subcate=${subcate}`,vandor,page,category,subcate)
        // http://localhost:5001/getProManageBySub?page=1&pageSize=10&vendor=admin@gmail.com&category=15&subcate=4
        console.log("getProductByVandor",res)
        return res.data;
    } catch (err) {
        console.log("error in get all product ", err);
        throw err
    }
}

const getProductByVandor = async (data) => {
    try {
        // console.log("data in abc",data)
        const vandor = data.vandor;
        const page = data.currentPage;
        // console.log("vandor",vandor,"Page",page)
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getproductbyvandor?vendor=${vandor}&page=${page}&pageSize=10`,vandor,page)
        // console.log("getProductByVandor",res)
        return res.data;
    } catch (err) {
            console.log("error in get all product ", err);
            throw err
    }
}


const deleteProduct = async (id) => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteProduct/${id}`);
        console.log('del pro ', res.data)
        return res.data;
    } catch (err) {
        console.log("error in delete product ", err);
        throw err
    }
}

const updateProduct = async (data) => {
    try {
        // console.log("pro id ",data.id)
        // const res = await axios.patch(`http://localhost:5001/updateProductDetail/${data.id}`,data)
        // return res.data
        // console.log("update pro ", data);
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("price", data.price)
        formData.append("description", data.description)
        formData.append("categ", data.categ)
        formData.append('place',data.place)
        formData.append("id",data.id)

        for (let i = 0; i < data.image.length; i++) {
            formData.append(`image`, data.image[i]);
        }
        formData.append("subcateId", data.subcateId)
        console.log("form data ", formData)
        const values = [...formData.entries()];
        console.log(values);
        const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/updateProductDetail/${data.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('tokenAuth')
            }
        });
        // console.log("res ctrl ", res.data);
        return res.data;
        // if (res.data.success === 0) {
        //     return res.data
        // }
        // const status = {
        //     data: data,
        //     success: res.data.success,
        //     msg: res.data.msg
        // }
        // return status;

    } catch (error) {
        console.log("error in update product service ", error)
    }
}


// const getProductByVendor = async ()

export default {
    addProduct, 
    getAllProduct, 
    deleteProduct, 
    updateProduct,
    getProductByVandor,
    getProManageByCate,
    getProByVenCateSubCate
}