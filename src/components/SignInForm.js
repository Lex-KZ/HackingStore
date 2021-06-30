import React from 'react';

function SignInForm({ handleSubmit }) {
    return (
        <form onSubmit={this.handleSubmit}>
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