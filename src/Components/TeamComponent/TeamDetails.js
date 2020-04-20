import React from 'react';
import ViewTeamList from './ViewTeamList';
import AddTeam from './AddTeam';
import DeleteTeam from './DeleteTeam';
import AuthService from '../../services/AuthService';
import {SUCCESS_CODE} from '../../config';


export default class TeamDetails extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         view: "Team",
         teamData: [],
         noTeamFound: ""

      }
   }
      componentDidMount() {
     this.callTeamList();

   }
   callTeamList=()=>{
      AuthService.getTeamList().then(data => {
         if (data.data.status === SUCCESS_CODE) {
            const adminList = data.data.data;
            this.setState({ teamData: adminList });
         } else {
            this.setState({ noTeamFound: data.data.message })
         }
      })
   }
   showTeamList = () => {
      document.querySelector("#TeamView").classList.add("active");
      document.querySelector("#AddTeam").classList.remove("active");
      document.querySelector("#DeleteTeam").classList.remove("active");
      this.setState({ view: "Team" })
   }
   addNewTeam = () => {
      document.querySelector("#AddTeam").classList.add("active");
      document.querySelector("#TeamView").classList.remove("active");
      document.querySelector("#DeleteTeam").classList.remove("active");
      this.setState({ view: "AddTeam" })
   }
   deleteTeam = () => {
      document.querySelector("#DeleteTeam").classList.add("active");
      document.querySelector("#TeamView").classList.remove("active");
      document.querySelector("#AddTeam").classList.remove("active");
      this.setState({ view: "DeleteTeam" })
   }


   render() {
      return (
         <div className="">
            <ul className="a-tab-fun a-tab a-tab-center a-pt-10">
               <li className="viewAdmin a-tab-item active" id="TeamView" onClick={this.showTeamList}>Team List</li>
               <li className="addAdmin a-tab-item" onClick={this.addNewTeam} id="AddTeam">Add New Team</li>
               <li className="deleteAdmin a-tab-item" onClick={this.deleteTeam} id="DeleteTeam">Delete Team</li>
               
            </ul>


            {this.state.view === "Team" ?
               <ViewTeamList teamData={this.state.teamData} noTeamFound={this.state.noTeamFound} />
               :
               <React.Fragment>
                  {this.state.view === "AddTeam" ?
                     <AddTeam callTeamList={this.callTeamList}/> :
                     <React.Fragment>
                        {this.state.view === "DeleteTeam" ?
                           <DeleteTeam callTeamList={this.callTeamList} />
                           : null} </React.Fragment>}
               </React.Fragment>
            }
            {/* <section id="footer-copyright">
                    <div className="row">
                        <div className="col-xs-12">
                            <p>© {(new Date().getFullYear())} PwC.All rights reserved.</p>
                        </div>
                    </div>
                </section> */}

         </div>
      );
   }
}