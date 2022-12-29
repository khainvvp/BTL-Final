import { useState, useEffect } from "react";
import Background from '../Header/images/bgr.png'
import axios from 'axios';
import './localhost.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function BookList({ itemsPerPage }) {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [currentItems, setCurrentItems] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const [username, setUsername] = useState(null);
    function linkImg(post) {
        let url = "http://localhost:8080/api/files/" + post;
        return url;
    }
    function Items({ currentItems }) {
        return (
            <table class="table table-bordered">
                <thead className="thead-dark">
                    <tr className="text-center">
                        <th scope="col">Tiêu đề</th>
                        <th scope="col">Tác giả</th>
                        <th scope="col">Thể loại</th>
                        <th scope="col">Ảnh bìa</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {currentItems &&
                        currentItems.map(book => {
                            return (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.typeBook}</td>
                                    <td scope="col-2" >
                                        <img class="img-bd" src={
                                            linkImg(book.imageFeatureBooks[0].url)
                                        } alt="" />
                                    </td>
                                </tr>)
                        })
                    }
                </tbody>
            </table>
        );
    }
    useEffect(() => {
        setUsername(localStorage.getItem("username"))
        axios.get('http://localhost:8080/api/books')
            .then(data => {
                setBooks(data.data.reverse())
                const endOffset = itemOffset + itemsPerPage;
                console.log(`Loading items from ${itemOffset} to ${endOffset}`);
                setCurrentItems(data.data.slice(itemOffset, endOffset));
            })
            .catch(err => console.log(err));
    }, [itemOffset, itemsPerPage]);
    return (
        <div className="bg" style={{backgroundImage: `url(${Background})`,backgroundPosition: 'center', backgroundRepeat: "no-repeat", backgroundSize: "cover", width: '100vw', height: '100vh'}}>
            <div className="container mt-5">
                <div class="d-flex justify-content-between">
                    <h1>Thư viện sách</h1>
                </div>
            </div>
            <div className="container mt-3">
                <Items currentItems={currentItems} />
            </div>
        </div>
    )
}