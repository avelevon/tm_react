import React, {PureComponent, Fragment} from 'react';
import Targets from 'components/Targets';
import {add as addTarget, deleteSingleItem, load as loadUsers} from "actions/targets";
import {connect} from "react-redux";
import FormCreateTarget from "components/FormCreateTarget";

class TargetsContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            sn: '',
            name: '',
            address: '',

        }
    };
    componentDidMount() {
        const {load} = this.props;
        load();
    }


    handleFieldChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    handleSendButton = (target) => {
        const { add } = this.props;
        add({
            sn: target.sn,
            name: target.name,
            address: target.address,
        });

        this.setState((prevState) => ({
            ...prevState,
            sn: '',
            name: '',
            address: '',
        }));
    };

    render() {
        const { sn, name, address } = this.state;
        const { deleteTarget, targets } = this.props;
        return (
            <Fragment>
                <FormCreateTarget onChange={this.handleFieldChange} name={name} sn={sn} address={address} createTarget={this.handleSendButton}/>
                <Targets deleteTarget={deleteTarget} targets={targets}/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        targets: state.targets.items,
        loading: state.targets.loading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        load: () => dispatch(loadUsers()),
        add: (item) => dispatch(addTarget(item)),
        deleteTarget: (id) => dispatch(deleteSingleItem(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TargetsContainer)