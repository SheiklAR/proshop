import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';


const ProductCard = ({ product }) => {

  return (
    <>
      <div>
        <div className='bg-slate-100 rounded-lg border-2 border-gray-300 max-w-sm'>
          <div className='p-2'>
            <Link to={`/product/${product._id}`}>
              <img src={product.image}
                alt={product.name}
                className='rounded-lg transition-transform duration-300 hover:scale-[101%] ' />
            </Link>
            <div className='p-2'>

              <Link to={`/product/${product._id}`}>
                <p className='font-medium text-gray-400 underline py-1 text-lg'>{product.name}</p>
              </Link>
              <p className='py-1 text-gray-700 font-medium text-xl'>${product.price}</p>
            </div>
            <div className='flex p-1 space-x-1 items-center'>
              <Rating
                readOnly
                value={product.rating}
                className='text-gray-600'
                sx={{ fontSize: '16px' }} />
              <span className='text-gray-500 tracking-wide'>Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard