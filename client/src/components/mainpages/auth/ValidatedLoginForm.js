// const { validateYupSchema } = require("formik");

// import * as Yup from "yup";

// validationSchema={Yup.object().shape({
//     email: Yup.string()
//         .email()
//         .required("Email field is required"),
//     password: Yup.string()
//         .required("Please provide a password")
//         .min(8, "Password is too short - should be 8 chars minimum.")
//         .matches(/(?=.*[0-9])/, "Password must contain a number.")
// })}


import React from 'react'

function ValidatedLoginForm() {
    return (
        <div>
            <h1>Hello from the real Separate Validate Login Component</h1>
        </div>
    )
}

export default ValidatedLoginForm
