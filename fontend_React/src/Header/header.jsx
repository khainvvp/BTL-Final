import { useEffect, useState } from "react";
import "./header.css"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
export default function Header(){
    const [username,setUsername] = useState("")
    function logOut(){
        localStorage.clear();
        localStorage.clear()
        window.location.href="/"
    }
    useEffect(()=>{
        setUsername(localStorage.getItem("username"))
    },[]);
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <Link class="nav-link" to="/home"><p className="hdr-link tt">Trang chủ</p> <span class="sr-only">(current)</span></Link>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="gio-hang"><img className="cartImg" src={require("./images/cart-item.png")} width="30" /></a>
                        </li>
                    </ul>
                    <div >
                        <div style={{display: !username? "block":"none" }}>
                            <DropdownButton variant="dark" title="Chào mừng đến với thư viện sách !">
                                <Dropdown.Item href="/login">Đăng nhập</Dropdown.Item>
                                <Dropdown.Item href="/register">Đăng ký</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <div style={{ display: username ? "flex" : "none" }}>
                            <div>
                                <DropdownButton variant="dark" id="dropdown-basic-button" title={username}>
                                    <Dropdown.Item href="lich-su"><p>Lịch sử mua hàng</p><span class="sr-only">(current)</span></Dropdown.Item>
                                    <Dropdown.Divider />
                                    <a href="/home" onClick={logOut} className="lgout" >Đăng xuất</a>
                                </DropdownButton>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </nav>         
        </div>
    );
}