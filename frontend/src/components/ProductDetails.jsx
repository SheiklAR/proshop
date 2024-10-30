import { Rating } from "@mui/material"

const ProductDetails = ({product}) => {
  return (
      <div>
          <div className="p-4">
          <h5 className="p-2 text-gray-400  text-4xl font-bold">{product.name}</h5>
          
          <div className="my-2 flex items-center space-x-2">
            <Rating
              readOnly
              value={product.rating}
              className='text-gray-600'
              sx={{ fontSize: '16px' }} />
            <span className='text-gray-600 font-semibold'> {product.numReviews} reviews</span>
          </div>
              <strong className="text-gray-600 text-xl py-3">Price: ${product.price}</strong>
              <p className="my-1 text-gray-500">{product.description}</p>
        </div>
    </div>
  )
}

export default ProductDetails