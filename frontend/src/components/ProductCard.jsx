import React from 'react'
import phone from '/images/phone.jpg'

const  ProductCard= ({image =phone, productName="Iphone6"}) => {
  return (
      <>
      <div>
          <div className='bg-slate-100 rounded-lg border-2 border-gray-300 max-w-sm'>
            <div className='p-2'>
                <img src={image} alt="phone" className='rounded-lg object-cover' />
                <div className='p-2'>
                          <p className='font-semibold underline py-1 text-xs'>{ productName }</p>
                    <p className='py-1 text-gray-400 font-medium text-xl'>price</p>
                </div>
            </div>
              </div>
              </div>
      </>
  )
}

export default ProductCard