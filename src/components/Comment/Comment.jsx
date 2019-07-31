import './Comment.scss'
import React, {PureComponent} from 'react';

export default class Comment extends PureComponent {
    static defaultProps = {};

    render() {
        const { items, load } = this.props;
        return (
            <div className="Comment">
                {items.map((item, idx) =>
                    <div className="single-comment" key={idx}>
                        <div className='author'>{item.name}</div>
                        <div className='comment'>{item.body}</div>
                    </div>
                )}
                <button onClick={load}>Load More</button>
            </div>
        )
    }
}