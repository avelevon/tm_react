import './Form.scss'
import React, {PureComponent} from 'react';

export default class Form extends PureComponent {
    static defaultProps = {}


    render() {
        const { author, comment, onComment, fieldChange } = this.props;
        return (
            <div className="Form">
                <input name="author" onChange={fieldChange} value={author} placeholder='author' />
                <textarea name="comment" onChange={fieldChange} value={comment} placeholder='comment' />
                <button onClick={onComment}>Send</button>
            </div>
        )
    }
}