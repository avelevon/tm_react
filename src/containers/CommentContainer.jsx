import React, {PureComponent} from 'react';

import {connect} from 'react-redux';

import {load as loadComments} from 'actions/comments';

import Comment from 'components/Comment';

class CommentContainer extends PureComponent {
    componentDidMount() {
        const { load } = this.props;
        load();
    }

    render() {
        const { items, load } = this.props;

        return (
            <div>
                <Comment items={items} load={load}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        items: state.comments.items,
        loading: state.comments.loading,
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        load: () => dispatch(loadComments()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer)