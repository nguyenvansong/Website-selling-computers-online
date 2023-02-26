import "./main.css";
import axios from "axios";
import Swal from 'sweetalert2';
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import reducerSlice from "../../redux/reducer";

export default function EditAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const formData = new FormData();

  const [account, setAccount] = useState({
    userName: "",
    fullName: "",
    password: "",
    address: "",
    phone: "",
    email: "",
    accountStatus: 0,
    accountRole: 0
  });

  const {userName, fullName, password, address, phone, email,accountStatus,accountRole } =
    account;

  const [aUserName, setUserName] = useState("");
  const [aFullName, setFullName] = useState("");
  const [aPassword, setPassword] = useState("");
  const [aAddress, setAddress] = useState("");
  const [aPhone, setPhone] = useState("");
  const [aEmail, setEmail] = useState("");
  const [aAccountStatus, setAccountStatus] = useState(0);
  const [aAccountRole, setAccountRole] = useState(0);

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
        setAccountStatus(result2[0].accountStatus)
        setAccountRole(result2[0].accountRole)
        setEmail(result2[0].email)
        setPhone(result2[0].phone)
        setAddress(result2[0].address)
        setFullName(result2[0].fullName)
        setUserName(result2[0].userName)
    }
  };

  const onNameChange = (e) => {
    setFullName(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onAddressChange = (e) => {
    setAddress(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onStatusChange = (e) => {
    setAccountStatus(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onRoleChange = (e) => {
    setAccountRole(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    formData.append("userName", aUserName);
    formData.append("fullName", aFullName);
    formData.append("password", aPassword);
    formData.append("address", aAddress);
    formData.append("phone", aPhone);
    formData.append("email", aEmail);
    formData.append("accountStatus", aAccountStatus);
    formData.append("accountRole", aAccountRole);

    
      await axios
        .put(`http://localhost:8080/account/updateAccount/${id}`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if(res.data){
            Swal.fire({
              title: 'Thông báo',
              text: 'Chỉnh sửa thành công',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/admin/account");
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
  };
  return (
    <div>
      <title>Sửa nhân viên | Quản trị Admin</title>
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
      {/* Navbar*/}
      {/* Sidebar menu*/}
      <div className="app-sidebar__overlay" data-toggle="sidebar" />
      <main className="app-content">
        <div className="app-title mt-5">
          <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item">
              <a href="/admin/account">Danh sách tài khoản</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Sửa tài khoản</a>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <h3 className="tile-title">Chỉnh sửa tài khoản</h3>
              <div className="tile-body">
                <form
                  className="row"
                  onSubmit={(e) => onSubmit(e)}
                  encType="multipart/form-data"
                >
                  <div className="form-group col-md-4">
                    <label className="control-label">Họ và tên</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Họ và tên"
                      minLength={3}
                      maxLength={25}
                      required
                      name="fullName"
                      value={fullName}
                      onChange={(e) => onNameChange(e)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Địa chỉ</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Địa chỉ"
                      required
                      name="address"
                      value={address}
                      onChange={(e) => onAddressChange(e)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">Số điện thoại</label>
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="Số điện thoại"
                      required
                      name="phone"
                      value={phone}
                      onChange={(e) => onPhoneChange(e)}
                    />
                  </div>
                  <div className="form-group  col-md-4">
                    <label className="control-label">Email</label>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => onEmailChange(e)}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label className="control-label">Trạng thái</label>
                    <select
                      className="form-control"
                      id="exampleSelect2"
                      required
                      name="accountStatus"
                      value={accountStatus}
                      onChange={onStatusChange}
                    >
                      <option>-- Chọn trạng thái --</option>
                      <option value={1}>Hoạt động</option>
                      <option value={0}>Đã xóa</option>
                    </select>
                  </div>
                  <div className="form-group  col-md-3">
                    <label htmlFor="exampleSelect1" className="control-label">
                      Quyền
                    </label>
                    <select
                      className="form-control"
                      id="exampleSelect1"
                      onChange={onRoleChange}
                      name="accountRole"
                      value={accountRole}
                    >
                      <option>-- Chọn chức vụ --</option>
                      <option value={0}>Admin</option>
                      <option value={1}>Khách hàng</option>
                    </select>
                  </div>
                  <div className="form-group  col-md-4">
                    <label className="control-label">Tài khoản</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Tài khoản"
                      required
                      name="userName"
                      value={userName}
                      onChange={(e) => onUserNameChange(e)}
                    />
                  </div>
                  <div className="form-group  col-md-4">
                    <label className="control-label">Mật khẩu</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Mật khẩu"
                      name="password"
                      onChange={(e) => onPasswordChange(e)}
                    />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-outline-primary ">
                      Xác nhận
                    </button>
                    <Link
                      className="btn btn-outline-danger mx-2 cancel"
                      to="/admin/account"
                    >
                      Hủy
                    </Link>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
