import "./main.css";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";
import Swal from 'sweetalert2';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddProduct() {
  let navigate = useNavigate();

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const formData = new FormData();

  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [productDecription, setProductDecription] = useState();
  const [discount, setDiscount] = useState();
  const [brandId, setBrandId] = useState();
  const [categoryId, setCategoryId] = useState();
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const resultBrands = await axios.get("http://localhost:8080/brand/getAll");
    if(resultBrands.response){
      Swal.fire({
        title: 'Thông báo',
        text: `${resultBrands.response.data.error ||  resultBrands.response.data.userMsg}`,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }else{
      setBrands(resultBrands.data);
    }
    const resultCategories = await axios.get(
      "http://localhost:8080/category/getAll"
    );
    if(resultCategories.response){
      Swal.fire({
        title: 'Thông báo',
        text: `${resultCategories.response.data.error ||  resultCategories.response.data.userMsg}`,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }else{
      setCategories(resultCategories.data);
    }
  };

  const onImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const onBrandChange = (e) => {
    const selectedId = e.target.value;
    setBrandId(selectedId)
  };
  const onCategoryChange = (e) => {
    const selectedId = e.target.value;
    setCategoryId(selectedId)
  };

  const onDiscountChange = (e) => {
    setDiscount(e.target.value)
  };
  const onDecriptionChange = (e) => {
    setProductDecription(e.target.value)
  };
  const onPriceChange = (e) => {
    setPrice(e.target.value)
  };
  const onNameChange = (e) => {
    setProductName(e.target.value)
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("productDecription", productDecription);
    formData.append("discount", discount);
    formData.append("brandId", brandId);
    formData.append("categoryId", categoryId);
    formData.append("productImage", productImage);

    const expiresAt = localStorage.getItem('expiresAt');
    const expirationDate = new Date(expiresAt);
    const now = new Date();
    if(now < expirationDate){
      await axios.post("http://localhost:8080/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then(() => {
        Swal.fire({
          title: 'Thông báo',
          text: 'Thêm thành công',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/admin/product");
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: 'Thông báo',
          text: `${err.response.data.error ||  err.response.data.userMsg}`,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      });
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
  return (
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
        <div className="app-title mt-5">
          <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item">
              <a href="/admin/product">Danh sách sản phẩm</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Thêm sản phẩm</a>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Thêm sản phẩm</h3>
              <div className="tile-body">
                <form className="row" onSubmit={(e) => onSubmit(e)}>
                  <div className="group col-md-4">
                    <label className="control-label">Tên sản phẩm </label>
                    <input
                      required
                      type={"text"}
                      className="form-control"
                      placeholder="Tên sản phẩm"
                      minLength={3}
                      maxLength={255}
                      name="productName"
                      value={productName}
                      onChange={(e) => onNameChange(e)}
                    />
                  </div>

                  <div className="form-group col-md-4">
                    <label className="control-label">Giá tiền</label>
                    <input
                      required
                      type={"number"}
                      className="form-control"
                      placeholder="Giá"
                      min={0}
                      name="price"
                      value={price}
                      onChange={(e) => onPriceChange(e)}
                    />
                  </div>

                  <div className="form-group col-md-4">
                    <label className="control-label">Sale</label>
                    <input
                      required
                      type={"number"}
                      className="form-control"
                      placeholder="Giảm giá"
                      name="discount"
                      min={0}
                      max={100}
                      value={discount}
                      onChange={(e) => onDiscountChange(e)}
                    />
                  </div>

                  <div className="form-group col-md-4">
                    <label className="control-label">Thương hiệu</label>
                    <Select fullWidth onChange={onBrandChange} required>
                      {brands.map((brand) => (
                        <MenuItem key={brand.brandId} value={brand.brandId}>
                          {brand.brandName}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div className="form-group col-md-4">
                    <label className="control-label">Danh mục</label>
                    <Select fullWidth onChange={onCategoryChange} required>
                      {categories.map((category) => (
                        <MenuItem
                          key={category.categoryID}
                          value={category.categoryID}
                        >
                          {category.categoryName}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div className="mb-3 col-md-5">
                    <label className="control-label">Ảnh sản phẩm</label>
                    <input
                      type={"file"}
                      className="form-control"
                      placeholder="Upload"
                      name="file"
                      required
                      onChange={onImageChange}
                    />
                  </div>

                  <div className="form-group col-md-10">
                    <label className="control-label">Mô tả</label>
                    <textarea
                      required
                      className="form-control"
                      placeholder="Mô tả"
                      name="productDecription"
                      value={productDecription}
                      onChange={(e) => onDecriptionChange(e)}
                    ></textarea>
                  </div>
                  <div>
                    <button type="submit" class="btn btn-success">
                      Lưu lại
                    </button>{" "}
                    &nbsp;
                    <Link
                      to="/admin/product"
                      class="btn btn-outline-danger mx-2 cancel"
                    >
                      Hủy bỏ
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Essential javascripts for application to work*/}
      {/* The javascript plugin to display page loading on top*/}
    </div>
  );
}
