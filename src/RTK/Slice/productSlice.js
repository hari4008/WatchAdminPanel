import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';   
// import productService from '../services/productService';
import { useNavigate } from 'react-router-dom';
import productService from '../Services/productService';
// import Toast from 'react-bootstrap/Toast';
export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (data) => {
        try {
            // const navigate = useNavigate();
            console.log("d id ",data);
            const res = await productService.addProduct(data);
            console.log("res add product ", res)
            // if (res.success === 0) {
            //     alert(res.msg)
            //     navigate("/login")
            // }
            // console.log("res success ",res)
            return res;
        } catch (err) {
            console.log("error in the add product ", err);
        }
    }
)

export const addBulkProduct = createAsyncThunk(
    "product/addBulkProduct",
    async (data) => {
        try {
            // const navigate = useNavigate();
            console.log("d id ",data);
            const res = await productService.addBulkProduct(data);
            console.log("res add product ", res)
            // if (res.success === 0) {
            //     alert(res.msg)
            //     navigate("/login")
            // }
            // console.log("res success ",res)
            return res;
        } catch (err) {
            console.log("error in the add product ", err);
        }
    }
)

export const getAllProduct = createAsyncThunk(
    "product/getAllProduct",
    async () => {
        try {
            const res = await productService.getAllProduct();
            return res;
        } catch (err) {
            console.log("error in the get all product ", err);
        }
    }
)
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id) => {
        try {
            await productService.deleteProduct(id);
            return id;
        } catch (err) {
            console.log("error in the delete product ", err);
        }
    }
)
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (data) => {
        try {
            console.log("update id & data ", data)
            const res = await productService.updateProduct(data);
            const newRes = {
                ...res,
                id:data.id
            }
            console.log("res up ", res)
            // if (res.success === 0) {
            //     alert(res.msg)
            // }
            return res;
        } catch (error) {
            throw error;
        }
    }
)

export const getProductByVandor = createAsyncThunk(
    "product/getProductByVandor",
    async (data) => {
        try {
            // console.log("in extra")
            const res = await productService.getProductByVandor(data);
            // console.log("in get product by vandor in slice", res)
            return res.products;
        } catch (error) {
            console.log("error in add user ", error);
        }
    }
)

export const getProByVenCate = createAsyncThunk(
    "product/getProByVenCate",
    async (data) => {
        try {
            // console.log("in extra",data)
            const res = await productService.getProManageByCate(data)
            console.log("in getProByVenCate in slice", res)
            return res.products;
        } catch (error) {
            console.log("error in agetProByVenCate user ", error);
        }
    }
)

export const getProByVenCateSubCate = createAsyncThunk(
    "product/getProByVenCateSubCate",
    async (data) => {
        try {
            console.log("in extra--",data)
            const res = await productService.getProByVenCateSubCate(data);
            console.log("in getProByVenCateSubCate in slice", res)
            return res.products;
        } catch (error) {
            console.log("error in add user ", error);
        }
    }
)


const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        product:'',
        loading:"",
        error:"",
        success:""
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false
                console.log('action pro ',action.payload)
                if (action.payload.success == 1) {
                    state.success = action.payload.success
                    state.products = [...state.products, action.payload.product]
                } else {
                    state.success = action.payload.success
                    state.error = action.payload.msg
                }
            })
            .addCase(addProduct.rejected, (state) => {
                state.loading = false
                state.error = "error in the add product"
            })
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.loading = false
                // console.log("((((((((((((((((((((( ",action.payload)
                // console.log("action all producr ",action.payload)
                state.products = action.payload
            })
            .addCase(getAllProduct.rejected, (state) => {
                state.loading = false
                state.error = "error in the get all product"
            })
        builder
            .addCase(getProductByVandor.pending, (state) => {
                state.loading = true
            })
            .addCase(getProductByVandor.fulfilled, (state, action) => {
                state.loading = false
                // console.log("action all prod ",action.payload)
                state.products = action.payload
            })
            .addCase(getProductByVandor.rejected, (state) => {
                state.loading = false
                state.error = "error in the get all product"
            })
        builder
            .addCase(getProByVenCate.pending, (state) => {
                state.loading = true
            })
            .addCase(getProByVenCate.fulfilled, (state, action) => {
                state.loading = false
                console.log("action all prod ",action.payload)
                state.products = action.payload
            })
            .addCase(getProByVenCate.rejected, (state) => {
                state.loading = false
                state.error = "error in getProductByVandor product"
            })
        builder
            .addCase(getProByVenCateSubCate.pending, (state) => {
                state.loading = true
            })
            .addCase(getProByVenCateSubCate.fulfilled, (state, action) => {
                state.loading = false
                // console.log("action all prod ",action.payload)
                state.products = action.payload
            })
            .addCase(getProByVenCateSubCate.rejected, (state) => {
                state.loading = false
                state.error = "error in the getProByVenCateSubCate product"
            })
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false
                console.log("action.payload dele", action.payload)
                state.products = state.products.filter((product) => product.id !== action.payload)
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.loading = false
                state.error = "error in the delete product"
            })
        builder
            .addCase(updateProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {

                console.log("action.payload ", action.payload)
                if (action.payload.status === 1) {
                    // var img = [];
                    // for (var i = 0; i < action.payload.image.length; i++) {
                    //     img.push(action.payload.image[i].name)
                    // }
                    // console.log("img ", img)
                    console.log("actiton ", action.payload.data)
                    const index = state.products.findIndex(product => product.id === parseInt(action.payload.data.id));
                    console.log("index ", index)
                    if (index !== -1) {
                        const updatedDetail = [...state.products]
                        updatedDetail[index] = action.payload.data
                        console.log('update update ',updatedDetail)
                        return {
                            ...state,
                            products: updatedDetail
                        }
                        // Update the product in the products array
                        // state.products[index] = action.payload;
                        // state.products[index].image = img;
                    } else {
                        return state;
                    }
                } else {
                    state.error = action.payload.msg
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default productSlice.reducer