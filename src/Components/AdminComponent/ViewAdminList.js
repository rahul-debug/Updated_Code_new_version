import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import AuthService from '../../services/AuthService';
import { SUCCESS_CODE } from '../../config';

export default class ViewAdminList extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         showData: false,
         viewList: [],
         message: ''
      }
   }
   viewList = () => {
      if (this.selectedTeam && this.selectedTeam !== "Select Team") {
         AuthService.viewAdminProcessTeamDetails(this.selectedTeam).then(data => {
            if (data.data.status === SUCCESS_CODE) {
               this.setState({ viewList: data.data.data, showData: true })
            } else {
               this.setState({ message: data.data.message })
            }
         });

      } else {
         let modal = document.getElementById("errorModal");
         modal.style.display = "block";
      }
   }
   selectTeam = (e) => {
      this.selectedTeam = e.target.value;
   }
   closeErrorModal = () => {
      let modal = document.getElementById("errorModal");
      modal.style.display = "none";
   }
   closeNoTeamDetailsFoundModal = () => {
      let modal = document.getElementById("noTeamDetailsFoundModal");
      modal.style.display = "none";
   }
   closeNoDataFoundModal = () => {
      let modal = document.getElementById("noDataFoundModal");
      modal.style.display = "none";
      this.setState({ message: '' });
   }

   render() {
      let arrayOfData = this.props.adminList;
      let options = arrayOfData.map((data) =>
          <option>
            {data.team}
          </option>  
      );
      const columns = [
         {
            label: 'Name',
            field: 'Name',

         },
         {
            label: 'Team',
            field: 'Team'

         },
         {
            label: 'Email',
            field: 'Email'
         }
      ];
      const rows = this.state.viewList;
      return (
         <div className="">
            <div className="pb-2 a-pb-20">



               <div class="a-bg-light a-p-20 form-block col-md-8 offset-md-2">

                  <div className="a-input-number-box a-input-number-secondary a-stepper-fun pb-2">
                     <label className="a-input-label col-md-3">Select Team:<span>*</span></label>
                     <div className="a-input-container">
                        <select className="a-text-input" onChange={(e) => this.selectTeam(e)} id="sel1" name="sellist1">
                           <option>Select Team</option>
                           {options}
                        </select>
                     </div>
                  </div>

                  <div className="d-flex justify-content-center gutter-wrapper">
                     <input className="a-btn a-btn-primary a-btn-lg" type="button" value="View List" onClick={this.viewList} />
                  </div>
               </div>
            </div>


            {this.state.showData && this.state.viewList.length ?
               <div className="a-panel a-p-20">
                  <MDBTable scrollY>
                     <MDBTableHead columns={columns} />
                     <MDBTableBody rows={rows} />
                  </MDBTable>
               </div>
               : null}
            {this.props.noTeamFound !== "" ?
               <div id="noTeamDetailsFoundModal" className="modal" style={{ display: "block" }}>
                  <div className="modal-content">
                     <h4 className="error">ERROR</h4>
                     <p>{this.props.noTeamFound}</p>
                     <div className="d-flex justify-content-center gutter-wrapper"><input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeNoTeamDetailsFoundModal} /></div>
                  </div>

               </div> : null}
            <div id="errorModal" className="modal">
               <div className="modal-content">
                  <h4 className="error">ERROR</h4>
                  <p>The admin list could not be generated because the team field is empty</p>
                  <p>Please choose the correct team from the dropdown menu.</p>
                  <div className="d-flex justify-content-center gutter-wrapper"><input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeErrorModal} /></div>
               </div>

            </div>
            {this.state.message !== "" ?
               <div id="noDataFoundModal" className="modal" style={{ display: "block" }}>
                  <div className="modal-content">
                     <h4 className="error">ERROR</h4>
                     <p>{this.state.message}</p>
                     <div className="d-flex justify-content-center gutter-wrapper"><input className="a-btn a-btn-primary a-btn-lg" type="button" value="OK" onClick={this.closeNoDataFoundModal} /></div>
                  </div>

               </div> : null}

         </div>

      );
   }
}