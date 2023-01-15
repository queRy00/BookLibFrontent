import axios from "axios";
import {useState} from "react";
import {Link} from "react-router-dom";

function AuthorRegister() {

    const [body, setBody] = useState({
        age: null,
        country: null,
        gender: null,
        name: null
    });

    const [errorBody, setErrorBody] = useState({
        age: null,
        country: null,
        gender: null,
        name: null
    });

    const [isRequest, setIsRequest] = useState(false);
    const [viewAlert, setViewAlert] = useState(false);

    const onChange = event => {
        const {value, name} = event.target;
        setBody(prevState => ({...prevState, [name]: value}));
    };

    const onChangeGender = (e) => {
        const {value, name} = e.target;
        if (e.target.checked && value === "MALE") {
            setBody(prevState => ({...prevState, [name]: value}));
            document.getElementById("FEMALE").checked = false;
        }
        if (e.target.checked && value === "FEMALE") {
            setBody(prevState => ({...prevState, [name]: value}));
            document.getElementById("MALE").checked = false;
        }
    }

    const submitButtonOnClick = async (e) => {
        e.preventDefault();

        const {age, country, gender, name} = body;

        const responseBody = {
            age,
            country,
            gender,
            name
        }

        const clearInput = (fieldId) => {
            document.getElementById(fieldId).value = '';
        }

        try {
            setIsRequest(true);
            setViewAlert(false);
            await axios.post('http://localhost:8080/api/1.0/register/author', responseBody);
            setErrorBody({
                age: null,
                country: null,
                gender: null,
                name: null
            });
            setBody({
                age: null,
                country: null,
                gender: null,
                name: null
            });
            document.getElementById("MALE").checked = false;
            document.getElementById("FEMALE").checked = false;
            clearInput('name');
            clearInput('age');
            clearInput('country');
            setIsRequest(false);
            setViewAlert(true);
        } catch (e) {
            setErrorBody(e.response.data.body);
            setIsRequest(false);
        }
    }

    const {age, country, gender, name} = errorBody;

    return (
        <form className="container">

            <h3 className="text-center">Author Register</h3>

            <div className="mb-3">
                <label className="form-label">Author Name</label>
                <input type="text" className="form-control" name="name" id="name" onChange={onChange}/>
                {name && <small className="text-danger">{name}</small>}
            </div>

            <div className="mb-3">
                <label className="form-label">Age</label>
                <input type="number" className="form-control" name="age" id="age" onChange={onChange}/>
                {age && <small className="text-danger">{age}</small>}
            </div>

            <div className="mb-3">
                <label className="form-label">Country</label>
                <input type="text" className="form-control" name="country" id="country" onChange={onChange}/>
                {country && <small className="text-danger">{country}</small>}
            </div>

            <label className="form-label d-flex">Gender</label>
            <div className="form-check form-check-inline ">
                <input className="form-check-input" type="checkbox" name="gender" id="MALE" value="MALE"
                       onChange={onChangeGender}/>
                <label className="form-check-label">MALE</label>
            </div>

            <div className="form-check form-check-inline ">
                <input className="form-check-input" type="checkbox" name="gender" id="FEMALE" value="FEMALE"
                       onChange={onChangeGender}/>
                <label className="form-check-label">FEMALE</label>
            </div>
            {gender && <small className="text-danger">{gender}</small>}

            {viewAlert && <div className="alert alert-success text-lg-center mt-2" role="alert">
                Successfully!
            </div>}

            <div className="d-flex mt-3">
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

export default AuthorRegister;
