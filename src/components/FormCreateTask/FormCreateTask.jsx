import './FormCreateTask.scss'
import React, {PureComponent} from 'react';
import Select from 'react-select';
import {load as loadTargetsAction} from "actions/targets";
import {connect} from "react-redux";

class FormCreateTask extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isClearable: true,
            isDisabled: false,
            isLoading: false,
            isRtl: false,
            isSearchable: true,
        };
    }

    componentDidMount() {
        const {loadTargets} = this.props;
        loadTargets();
    }

    render() {
        const {confirmTask, targets, setTarget, selectedOption} = this.props;
        const {
            isClearable,
            isSearchable,
            isDisabled,
            isLoading,
            isRtl,
        } = this.state;
        return (
            <div className="FormCreateTask">
                <Select className="basic-single"
                        classNamePrefix="select"
                        defaultValue={'select'}
                        isDisabled={isDisabled}
                        isLoading={isLoading}
                        isClearable={isClearable}
                        isRtl={isRtl}
                        isSearchable={isSearchable}
                        name="color"
                        value={selectedOption}
                        options={targets.map((target) => ({value: target._id, label: target.sn + " " + target.name}))}
                        onChange={setTarget}

                />
                <button onClick={confirmTask}>Create task</button>
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