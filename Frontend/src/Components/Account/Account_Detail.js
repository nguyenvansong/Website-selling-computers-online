import "./main.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Account_Detail() {
  const { id } = useParams();
  
  const [account, setAccount] = useState({
    accountID:0,
    userName: "",
    fullName: "",
    password: "",
    address: "",
    phone: "",
    email: "",
    accountStatus: 0,
    accountRole: 0,
    accountImage: "",
  });

  const {accountID, userName, fullName, address, phone, email,accountStatus,accountRole,accountImage } =
    account;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await axios.get(`http://localhost:8080/account/getbyid/${id}`);
    if(result.response){
      Swal.fire({
        title: 'Thông báo',
        text: `${result.response.data.error ||  result.response.data.userMsg}`,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }else{
        const result2 = result.data;
        setAccount({
          userName: result2[0].userName,
          fullName: result2[0].fullName,
          password: result2[0].password,
          address: result2[0].address,
          phone: result2[0].phone,
          email: result2[0].email,
          accountStatus: result2[0].accountStatus,
          accountRole: result2[0].accountRole
        });
    }
  };
  return (
    <div>
      <title>Quản lý tài khoản</title>
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
              <a href="/admin/account">Danh sách tài khoản</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Chi tiết tài khoản</a>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col">
            <div className="tile">
              <h3 className="tile-title">Chi tiết tài khoản</h3>
              <div className="tile-body">
                <form className="row">
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label className="control-label">ID </label>
                      <input
                        placeholder="#CD12837"
                        className="form-control"
                        type="text"
                        disabled
                        value={accountID}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label className="control-label">Tài khoản </label>
                      <input
                        placeholder="thanhngan01"
                        className="form-control"
                        type="text"
                        disabled
                        value={userName}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-4">
                      <label className="control-label">Họ và tên</label>
                      <input
                        placeholder="Hồ Thị Thanh Ngân"
                        className="form-control"
                        type="text"
                        disabled
                        value={fullName}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label className="control-label">Email </label>
                      <input
                        placeholder="thanhngan@gmail.com"
                        className="form-control"
                        type="text"
                        disabled
                        value={email}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-4">
                      <label className="control-label">Trạng thái </label>
                      <input
                        placeholder="Đang hoạt động"
                        className="form-control"
                        type="text"
                        disabled
                        value={accountStatus == 1 ? "Hoạt động" : "Đã xóa"}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label className="control-label">Địa chỉ </label>
                      <input
                        placeholder="155-157 Trần Quốc Thảo, Quận 3, Hồ Chí Minh"
                        className="form-control"
                        type="text"
                        disabled
                        value={address}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-4">
                      <label className="control-label">Số điện thoại</label>
                      <input
                        placeholder="0926737168"
                        className="form-control"
                        type="text"
                        disabled
                        value={phone}
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <label className="control-label">Chức vụ</label>
                      <input
                        placeholder="User"
                        className="form-control"
                        type="text"
                        disabled
                        value={accountRole == 1 ? "Khách hàng" : "Admin"}
                      />
                    </div>
                  </div>

                  <br></br>
                  <p>
                    <a href="/admin/account" className="btn-return">Quay lại</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
