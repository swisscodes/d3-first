import { configureStore} from '@reduxjs/toolkit'
import {weatherDataApi} from '../apiServices/weatherApi'



export default configureStore({
    reducer: {
        [weatherDataApi.reducerPath]:weatherDataApi.reducer
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat([weatherDataApi.middleware,])
  })

