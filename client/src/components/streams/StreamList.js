import React from 'react';
import {connect} from 'react-redux'
import {fetchStreams} from "../../actions";
import {Link} from 'react-router-dom';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderStreamAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <>
                    <div className="ui icon buttons">
                        <Link to={`/streams/edit/${stream.id}`} className="ui small button"><i
                            className="pencil alternate icon"/></Link>
                        <Link to={`/streams/delete/${stream.id}`} className="ui small button"><i
                            className="trash alternate icon"/></Link>
                    </div>
                </>
            )
            // } else {
            //     return <div className="ui icon buttons left floated content mr-2">
            //         <button className="ui small button disabled"><i className="lock alternate icon"/></button>
            //     </div>
        }
    }

    renderStreamsList() {
        // if (this.props.fetchStreams.length > 0)
        //     this.props.fetchStreams(this.props.streams[0]);

        return this.props.streams.map(stream => {
            const userId = `${!stream.userId ? 'unknown' : stream.userId}`;
            return (
                <div className="item" key={stream.id}>
                    <div className="right floated content">
                        <Link to={`/streams/show/${stream.id}`} className="ui right labeled icon button purple">
                            <i className="play circle icon"/>
                            Watch
                        </Link>
                    </div>
                    <div className="right floated content">
                        {this.renderStreamAdmin(stream)}
                    </div>
                    <div className="content">
                        <Link to={`/streams/show/${stream.id}`}>
                            <h3 className="header" style={{color: "purple"}}>{stream.title}</h3>
                        </Link>
                        <p className="description">{stream.description}</p>
                        <h5 className="">{userId}</h5>
                    </div>
                </div>
            );
        });
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div className="right floated content">
                    <Link to="/streams/new" className="ui button purple basic">
                        Create Stream
                    </Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="ui container">
                <h2>Streams</h2>
                {this.renderCreate()}
                <div className="ui celled list">
                    {this.renderStreamsList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, {fetchStreams})(StreamList);