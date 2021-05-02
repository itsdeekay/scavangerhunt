import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { useHistory,Link,useLocation } from 'react-router-dom'
import {LOGOUT} from '../constants/actionTypes'
import { getAlertsByPin,getAlerts } from '../actions/alerts';
import io from 'socket.io-client';

const ENDPOINT = "https://scavangerhunt.herokuapp.com/"
const Navbar = () =>{
    const [branch,setBranch] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const response = useSelector((state)=>state.alerts);
    const socket = io.connect(ENDPOINT,{ transports: ['websocket', 'polling', 'flashsocket'] });
    const logout = () => {
        dispatch({type:LOGOUT});
        history.push('/');
        setBranch(null)
    }
    useEffect(()=>{
        
        socket.on("updateNotification", data=>{
            console.log('Notification Received')
            if(branch?.result?.branchName==='Admin'){
                dispatch(getAlerts())
            }else if(branch?.result){
                dispatch(getAlertsByPin(branch?.result?.pincodes))
            }
        });
        return () => socket.disconnect();
    },[])
    useEffect(()=>{
        if(branch?.result?.branchName==='Admin'){
            dispatch(getAlerts())
        }else if(branch?.result){
            dispatch(getAlertsByPin(branch?.result?.pincodes))
        }
        
    },[branch])
    useEffect(()=>{
        setBranch(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    const unreadNotification = () =>{
        if(branch?.result?._id){
            return response.filter(e=> !e.viewedBy.includes(branch?.result?._id)).length;
        }
    }

    return(
            <div className="row navbar">
                <h2 className="col-9 heading">
                <Link to="/">Scavanger Hunt</Link>
                </h2>
                <div className="col-3 user">
                    {branch?(
                        <div className="row align-items-center">
                            <div className="profile col-8">
                            <Link to="/notifications">
                            <span className="avatar"></span>
                            <span className="badge badge-light">{unreadNotification()}</span>
                            </Link>
                            
                            <span className="branchname">{branch.result.branchName}</span>
                            </div>
                            <div className="col-4">
                            <button onClick={logout} className="btn btn-primary btn-sm">Logout</button>
                            </div>
                        </div>
                    ):(<Link to="/login" className="btn btn-primary btn-sm">Login</Link>)}
                </div>
            </div>
    );
}

export default Navbar;