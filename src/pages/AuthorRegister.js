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

    const [errorMessageResponse, setErrorMessageResponse] = useState(null);

    const [isRequest, setIsRequest] = useState(false);
    const [viewAlert, setViewAlert] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorAge, setErrorAge] = useState(false);
    const [errorCountry, setErrorCountry] = useState(false);

    const onChange = event => {
        const {value, name} = event.target;
        if (event.target.id === "name") {
            setErrorName(false)
        }
        if (event.target.id === "age") {
            setErrorAge(false)
        }
        if (event.target.id === "country") {
            setErrorCountry(false)
        }
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
            if (document.getElementById('name').value === '' || document.getElementById('name').value === null) {
                setErrorName(true);
            } else if (document.getElementById('age').value === '' || document.getElementById('age').value === null) {
                setErrorAge(true);
            } else if (document.getElementById('country').value === '' || document.getElementById('country').value === null) {
                setErrorCountry(true);
            } else {
                setIsRequest(true);
                setViewAlert(false);
                await axios.post('http://localhost:8080/api/1.0/register/author', responseBody);
                setErrorMessageResponse(null);
                document.getElementById("MALE").checked = false;
                document.getElementById("FEMALE").checked = false;
                clearInput('name');
                clearInput('age');
                clearInput('country');
                setIsRequest(false);
                setViewAlert(true);
            }
        } catch (e) {
            setErrorMessageResponse(e.response.data.message);
            console.log(e.response.data.message);
            setIsRequest(false);
        }
    }

    return (
        <form className="container">

            <h3 className="text-center">Author Register</h3>

            <div className="mb-3">
                <label className="form-label">Author Name</label>
                <input type="text" className="form-control" name="name" id="name" onChange={onChange}/>
                {errorName &&
                    <small id="emailHelp" className="form-text text-danger">This field cannot be null.</small>}
                {/* eslint-disable-next-line no-mixed-operators */}
                {(errorMessageResponse && errorName ||
                    <small id="emailHelp" className="form-text text-danger">{errorMessageResponse}</small>)}
            </div>

            <div className="mb-3">
                <label className="form-label">Age</label>
                <input type="number" className="form-control" name="age" id="age" onChange={onChange}/>
                {errorAge && <small id="emailHelp" className="form-text text-danger">This field cannot be null.</small>}
            </div>

            <div className="mb-3">
                <label className="form-label">Country</label>
                <input type="text" className="form-control" name="country" id="country" onChange={onChange}/>
                {errorCountry &&
                    <small id="emailHelp" className="form-text text-danger">This field cannot be null.</small>}
            </div>

            <div className="mb-1">
                Gender
            </div>
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

            {viewAlert && <div className="alert alert-success text-lg-center" role="alert">
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
