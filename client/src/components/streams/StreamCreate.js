import React from 'react';
import {connect} from 'react-redux';
import {createStream} from "../../actions";
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
    render() {
        return (
            <div className="ui grid">
                <div className="seven wide column">
                    <div className="ui segment">
                        <h3>Create a stream</h3>
                        <StreamForm onSubmit={this.onSubmit}/>
                    </div>
                </div>
            </div>
        )
    }

    onSubmit = formValues => {
        this.props.createStream(formValues);
    }
}

export default  connect(null, {createStream})(StreamCreate);