import { Rating } from "@mui/material"

const ProductDetails = ({product}) => {
  return (
      <div>
          <div className="px-2">
          <h5 className="p-2 text-gray-400  text-4xl font-bold">{product.name}</h5>
          
          <div className="px-4 ">
            <Rating
              readOnly
              value={product.rating}
              className='text-gray-600'
              sx={{ fontSize: '16px' }} />
            <span className='text-gray-600 font-semibold'> {product.numReviews} reviews</span>
          </div>
              <strong className="text-gray-400 text-3xl py-3">Price: ${product.price}</strong>
              <p>{product.description}</p>
        </div>
    </div>
  )
}

export default ProductDetails