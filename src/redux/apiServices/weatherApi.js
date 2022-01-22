import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const weatherDataApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_BASE
    }),

    endpoints: (builder) => ({
        getWeaterData: builder.query({
           query: (args) => ({
               url: args?.urlPath || 'history.json',
               method: 'GET',
               params: {q: 'Bursa', dt: '2022-01-15', end_dt: '2022-01-30', lang: 'en'},
               headers: {
                    'x-rapidapi-host':process.env.REACT_APP_API_HOST,
                    'x-rapidapi-key': process.env.REACT_APP_API_KEY
              }
           }) 
        }),
    })
})


export const {
    useGetWeaterDataQuery,
} = weatherDataApi