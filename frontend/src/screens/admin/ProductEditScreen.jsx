import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery, useUpdateProductMutation } from "../../slices/productApiSlice";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductEditScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const { id: productId } = useParams();

    const navigate = useNavigate();

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
    console.log(product)

    const [updateProduct, { data: updatedProduct, isLoading: isLoadingUpdate }] = useUpdateProductMutation();

    useEffect(() => { 
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            productId,
            name, 
            price,
            brand, 
            category,
            countInStock,
            description,
        }
        
        const result = await updateProduct(updatedProduct);
        console.log(result)
        if (result.error) {
            toast.error(result.error.data.message);
        } else {
            toast.success("Product Updated");
            navigate('/admin/productlist');
        }
    }

    return <>
        <div className='max-w-6xl m-2 mx-auto'>
            <Link to='/admin/productlist'>
            <button className='btn bg-slate-100 font-semibold text-black hover:bg-slate-50 m-2'>Go back</button>
            </Link>
        </div>
        {isLoadingUpdate && <Loader />}

        {isLoading ? <Loader /> : error ? <AlertMessage message={error.message}/> : (
        <div className="max-w-5xl m-2 mx-auto">
            <h1 className="text-4xl font-semibold text-gray-500">Edit Product</h1>

            <form onSubmit={handleUpdate}
            className='bg-slate-100 p-8 my-2 rounded-md'
        >
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-500">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-box" placeholder="Test Product 1" />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-500">Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="input-box" placeholder="19.99" />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-500">Brand</label>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="input-box"
                    placeholder='Sony'/>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-500">Count in Stock</label>
                <input
                    type="number"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    className="input-box"
                    placeholder='Items in stock'/>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-500">Category</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input-box"
                    placeholder='Catecategory'/>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-500">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-box"
                    placeholder='description'/>
            </div>
        
            <button type="submit" className="btn" disabled={isLoading}>Update</button>

            {isLoading && <Loader />}

        </form>
        </div>
        )}
    </>
}

export default ProductEditScreen