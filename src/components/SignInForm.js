import React from 'react';

function SignInForm({ onSignIn }) {
    function handleSubmit(event) {
        // console.dir(event.target)
        event.preventDefault();
        const form = event.target;
        const elements = form.elements
        const email = elements.email.value;
        const password = elements.password.value;
        console.dir(email, password);
        onSignIn({ email, password })
    }
    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label>Email</label>
                <input name="email" type="text"></input>
            </fieldset>
            <fieldset>
                <label>Password</label>
                <input name="password" type="password"></input>
            </fieldset>
            <input type="submit" value="Sign In"/>
        </form>
    );
}

export default SignInForm;