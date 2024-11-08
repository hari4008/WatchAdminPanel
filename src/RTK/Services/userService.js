import axios from "axios";

const getAlluser = async () => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getalluser`)
        return res;
    } catch( error ) {
        throw error;
    }
}

const updateRoleUser = async (data) => {
    try{
        console.log("udate user services",data)
        const res= await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/roleupdate/${data.id}`,data)
        console.log("res in services",res)
        return res.data;
    } catch (error) {
        console.log("error in update role service ",error)
    }
}

// const getUserById = async (email) => {
//     try{
//         const res= await axios.get(`http://localhost:5001/getuserbyid/${email}`,email)
//         return res.data;
//     } catch (error) {
//         console.log("error in get user by id",error)
//     }
// }

const deleteUser = async (id) => {
    try{
        const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteuser/${id}`)
        return res.data;
    } catch (error) {
        console.log("error in delete user ",error)
        throw error
    }
}

export default {
    getAlluser,
    updateRoleUser,
    deleteUser,
}