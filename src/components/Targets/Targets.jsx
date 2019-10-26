import './Targets.scss'
import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";
import {Divider, Table} from "antd";

export default class Targets extends PureComponent {
    static defaultProps = {}

    render() {
        const {targets, deleteTarget} = this.props;
        const {Column} = Table;
        return (
            <div className="Targets">
                <Table dataSource={targets} rowKey="_id">
                    <Column title="S/N" dataIndex="sn" key="sn"/>
                    <Column title="Name" dataIndex="name" key="name"/>
                    <Column title="Address" dataIndex="address" key="address"/>
                    <Column title="Actions" key="action" render={(text, record) => (
                        <span>
                        {/*<a onClick={() => changeUser(record._id)}>Change</a>*/}
                            {/*<Divider type="vertical"/>*/}
                            <a onClick={() => deleteTarget(record._id)}>Delete</a>
                    </span>
                    )}/>


                </Table>
            </div>
            // <table className="Targets">
            //     <tbody>
            //     {targets.map((target) =>
            //         <tr key={target._id}>
            //             <td>{target.sn}</td>
            //             <td>{target.name}</td>
            //             <td>{target.address}</td>
            //             <td className="delete-class"  onClick={() => deleteTarget(target._id)}>Delete</td>
            //         </tr>
            //     )}
            //     </tbody>
            // </table>
        )
    }
}