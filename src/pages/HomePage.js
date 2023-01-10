import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function HomePage() {
    const [criteria, setCriteria] = useState(null);
    const [responseBody, setResponseBody] = useState({
        message: null, body: [], success: false
    });

    const onChange = event => {
        const {value} = event.target;
        setCriteria(value);
    }

    const searchButtonOnClick = async (e) => {
        e.preventDefault();

        const postCriteria = criteria;

        try {
            const response = await axios.get('http://localhost:8080/api/1.0/book/search',
                {params: {criteria: postCriteria}});
            setResponseBody(response.data);
        } catch (e) {
            console.log("Hata bloguna dustu " + e);
        }
    }

    return (<>
            <div className="container mt-4 p-4 mb-4 bg-black bg-opacity-10">
                <div className="row mb-5">
                    <div className="col text-center">
                        <Link to="/register/author" className="btn btn-primary btn-lg w-100 h-auto">Author Register
                            Page</Link>
                    </div>
                    <div className="col text-center">
                        <Link to="/register/book" className="btn btn-success btn-lg w-100 h-auto">Book Register
                            Page</Link>
                    </div>
                </div>
                <hr/>
                <div className="text-center mt-5 d-flex">
                    <input className="form-control" type="search" id="search" placeholder="Search" aria-label="Search"
                           onChange={onChange}/>
                    <button className="btn btn-outline-success ms-3" type="submit"
                            onClick={searchButtonOnClick}>Search
                    </button>
                </div>
                <div className="mt-3">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <div className="row ">
                                <div className="col text-danger">
                                    Name
                                </div>
                                <div className="col text-danger">
                                    Category
                                </div>
                                <div className="col text-danger">
                                    ISBN
                                </div>
                                <div className="col text-danger">
                                    AuthorID
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul className="list-group">
                        {responseBody.body.map((book) => <li key={book.id} className="list-group-item">
                            <div className="row">
                                <div className="col">
                                    {book.name}
                                </div>
                                <div className="col">
                                    {book.category}
                                </div>
                                <div className="col">
                                    {book.isbn}
                                </div>
                                <div className="col">
                                    {book.authorId}
                                </div>
                            </div>
                        </li>)}
                    </ul>
                </div>
            </div>
        </>);
}

export default HomePage;
