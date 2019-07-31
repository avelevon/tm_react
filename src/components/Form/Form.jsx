import './Form.scss'
import React, {PureComponent} from 'react';

export default class Form extends PureComponent {
    static defaultProps = {}


    render() {
        const { name, body, onComment, fieldChange } = this.props;
        return (
            <div className="Form">
                <input name="name" onChange={fieldChange} value={name} placeholder='author' />
                <textarea name="body" onChange={fieldChange} value={body} placeholder='comment' />
                <button onClick={onComment}>Send</button>
            </div>
        )
    }
}