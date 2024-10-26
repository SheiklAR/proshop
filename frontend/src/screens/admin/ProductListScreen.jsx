import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../../slices/productApiSlice'
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
  const { data:products, isLoading,  refetch } = useGetProductsQuery();
  console.log(products)
  
    const [createProduct, { data: createdProduct, isLoading: isCreateLoading, error }
    ] = useCreateProductMutation();
    
    const [deleteProduct, { isLoading: isDeleteProductLoading }] = useDeleteProductMutation();

    const handleCreateProduct = async () => {
        if (window.confirm('Are you sure you want to create a new Produt?')) {
            try {
                await createProduct();
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

  const handleDelete = async (id) => {
      if (window.confirm(`Are you sure`)) {
        try {
            await deleteProduct(id);
            refetch();
            toast.success('Product deleted');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
  }

    return <>
        <div className='container  md:max-w-4xl mx-auto py-2'>
            <div className='m-2 flex justify-between'>
                <h1 className='text-gray-600 font-bold text-3xl'>Products</h1>
                <button className='btn p-1 rounded-md px-2 bg-gray-800 font-medium inline-flex items-center' onClick={handleCreateProduct}> <FaEdit /> Create New Prouduct</button>
            </div>
            {isCreateLoading && <Loader />}
            {isDeleteProductLoading && <Loader />}
            
            {isLoading ? <Loader /> : (
        
                <div className="overflow-hidden">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                        <thead className="text-md text-gray-700 uppercase bg-gray-400 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    NAME
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    PRICE
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    CATEGORY
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    BRAND
                                </th>
                                <th scope="col" className="px-6 py-3">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index} className=" border-b bg-gray-700 ">
                                    <td className="px-6 py-4">
                                        {product._id}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        ${product.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.brand}
                                    </td>
                                    <td className="px-6 py-4 inline-flex space-x-2 font-semibold text-lg">
                                        <Link to={`/admin/product/${product._id}/edit`}>
                                            <button>
                                                <FaEdit />
                                            </button>
                                        </Link>
                    
                                        <button onClick={() => handleDelete(product._id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
            
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </>
}

export default ProductListScreen