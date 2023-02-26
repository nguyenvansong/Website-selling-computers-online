import "./order.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function OrderDetail() {
  const order = useSelector(state => state.order);
  const user = useSelector(state => state.user);
  const product = useSelector(state => state.product);
    return (
        <div>
          <title>Đơn hàng</title>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* Main CSS*/}
          <link rel="stylesheet" type="text/css" href="OrderDetail.css" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css" />
          {/* or */}
          <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css" />
          {/* Font-icon css*/}
          <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css" />
          <main className="app-content">
            <div className="app-title" style={{marginLeft: -10}}>
              <ul className="app-breadcrumb breadcrumb">
                <li className="breadcrumb-item">Thông tin đơn hàng</li>
              </ul>
            </div>
            <div className="row">
              <div className="col-md-12">
                <form className="row">
                  <div className="form-group  col-md-4">
                    <label className="control-label">Tên khách hàng</label>
                    <input value={user.fullName} className="form-control" type="text" disabled />
                  </div>
                  <div className="form-group  col-md-4">
                    <label className="control-label">Số điện thoại khách hàng</label>
                    <input value={user.phone} className="form-control" type="text" disabled />
                  </div>
                  <div className="form-group  col-md-4">
                    <label className="control-label">Địa chỉ khách hàng</label>
                    <input value={user.address} className="form-control" type="text" disabled />
                  </div>
                  <div className="form-group  col-md-4">
                    <label className="control-label">Ngày mua</label>
                    <input value={order.orderDate} className="form-control" type="text" disabled />
                  </div>
                  <div className="form-group  col-md-4">
                    <label className="control-label">Tên sản phẩm </label>
                    <input value={order.productName} className="form-control" type="text" disabled />
                  </div>
                  <div className="form-group  col-md-4">
                    <label className="control-label">Số lượng</label>
                    <input value={order.orderQuaity} className="form-control" type="text" disabled />
                  </div>
                  <div className="form-group  col-md-4">
                    <label className="control-label">Đơn giá</label>
                    <input value={order.price} className="form-control" type="number" disabled />
                  </div>
                  <div className="form-group  col-md-4">
                    <label className="control-label">Thành tiền</label>
                    <input value={order.price * order.orderQuaity} className="form-control" type="number" disabled />
                  </div>
                  <div style={{display: 'flex'}}>
                    <label className="control-label" style={{marginRight: 10}}>Ảnh sản phẩm</label>
                    <img style={{width: 100}} className="img_card_person" src={`http://localhost:8080/getimage/product/${product.productImage}`} alt=""
                            disabled/>
                  </div>
                  <br/>
                  <br/>
                </form>
                  <div><Link to='/list-order' style={{fontSize: 16, padding: '10px 20px',borderRadius: 4, backgroundColor: '#4eac4b', color: 'white'}}>Quay lại</Link></div> 
                </div>
            </div>
          </main>
        </div>
    );
}