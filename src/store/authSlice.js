import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import  axios  from 'axios';
import jwtDecode from 'jwt-decode' 
import { toast } from 'react-toastify';
import { url } from './api';


export const registerUser = createAsyncThunk(
    'auth/registerUser', 
    async (values, {rejectWithValue}) =>{
    try{
       const token = await axios.post(`${url}/register`,{
            firstname: values.firstname,
            lastname: values.lastname,
            email:values.email,
            password:values.password
        });
        localStorage.setItem('taskToken', token.data)
        return token.data

    } catch(err){
        console.log(err.response.data)
        return rejectWithValue(err.response.data)

    }

    }
)
export const LogInUser = createAsyncThunk(
    'auth/LogInUser', 
    async (values, {rejectWithValue}) =>{
    try{
       const token = await axios.post(`${url}/login`,{
            email:values.email,
            password:values.password
        });

        localStorage.setItem('taskToken', token.data)
        return token.data
    } catch(err){
        console.log(err.response.data)
        return rejectWithValue(err.response.data)

    }

    }
)

const auth_Slice = createSlice({
    name:"auth",
    initialState: {
       token : localStorage.getItem("taskToken"),
        firstname:'',
        lastname:'',
        email:'',
        _id:'',
        registerStatus:'',
        registerError:'',
       LoginStatus:'',
       LoginError:'',
       userLoaded:false,
    },
    reducers:{
        loadUser(state,action){
            const token = state.token
            if(token){
                const user = jwtDecode(token)
                console.log(user)

                return {
                    ...state,
                    token,
                    firstname:user.firstname,
                    lastname:user.lastname,
                    email:user.email,
                    _id:user._id,
                    userLoaded:true
                }
            }
        },

        LogOutUser(state, action){
            localStorage.removeItem("token")
            localStorage.removeItem("taskUser");
            toast("log out successfull");
            return {
                    ...state,
                    token : "",
                    firstname:'',
                    lastname:'',
                    _id:'',
                    registerStatus:'',
                    registerError:'',
                    LoginStatus:'',
                    LoginError:'',
                    userLoaded:false
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state, action)=>{
            return {...state,registerStatus:'pending'}

        });
        builder.addCase(registerUser.fulfilled,(state, action)=>{
            if(action.payload){
                const user = jwtDecode(action.payload)
                console.log(user);
                toast("registration successful")
                window.location.replace("/");
                return{
                    ...state,
                    token:action.payload,
                    firstname:user.firstname,
                    lastname:user.lastname,
                    email:user.email,
                    _id:user._id,
                    registerStatus:'success'
                }
            }else return state

        })
        builder.addCase(registerUser.rejected,(state, action)=>{
            toast.error("an error ocurred");
            console.log(action.payload);
            return{
                ...state,
                registerStatus:'rejected',
                registerError:action.payload
            }
        })

        builder.addCase(LogInUser.pending,(state, action)=>{
            return {...state,LoginStatus:'pending'}

        });
        builder.addCase(LogInUser.fulfilled,(state, action)=>{

            if(action.payload){
                const user = jwtDecode(action.payload)
                return{
                    ...state,
                    token:action.payload,
                    email:user.email,
                    _id:user._id,
                    LoginStatus:'success'
                }
            }else return state

        })
        builder.addCase(LogInUser.rejected,(state, action)=>{
            return{
                ...state,
               LoginStatus:'rejected',
               LoginError:action.payload

            }
        })
    }
})

export const {loadUser, LogOutUser} = auth_Slice.actions
export default auth_Slice;