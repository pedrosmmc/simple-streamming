import React from 'react'
import ReactDOM from 'react-dom'

const Modal = props => {
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active" onClick={props.onDismiss}>
            <div className="ui basic modal visible active" onClick={(e) => e.stopPropagation()}>
                <div className="ui icon header">
                    <i className="trash alternate icon"/>
                    {props.title}
                </div>
                <div className="content">
                    <h3 className="text-right">{props.msg}</h3>
                </div>
                {props.content}
                <div className="actions">{props.actions}</div>
            </div>
        </div>,
        document.getElementById('modal-portal')
    )
};

export default Modal;