import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import {Link} from 'react-router-dom'

export default function ProductsItems({id,image, name, price}) {
    const {currency} = useContext(ShopContext);
  return (
    <div>
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            <div className='overflow'>
                <img src={image[0]} className='hover:scale-110 transition ease-in-out h-80 w-60' alt="" />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </Link>
    </div>
  )
}
