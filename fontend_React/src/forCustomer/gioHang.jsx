import { useEffect } from 'react'
import { useState } from 'react'
import './gioHang.css'
import axios from 'axios';
export default function () {
    const [cart, setCart] = useState("")
    function addToCart() {
        let cart = JSON.parse(localStorage.getItem("cart"))
        let ids = []
        let quantities = []
        for (var i = 0; i < cart.length; i++) {
            ids.push(cart[i].book.id)
            quantities.push(cart[i].quantity)
        }
        console.log(ids.join(" "), quantities.join(" "))
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/cart/add',
            data: {
                "id": ids.join(" "),
                "quantity": quantities.join(" ")
            },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(data => {
                localStorage.removeItem("cart")
                setCart([])
                console.log(data)
            })
            .catch(err => console.log(err));
    }
    function minus(id) {
        console.log(id)
        let qltInput = document.getElementsByClassName(`input-qty-${id}`)[0]
        let number = Number(qltInput.value)
        if (number > 1) {
            number -= 1
            qltInput.value = number
            let cart = JSON.parse(localStorage.getItem("cart"))
            let check = false
            cart.forEach(product => {
                if (product.book.id == id) {
                    check = true
                    product.quantity = String(number);
                }
            })
            if (check == true) {
                localStorage.setItem("cart", JSON.stringify(cart))
            }
        }
    }
    function plus(id) {
        let qltInput = document.getElementsByClassName(`input-qty-${id}`)[0]
        let number = Number(qltInput.value)
        number += 1
        qltInput.value = number
        let cart = JSON.parse(localStorage.getItem("cart"))
        let check = false
        cart.forEach(product => {
            if (product.book.id == id) {
                check = true
                product.quantity = String(number);
            }
        })
        if (check == true) {
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }
    function linkImg(post) {
        let url = "http://localhost:8080/api/files/" + post;
        return url;
    }
    function removeProduct(id) {
        let cart = JSON.parse(localStorage.getItem("cart"))
        cart = cart.filter(product => product.book.id != id)
        setCart(cart)
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem("cart"))
        setCart(cart)
    }, [])
    return (
        <div className='backgr container mt-3'>
            <table class="table table-bordered">
            <thead className="thead-dark">
                <tr className="text-center">
                    <th scope="col">???nh b??a</th>
                    <th scope="col">Ti??u ?????</th>
                    <th scope="col">T??c gi???</th>
                    <th scope="col">s??? l?????ng</th>
                    <th scope="col">Xo??</th>

                </tr>
            </thead>
            <tbody className="text-center ">
                {
                    cart && cart.map(product => {
                        return (
                            <tr key={product.book.id}>
                                <td scope="col-2" >
                                    <img class="img-bd" src={
                                        linkImg(product.book.imageFeatureBooks[0].url)
                                    } alt="" />
                                </td>
                                <td className='cartCnf'>{product.book.title}</td>
                                <td className='cartCnf'>{product.book.author}</td>
                                <td className='cartCnf'>{product.quantity}</td>
                                <td>
                                    <div class="col container mt-3">
                                        <button class="btn btn-danger" data-toggle="modal" data-target={`#exampleModal${product.book.id}`}>Xo?? kh???i gi??? h??ng</button>
                                        <div class="modal fade" id={`exampleModal${product.book.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title confDel" id="exampleModalLabel">B???n c?? ch???c mu???n xo?? ?</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button style={{ display: cart.length >= 1 ? "block" : "none" }} type="button" onClick={() => removeProduct(product.book.id)} class="btn btn-danger" data-dismiss="modal">OK</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
            <div className="row mt-3 ">
                <div className="col-12 flex-row-reverse d-flex">
                    
                    <button className="btn payment" onClick={addToCart}>Mua ngay <i class="fa fa-paypal"></i></button>
                </div>
            </div>
        </div>
    )
    
}