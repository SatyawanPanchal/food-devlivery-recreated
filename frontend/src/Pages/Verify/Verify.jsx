import { useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../components/Context/StoreContext";
import axios from 'axios'

const Verify = () => 
{
  const [searchParams, setSearchParams] = useSearchParams();
  const { url,token } = useContext(StoreContext);
  const navigate =useNavigate();

  const success=searchParams.get("success");
  const orderId=searchParams.get("orderId");
  console.log('success and order id ', success,orderId);
  

  const verifyPayment =async()=>{
    const response=await axios.post(url+"/api/order/verify",{success,orderId} );
    console.log('orders in respnse  ...',response.data.data);
    
    if(response.data.success)
    {
         navigate("/myorders");
       
    
    }
    else{
        navigate("/");
    }
}


useEffect(()=>{
    verifyPayment();
},[]);

return(
    <div></div>
)};

export default Verify;