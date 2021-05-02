import React,{useState,useEffect} from 'react';
import { getAlertsByPin,getAlerts } from '../actions/alerts';
import { useDispatch,useSelector } from 'react-redux';
import Notification from './Notification'

const Notifications = () => {
  const [alerts, setAlerts] = useState([]);
  const dispatch = useDispatch();
  const response = useSelector((state)=>state.alerts);
  const [branch,setBranch] = useState(JSON.parse(localStorage.getItem('profile')));
  useEffect(()=>{
    if(response) {
        setAlerts(response)}
  },[response])
  useEffect(()=>{
    setBranch(JSON.parse(localStorage.getItem('profile')));
    if(branch?.result?.branchName==='Admin'){
      dispatch(getAlerts())
  }else{
      dispatch(getAlertsByPin(branch?.result?.pincodes))
  }
  },[])

    return (
      
      <div className="row">
        <div className="list-group">
        {alerts.map(alert => (
            <Notification key={alert._id} item={alert} branchId = {branch.result?._id} />
        ))}
        </div>
        
      </div>
      
    );
  };

  export default Notifications;