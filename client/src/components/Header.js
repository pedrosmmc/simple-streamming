import React from 'react';
import {Link} from 'react-router-dom'
import GoogleAuth from './GoogleAuth';

class Header extends React.Component {
    render() {
        return (
            <div className="ui secondary pointing menu">
                <Link className="ui item" to="/"><h1><i className="twitch icon green"/>Streamerz</h1></Link>
                <div className="right menu">
                    <Link className="ui item" to="/">Streams List</Link>
                    <GoogleAuth />
                </div>
            </div>
        );
    }
}

export default Header;