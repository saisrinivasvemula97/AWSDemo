import React, { Fragment, useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';


export const getFromLocalDB = (username) => {
    const obj = localStorage.getItem(`${username}`);
    console.log('obj', obj, username);
    return JSON.parse(obj);
 }

export const UserInfo = (props) => {
    const reduxUser = useSelector((state) => state.user.profile);

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: ''
    });
    const [isSubmitted, setFlag] = useState(false);

    useEffect(()=>{
        const savedUser = getFromLocalDB(reduxUser.username);
        if(savedUser && savedUser.email && savedUser.firstName && savedUser.lastName){
            setFlag(true);
            setFormData({
                email: savedUser.email,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName
            })
        }
    }, []);

    const { email, firstName, lastName } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(email && firstName && lastName){
            console.log('redux', reduxUser.username);
            let data = {email, firstName, lastName};
            let savedUser = getFromLocalDB(reduxUser.username);
            console.log('savedUser', savedUser);
            const updated = JSON.stringify({...data, ...savedUser});
            localStorage.setItem(savedUser.username, updated);
             setFlag(true);
        }
        else {
            alert('Please enter all fields and submit!');
        }
    }

    if(props.isSubmitted && isSubmitted){
        return (
            <Fragment>
                 <p className="lead">
                <i className="fas fa-user" /> User Information:  </p>
                <p>FirstName is: {firstName}</p>
                <p>LastName is: {lastName}</p>
                <p>Email is: {email}</p>
                <h5>Refresh the WebPage to go back to the Login/Register
                </h5>
            </Fragment>
        );
    }
    else
    return (
        <Fragment>
            <p className="lead">
                <i className="fas fa-user" /> Enter User Information  </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Firstname"
                        name="firstName"
                        value={firstName}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Lastname"
                        name="lastName"
                        value={lastName}
                        onChange={onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
        </Fragment>
    )
}