import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';


export default function Verify() {
    const {navigate, token, setCartItems, backedUrl} = useContext(ShopContext);
    const [searchParams, setSeachParams] = useSearchParams();


    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async() =>{
        try {
            if(!token)
            {
                return null;
            }
            const response = await axios.post(backedUrl +'/api/order/verifyStripe',{success, orderId}, {headers : token});
            if(response.data.success)
            {
                setCartItems({})
                navigate('/orders')
            }else{
                navigate('/cart')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() =>{
        verifyPayment();
    }, [token])

  return (
    <div>
    
    </div>
  )
}
