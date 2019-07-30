import './Comment.scss'
import React, {PureComponent} from 'react';

export default class Comment extends PureComponent {
    static defaultProps = {
        'items': [
            {
                'author': '',
                'comment': '',
            }
        ]
    };

    render() {
        const {items} = this.props;
        return (
            <div className="Comment">
                {items.map((item, idx) =>
                    <div className="single-comment" key={idx}>
                        <div className='author'>{item.author}</div>
                        <div className='comment'>{item.comment}</div>
                    </div>
                )}
            </div>
        )
    }
}