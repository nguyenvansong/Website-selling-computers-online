import "./main.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';

export default function ListCategory() {
  const navigate = useNavigate();
  const [categoryID, setCategoryID] = useState();
  const [show, setShow] = useState(false);

  const [search, setSearch] = useState("");
  const [offset, setOffSet] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [field, setField] = useState("categoryID");
  const [totalPage, setTotalPage] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCategoryID(id)
    setShow(true);
  };
  const [categories, setCategories] = useState([]);

  const deleteCategory = async (id) => {
    const expiresAt = localStorage.getItem('expiresAt');
    const expirationDate = new Date(expiresAt);
    const now = new Date();
    if(now < expirationDate){
      await axios.delete(`http://localhost:8080/category/${id}`,{
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
      .catch((error) => {
        Swal.fire({
          title: 'Thông báo',
          text: `${error.response.data.error ||  error.response.data.userMsg}`,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      });
      loadCategories();
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
    loadCategories();
  }, [offset, pageSize, search, field]);

  const loadCategories = async () => {
    const result = await axios.get(`http://localhost:8080/category/getAll/findByCategoryName?categoryName=${search}&offset=${offset}&pageSize=${pageSize}&field=${field}`
    );
    if(result.response){
      Swal.fire({
        title: 'Thông báo',
        text: `${result.response.data.error ||  result.response.data.userMsg}`,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }else{
        setCategories(result.data.content);
        setTotalPage(result.data.totalPages);
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
        <title>Quản trị Admin</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Main CSS*/}
        <link rel="stylesheet" type="text/css" href="css/main.css" />
        <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet" />
        {/* Custom styles for this template */}
        <link href="modals.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
        />
        {/* or */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@latest/css/boxicons.min.css"
        />
        {/* Font-icon css*/}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v6.3.0/css/all.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css"
        />

        <main className="app-content">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb side">
              <li className="breadcrumb-item active">
                <a href="#">
                  <b>Danh sách danh mục</b>
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
                          href="/admin/category/AddCategory"
                          title="Thêm"
                        >
                          <i className="fas fa-plus" />
                          Thêm danh mục
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
                    <div className="col-sm-2 sort_button">
                      <select class="form-select" onClick={sort}>
                        <option selected>Sort By</option>
                        <option value="categoryID">Id</option>
                        <option value="categoryName">Name</option>
                      </select>
                    </div>
                    <div className="col-sm-2 page_size_button ">
                      <select class="form-select" onClick={onClickPageSize}>
                        <option selected>---Page Size-----</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                    </div>

                    <table className="table border shadow table-striped table-cate table-category">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Id</th>
                          <th scope="col">Tên danh mục</th>
                          <th scope="col">Hình ảnh</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map((category, index) => (
                          <tr>
                            <th scope="row" key={index}>
                              {index + 1}
                            </th>
                            <td>{category.categoryID}</td>
                            <td>{category.categoryName}</td>
                            <td>
                              <img
                                src={`http://localhost:8080/getimage/category/${category.categoryImage}`}
                                alt="avatar"
                                width={60}
                                height={50}
                              />
                            </td>

                            <td>
                              <Link
                                className="btn btn-outline-primary mx-2 edit"
                                to={`EditCategory/${category.categoryID}`}
                              >
                                <i className="fas fa-edit" />
                              </Link>
                              <Button
                                variant="primary"
                                onClick={() => handleShow(category.categoryID)}
                                type="button"
                                className="btn btn-danger mx-2"
                                data-bs-toggle="modal"
                                data-bs-target="#basicModal"
                              >
                                <i className="fas fa-trash-alt" />
                              </Button>

                              <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Xóa danh mục</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  Bạn có chắc chắn muốn xóa?
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={() => {
                                      deleteCategory(categoryID);
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
