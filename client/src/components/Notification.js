import React,{useState} from 'react';
import { updateAlert } from '../actions/alerts';
import { useDispatch } from 'react-redux';
import moment from 'moment'

const Notification = ({item,branchId}) => {
  const dispatch = useDispatch();
  const [viewed,setViewed] = useState(item.viewedBy.includes(branchId))
  const handleView = () =>{
      if(!viewed){
        dispatch(updateAlert(item._id,branchId));
        setViewed(true);
      }
  }

    return (
      
        <a  href="#" className={`list-group-item ${ viewed ? "viewed" :"notviewed" }`}
        
        onClick={handleView}>
         <div>Contact Details : {item.contactDetails}</div>
         <div>Pincode: {item.pincode}</div>
         <div className="timestamp"> {moment(item.createdAt).format('lll')}</div>
       </a>
      
    );
  };

  export default Notification;