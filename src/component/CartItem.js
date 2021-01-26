import React, { Component } from 'react'
import './cart.css'
import Fade from 'react-reveal/Fade'
export class CartItem extends Component {

    state = {
        checkProced: false,
        name: '',
        email: '',
        address: ''
    }

    handelCgange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    createOrder = (e) => {
        e.preventDefault()

        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems
        }
        console.log(order, 'cart');
        this.props.createOrder(order)
    }
    render() {
        const { cartItems } = this.props
        return (
            <div className='cartItem'>
                {cartItems.length === 0 ? <div className='info'> no Item Selected</div>
                    : <div className='info'>You have {cartItems.length} items in cart</div>}

                <ul>
                    {cartItems.map(item => (
                        <div key={item._id} className='item'>
                            <Fade left cascade>
                                <li className='row item'>

                                    <img className='col-4 cart-img' src={item.image} alt={item.title}></img>

                                    <div className='col-8'>
                                        <div className='title' >{item.title}</div>
                                        <div>
                                            {`${item.price} * ${item.count}`}
                                            <button className='btn btn-danger button' onClick={() => this.props.removeFromCart(item)}>Remove</button>

                                        </div>
                                    </div>
                                </li>
                            </Fade>
                        </div>

                    ))}
                </ul>
                <div>
                    {cartItems.length !== 0 && <div className='price'>
                        {`total:$ ${cartItems.reduce((a, c) => (a + c.price.toFixed() * c.count.toFixed()), 0)} `}
                        <div><button onClick={() => this.setState({ checkProced: true })} className='btn btn-success'>Proceed</button></div>
                    </div>
                    }

                    {this.state.checkProced && (
                        <Fade right cascade >
                            <div style={{ marginTop: '50px' }}>
                                <form onSubmit={this.createOrder}>
                                    <div className="form-group">

                                        <label >Email</label>
                                        <input className="form-control" onChange={this.handelCgange} type='email' required name='email'></input>
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>

                                    <div className="form-group">
                                        <label >Name</label>
                                        <input className="form-control" onChange={this.handelCgange} type='text' required name='name'></input>
                                    </div>
                                    <div className="form-group">
                                        <label >Adress</label>
                                        <input className="form-control" onChange={this.handelCgange} type='text' required name='address'></input>
                                    </div>

                                    <button style={{ width: '150px' }} className="btn btn-primary" type='submit' >Checkout</button>


                                </form>



                            </div>
                        </Fade>
                    )}


                </div>
            </div>
        )
    }
}

export default CartItem
