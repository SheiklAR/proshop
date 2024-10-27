import { apiSlice } from "./apiSlice";
import { ORDERS_URL, STRIPE_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: { ...order }
            })
        }),
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`
            }),
            keepUnusedDataFor: 5
        }),
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: { ...details }
            })
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myOrders`
            }),
            keepUnusedDataFor: 5
        }),

        getStripeClientSecret: builder.mutation({
            query: ({ amount }) => ({
                url: STRIPE_URL,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount })
            })
        }),

        getAllOrders: builder.query({
            query: () => ({
                url: ORDERS_URL,
            }),
            keepUnusedDataFor: 5
        }),

        updateOrderDeliver: builder.mutation({
            query: ({ orderId } ) => {
                
                console.log("orderId from redux", orderId);
                return({
                    url: `${ORDERS_URL}/${orderId}/deliver`,
                    method: "PUT",
                })
            } 
        }),
    })
});

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetStripeClientSecretMutation,
    useGetMyOrdersQuery,
    useGetAllOrdersQuery,
    useUpdateOrderDeliverMutation,
} = ordersApiSlice;