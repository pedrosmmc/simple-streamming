import React from 'react';
import {connect} from 'react-redux'
import {fetchStream, deleteStream} from "../../actions";
import Modal from '../Modal'
import {Link} from "react-router-dom";
import history from "../../history";

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    delete = () => {
        if (this.props.stream.userId === this.props.currentUserId)
            this.props.deleteStream(this.props.stream.id);
    };

    renderActions() {
        return (
            <>
                <Link to="/" className="ui cancel inverted button">Cancel</Link>
                <button className="ui red ok inverted button"
                        onClick={() => this.delete()}>
                    Delete
                </button>
            </>
        )
    }

    renderContent() {
        if (!this.props.stream) {
            return <div className="ui active centered inline loader"/>
        }
        return (<>
            <div className="ui message warning inverted">
                <h2 className="">{this.props.stream.title}<span>({this.props.stream.id})</span></h2>
                <h4>{this.props.stream.description}</h4>
            </div>
        </>)
    }

    render() {
        if (this.props.stream && this.props.stream.userId === this.props.currentUserId) {
            return (
                <div>
                    <Modal
                        title="Delete Stream"
                        msg="Are you sure you want to delete this stream?"
                        content={this.renderContent()}
                        actions={this.renderActions()}
                        onDismiss={() => history.push('/')}
                    />
                </div>
            )
        } else if (this.props.stream) {
            const content = (
                <>
                    <div>
                        <div className="header">
                            <h3>Trying to delete stream</h3>
                            <p/>
                        </div>
                        <div>{this.renderContent()}</div>
                        <p/>
                        <p className="negative">You have not permission to delete this stream!</p>
                    </div>
                    <Link to="/" className="ui right labeled icon button purple right floated">
                        <i className="left arrow icon"/>
                        Streams List
                    </Link>
                </>
            );

            return (<>
                <Modal
                    content={content}
                    onDismiss={() => history.push('/')}
                />
            </>)
        }
        return <div className="ui active centered inline loader"/>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
        currentUserId: state.auth.userId
    }
};

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);