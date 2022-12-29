import { useState,useEffect } from "react";
import axios from 'axios';
import Background from '../Header/images/bgr.png'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import './Home.css';
import { useNavigate } from "react-router-dom";
export default function BookList({itemsPerPage}) {
    const navigate = useNavigate();
    const [books,setBooks] = useState([]);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [idDelete,setIdDelete] = useState(null)
    const [username,setUsername] = useState(null);
    function linkImg(post) {
        let url = "http://localhost:8080/api/files/"+post;
        return url;
    }
    function IdDelete(id){
        setIdDelete(id);
    }
    function deleteBook(){
        if(idDelete != null){
            axios({
                method: 'delete',
                url:'http://localhost:8080/api/book/'+idDelete, 
                data:null,
                headers: { 
                    "Authorization":"Bearer "+ localStorage.getItem("token"),
            }})
            .then(response => {
                console.log(response)
                window.location.href = "http://localhost:3000/root"
            })
            .catch(err => console.log(err))
            setIdDelete(null)
        }
    }
    function Items({ currentItems }) {
        return (
            <table class="table table-bordered">
            <thead className="thead-dark">
                <tr className="text-center">
                    <th scope="col">Tiêu đề</th>
                    <th scope="col">Tác giả</th>
                    <th scope="col">Thể loại</th>
                    <th scope="col">Ngày phát hành</th>
                    <th scope="col">Số trang</th>
                    <th scope="col">Ảnh bìa</th>
                    <th scope="col">Thực hiện</th>
                </tr>
            </thead>
            <tbody className="text-center">
                { currentItems &&
                currentItems.map(book => {
                    return (
                    <tr key={book.id}>
                    <td className="fontHome">{book.title}</td>
                    <td className="fontHome">{book.author}</td>
                    <td className="fontHome">{book.typeBook}</td>
                    <td className="fontHome" scope="col">{book.dateRelease}</td>
                    <td className="fontHome" scope="col">{book.totalPage}</td>
                    <td scope="col-2" >
                        <img class="img-bd"  src={
                            linkImg(book.imageFeatureBooks[0].url)
                        }  alt="" />    
                    </td>
                    <td scope="col">
                        <Link style={{display: username? "inline-block":"none" }} to={`update-book/${book.id}`} className="btn btn-success mr-3">
                            Chỉnh sửa
                        </Link>
                        <button style={{display: username? "inline-block":"none" }} onClick={()=> IdDelete(book.id)} className="btn btn-danger" data-toggle="modal" data-target={`#exampleModal${book.id}`}>
                            Xoá
                        </button>
                        <div class="modal fade" id={`exampleModal${book.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-body"> Bạn có chắc muốn xoá? </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
                                        <button type="button"  onClick={()=>deleteBook()} data-dismiss="modal" class="btn btn-primary">OK</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    </tr>)
                })
            }
            </tbody>
        </table>
        );
      }
    useEffect( ()=>{
        setUsername(localStorage.getItem("username"))
        axios.get('http://localhost:8080/api/books')
        .then(data => {
            setBooks(data.data.reverse())
            const endOffset = itemOffset + itemsPerPage;
            console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(data.data.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(data.data.length / itemsPerPage));
        })
        .catch(err => console.log(err));
    },[itemOffset, itemsPerPage]);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % books.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
      };
    return (
        <div style={{backgroundImage: `url(${Background})`,backgroundPosition: 'center', backgroundRepeat: "no-repeat", backgroundSize: "cover", width: '100vw', height: '100vh'}}>
            <div className="container">
                <div class="d-flex justify-content-between">
                    <h1>Thư viện sách</h1>
                    <div className="addBK"><Link to="insert-book" className="btn btn-success"> Thêm sách </Link></div>
                </div>
            </div>
            <div className="container mt-3">
                <Items currentItems={currentItems} />
            </div>
        </div>
    )
}