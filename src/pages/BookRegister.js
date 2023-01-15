import axios from "axios";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

function BookRegister() {
    const [body, setBody] = useState({
        name: null,
        isbn: null,
        category: null,
        authorId: null
    });

    const [getAuthor, setGetAuthor] = useState([]);

    const [errorBody, setErrorBody] = useState({
        isbn: null,
        name: null,
        authorId: null,
        category: null
    });

    const [isRequest, setIsRequest] = useState(false);
    const [viewAlert, setViewAlert] = useState(false);

    useEffect(() => {
        getAuthors().then(value => {
            (setGetAuthor(value.body))
        });
    }, [setGetAuthor]);

    const getAuthors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/1.0/author');
            return response.data;
        } catch (e) {
        }
    }

    const optionChange = (e) => {
        const {value, name} = e.target
        if (value == 0) {
            setBody(prevState => ({...prevState, authorId: null}));
        } else {
            setBody(prevState => ({...prevState, [name]: value}));
        }
    }

    const onChange = event => {
        const {value, name} = event.target;
        setBody(prevState => ({...prevState, [name]: value}));
    };

    const submitButtonOnClick = async (e) => {
        e.preventDefault();

        const {name, isbn, category, authorId} = body;

        const responseBody = {
            name,
            isbn,
            category,
            authorId
        }

        const clearInput = (fieldId) => {
            document.getElementById(fieldId).value = '';
        }

        try {
            setIsRequest(true);
            setViewAlert(false);
            await axios.post('http://localhost:8080/api/1.0/register/book', responseBody);
            setBody({
                name: null,
                isbn: null,
                category: null,
                authorId: null
            });
            setErrorBody({
                isbn: null,
                name: null,
                authorId: null,
                category: null
            });
            clearInput('name');
            clearInput('isbn');
            clearInput('category');
            setIsRequest(false);
            setViewAlert(true);
            setBody(prevState => ({...prevState, authorId: null}));
        } catch (e) {
            setErrorBody(e.response.data.body);
            setIsRequest(false);
        }
    }

    const {name, isbn, category, authorId} = errorBody;
    return (
        <form className="container">
            <h3 className="text-center">Book Register</h3>
            <div className="mb-3">
                <label className="form-label">Book Name</label>
                <input type="text" className="form-control" name="name" id="name" onChange={onChange}/>
                {name && <small className="text-danger">{name}</small>}
            </div>
            <div className="mb-3">
                <label className="form-label">Category</label>
                <input type="text" className="form-control" name="category" id="category" onChange={onChange}/>
                {category && <small className="text-danger">{category}</small>}
            </div>
            <div className="mb-3">
                <label className="form-label">ISBN</label>
                <input type="number" className="form-control" name="isbn" id="isbn" onChange={onChange}/>
                {isbn && <small className="text-danger">{isbn}</small>}
            </div>
            <div className="mb-3">
                <label className="form-label">Author ID</label>
                {/*<input type="number" className="form-control" name="authorId" id="authorId" onChange={onChange}/>*/}
                <select className="form-select" name="authorId" id="authorId" onChange={optionChange}>
                    <option name="authorId" value={0}>
                        Please check.
                    </option>
                    {getAuthor.map((author) =>
                        <option key={author.id} name="authorId" value={author.id}>
                            {author.name}
                        </option>)}
                </select>
                {authorId && <small className="text-danger">{authorId}</small>}

            </div>

            {viewAlert && <div className="alert alert-success text-lg-center" role="alert">
                Successfully!
            </div>}

            <div className="d-flex">
                {!isRequest &&
                    <button type="submit" className="btn btn-primary" onClick={submitButtonOnClick} defaultValue="Save">
                        Save
                    </button>}
                {isRequest &&
                    <div className="spinner-grow spinner-grow text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
                <input className="btn btn-danger ms-2" type="reset" defaultValue="Reset"/>
                <Link to="/" className="btn btn-success ms-auto">HomePage</Link>
            </div>
        </form>
    );
}

export default BookRegister;
