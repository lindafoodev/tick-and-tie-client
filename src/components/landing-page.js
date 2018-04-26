import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
            <div className="homepage-splash"></div>
            <div className="splashContainer">
                <div className="splashContentWrapper">
                    <div className="splashContent">
                        <h1 className="splashHeading">Easy tool to<br/>connect the dots.</h1>
                        <p className="splashParagraph">We leverage spaced repetition techniques to reinforce your learning, you can master just about anything with small and consistent effort. </p>
                        <p className="splashParagraph">We'll begin with blockchain.</p>
                        <div className="splashButton">
                            <a className="splashButtonLink" role="button" href="/register"><span className="buttonWrapper">Get started</span>
                            </a>
                        </div>
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
