import { apiSlice } from "./apiSlice";
import { ORDERS_URL, STRIPE_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'post',
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
            })
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
        })
    })
});

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetStripeClientSecretMutation,
    useGetMyOrdersQuery,
    
} = ordersApiSlice;