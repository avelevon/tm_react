import React, {PureComponent, Fragment} from 'react';
import Targets from 'components/Targets';
import {add as addTarget, deleteSingleItem, load as loadUsers} from "actions/targets";
import {connect} from "react-redux";

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

    handleSendButton = () => {
        const { add } = this.props;
        add({
            sn: this.state.sn,
            name: this.state.name,
            address: this.state.address,
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
                <div className="FormCreateTarget">
                    <input name="sn" onChange={this.handleFieldChange} value={sn} placeholder="serial number"/>
                    <input name="name" onChange={this.handleFieldChange} value={name} placeholder="name"/>
                    <input name="address" onChange={this.handleFieldChange} value={address} placeholder="address"/>
                    <button onClick={this.handleSendButton}>Create</button>
                </div>
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