import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {Link} from 'react-router-dom';
import {Hamburger} from './hamburger-nav';

export class HeaderBar extends React.Component {
    constructor(){
        super();
        this.state = {
            open: false
        };
    }

    logOut() {
        //console.log('log out clicked');
        this.props.dispatch(clearAuth());
        clearAuthToken();
        
    }

    handleClick(){
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        return (
            <div className="header-bar">
                <nav className="menu">
                    <ul className="menu-list">
                        <li className="logo bold title">
                            Tick-and-Tie
                        </li>
                        {this.props.loggedIn ? <div className="menu-list-extended bold subtitle"><li className="menu-list-item noDisplay"> <Link onClick={this.logOut.bind(this)} to={`/`} className='link'>Log Out</Link></li></div>:
                    <div className="menu-list-extended bold subtitle">
                        <li className="menu-list-item noDisplay">
                            <Link to={`/`} className='link'>
                                Home
                            </Link>
                        </li>
                        <li className="menu-list-item noDisplay">
                            <Link to={`/login`} className='link'>
                                Log in
                            </Link>
                        </li>
                        <li className="menu-list-item noDisplay">
                            <Link to={`/register`} className='link'>
                                Register
                            </Link>
                        </li>
                    </div> }
                    </ul>
                </nav>
                <Hamburger 
                isOpen={this.state.open}
                menuClicked={this.handleClick.bind(this)}
                logOutClicked={this.logOut.bind(this)}
                loggedIn={this.props.loggedIn}
            />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
