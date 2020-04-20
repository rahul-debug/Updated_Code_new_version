import React from 'react';
import ViewAdminList from './ViewAdminList';
import AddAdmin from './AddAdmin';
import DeleteAdmin from './DeleteAdmin';
import AuthService from '../../services/AuthService';
import { SUCCESS_CODE } from '../../config';

export default class Admin extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         view: "Admin",
         showData: false,
         adminList: [],
         viewList: [],
         noTeamFound: ""

      }
   }
   componentDidMount() {
      AuthService.getAdminProcessTeamDetailsList().then(res => {
         if (res.data.status === SUCCESS_CODE) {
            const adminList = res.data.data;
            this.setState({ adminList: adminList });
         } else {
            this.setState({ noTeamFound: res.data.message })
         }
      });

   }


   showAdminView = () => {
      document.querySelector("#AdminView").classList.add("active");
      document.querySelector("#AddAdmin").classList.remove("active");
      document.querySelector("#DeleteAdmin").classList.remove("active");
      this.setState({ view: "Admin" })
   }
   addNewAdmin = () => {
      document.querySelector("#AddAdmin").classList.add("active");
      document.querySelector("#AdminView").classList.remove("active");
      document.querySelector("#DeleteAdmin").classList.remove("active");
      this.setState({ view: "AddAdmin" })
   }
   deleteAdmin = () => {
      document.querySelector("#DeleteAdmin").classList.add("active");
      document.querySelector("#AdminView").classList.remove("active");
      document.querySelector("#AddAdmin").classList.remove("active");
      this.setState({ view: "DeleteAdmin" })
   }



   render() {
      return (

         <div className="">

            <ul className="a-tab-fun a-tab a-tab-center a-pt-10">
               <li className="viewAdmin a-tab-item active" id="AdminView" onClick={this.showAdminView}>View Administrator List</li>
               <li className="addAdmin a-tab-item" onClick={this.addNewAdmin} id="AddAdmin">Add New Administrator</li>
               <li className="deleteAdmin a-tab-item" onClick={this.deleteAdmin} id="DeleteAdmin">Delete Administrator</li>
            </ul>

            {this.state.view === "Admin" ?
               <ViewAdminList adminList={this.state.adminList} noTeamFound={this.state.noTeamFound} />
               :
               <React.Fragment>
                  {this.state.view === "AddAdmin" ?
                     <AddAdmin adminList={this.state.adminList} /> :
                     <React.Fragment>
                        <DeleteAdmin />
                     </React.Fragment>}
               </React.Fragment>
            }
         </div>

      );
   }
}