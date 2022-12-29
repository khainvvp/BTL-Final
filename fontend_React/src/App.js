import Register from './Signin-Signup/register';
import Login from './Signin-Signup/login'; 
import HomeForRoot from './forRoot/Home'; 
import Addbook from './forRoot/addbook'; 
import Update from './forRoot/update'; 
import HomeForCustomer from './forCustomer/Home'; 
import BookDetail from './forCustomer/BookDetail'; 
import CartList from './forCustomer/gioHang'; 
import Buyed from './forCustomer/Buyed'; 
import LayOut from './Form/LayOut';
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayOut/>}>
            {/* Manager by Root */}
            <Route exact path="/root" element={<HomeForRoot itemsPerPage={100}/>} />
            <Route path="root/insert-book" element={<Addbook/>} />
            <Route path="root/update-book/:id" element={<Update/>} />

            {/* Service for Customer */}
            <Route exact path="/home" element={<HomeForCustomer itemsPerPage={100}/>} />
            <Route path="home/book/:id" element={<BookDetail/>} />
            <Route path="/gio-hang" element={<CartList/>} />
            <Route path="/lich-su" element={<Buyed/>} />        
        </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
  
}

export default App;
