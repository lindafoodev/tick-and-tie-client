import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export function Hamburger(props) {

  let { isOpen } = props;

  let style = {
    base: {
      display: 'none'
    },
    link: {
      display: `${isOpen ? 'block' : 'none'}`,
    }
  };

    return (
      <div className="hamburger-nav" onClick={props.menuClicked}>
          <div className="hamburger">
            <div className="hamburger-stripe"></div>
            <div className="hamburger-stripe"></div>
            <div className="hamburger-stripe"></div>
          </div>
        <div style={Object.assign({}, style.base, style.link)}>
                <nav className="ham-menu">
                    <ul className="ham-menu-list">
                        {props.loggedIn ? <div className="ham-menu-list-extended"><li className="ham-menu-list-item"> <button onClick={() => this.logOut()}>Log Out</button> </li></div>:
                    <div className="ham-menu-list-extended bold subtitle">
                        <li className="ham-menu-list-item">
                            <Link to={`/`} className='link'>
                                Home
                            </Link>
                        </li>
                        <li className="ham-menu-list-item">
                            <Link to={`/login`} className='link'>
                                Log In
                            </Link>
                        </li>
                        <li className="ham-menu-list-item">
                            <Link to={`/register`} className='link'>
                                Register
                            </Link>
                        </li>
                    </div> }
                    </ul>
                </nav>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.currentUser !== null,
    }
};

export default connect(mapStateToProps)(Hamburger);
