import { useState } from 'react';
import { useEffect } from 'react'
import './Buyed.css'
import axios from 'axios';
export default function(){
    function getStatus(status){
    }
    const [carts, setCarts] = useState("")
    useEffect(()=>{
    axios({
        method: 'get',
        url: 'http://localhost:8080/api/orders',
        headers: { 
            "Authorization":"Bearer "+localStorage.getItem("token")
        }})
        .then(data => {
            setCarts(data.data.data.reverse())
            console.log(data.data.data)
        })
        .catch(err => console.log(err));
    },[])
    return (
        <div class="container mt-5 backgr">
        <div class="card-wrapper container row">
            <div class="col col_Buyed">
                {
                   carts && carts.map(cart => {
                        let orders = cart.orders
                        return orders.map(order => {
                            return (
                                <div class="card-customer row mt-2">
                                    <div class="col-2">
                                        <img class="img-product" src={`http://localhost:8080/api/files/${order.book.imageFeatureBooks[0].url}`} alt=""/>
                                    </div>
                                    <div class="col-4 ml-3 pl-0">
                                        <div class="row pl-0">
                                            <div className="d-flex pl-0"> <p className='res_buyed res_buyed_tt'>{order.book.title}</p></div>
                                        </div>
                                        <div class="row text-justify res_buyed"> {order.book.author}</div>
                                        <div class="row text-justify res_buyed">Số lượng: {order.quantity}</div>

                                    </div>
                                </div>
                            )
                        })
                   })
                }
            </div>
        </div>
    </div>
    )
}