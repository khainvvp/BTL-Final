import { useState, useEffect } from "react";
import axios from "axios";
import './addBook.css';
export default function AddBook() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [dateRelease, setDateRealse] = useState("");
    const [totalPage, setTotalPage] = useState("");
    const [typeBook, setTypeBook] = useState("");
    const [files, setFiles] = useState("");
    const [img, setImg] = useState("")
    const [err, setErr] = useState("")
    function previewFiles(e) {
        setFiles(e.target.files)
        setImg(URL.createObjectURL(e.target.files[0]));
    }
    function submitForm(e) {
        let check = true
        if (!files) {
            check = false
            setErr("Vui lòng điền ảnh bìa")
        }
        if (!title) {
            check = false
            setErr("Vui lòng điền tiêu đề")
        }
        if (!totalPage) {
            check = false
            setErr("Vui lòng điền số trang")
        }
        if (!dateRelease) {
            check = false
            setErr("Vui lòng điền ngày phát hành")
        }
        if (!description) {
            check = false
            setErr("Vui lòng mô tả tác")
        }
        if (!author) {
            check = false
            setErr("Vui lòng thêm tác giả ")
        }
        e.preventDefault();
        let bodyFormData = new FormData();
        if (check == true) {
            bodyFormData.append("title", title);
            bodyFormData.append("author", author);
            bodyFormData.append("description", description);
            bodyFormData.append("dateRelease", dateRelease);
            bodyFormData.append("totalPage", totalPage);
            bodyFormData.append("typeBook", typeBook);
            for (let i = 0; i < files.length; i++) {
                bodyFormData.append("files", files[i]);
            }

            console.log(bodyFormData.entries, files)
            axios({
                method: 'post',
                url: 'http://localhost:8080/api/book/insert',
                data: bodyFormData,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                    ,
                    "Content-Type": "multipart/form-data"
                },
            })
                .then(response => {
                    console.log(response)
                    window.location.href = "http://localhost:3000/root"
                })
                .catch(err => console.log(err))
        }
    }
    const [show, hide, toggleShow] = useState(true);
    return (
        <div>
            <div class="wrapper-tpl">
                <div class="container mt-5">
                    <div className="err">
                        {err}
                    </div>
                    <form class="mt-5">
                        <div class="wrapper row">
                            <div class="left col-6">
                                <div >
                                    <div className="td">
                                        <label for="exampleInputEmail1">Tiêu đề</label>
                                        <input onChange={(e) => setTitle(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                    </div>
                                    <div class="tg">
                                        <label for="exampleInputEmail1">Tác giả</label>
                                        <input onChange={(e) => setAuthor(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mt">
                                        <label for="validationTextarea">Mô tả</label>
                                        <textarea class="form-control is-invalid" id="validationTextarea" onChange={(e) => setDescription(e.target.value)} rows="8"></textarea>
                                    </div>
                                    <div class="col-5 nph">
                                        <label for="exampleInputPassword1">Ngày phát hành</label>
                                        <input value={dateRelease} class="form-control" onChange={(e) => setDateRealse(e.target.value)} />
                                    </div>
                                    <div class="col-5 st">
                                        <label for="exampleInputPassword1">Số trang</label>
                                        <input type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setTotalPage(e.target.value)} />
                                    </div>
                                </div>
                                <div class="row mt-3 tl">
                                    <div class="col-6">
                                        <label for="exampleInputPassword1">Thể loại</label>
                                        <select class="custom-select custom-select-lg mb-3" onChange={(e) => setTypeBook(e.target.value)}>
                                            <option selected value="Khoa học">Khoa học</option>
                                            <option value="Viễn Tưởng">Viễn Tưởng</option>
                                            <option value="Chiến Tranh">Chiến Tranh</option>
                                            <option value="Truyện Tranh">Truyện Tranh</option>
                                            <option value="Tội Phạm">Tội Phạm</option>
                                            <option value="Tâm Lý">Tâm Lý</option>
                                            <option value="Tình Yêu">Tình Yêu</option>
                                            <option value="Hình Sự">Hình Sự</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="right col-6">
                                <label for="exampleInputPassword1">Ảnh bìa</label>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="validatedCustomFile" multiple onChange={previewFiles} />
                                    <label class="custom-file-label" for="validatedCustomFile">Chọn tệp</label>
                                </div>
                                <div className="anh" id="preview">
                                    <img className="ImageBook" src={img} alt="" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-success savebtt" onClick={submitForm}>Lưu</button>
                </form>
                </div>
            </div>
        </div>
    );
}