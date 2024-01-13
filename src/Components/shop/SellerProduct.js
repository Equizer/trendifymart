import React, { useContext, useRef, useState } from 'react'
import ProductContext from '../../context/products/ProductContext'
import SellerProductItem from './SellerProductItem';

const SellerProduct = () => {
  const productContext = useContext(ProductContext);
  const { sellerProducts } = productContext;

  const [conditionState, setConditionState] = useState('new');
  const [productDetails, setProductDetails] = useState({ name: "", description: "", imageUrl: "", rating: { stars: 0, count: 0 }, keywords: "", condition: conditionState, inStock: true });
  const closeRef = useRef(null);
  const handleSave = () => {
    closeRef.current.click();
  }

  const handleUpdateProduct = (currentProduct) => {
    setProductDetails({ name: currentProduct.name, description: currentProduct.description, imageUrl: currentProduct.imageUrl, rating: currentProduct.rating, condition: currentProduct.condition, inStock: currentProduct.inStock });
  }


  const handleConditionChange = (condition) => {
    setConditionState(condition);
  }
  const onChange = (event) => {
    setProductDetails({ ...productDetails, [event.target.name]: event.target.value });
  }

  return (
    <>
      <div className='container my-5 mx-5'>
        <div className='row'>
          {sellerProducts.map((product) => {
            return (<SellerProductItem key={product._id} id={product._id} imageUrl={product.imageUrl} name={product.name} description={product.description} rating={product.rating} priceCents={product.priceCents} keywords={product.keywords} inStock={product.inStock} condition={product.condition} handleUpdateProduct={handleUpdateProduct} />)
          })}
        </div>
      </div>
      <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit a Product</h1>
              <button ref={closeRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <label htmlFor="productName" className="col-sm-2 col-form-label">Product Name:</label>
                  <div className="col-sm-10">
                    <input name="name" value={productDetails.name} type="text" className="form-control" id="productName" placeholder="Product Name..." onChange={onChange} />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="productDesc" className="col-sm-2 col-form-label">Product Description:</label>
                  <div className="col-sm-10">
                    <input name="description" value={productDetails.description} type="text" className="form-control" id="productDesc" placeholder="Product Description..." onChange={onChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="productPassword" className="col-sm-2 col-form-label">Add Product's Images:</label>
                  <div className="col-sm-10">
                    <input type="file" className="form-control" id="productPassword" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className='d-flex justify-content-center'>
                  <div className="row mb-3 col-4">
                    <label htmlFor="productPassword" className="col-sm-2 col-form-label" style={{ width: 'auto' }}>MRP:</label>
                    <div className="col-sm-6">
                      <input name="priceCents" value={productDetails.priceCents} type="number" className="form-control" id="productPassword" style={{ width: '100%' }} placeholder="MRP..." onChange={onChange} />
                    </div>
                  </div>
                  <div className="row mb-3 col-4 mx-2">
                    <div className="col-sm-6">
                      <div className="btn-group">
                        <button type="button" className="btn btn-danger" style={{ width: 'auto' }}>Condition</button>
                        <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                          <span className="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" onClick={() => { handleConditionChange('new') }}>New</a></li>
                          <li><a className="dropdown-item" onClick={() => { handleConditionChange('second hand') }}>Second Hand</a></li>
                          <li><a className="dropdown-item" onClick={() => { handleConditionChange('old') }}>Old</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3 col-4 mx-2">
                    <label htmlFor="keywords" className="col-sm-3 col-form-label" style={{ width: 'auto' }}>Keywords:</label>
                    <div className="col-sm-6">
                      <input name="keywords" value={productDetails.keywords} type="text" className="form-control" id="keywords" style={{ width: '100%' }} placeholder="Keywords..." onChange={onChange} />
                    </div>
                  </div>
                  <div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
              <button type="submit" onClick={handleSave} className="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SellerProduct
