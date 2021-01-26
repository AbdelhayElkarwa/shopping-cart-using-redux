import React, { Component } from 'react'
import { connect } from 'react-redux'
import './filter.css'
import { sortProducts, filterProducts } from '../redux/actions.js/productAction'

export class Filter extends Component {


    render() {

        return (
            !this.props.filteredProducts ? (<div>loading...</div>) :
                (<div className='row filter'>
                    <div className='col-4 product-num'>{`${this.props.filteredProducts.length} Product(s)`}</div>
                    <div className='col-4'>Order {''}
                        <select value={this.props.sort} onChange={(e) => this.props.sortProducts(this.props.filteredProducts, e.target.value)}>
                            <option value='Latest'>Latest</option>
                            <option value='Lowest'>Lowest</option>
                            <option value='Heighest'>Heighest</option>
                        </select>
                    </div>
                    <div className='col-4'> Filter {''}
                        <select value={this.props.size} onChange={(e) => this.props.filterProducts(this.props.products, e.target.value)}>
                            <option value=''>All</option>
                            <option value='XS'>XS</option>
                            <option value='S'>S</option>
                            <option value='L'>L</option>
                            <option value='XL'>XL</option>
                            <option value='XLL'>XLL</option>
                        </select>
                    </div>

                </div>)
        )
    }
}

const mapStateToProps = (state) => {
    return {
        size: state.products.size,
        sort: state.products.sort,
        products: state.products.items,
        filteredProducts: state.products.filteredItems,
    }
}

export default connect(mapStateToProps, { filterProducts, sortProducts })(Filter)
