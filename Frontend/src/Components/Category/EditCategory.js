import "./main.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const formData = new FormData();
  const [category, setCategory] = useState({
    categoryName: "",
  });
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const { categoryName } = category;

  const onNameChange = (e) => {
    setCategory({ ...category, categoryName: e.target.value });
    setName(e.target.value);
  };
  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    loadCategory();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    formData.append("categoryName", name);

    const expiresAt = localStorage.getItem('expiresAt');
    const expirationDate = new Date(expiresAt);
    const now = new Date();
    if(now < expirationDate){
      if (image == null) {
        await axios.put(`http://localhost:8080/category/noImage/${id}`, formData,{
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
        })
        .then((res) => {
          Swal.fire({
            title: 'Thông báo',
            text: 'Sửa thành công',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/admin/category");
            }
          });
        })
        .catch((error) => {
          Swal.fire({
            title: 'Thông báo',
            text: `${error.response.data.error ||  error.response.data.userMsg}`,
            icon: 'error',
            confirmButtonText: 'OK'
          })
        });
      } else {
        formData.append("categoryImage", image);
        await axios
          .put(`http://localhost:8080/category/withImage/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
          })
          .then(() => {
            Swal.fire({
              title: 'Thông báo',
              text: 'Sửa thành công',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/admin/category");
              }
            });
          })
          .catch((error) => {
            Swal.fire({
              title: 'Thông báo',
              text: `${error.response.data.error ||  error.response.data.userMsg}`,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          });
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

  const loadCategory = async () => {
    const expiresAt = localStorage.getItem('expiresAt');
    const expirationDate = new Date(expiresAt);
    const now = new Date();
    if(now < expirationDate){
      const result = await axios.get(`http://localhost:8080/category/getById/${id}`,{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
      });
      if(result.response){
        Swal.fire({
          title: 'Thông báo',
          text: `${result.response.data.error ||  result.response.data.userMsg}`,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }else{
          setCategory(result.data);
          setName(result.data.categoryName);
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
  return (
    <div>
      <title>Thêm nhân viên | Quản trị Adm  in</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Main CSS*/}
      <link rel="stylesheet" type="text/css" href="css/main.css" />
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
        href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css"
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n    .Choicefile {\n      display: block;\n      background: #14142B;\n      border: 1px solid #fff;\n      color: #fff;\n      width: 150px;\n      text-align: center;\n      text-decoration: none;\n      cursor: pointer;\n      padding: 5px 0px;\n      border-radius: 5px;\n      font-weight: 500;\n      align-items: center;\n      justify-content: center;\n    }\n\n    .Choicefile:hover {\n      text-decoration: none;\n      color: white;\n    }\n\n    #uploadfile,\n    .removeimg {\n      display: none;\n    }\n\n    #thumbbox {\n      position: relative;\n      width: 100%;\n      margin-bottom: 20px;\n    }\n\n    .removeimg {\n      height: 25px;\n      position: absolute;\n      background-repeat: no-repeat;\n      top: 5px;\n      left: 5px;\n      background-size: 25px;\n      width: 25px;\n      /* border: 3px solid red; */\n      border-radius: 50%;\n\n    }\n\n    .removeimg::before {\n      -webkit-box-sizing: border-box;\n      box-sizing: border-box;\n      content: '';\n      border: 1px solid red;\n      background: red;\n      text-align: center;\n      display: block;\n      margin-top: 11px;\n      transform: rotate(45deg);\n    }\n\n    .removeimg::after {\n      /* color: #FFF; */\n      /* background-color: #DC403B; */\n      content: '';\n      background: red;\n      border: 1px solid red;\n      text-align: center;\n      display: block;\n      transform: rotate(-45deg);\n      margin-top: -2px;\n    }\n  ",
        }}
      />

      <main className="app-content">
        <div className="app-title mt-5">
          <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item">
              <a href="/admin/category">Danh sách danh mục</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Sửa danh mục</a>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Sửa danh mục</h3>
              <div className="tile-body">
              <form
                  className="col"
                  onSubmit={(e) => onSubmit(e)}
                  encType="multipart/form-data"
                >
                  <div className="form-group col-md-4">
                    <label className="control-label">Tên danh mục</label>
                    <input
                      placeholder="Tên danh mục"
                      className="form-control category-name"
                      type="text"
                      minLength={3}
                      maxLength={255}
                      required
                      value={categoryName}
                      onInput={(e) => onNameChange(e)}
                    />
                  </div>

                  <div className="mb-3 col-md-5">
                    <label className="control-label">Ảnh danh mục</label>
                    <input
                      type={"file"}
                      className="form-control"
                      placeholder="Upload"
                      name="file"
                      onChange={(e) => onImageChange(e)}
                    />
                  </div>
                  <button type="submit" className="btn btn-outline-primary ">
                    Submit
                  </button>
                  <Link className="btn btn-outline-danger mx-2 cancel" to="/admin/category">
                    Cancel
                  </Link>
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