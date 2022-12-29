import axios from "axios";
import { useState } from "react";
import './login.css'
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useState("");
    const [message, setMessage] = useState("");
    function loginForm(e) {
        e.preventDefault()
        let check = true
        if (check == true) {
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/auth/signin',
                data: {
                    username: username,
                    password: password
                }
            })
                .then((response) => {

                    console.log(response)
                    setJwt(response.data.accessToken)
                    localStorage.setItem("token", response.data.accessToken)
                    localStorage.setItem("username", response.data.username)
                    window.location.href = "http://localhost:3000/home"
                }, (error) => {
                    setMessage("Tài khoản hoặc mật khẩu không chính xác");
                });
        }

    }
    return (
        <div className="bodylogin ms-auto justify-content-center">
            <div className="wrapper-login">
            <div className="signupDiv2"></div>
                <div className="container-reg">
                    <div className="row col-lg-4 col-lg-offset-4 THclassName" >
                        <form>
                            <h2 class="form-signin-heading" text="Login">Login</h2>
                            <br />
                            <input type="text" id="email" name="Username" placeholder="username" class="form-control" onChange={(e) => setUsername(e.target.value)} /> <br />
                            <input type="password" placeholder="Password" id="password" name="password" class="form-control" onChange={(e) => setPassword(e.target.value)} /> <br />

                            <div className="form-group">
                                <small id="emailHelp" class="form-text text-muted">{message}</small>
                            </div>
                            <button type="submit" class="btn btn-primary" onClick={loginForm}>Login</button>

                            <div class="inline">
					            <a href="/home" class="inline1">Đi tới trang chủ</a>
					            <a href="/register" class="inline2">Tạo tài khoản mới</a>
				            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}