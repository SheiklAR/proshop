import { Rating } from "@mui/material"

const ProductDetails = ({product}) => {
  return (
      <div>
          <div className="p-4 divide-y-2 divide-gray-300 max-w-xl">
          <h5 className="p-2 text-gray-400  text-4xl font-bold">{product.name}</h5>
          
          <div className="my-3 py-6 w-full flex items-center space-x-2">
            <Rating
              readOnly
              value={product.rating}
              className='text-gray-600'
              sx={{ fontSize: '16px' }} />
            <span className='text-gray-600 font-semibold'> {product.numReviews} reviews</span>
          </div>
              <p className="text-gray-600 text-xl py-3">Price: <strong>${product.price}</strong></p>
              <p className="my-1 py-8 text-gray-500"><strong></strong>{product.description}</p>
        </div>
    </div>
  )
}

export default ProductDetails