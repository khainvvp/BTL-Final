import { useState } from 'react'
import { useEffect } from 'react'
import './BookDetail.css'
import axios from "axios"
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
export default function () {
    const [book, setBook] = useState("")
    const [ratings, setRatings] = useState("")
    const [comment, setComment] = useState(null)
    const [star, setStar] = useState(null)
    const [img, setImg] = useState("")
    const [err, setErr] = useState("")
    const [message, setMessage] = useState("")
    const [count, setCount] = useState("1")
    let { id } = useParams();
    function linkImg(img) {
        let url = "http://localhost:8080/api/files/" + img;
        return url;
    }

    function test(rating) {
        let res = ""

        for (let i = 1; i <= parseInt(rating.star); i++) {
            res += "<span class='fa fa-star checked'></span>";
        }
        for (let i = parseInt(rating.star) + 1; i <= 5; i++) {
            res += "<span class='fa fa-star'></span>";
        }
        return res;
    }
    function submitForm(e) {
        e.preventDefault()
        let check = true
        if (!star) {
            setErr("Vui lòng đánh giá sách")
            check = false
        }
        if (check == true) {
            let bodyFormData = new FormData();
            bodyFormData.append("comment", comment)
            bodyFormData.append("star", star)
            axios({
                method: 'post',
                url: `http://localhost:8080/api/book/${id}/comments`,
                data: bodyFormData,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                    ,
                    "Content-Type": "multipart/form-data"
                },
            })
                .then(response => {
                    console.log(response)
                    window.location.href = `http://localhost:3000/home/book/${id}`
                })
                .catch(err => console.log(err))
        }
    }
    function chooseStar(e) {
        var x = parseFloat(e.target.dataset.star)
        var liStars = document.getElementsByClassName("star")
        for (let item of liStars) {
            if (item.classList.contains("selected"))
                item.classList.remove("selected")
        }
        for (let item of liStars) {
            if (parseFloat(item.dataset.star) <= x)
                item.classList.add("selected")
        }
        setStar(x)

    }
    function addToCart() {
        if (localStorage.getItem("cart")) {
            let cart = JSON.parse(localStorage.getItem("cart"))
            let check = false
            cart.forEach(product => {
                if (product.book.id == book.id) {
                    check = true
                    product.quantity = String(parseInt(product.quantity) + parseInt(count));
                    console.log(product)
                }
            })
            if (check == true) {
                localStorage.setItem("cart", JSON.stringify(cart))
            }
            else {
                cart.push({
                    "book": book,
                    "quantity": count
                })
                localStorage.setItem("cart", JSON.stringify(cart))
            }
        }
        else {
            let cart = []
            let product = {
                "book": book,
                "quantity": count
            }
            cart.push(product)
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }
    useEffect(() => {
        axios.get('http://localhost:8080/api/book/' + id)
            .then(data => {
                setBook(data.data.data)
                setImg(`http://localhost:8080/api/files/${data.data.data.imageFeatureBooks[0].url}`)
            })
            .catch(err => console.log(err))

        axios.get(`http://localhost:8080/api/book/${id}/comments`)
            .then(data => {
                setRatings(data.data.data)
            })
            .catch(err => console.log(err))
    }, []);
    return (
        <div>
            <div class="container mt-5">
                <div class="row">
                    <div class="col-6">
                        <img class="img" src={img} alt="" />
                    </div>
                    <div class="col-6">
                        <div class="info-part row">
                            <div>
                                <h1 className='h1'>{book.title}</h1>
                                <h4>Tác giả: {book.author}</h4>
                            </div>
                        </div>
                        <div class="info-part row mt-3">
                            <h4 class="type-book">Thể loại: {book.typeBook}</h4>
                        </div>
                        <h4 className='mt-1'>Số trang: {book.totalPage}</h4>
                        

                        <div class="row">
                            <div className="d-flex">
                                <div class="mr-3 col-2">
                                    <input type="number" onChange={e => setCount(e.target.value)} class="form-control" min={1} />
                                </div>
                                <button class="btn btn-warning" onClick={addToCart} data-toggle="modal" data-target={`#exampleModal${book.id}`}>Thêm vào rỏ hàng</button>
                                <div class="modal fade" id={`exampleModal${book.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-body">
                                                Thêm vào rỏ hàng thành công
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col">

                        <div class="row pl-0 mt-3">
                            <div>{err}</div>
                            <form id="usrform" className="pl-0">
                                <ul class="ratings rtST">
                                    <li class="star" onClick={chooseStar} data-star="5"></li>
                                    <li class="star" onClick={chooseStar} data-star="4"></li>
                                    <li class="star" onClick={chooseStar} data-star="3"></li>
                                    <li class="star" onClick={chooseStar} data-star="2"></li>
                                    <li class="star" onClick={chooseStar} data-star="1"></li>
                                </ul>
                                <textarea className='cmtCus' rows="4" cols="70" name="comment" form="usrform" onChange={e => setComment(e.target.value)}></textarea>
                                <br></br>
                                <button class="btn btn-success sentFB" onClick={submitForm}>Gửi phản hồi</button>
                            </form>
                        </div>
                        <div class="row">
                            <div></div>
                        </div>
                        {
                            ratings && ratings.map(rating => {
                                return (
                                    <div class="row mt-2 AllFB">
                                        <div class="col">
                                            <div className="row">
                                                <div className="d-flex pl-0">
                                                    <div class="col-1 pl-0 usnm">{rating.user.username}</div>
                                                    <div class="rating">{parse(test(rating))}</div>
                                                </div>

                                            </div>
                                            <div class="row pt-0 pb-0">
                                                <div class="col-6 pl-0 pt-0 pb-0 feedBack">Phản hồi: {rating.comment}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}