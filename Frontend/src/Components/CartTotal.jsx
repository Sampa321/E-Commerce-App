import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext.jsx'
import Title from './Title.jsx';

export default function CartTotal() {

    const {currency, deliver_free, getCartAmount} = useContext(ShopContext);

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTALS'}/>
        </div>

        <div className='flex flex-col gap-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency} {getCartAmount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p>{currency} {deliver_free}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + deliver_free}</b>
            </div>
        </div>
    </div>
  )
}
