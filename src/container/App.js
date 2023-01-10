import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route, RedirectFunction} from "react-router-dom";
import HomePage from "../pages/HomePage";
import AuthorRegister from "../pages/AuthorRegister";
import BookRegister from "../pages/BookRegister";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/register/author" element={<AuthorRegister/>}/>
                <Route path="/register/book" element={<BookRegister/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
