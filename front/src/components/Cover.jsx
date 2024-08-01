import React from 'react'
import { MdOutlineAddShoppingCart } from "react-icons/md";
import iphoneImg from "../assets/image/iphone.jpg"

const Cover = ({imgUrl,price,model}) => {
  return (
    <div className='cover w-40'>
         <img src={iphoneImg} alt="loading..." />
         <div className='coverDetails flex justify-between bg-[#C2C2C2] p-2 items-center'>
            <div>{model} <br /> {price}</div>
           <MdOutlineAddShoppingCart />
         </div>
    </div>
  )
}

export default Cover