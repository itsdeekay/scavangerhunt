import React,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { signin } from '../actions/branches';
import {useHistory} from 'react-router-dom'

const Login = () => {

    const [login,setLogin] = useState({branchName:'',password:''})
    const [error,setError] = useState("")
    const dispatch = useDispatch();
    const history = useHistory();
    const response = useSelector((state)=>state.error.error?state.error.error : "")
    useEffect(()=>{
        if(response) setError(response)
    },[response])
    
    const handleSubmit = async (e) =>{
        setError('')
        e.preventDefault();
        if(login.branchName===""){
            setError("Please enter Branch name")
            return
        }
        if(login.password===""){
            setError("Please enter password")
            return
        }
        dispatch(signin(login,history));
        
    }

  return (
    <div className="login">
        <h2 className="loginHeader"> Login</h2>
        
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label  className="form-label">Branch</label>
                <input type="text" className="form-control" id="branchName"
                onChange = {(e)=>setLogin({...login,branchName:e.target.value})} />
            </div>
            <div className="mb-3">
                <label  className="form-label">Password</label>
                <input type="password" className="form-control" id="password"
                onChange = {(e)=>setLogin({...login,password:e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <label>{error}</label>
        </form>
    </div>
  );
};

export default Login;