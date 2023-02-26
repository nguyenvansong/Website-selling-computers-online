import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';

import "./main.css";

export default function ListAccount() {

  const [search, setSearch] = useState("");
  const [offset, setOffSet] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [field, setField] = useState("order.orderID");
  const [totalPage, setTotalPage] = useState(0);

  const [orderId, setOrderId] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setOrderId(id);
    setShow(true);
  };

  const [orderDetails, setOrderDetails] = useState([]);

  const navigate = useNavigate();
  const deleteOrder = async (id) => {
    const expiresAt = localStorage.getItem('expiresAt');
    const expirationDate = new Date(expiresAt);
    const now = new Date();
    if(now < expirationDate){
      axios({
        method: 'delete',
        url: `http://localhost:8080/order/delete/${id}`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if(res.data == 200){
          Swal.fire({
            title: 'Thông báo',
            text: 'Xóa thành công',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      
    })
    .catch((error) => {
      Swal.fire({
        title: 'Thông báo',
        text: `${error.response.data.error ||  error.response.data.userMsg}`,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    });
      loadData();
      handleClose();
    }
    else{
      Swal.fire({
          title: 'Thông báo',
          text: 'Đã hết phiên đăng nhập!',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
              navigate('/login');
            localStorage.removeItem('token');
          }
        });
    }
  };

  useEffect(() => {
    loadData();
  }, [offset, pageSize, search, field]);

  const loadData = async () => {
    const expiresAt = localStorage.getItem('expiresAt');
    const expirationDate = new Date(expiresAt);
    const now = new Date();
    if(now < expirationDate){
      const result = await axios.get(`http://localhost:8080/orderdetail/getAll/findByFullName?fullName=${search}&offset=${offset}&pageSize=${pageSize}&field=${field}`,{
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(result.response){
        Swal.fire({
          title: 'Thông báo',
          text: `${result.response.data.error ||  result.response.data.userMsg}`,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }else{
          setOrderDetails(result.data.content);
          setTotalPage(result.data.totalPages);
      }
    }
    else{
      Swal.fire({
          title: 'Thông báo',
          text: 'Đã hết phiên đăng nhập!',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
              navigate('/login');
            localStorage.removeItem('token');
          }
        });
    }
  };

  const pageNumber = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
  }
  const paginate = (number) => {
    setOffSet(number - 1);
  };

  const previous = () => {
    if (offset != 0) {
      setOffSet(offset - 1);
    }
  };
  const next = () => {
    if (offset < totalPage - 1) {
      setOffSet(offset + 1);
    }
  };
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const sort = (e) => {
    setField(e.target.value);
  };

  const onClickPageSize = (e) => {
    setPageSize(e.target.value);
  };

  return (
    <div className="App">
      <div>
        <title>Danh sách hoá đơn | Quản trị Admin</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Main CSS*/}
        <link rel="stylesheet" type="text/css" href="css/main.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
        />

        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@latest/css/boxicons.min.css"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css"
        />
        {/* Navbar*/}
        {/* Sidebar menu*/}
        <div className="app-sidebar__overlay" data-toggle="sidebar" />
        <main className="app-content">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
              <li className="breadcrumb-item active">
                <a href="#">
                  <b>Danh sách hoá đơn</b>
                </a>
              </li>
            </ul>
            <div id="clock" />
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="tile">

                <div className="title_navbar">
                  <div className="col-sm-2" style={{paddingLeft: 0}}>
                    <div class="container-3 search_button">
                      <span class="icon">
                        <i class="fa fa-search"></i>
                      </span>
                      <input
                        type="search"
                        id="search"
                        placeholder="Search..."
                        onChange={onSearchChange}
                        style={{ marginTop: -14, width: '100%' }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-2 sort_button">
                    <select class="form-select" onClick={sort}>
                      <option selected>Sort By</option>
                      <option value="order.orderID">Id</option>
                      <option value="order.account.fullName">Người mua</option>
                      <option value="order.orderDate">Ngày Mua</option>
                      <option value="product.productName">Tên sản phẩm</option>
                    </select>
                  </div>
                  <div className="col-sm-2 page_size_button">
                    <select class="form-select" onClick={onClickPageSize}>
                      <option selected>---Page Size-----</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                </div>

                <div className="tile-body">
                  <table
                    className="table table-hover table-bordered js-copytextarea table-category"
                    cellPadding={0}
                    cellSpacing={0}
                    border={0}
                    id="sampleTable"
                  >
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>ID </th>
                        <th width={150}>Người mua</th>
                        <th>Ngày mua</th>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th width="150px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {orderDetails.map((orderdetail, index) => (
                        <tr>
                          <th scope="row" key={index}>
                            {index + 1}
                          </th>
                          <td>{orderdetail.order.orderID}</td>
                          <td>{orderdetail.order.account.fullName}</td>
                          <td>{orderdetail.order.orderDate}</td>
                          <td>{orderdetail.product.productName}</td>
                          <td>{orderdetail.orderQuantity}</td>
                          <td>{orderdetail.product.price*orderdetail.orderQuantity}</td>
                          <td>
                            {orderdetail.order.orderStatus == 1 ? "Đã duyệt" : "Chưa duyệt"}
                          </td>
                          <td>
                            <Link
                              className="btn btn-outline-primary mx-2 edit"
                              to={`/admin/order/EditOrder/${orderdetail.order.orderID}`}
                            >
                              <i className="fas fa-edit" />
                            </Link>
                            <Button
                              variant="primary"
                              onClick={() => handleShow(orderdetail.order.orderID)}
                              type="button"
                              className="btn btn-danger mx-2"
                              data-bs-toggle="modal"
                              data-bs-target="#basicModal"
                            >
                              <i className="fas fa-trash-alt" />
                            </Button>

                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Xóa thương hiệu</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                Bạn có chắc chắn muốn xóa?
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={() => deleteOrder(orderId)}
                                >
                                  Xóa
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                  Hủy bỏ
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <nav>
                  <ul className="pagination">
                    <Link className="page-link" onClick={previous}>
                      <FontAwesomeIcon icon={faArrowLeft} /> Previous
                    </Link>
                    {pageNumber.map((number) => (
                      <li key={number} className="page-item">
                        <Link
                          onClick={() => paginate(number)}
                          className="page-link page_link_item"
                        >
                          {number}
                        </Link>
                      </li>
                    ))}
                    <Link className="page-link" onClick={next}>
                      Next <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
