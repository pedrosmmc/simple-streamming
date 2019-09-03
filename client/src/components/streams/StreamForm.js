import React from 'react';
import {Field, reduxForm} from 'redux-form';

class StreamForm extends React.Component {
    renderError({error, touched}) {
        if (error && touched) {
            return (
                <div className="ui error message negative">
                    <p className="header">{error}</p>
                </div>
            )
        }
    }

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    };

    render() {
        return (
            <div>
                <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="title" component={this.renderInput} label="Title"/>
                    <Field name="description" component={this.renderInput} label="Description"/>
                    <button className="ui button purple" type="submit">Submit</button>
                </form>
            </div>
        )
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);