import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from "../types"
import axios from 'axios'

export const fetchProducts = () => async (dispatch) => {

    const res = await axios.get('/api/products')
    const data = await res.data
    console.log(res);

    //another way to get data from server
    // const res = await fetch('/api/products')
    //const data = await res.json()

    dispatch({
        type: FETCH_PRODUCTS,
        payload: data
    })
}


//filter product action take two parameter first one is all products from state and 
//second oaramter for size wich user select
export const filterProducts = (products, size) => (dispatch) => {
    dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items:
                size === '' ? products :
                    products.filter((item) => item.availableSizes.indexOf(size) >= 0)

        }
    })
}

//sort products take two paramters first is filterProducts action and second sortt of price
export const sortProducts = (filterProducts, sort) => (dispatch) => {
    const sortedProducts = filterProducts.slice()
    //this case if user not select option from prise we order it by id which come from server
    if (sort === 'Latest') {
        sortedProducts.sort((a, b) => a._id > b._id ? 1 : -1)
    }
    else {
        sortedProducts.sort((a, b) =>
            sort === 'Lowest' ? a.price > b.price ? 1 : -1
                : a.price > b.price ? -1 : 1
        )
    }
    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: sortedProducts
        }
    })

}