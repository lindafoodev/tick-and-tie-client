import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import RegistrationForm from './registration-form';
import {login} from '../actions/auth';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    
    const demoLogIn = (obj) => {
        return props.dispatch(login(obj.username, obj.password));
    }
       
    return (
        <div className="home">
            <h2>Register</h2>
            <RegistrationForm />
            <div className='redirect'>
                Returning user? <Link to="/login">Log in</Link>
            </div>
            <div className='redirect'>
                Or try out the <Link to="/dashboard" onClick={() => demoLogIn({username:'guest', password:'guest12345'})}>Demo</Link> account.
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
