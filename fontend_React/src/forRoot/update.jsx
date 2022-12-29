import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function UpdateBook(props){
    const [title,setTitle] = useState("");
    const [author,setAuthor] = useState("");
    const [description,setDescription] = useState("");
    const [dateRelease,setDateRealse] = useState("");
    const [totalPage,setTotalPage] = useState("");
    const [typeBook,setTypeBook] = useState("");
    const [files,setFiles] = useState("");
    const [urls,setUrls] = useState([]);
    const [book,setBook] = useState({});
    const [img,setImg]= useState("")
    const [err,setErr]= useState("")
    let { id } = useParams();
    useEffect(()=>{
        axios.get('http://localhost:8080/api/book/'+id)
        .then(data => 
          {
            setBook(data.data.data);
            let temp = data.data.data;
            setTitle(temp.title)
            setAuthor(temp.author)
            setTotalPage(temp.totalPage)
            setDescription(temp.description)
            setDateRealse(temp.dateRelease)
            setTypeBook(temp.typeBook)
            console.log(temp)
            setImg("http://localhost:8080/api/files/"+temp.imageFeatureBooks[0].url)
          })
        .catch(err => console.log(err))
    },[]);
    function previewFiles(e) {
        setFiles(e.target.files)
        setImg(URL.createObjectURL(e.target.files[0])); 
    }
    function submitForm(e){
        e.preventDefault();
        let check = true
        if(!files){
            check = false
            setErr("Vui lòng thêm ảnh")
        }
        if(!totalPage){
            check = false
            setErr("Vui lòng điền số trang")
        }
        if(!dateRelease){
            check = false
            setErr("Vui lòng điền ngày xuất bản")
        }
        if(!description){
            check = false
            setErr("Vui lòng điền mô tả")
        }
        if(!author){
            check = false
            setErr("Vui lòng điền tác giả")
        }
        if(!title){
            check = false
            setErr("Vui lòng điền tiêu đề")
        }
        if(check == true) {
            let bodyFormData = new FormData();
            bodyFormData.append("title",title);
            bodyFormData.append("author",author);
            bodyFormData.append("description",description);
            bodyFormData.append("dateRelease", dateRelease);
            bodyFormData.append("totalPage",totalPage);
            bodyFormData.append("typeBook",typeBook);
            if(files != null){
                for(let i = 0;i< files.length;i++){
                    bodyFormData.append("files",files[i]);
                }
            }
            console.log(title)
            axios({
                method: 'put',
                url:'http://localhost:8080/api/book/'+id, 
                data: bodyFormData,
                headers: { 
                    "Authorization":"Bearer "+localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data" },
            })
            .then(response => {
                console.log(response)
                window.location.href = "http://localhost:3000/root"
            })
            .catch(err => console.log(err))
        }
    }
    return (
        <div>
            <div class="wrapper-tpl">
                <div class="container">
                    
                    <form class="mt-5">
                        <div class="wrapper row">
                            <div class="left col-6">
                                <div>
                                    <div className="td">
                                        <label for="exampleInputEmail1">Tiêu đề</label>
                                        <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" />
                                    </div>
                                    <div class="tg">
                                        <label for="exampleInputEmail1">Tác giả</label>
                                        <input value={author} onChange={(e)=>setAuthor(e.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" />
                                    </div>
                                    <div className="mt">
                                        <label for="validationTextarea">Mô tả</label>
                                        <textarea value={description} class="form-control is-invalid" id="validationTextarea" placeholder="Required description" required onChange={(e) => setDescription(e.target.value)} rows="8"></textarea>
                                    </div>
                                    <div className="col-5 nph">
                                        <label for="exampleInputPassword1">Ngày phát hành</label>
                                        <input value={dateRelease} class="form-control" id="exampleInputPassword1" placeholder="" onChange={(e)=>setDateRealse(e.target.value)}/>
                                    </div>
                                    <div className="col-5 st">
                                        <label for="exampleInputPassword1">Số trang</label>
                                        <input value={totalPage} type="text" class="form-control" id="exampleInputPassword1" placeholder="Total page" onChange={(e)=>setTotalPage(e.target.value)}/>
                                    </div>
                                </div>
                                <div class="row mt-3 tl">
                                    <div class="col-6">
                                        <label for="exampleInputPassword1">Thể loại</label>
                                        <select value={typeBook} class="custom-select custom-select-lg mb-3" placeholder="Enter type of book" onChange={(e)=>setTypeBook(e.target.value)}>
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
                                    <input type="file" class="custom-file-input" id="validatedCustomFile" multiple onChange={previewFiles} required/>
                                    <label class="custom-file-label" for="validatedCustomFile">Chọn tệp</label>
                                    
                                </div>
                                <div id="preview">
                                    <img className="anh" src={img} alt=""/>
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