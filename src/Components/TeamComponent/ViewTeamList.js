import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';


export default class ViewTeamList extends React.Component {

    render() {
        const columns = [
            {
                label: 'Serial #',
                field: 'id',

            },
            {
                label: 'Team',
                field: 'Team'

            },
            {
                label: 'Added By',
                field: 'added_by'
            }
        ];
        return (
            <>
                {this.props.teamData.length ?
                <div className="a-panel a-p-20">

                    <MDBTable scrollY id="addKeyword">
                        <MDBTableHead columns={columns} />
                        <MDBTableBody>
                            {this.props.teamData.map(team =>

                                <tr>
                                    <td></td>
                                    <td>{team.team}</td>
                                    <td>{team.created_by}</td>
                                </tr>)}
                        </MDBTableBody>
                    </MDBTable>
                    </div>
                    : <h1 style={{ textAlign: "center" }}>{this.props.noTeamFound}</h1>}
            </>
        );
    }
}