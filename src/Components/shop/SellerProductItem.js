import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import checkmarkImage from '../../images/checkmark.png'
import ProductContext from '../../context/products/ProductContext'

const SellerProductItem = (props) => {

  const productContext = useContext(ProductContext);
  const { deleteProduct, fetchSellerProducts } = productContext;

  const limitWords = (name) => {
    const word = name.slice(0, 30);
    return name.length > 30 ? `${word}...` : word
  }

  const handleClick = (e) => {
    e.preventDefault();
    deleteProduct(props.id);
    fetchSellerProducts();
    
  }
  return (
    <div className='col-md-3 col-12 mb-4'>
      <div className="card">
        <img src={props.imageUrl} className="card-img-top" alt="Product" style={{ height: '250px', padding: '10px' }} />
        <div className="card-body">
          <h5 className="card-title">{limitWords(props.name)}</h5>
          <div>
            <img src={require(`../../images/ratings/rating-${(props.rating.stars) * 10}.png`)} alt="Count" style={{ width: '100px', height: '20px' }} />
            <span className='small-text mx-2'>{props.rating.count}</span>
          </div>
          <div className='d-flex justify-content-between mt-1'>
            <div className="text-success large-text">
              ${(props.priceCents / 100).toFixed(2)}
            </div>
            <div style={{ textWrap: 'nowrap' }}>
              <img src={checkmarkImage} style={{ height: '20px' }} className='mx-1' alt="Verified Seller" />
              Verified Seller
            </div>
          </div>
          <p className="card-text">{props.description}</p>
          <div className='d-flex justify-content-between'>
            <div className='mt-2' style={{ textWrap: 'nowrap' }}>
              <span className='text-success'>In stock</span>
              <i class="fa-solid fa-pen-to-square margin-left-7"></i>
            </div>
            <button style={{ whiteSpace: 'nowrap' }} onClick={handleClick} className="btn btn-danger product-item-add-button">
              Delete
              <i className="fa-solid fa-trash margin-left-7"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

SellerProductItem.defaultProps = {
  name: '',
  description: '',
  ratings: {
    stars: 0,
    count: 0
  },
  priceCents: 0,
  keywords: ['trending', 'cost effective', 'durable']
}

SellerProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: {
    stars: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired
  },
  priceCents: PropTypes.number.isRequired,
}




export default SellerProductItem