import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from "axios"; 
import { backendUrl, currency } from '../App.jsx';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets.js';


 export default function Orders({token}) {

  const [orders, setOrders] = useState([]);


  const fetchAllorders = async () =>{
    if(!token)
    {
      return null;
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, {headers : {token}});
      if(response.data.success)
      {
        setOrders(Array.isArray(response.data.orders) ? response.data.orders : []);
      }else{
        setOrders([]);
        console.log("Status:", error.response?.status);
        console.log("Backend message:", error.response?.data);
        toast.error(response.data.message);
      }
      
    } catch (error) {
       console.log("401 ERROR:", error.response?.data);
      console.log("STATUS:", error.response?.status);
      console.log("TOKEN EXISTS:", Boolean(token));
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) =>{
    try {
      const response = await axios.post(backendUrl + '/api/order/status', {orderId, status : event.target.value}, {headers : {token : token}})
      if(response.data.success)
      {
        toast.success("Status Updated");
        await fetchAllorders()
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
    }
  }


  useEffect(() =>{
    fetchAllorders();
  }, [token]);

   return (
     <div>
       <h3>Order page</h3>
       <div>
        {
          orders.map((order, idx) =>( 
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 item-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={idx}>
              <div key = {idx}>
                <img src={assets.parcel_icon} alt="Parcel" className="w-12 h-12 object-contain"/>
              </div>

              <div>
                {
                order.items.map((item, idx) => (
                  <p className='py-0.5' key={idx}> {item.name} x {item.quantity} <span>{item.size}</span></p>
                  ))
                }
                
                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + "," + order.address.state + ", " + order.address.country +", " + order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>

              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                <p className='mt-3'>Mathod : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? "Done": " Pending"}</p>
                <p>Date : {new Date (order.date).toLocaleDateString()}</p>
              </div>

              <div>
                <p className='text-sm sm:text-[15px]'>{currency} {order.amount}</p>
              </div>
              
              <div>
                <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
       </div>
     </div>
   );
 }
 