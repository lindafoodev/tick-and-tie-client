import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import LoginForm from './login-form';
import {login} from '../actions/auth';

export function LoginPage(props) {
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
          <h2>Log in</h2>
              <LoginForm />
                <div className='redirect'>
                    New user? <Link to="/register">Register</Link>
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

export default connect(mapStateToProps)(LoginPage);
