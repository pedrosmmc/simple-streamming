import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchStream, editStream} from "../../actions";
import StreamForm from './StreamForm'
import * as _ from "lodash";

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    render() {
        if (!this.props.stream) {
            return <div className="ui active centered inline loader"/>
        } else if (this.props.stream.userId === this.props.currentUserId) {
            return (
                <div className="ui grid">
                    <div className="seven wide column">
                        <div className="ui segment">
                            <h3>Edit stream</h3>
                            <StreamForm onSubmit={this.onSubmit}
                                        initialValues={_.pick(this.props.stream, 'title', 'description')}/>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <div className="ui negative message">
                    <div className="header">
                        Trying to edit stream
                    </div>
                    <p>You have not permission to edit this stream!</p>
                </div>
                <Link to="/"  className="ui right labeled icon button purple">
                    <i className="left arrow icon"/>
                    Streams List
                </Link>
            </div>
        );
    }

    onSubmit = formValues => {
        this.props.editStream(this.props.match.params.id, formValues);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
        currentUserId: state.auth.userId
    }
};


export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);