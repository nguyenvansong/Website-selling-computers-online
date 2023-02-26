import ContactPage from '../Pages/ContactPage';
import DiscountPage from '../Pages/DiscountPage';
import HomePage from '../Pages/HomePage';
import LaptopPage from '../Pages/LaptopPage';
import NewPage from '../Pages/NewPage';
import Product from '../Components/Product';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Pay from '../Components/Pay';
import SearchResult from '../Components/SearchResult';
import ForgotPassword from '../Components/ForgotPassword';
import Cart from '../Components/Cart';
import Admin from '../Layout/Admin'
import ListCategory from '../Components/Category/ListCategory';
import AddCategory from '../Components/Category/AddCategory';
import EditCategory from '../Components/Category/EditCategory';
import ListBrand from "../Components/Brand/ListBrand"
import AddBrand from "../Components/Brand/AddBrand";
import EditBrand from "../Components/Brand/EditBrand"
import ListImage from "../Components/Image/ListImage";
import AddImage from "../Components/Image/AddImage";
import EditImage from "../Components/Image/EditImage";
import ListProduct from "../Components/ProductAdmin/ListProduct"
import AddProduct from "../Components/ProductAdmin/AddProduct";
import EditProduct from "../Components/ProductAdmin/EditProduct";
import ViewProduct from "../Components/ProductAdmin/Product_Detail";
import ListAccount from "../Components/Account/ListAccount";
import AddAccount from "../Components/Account/AddAccount";
import EditAccount from "../Components/Account/EditAccount";
import ViewAccount from "../Components/Account/Account_Detail";
import CategoryPage from '../Pages/CategoryPage';
import MainLayout from "../Layout/MainLayout";
import Notification from "../Components/Notification";
import { Fragment } from 'react';
import ListOrder from '../Components/OrderAdmin/ListOrder'
import UpdateOrder from '../Components/OrderAdmin/UpdateOrder'
import UpdateAccount from "../Components/UpdateAccount";
import List from "../Components/Order/List";
import OrderDetail from "../Components/Order/OrderDetail";
import Report from "../Components/Baocaothongke";

const laptopType = ["Laptop Acer","Laptop Asus", "Laptop Dell", "Laptop HP", "Laptop"];
const publicRoutes = [
    {path: "/", component: <HomePage />},
    {path: "/laptop/laptopacer", component: <LaptopPage laptopType={laptopType[0]}/>},
    {path: "/laptop/laptopasus", component: <LaptopPage laptopType={laptopType[1]}/>},
    {path: "/laptop/laptopdell", component: <LaptopPage laptopType={laptopType[2]}/>},
    {path: "/laptop/laptophp", component: <LaptopPage laptopType={laptopType[3]}/>},
    {path: "/laptop", component: <LaptopPage laptopType={laptopType[4]}/>},
    {path: "/danh-muc", component: <CategoryPage />},
    {path: "/khuyenmai", component: <DiscountPage />},
    {path: "/tintuc", component: <NewPage />},
    {path: "/lienhe", component: <ContactPage />},
    {path: "/product/:id", component: <Product />},
    {path: "/login", component: <Login />, layout: null},
    {path: "/forgotpassword", component: <ForgotPassword />, layout: null},
    {path: "/register", component: <Register />, layout: null},
    {path: "/update-account", component: <UpdateAccount />},
    {path: "/list-order", component: <List />},
    {path: "/order-detail", component: <OrderDetail />},
    
    {path: "/search", component: <SearchResult />},
    {path: "/error", component: <Notification message={null}/> , layout: null},
    
    
]

const isAuthenticated = localStorage.getItem('token') ? true : false;

const isAdmin = localStorage.getItem('role') === 'ADMIN' ? true : false;

const component = (Comp) => {
    if(!isAuthenticated){
        return <Login />
    }
    else if(!isAdmin){
        return <Notification message="Trang không tồn tại"/>
    }
    else {
        return <Comp />
    }
}

const layout = () => {
    return isAuthenticated && isAdmin ? Admin : Fragment;
}

const privateRoutes = [
    {path: "/cart", component: isAuthenticated ? <Cart /> : <Login />, layout: isAuthenticated ? MainLayout : Fragment},
    {path: "/thanh-toan", component: isAuthenticated ? <Pay /> : <Login />, layout: isAuthenticated ? MainLayout : Fragment},
    {path: "/admin/category", component: component(ListCategory), layout: layout()},
    {path: "/admin/category/AddCategory", component: component(AddCategory), layout: layout()},
    {path: "/admin/category/EditCategory/:id", component: component(EditCategory), layout: layout()},
    {path: "/admin/brand", component: component(ListBrand), layout: layout()},
    {path: "/admin/brand/AddBrand", component: component(AddBrand), layout: layout()},
    {path: "/admin/brand/EditBrand/:id", component: component(EditBrand), layout: layout()},
    {path: "/admin/image", component: component(ListImage), layout: layout()},
    {path: "/admin/image/AddImage", component: component(AddImage), layout: layout()},
    {path: "/admin/image/EditImage/:id", component: component(EditImage), layout: layout()},
    {path: "/admin/product", component: component(ListProduct), layout: layout()},
    {path: "/admin/product/AddProduct", component: component(AddProduct), layout: layout()},
    {path: "/admin/product/EditProduct/:id", component: component(EditProduct), layout: layout()},
    {path: "/admin/product/ViewProduct/:id", component: component(ViewProduct), layout: layout()},
    {path: "/admin/account", component: component(ListAccount), layout: layout()},
    {path: "/admin/account/AddAccount", component: component(AddAccount), layout: layout()},
    {path: "/admin/account/EditAccount/:id", component: component(EditAccount), layout: layout()},
    {path: "/admin/account/ViewAccount/:id", component: component(ViewAccount), layout: layout()},
    {path: "/admin/order", component: component(ListOrder), layout: layout()},
    {path: "/admin/order/EditOrder/:id", component: component(UpdateOrder), layout: layout()},
    {path: "/admin/report", component: component(Report), layout: layout()},
    
]

export {publicRoutes, privateRoutes};