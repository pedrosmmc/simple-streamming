import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component {
    currentUser;

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '616863851852-ljtrtaj77c6rk309jeoq59kffkqltol8.apps.googleusercontent.com',
                // client_id: 'CLIENT_ID.apps.googleusercontent.com',
                // hosted_domain: 'http://my.domain.com',
                scope: 'email',
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = isSignedIn => {
        if (isSignedIn)
            this.props.signIn(this.auth.currentUser.get().getId());
        else
            this.props.signOut();
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn === true) {
            return (
                <button className="ui google button red" onClick={this.onSignOutClick}>
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button className="ui google button" onClick={this.onSignInClick}>
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            )
        }
    }

    render() {
        return <div className="item">{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = state => {
    return {isSignedIn: state.auth.isSignedIn};

};

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);