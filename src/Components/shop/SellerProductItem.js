import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import checkmarkImage from '../../images/checkmark.png'
import ProductContext from '../../context/products/ProductContext'
import EditProduct from './EditProduct'

const SellerProductItem = (props) => {

  const productContext = useContext(ProductContext);
  const { sellerProducts, deleteProduct, fetchSellerProducts, editStock } = productContext;


  const [stockState, setStockState] = useState(null);

  const product = {
    _id: props.id,
    name: props.name,
    description: props.description,
    imageUrl: props.imageUrl,
    rating: props.rating,
    condition: props.conditionState,
    inStock: props.inStock,
    priceCents: props.priceCents,
    keywords: props.keywords
  }

  const changeStockState = (stock) => {
    const newState = stock === 'In Stock';
    editStock(props.id, newState);
    setStockState(newState);
  }

  const limitWords = (name) => {
    const word = name.slice(0, 30);
    return name.length > 30 ? `${word}...` : word
  }
  const capitaliseFirstletter = (word) => {
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`
  }

  const handleClick = async (e) => {
    e.preventDefault();
    await deleteProduct(props.id);
    fetchSellerProducts();
  }

  const calculateStarAvg = (starArr) => {
    let starSum = 0;
    starArr.forEach((star) => {
      starSum += star;
    });
    const avg = starSum / starArr.length;
    return Math.round(avg * 2) / 2
  }

  // we used useEffect hook becuz we want the stock to display what the stock is passed to the SellerProductItem from SellerProduct when the page first mounts/loads
  // in the dependency array sellerProducts is mentioned so whenever that state changes the component should setStockState again to the latest stock status or else while navigating back to shop component shows wrong stock status
  useEffect(() => {
    setStockState(props.inStock);
  }, [sellerProducts]);


  return (
    <>
      <div className='col-md-3 col-12 mb-4'>
        <div className="card">
          <img src={props.imageUrl} className="card-img-top" alt="Product" style={{ height: '250px', padding: '10px' }} />
          <div className="card-body">
            <h5 className="card-title">{limitWords(props.name)}</h5>
            <div className='d-flex justify-content-between'>
              <div>
                <img src={require(`../../images/ratings/rating-${(calculateStarAvg(props.rating.stars || [0])) * 10}.png`)} alt="Count" style={{ width: '100px', height: '20px' }} />
                <span className='small-text mx-2'>{props.rating.count}</span>
              </div>
              <p className='card-text font-size-13'>{props.condition === 'new' ? '' : capitaliseFirstletter(props.condition)}</p>
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
            <div className='d-flex justify-content-between align-items-center'>
              <div className='mt-2' style={{ textWrap: 'nowrap' }}>
                <div className="btn-group">
                  {/* <button type="button" className={`btn btn-light text-${stockState ? 'success' : 'danger'} dropdown-toggle ${stockState}`} data-bs-toggle="dropdown" aria-expanded="false">
                    {stockState ? 'In Stock' : 'Out of Stock'}
                  </button> */}
                  {/* <ul className="dropdown-menu">
                    <li><span className="dropdown-item text-success" onClick={() => { changeStockState('In Stock') }}>In Stock</span></li>
                    <li><span className="dropdown-item text-danger" onClick={() => { changeStockState('Out of Stock') }}>Out of Stock</span></li>
                  </ul> */}
                  <select className={`text-${stockState ? 'success' : 'danger'}`} onClick={(e) => { changeStockState(e.target.value) }}>
                    <option>{stockState ? 'In Stock' : 'Out of Stock'}</option>
                    <option className='text-success' value="In Stock">In Stock</option>
                    <option className='text-danger' value={"Out of Stock"}>Out of Stock</option>
                  </select>
                </div>
              </div>
              <div>
                <button style={{ whiteSpace: 'nowrap' }} onClick={handleClick} className="btn btn-danger product-item-add-button mx-2">
                  Delete
                  <i className="fa-solid fa-trash margin-left-7"></i>
                </button>
                <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => { props.handleUpdateProduct(product) }}><i className="fa-solid fa-pen-to-square"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

SellerProductItem.defaultProps = {
  name: '',
  description: '',
  rating: {
    stars: [],
    count: 0
  },
  priceCents: 0,
  keywords: ['trending', 'cost effective', 'durable']
}

SellerProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  priceCents: PropTypes.number.isRequired,
}




export default SellerProductItem
