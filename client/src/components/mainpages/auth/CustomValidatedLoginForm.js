

// validate={values => {
//     let errors = {};
//     if (!values.email) {
//       errors.email = "Required";
//     } else if (!EmailValidator.validate(values.email)) {
//       errors.email = "Invalid email address.";
//     }
  
//     const passwordRegex = /(?=.*[0-9])/;
//     if (!values.password) {
//       errors.password = "Required";
//     } else if (values.password.length < 8) {
//       errors.password = "Password must be 8 characters long.";
//     } else if (!passwordRegex.test(values.password)) {
//       errors.password = "Invalid password. Must contain one number.";
//     }
  
//     return errors;
//   }}


import React from 'react'

function CustomValidatedLoginForm() {
    return (
        <div>
            <h1>I am the Empty Custom Validated Login with little BUGS</h1>
        </div>
    )
}

export default CustomValidatedLoginForm
