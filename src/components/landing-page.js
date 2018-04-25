import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {login} from '../actions/auth';

import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    const demoLogIn = (obj) => {
        return props.dispatch(login(obj.username, obj.password));
    }

    return (
        <div className="home">
            <div className="header">
                <div className="layer">
                <h2>Welcome to Tick-and-Tie</h2>
                <LoginForm />
                <div className='redirect'>
                    New user? <Link to="/register">Register</Link>
                </div>
                <div className='redirect'>
                    Or try out the <Link to="/dashboard" onClick={() => demoLogIn({username:'guest', password:'guest12345'})}>Demo</Link> account.
                </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
