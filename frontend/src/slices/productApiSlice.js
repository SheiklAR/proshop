import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { deleteProduct } from "../../../backend/controllers/productController";


export const ProductApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            providesTags: ['Products'],
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: `${PRODUCTS_URL}`,
                method: "POST"
            }),

            invalidatesTags: ['Products'],
        }),

        updateProduct: builder.mutation({
            query: (product) => {
                console.log("updateProductMutation", product)
                return ({
                    url: `${PRODUCTS_URL}/${product.productId}`,
                    method: "PUT",
                    body: product,
                })
            },
            invalidatesTags: ['Proudct']
        }),

        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URL,
                method: "POST",
                body: data,
            })
        }),
        
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: "DELETE",
            })
        }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation } = ProductApiSlice;