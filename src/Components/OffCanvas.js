import React from 'react'
import Sidebar from './Sidebar'

const OffCanvas = () => {
  return (
    <div className="offcanvas offcanvas-start" id="demo">
      <div className="offcanvas-header">
        <h1 className="offcanvas-title">Menu</h1>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
      </div>
      <div className="offcanvas-body">
    <Sidebar />
      </div>
    </div>
  )
}

export default OffCanvas
