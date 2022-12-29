import axios from "axios";
import { useState } from "react";
import "./register.css"
export default function SignUp() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState("");
    const roles = ["user"];
    function signUpForm(e) {
        e.preventDefault();
        let check = true
        if (check == true) {
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/auth/signup',
                data: {
                    username: username,
                    password: password,
                    roles: roles,
                    email: email
                }
            })
                .then((response) => {
                    console.log(response)
                    window.location.href = "http://localhost:3000/login"
                })
                .catch(error => {
                    setMessage("Sai mẫu đăng ký hoặc người dùng đã tồn tại");
                });
        }

    }
    return (
        <div className="signupDiv1">
            <div className="signupDiv2"></div>
            <div className="container-reg">
                <div className="row col-lg-4 col-lg-offset-4 signupDiv4">
                    <form className="formClass">
                        <h3 className="form-signin-heading">Đăng ký tài khoản</h3>
                        <div className="form-group">
                            <div class="">
                                <label for="exampleInputEmail1">Username</label>
                                <input type="text" class="form-control" onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <small id="emailHelp" class="form-text text-muted">{message}</small>
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={signUpForm}>Đăng ký</button>
                    </form>
                </div>
            </div>
        </div>
    );
}