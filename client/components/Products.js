import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { makePriceCurrencyFormat } from '../HelperFunctions'
import CategorySelector from './CategorySelector'
import AddToCartButton from './addToCartButton'

class Products extends Component {
  render() {
    const { products, history, categoryName } = this.props
    return (
      <div className="product-list">
        <CategorySelector history={history} />
        <h4>{`${categoryName} Products`}</h4>
        <div className="container">
          <div className="row">
            {products.map(product => {
              const { id, name, price, image } = product
              return (
                <ul key={id}>
                  <div>
                    <li>
                      <img src={image} />
                    </li>
                    <li>
                      {' '}
                      <Link to={`/products/${id}`}>{name}</Link>{' '}
                    </li>
                    <li>{makePriceCurrencyFormat(price)}</li>
                    <AddToCartButton product={product} />
                  </div>
                </ul>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ products, categories }, { match: { params } }) => {
  const { categoryId } = params
  return {
    products: categoryId
      ? products.filter(product => product.categoryId === Number(categoryId))
      : products,
    categoryName:
      categoryId && categories[0]
        ? categories.find(c => c.id === Number(categoryId)).name
        : 'All'
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)
