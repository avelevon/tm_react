import './FormCreateTask.scss'
import React, {PureComponent} from 'react';
import {Select} from 'antd';
import {load as loadTargetsAction} from "actions/targets";
import {connect} from "react-redux";
import {Button} from 'antd';

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
        const {Option} = Select;
        return (
            <div className="FormCreateTask">
                <div>
                    {/*<p className="target-sign">Target</p>*/}
                    <Select
                        placeholder="Select a target"
                        className="basic-single"
                        showSearch
                        style={{width: 220}}
                        optionFilterProp="children"
                        onChange={(val, opt) => setTarget(val, opt)}
                        value={selectedOption}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {targets.map((target) => (
                            <Option key={target._id} value={target._id}>{target.sn + " " + target.name}</Option>
                        ))}

                    </Select>

                    <Button type="primary" onClick={confirmTask}>Create task</Button>
                </div>
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