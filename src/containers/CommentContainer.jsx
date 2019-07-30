import React, {PureComponent} from 'react';

import Comment from 'components/Comment';

export default class CommentContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            'items': [
                {
                    'author': '',
                    'comment': '',
                }
            ]
        }
    };

    componentDidUpdate(prevProps) {
        const {item} = this.props;

        if (prevProps.item != item) {
            this.setState((prevState) => ({
                'items': prevState.items.concat(item),
            }));
        }
    }

    render() {
        const {items} = this.state;

        return (
            <div>
                <Comment items={items}/>
            </div>
        )
    }
}