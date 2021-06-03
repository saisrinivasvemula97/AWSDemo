import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { UserInfo } from '../UserInfo/UserInfo';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from '../../actions/profile';
import { getFromLocalDB } from '../UserInfo/UserInfo';

export const Registration = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isSubmitted, setFlag] = useState(false);
    const [error, setError] = useState(false);

    const { username, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            let savedUser = getFromLocalDB(username);
            if (savedUser && savedUser.email && savedUser.firstName && savedUser.lastName) {
                console.log('savedUser', savedUser);
                if(username == savedUser.username && password == savedUser.password){
                error && setError(false);
                dispatch(ActionCreators.addProfile(savedUser));
                setFlag(true);
            }
            else{
                setError(true);
            }
            }
            else {
                error && setError(false);
                const data = JSON.stringify({ username, password });
                localStorage.setItem(username, data);
                dispatch(ActionCreators.addProfile({ username, password }));
                setFlag(true);
            }
        }
        else{
            alert('Enter Username & Password!');
        }
    }

    if (isSubmitted) {
        return <UserInfo isSubmitted/>
    }
    else
        return (
            <Fragment>
                <p className="lead">
                    <i className="fas fa-user" /> Create Your Account / Retrieve your Information
                </p>
                <form className="form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Enter User Name"
                            name="username"
                            value={username}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
            {
                error && <p>Invalid username/password. Please try again.</p>
            }
            </Fragment>
        )
}