import './FormCreateTask.scss'
import React, {PureComponent} from 'react';
import Select from 'react-select';
import {PrimaryButton, TagPicker} from 'office-ui-fabric-react';
import {load as loadDates} from "actions/dates";
import {load as loadUsersAction} from "actions/users";
import {load as loadTargetsAction} from "actions/targets";
import {connect} from "react-redux";

class FormCreateTask extends PureComponent {
    static defaultProps = {}

    componentDidMount() {
        const {loadTargets} = this.props;
        loadTargets();
    }


    render() {
        const {confirmTask, targets, setTarget, selectedOption} = this.props;

        return (
            <div className="FormCreateTask">
                <Select value={selectedOption}
                        options={targets.map((target) => ({value: target._id, label: target.sn}))}
                        onChange={setTarget}

                />
                <PrimaryButton onClick={confirmTask}>Create task</PrimaryButton>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        targets: state.targets.items,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTargets: () => dispatch(loadTargetsAction()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(FormCreateTask)