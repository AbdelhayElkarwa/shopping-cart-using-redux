import React, { Component } from 'react'
import data from '../data.json'
import CartItem from './CartItem'
import Filter from './Filter'

import './products.css'
//to make animation we install react-reveal package to use it
import Fade from 'react-reveal/Fade'
import { connect } from 'react-redux'
import { fetchProducts } from '../redux/actions.js/productAction'
class Products extends Component {
    state = {
        products: data.products,
        cartItems: [],
        size: '',
        sort: '',
        productModal: null
    }
    //to get all products in page when page load for first time
    componentDidMount() {
        this.props.fetchProducts()

    }

    createOrder = (order) => {
        console.log(order)
        alert('Need to save order for' + order.address)
    }
    //to remove one product from cart
    removeFromCart = (product) => {
        //we use slice to create new clone from cartItems
        const cartItems = this.state.cartItems.slice()



        this.setState({ cartItems: cartItems.filter(x => x._id !== product._id) })

    }
    //we use this function to check if product in cart we will increase count 1 
    //if product isn not in cart we put it in cart in left side
    addToCart = (product) => {

        const cartItems = this.state.cartItems.slice()
        let alreadyInCart = false
        cartItems.forEach(item => {
            if (item._id === product._id) {
                item.count++;
                alreadyInCart = true
            }
        })
        if (!alreadyInCart) {
            cartItems.push({ ...product, count: 1 })
        }
        this.setState({ cartItems })

    }



    //function to handel and show size according to select size from filter component
    // changeSize = (e) => {

    //     if (e.target.value === '') {
    //         this.setState({
    //             products: data.products,
    //             size: e.target.value
    //         })
    //     }
    //     else {
    //         this.setState({
    //             size: e.target.value,
    //             products: data.products.filter(product => product.availableSizes.indexOf(e.target.value) >= 0)
    //         })
    //     }

    // }

    //function to handel and show products according to select price from filter component
    // handelSort = (e) => {
    //     console.log(e.target.value);
    //     const sort = e.target.value
    //     this.setState((state) => ({
    //         sort: sort,
    //         products: this.state.products.slice().sort((a, b) => (
    //             sort === 'Lowest' ?
    //                 ((a.price > b.price) ? 1 : -1) :
    //                 sort === 'Heighest' ?
    //                     ((a.price < b.price) ? 1 : -1) :
    //                     a._id > b._id ? 1 : -1



    //         )

    //         )
    //     }))


    // }

    render() {
        return (
            <div className='row content' >

                <div className='col-8  products' >
                    <Filter />
                    {/* <Filter count={this.state.products.length} size={this.state.size}
                        sort={this.state.sort} changeSize={this.changeSize} handelSort={this.handelSort} /> */}
                    <Fade bottom cascade>
                        {!this.props.products ? <div>loading....</div> :
                            <ul className='row'>
                                {this.props.products.map(product => (
                                    <li key={product._id} className='col-lg-4 col-md-6'>
                                        <div className='product-img'>
                                            <a href={'#' + product._id}>
                                                <img src={product.image} alt={product.title}></img>
                                                <p>{product.title}</p>
                                            </a>
                                        </div>
                                        <div className='row product-price'>
                                            <div className='col-lg-6 col-md-12 price'> ${product.price}</div>
                                            <div className='col-lg-6 col-md-12'><button onClick={() => this.addToCart(product)}
                                                className='btn btn-primary'>Add To cart</button></div>

                                        </div>
                                    </li>
                                ))}
                            </ul>}
                    </Fade>
                </div>
                <div className='col-4 cart '> <CartItem cartItems={this.state.cartItems}
                    removeFromCart={this.removeFromCart} createOrder={this.createOrder} /></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return { products: state.products.filteredItems }

}

export default connect(mapStateToProps, { fetchProducts })(Products)
