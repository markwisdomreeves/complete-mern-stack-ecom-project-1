
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import { Formik } from "formik";
// import * as EmailValidator from "email-validator"; 
import * as Yup from "yup"; 
import "./form-validate-style.css";



function Login() {
    const [err, setError] = useState('');

    return <Formik
        initialValues={{
            email: "",
            password: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                console.log("Logging in with: ", values);
                setSubmitting(false);
            }, 500);
        }}

        validationSchema={Yup.object().shape({
            email: Yup.string()
                .email()
                .required("Email field is required"),
            password: Yup.string()
                .required("Please provide a password")
                .matches(/^([a-zA-Z0-9]+)$/, "Password must contain a number.")
                .min(6, "Password is too short - must be 6 chars minimum.")
        })}

    >
        {props => {
            let {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
            } = props;

            
           handleSubmit = async e => {
                e.preventDefault()
                try {
                    await axios.post('/user/login', {...values})
                    localStorage.setItem('firstLogin', true)
                    window.location.href = "/";
                    setError('');

                } catch (err) {
                    return err.response.data.msg && setError(
                        err.response.data.msg
                    )
                }
            }


            return (
                <div className="login-page">
                    <h3 style={{textAlign: "center", color: "red", fontSize: "0.8rem", 
                    fontFamily: "sans-serif", marginBottom: "40px"}}>
                    {err}</h3>

                    <form onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.email && touched.email && "error"}
                         />
                         {errors.email && touched.email && (
                             <div className="input-feedback">{errors.email}</div>
                         )}

                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.password && touched.password && "error"}
                         />
                        {errors.password && touched.password && (
                             <div className="input-feedback">{errors.password}</div>
                         )}

                        <div className="row" id="loginBtn">
                            <button type="submit" disabled={isSubmitting}>Login</button>
                            <Link to="/register">Register</Link>
                        </div>

                    </form>

                </div>
            );
        }}

    </Formik>

}
    
 
export default Login
