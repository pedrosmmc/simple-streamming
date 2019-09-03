import React from 'react';
import {connect} from 'react-redux'
import {fetchStream} from "../../actions";
import {Link} from "react-router-dom";
import flv from 'flv.js';

class StreamShow extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchStream(id);
        this.renderPlayer();
    }

    componentDidUpdate() {
        this.renderPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    renderPlayer() {
        if (this.player || !this.props.stream) {
            return;
        }

        const {title} = this.props.stream;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${title}.flv`
        });

        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    renderMeta() {
        const {userId, id, title, description} = this.props.stream;
        const uid = `${!userId ? 'unknown' : userId}`;
        return (
            <>
                <div className="header">{title}</div>
                <div className="description">{description}</div>
                <span className="right floated">{id}</span>
                <span><i className="user icon"/>{uid}</span>
                <Link to="/streams" className="ui right labeled icon button purple mt-2">
                    <i className="left arrow icon"/>
                    Streams List
                </Link>
            </>
        )
    }

    render() {
        if (this.props.stream) {
            return (
                <div className="ui container">
                    <video ref={this.videoRef} style={{width: '100%'}} controls/>
                    {this.renderMeta()}
                </div>
            )
        }

        return (
            <>
                <div className="ui active">
                    <div className="ui text green loader">
                        <i className="spinner icon"/>
                    </div>
                    <p/>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
};

export default connect(mapStateToProps, {fetchStream})(StreamShow);