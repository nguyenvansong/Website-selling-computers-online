import "./main.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Swal from 'sweetalert2';
import { Link, useParams, useNavigate } from "react-router-dom";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';

export default function ListCategory() {
  const navigate = useNavigate();
  const [productID, setProductID] = useState();
  const [show, setShow] = useState(false);
  
  const [search, setSearch] = useState("");
  const [offset, setOffSet] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [field, setField] = useState("productID");
  const [totalPage, setTotalPage] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setProductID(id);
    setShow(true);
  };

  const [image, setImage] = useState();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    loadProduct();
  }, [offset, pageSize, search, field]);

  const loadProduct = async () => {
    const result = await axios.get(`http://localhost:8080/product/getAll/findByProductName?productName=${search}&offset=${offset}&pageSize=${pageSize}&field=${field}`
    );
    if(result.response){
      Swal.fire({
        title: 'Thông báo',
        text: `${result.response.data.error ||  result.response.data.userMsg}`,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }else{
      setProducts(result.data.content);
      setTotalPage(result.data.totalPages);
    }
  };

  const { id } = useParams();

  const deleteProduct = async (id) => {
    const expiresAt = localStorage.getItem('expiresAt');
    const expirationDate = new Date(expiresAt);
    const now = new Date();
    if(now < expirationDate){
      await axios.delete(`http://localhost:8080/product/delete/${id}`,{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((res) => {
        Swal.fire({
          title: 'Thông báo',
          text: 'Xóa thành công',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      })
      .catch((err) => {
        Swal.fire({
          title: 'Thông báo',
          text: `${err.response.data.error ||  err.response.data.userMsg}`,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      });
      loadProduct();
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
        <title>Quản lý sản phẩm</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Main CSS*/}
        <link rel="stylesheet" type="text/css" href="main.css" />
        {/* Custom styles for this template */}

        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v6.3.0/css/all.css"
        />
        {/* bootstrap */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
          crossorigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
          crossorigin="anonymous"
        ></script>

        <main className="app-content">
          <div className="app-title" style={{padding: '10px 30px'}}>
            <ul className="app-breadcrumb breadcrumb side" style={{margin: 0}}>
              <li className="breadcrumb-item active">
                <a href="#">
                  <b style={{color: 'black', fontSize: '14px'}}>Danh sách sản phẩm</b>
                </a>
              </li>
            </ul>
            <div id="clock" />
          </div>
          <form>
            <div className="row">
              <div className="col-md-12">
                <div className="tile">
                  <div className="tile-body">
                    <div className="row element-button">
                      <div className="col-sm-2">
                        <a
                          className="btn btn-add btn-sm"
                          href="/admin/product/AddProduct"
                          title="Thêm"
                          style={{height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                        >
                          <i className="fas fa-plus" />
                          Thêm sản phẩm
                        </a>
                      </div>
                      <div className="col-sm-2">
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
                    <div className="col-sm-2 sort_button" style={{width: 100}}>
                      <select class="form-select" onClick={sort} style={{border: 'none', padding: 0}}>
                        <option selected>Sort By</option>
                        <option value="productID">Id</option>
                        <option value="productName">Name</option>
                      </select>
                    </div>
                    <div className="col-sm-2 page_size_button" style={{width: 150}}>
                      <select class="form-select" onClick={onClickPageSize}  style={{border: 'none', padding: 0}}>
                        <option selected>---Page Size-----</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                    </div>

                    <table
                      className="table table-hover table-bordered js-copytextarea table-category"
                      id="sampleTable"
                    >
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Price</th>
                          <th scope="col">Image</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index) => (
                          <tr>
                            <th scope="row" key={index}>
                              {index + 1}
                            </th>
                            <td>{product.productID}</td>
                            <td>
                              <Link to={`ViewProduct/${product.productID}`}>
                                {product.productName}
                              </Link>
                            </td>
                            <td>{product.price.toLocaleString({useGrouping: true})}</td>
                            <td>
                              <img
                                src={`http://localhost:8080/getimage/product/${product.productImage}`}
                                alt="avatar"
                                width={60}
                                height={50}
                              />
                            </td>
                            <td>
                              <Link
                                className="btn btn-outline-primary mx-2 edit"
                                to={`EditProduct/${product.productID}`}
                              >
                                <i className="fas fa-edit" />
                              </Link>
                              <Button
                                variant="primary"
                                onClick={() => handleShow(product.productID)}
                                type="button"
                                className="btn btn-danger mx-2"
                                data-bs-toggle="modal"
                                data-bs-target="#basicModal"
                              >
                                <i className="fas fa-trash-alt" />
                              </Button>

                              <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Xóa sản phẩm</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  Bạn có chắc chắn muốn xóa?
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={() => {
                                      deleteProduct(productID);
                                    }}
                                  >
                                    Xóa
                                  </Button>
                                  <Button
                                    variant="primary"
                                    onClick={handleClose}
                                  >
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
          </form>
        </main>
      </div>
    </div>
  );
}
