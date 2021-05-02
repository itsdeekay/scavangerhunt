import React,{useState,useEffect} from 'react';
import { getBranches } from '../actions/branches';
import { createAlert } from '../actions/alerts';
import { useDispatch,useSelector } from 'react-redux';
import io from 'socket.io-client';

const ENDPOINT = "https://scavangerhunt.herokuapp.com/"

const Home = () => {
  const [details,setDetails] = useState({contactDetails:'',pincode:''})
  const [hunt, setHunt] = useState([]);
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const response = useSelector((state)=>state.branch);
  const socket = io.connect(ENDPOINT,{ transports: ['websocket', 'polling', 'flashsocket'] });
  useEffect(()=>{
    if(response) {
      setHunt(response)}
  },[response])

  const handleSubmit = async (e) =>{
    setError('')
    e.preventDefault();
    if(details.contactDetails===""){
        setError("Please enter Contact Details")
        return
    }
    if(details.pincode===""){
        setError("Please enter Pincode")
        return
    }

    dispatch(getBranches(details));
    dispatch(createAlert(details,socket));
}
    return (
      
      <div className="row">
        <div className="login col-5">
          <h2 className="loginHeader"> Go for Hunt...</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Contact Details</label>
              <input type="text" className="form-control" id="contactDetails"
                onChange={(e) => setDetails({ ...details, contactDetails: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Pincode</label>
              <input type="text" className="form-control" id="pincode"
                onChange={(e) => setDetails({ ...details, pincode: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
            <label>{error}</label>
          </form>
        </div>
        <div className="col-1"></div>
        <ul className="list-group col-6">
        {hunt.map(branch => (
            <li href="#" className="list-group-item" key={branch.branchName}>
              <div>Branch Name : {branch.branchName}</div>
              <div>Branch Incharge : {branch.branchIncharge}</div>
              <div>Branch Address : {branch.address}, {branch.city}</div>
              <div>Contact No. : {branch.contactNumber}</div>
            </li>
        ))}
        </ul>
        
      </div>
      
    );
  };

  export default Home;