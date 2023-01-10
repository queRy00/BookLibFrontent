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

    const [errorMessageResponse, setErrorMessageResponse] = useState(null);

    const [getAuthor, setGetAuthor] = useState([]);

    const [isRequest, setIsRequest] = useState(false);
    const [viewAlert, setViewAlert] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorCategory, setErrorCategory] = useState(false);
    const [errorISBN, setErrorISBN] = useState(false);
    const [errorAuthorId, setErrorAuthorId] = useState(false);

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
        if (event.target.id === "name") {
            setErrorName(false)
        }
        if (event.target.id === "category") {
            setErrorCategory(false)
        }
        if (event.target.id === "isbn") {
            setErrorISBN(false)
        }
        if (event.target.id === "authorId") {
            setErrorAuthorId(false)
        }
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
            if (document.getElementById('name').value === '' || document.getElementById('name').value === null) {
                setErrorName(true);
            } else if (document.getElementById('category').value === '' || document.getElementById('category').value === null) {
                setErrorCategory(true);
            } else if (document.getElementById('isbn').value === '' || document.getElementById('isbn').value === null) {
                setErrorISBN(true);
            } else if(body.authorId === null) {
                setErrorAuthorId(true);
            } else {
                setIsRequest(true);
                setViewAlert(false);
                await axios.post('http://localhost:8080/api/1.0/register/book', responseBody);
                setErrorMessageResponse(null);
                setErrorName(false)
                setErrorCategory(false)
                setErrorISBN(false)
                setErrorAuthorId(false)
                clearInput('name');
                clearInput('isbn');
                clearInput('category');
                setIsRequest(false);
                setViewAlert(true);
                setBody(prevState => ({...prevState, authorId: null}));
            }
        } catch (e) {
            setErrorMessageResponse(e.response.data.message);
            setIsRequest(false);
            console.log(e);
        }
    }

    return (
        <form className="container">
            <h3 className="text-center">Book Register</h3>
            <div className="mb-3">
                <label className="form-label">Book Name</label>
                <input type="text" className="form-control" name="name" id="name" onChange={onChange}/>
                {errorName && <small className="form-text text-danger">This field cannot be null.</small>}
                {/* eslint-disable-next-line no-mixed-operators */}
                {(errorMessageResponse && errorName ||
                    <small id="emailHelp" className="form-text text-danger">{errorMessageResponse}</small>)}
            </div>
            <div className="mb-3">
                <label className="form-label">Category</label>
                <input type="text" className="form-control" name="category" id="category" onChange={onChange}/>
                {errorCategory && <small className="form-text text-danger">This field cannot be null.</small>}
            </div>
            <div className="mb-3">
                <label className="form-label">ISBN</label>
                <input type="number" className="form-control" name="isbn" id="isbn" onChange={onChange}/>
                {errorISBN && <small className="form-text text-danger">This field cannot be null.</small>}
            </div>
            <div className="mb-3">
                <label className="form-label">Author ID</label>
                {/*<input type="number" className="form-control" name="authorId" id="authorId" onChange={onChange}/>*/}
                <select className="form-select" name="authorId" id="authorId" onChange={optionChange}>
                    <option name="authorId" value={0}>
                        Please check.
                    </option>
                    {getAuthor.map((author, index) =>
                        <option key={author.id} name="authorId" value={author.id}>
                            {author.name}
                        </option>)}
                </select>
                {errorAuthorId && <small className="form-text text-danger">This field cannot be null.</small>}
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
