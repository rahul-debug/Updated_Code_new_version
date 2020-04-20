import React from 'react';
import VDR from './Components/ProcessVDRComponent/Vdr';
import DataDictionary from './Components/DataDictionaryComponent/DataDictionary';
import TeamDetails from './Components/TeamComponent/TeamDetails';
import AdditionalKeyword from './Components/AdditionalKeywordComponent/AdditionalKeyword';
import Admin from './Components/AdminComponent/Admin';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: this.props.location.state.isAdmin,
      userName: this.props.location.state.username[0],
      tab: "vdr"
    }
    this.handlePageRefresh = this.handlePageRefresh.bind(this);
    this.showdataDictionary = this.showdataDictionary.bind(this);
    this.showTeamDetails = this.showTeamDetails.bind(this);
    this.showProcessVDR = this.showProcessVDR.bind(this);
    this.showAdditionalKeyword = this.showAdditionalKeyword.bind(this);
    this.showAdmin = this.showAdmin.bind(this);
  }
  showProcessVDR = () => {
    this.setState({ tab: "vdr" });
     document.querySelector("#pnl1").classList.add("active");
    document.querySelector("#pnl2").classList.remove("active");
    document.querySelector("#pnl3").classList.remove("active");
    document.querySelector("#pnl4").classList.remove("active");
    document.querySelector("#pnl5").classList.remove("active");
    

  }
  handlePageRefresh = () => {
    window.location.reload();
  }
  showTeamDetails = () => {
    this.setState({ tab: "teamDetails" });
    document.querySelector("#pnl5").classList.add("active");
    document.querySelector("#pnl1").classList.remove("active");
    document.querySelector("#pnl2").classList.remove("active");
    document.querySelector("#pnl3").classList.remove("active");
    document.querySelector("#pnl4").classList.remove("active");
    
  }

  showdataDictionary = () => {
    this.setState({ tab: "dataDictionary" });
    document.querySelector("#pnl2").classList.add("active");
    document.querySelector("#pnl1").classList.remove("active");
    document.querySelector("#pnl3").classList.remove("active");
    document.querySelector("#pnl4").classList.remove("active");
    document.querySelector("#pnl5").classList.remove("active");
    
  }
  showAdditionalKeyword = () => {
    this.setState({ tab: "additionalkeyword" });
    document.querySelector("#pnl4").classList.add("active");
    document.querySelector("#pnl1").classList.remove("active");
    document.querySelector("#pnl2").classList.remove("active");
    document.querySelector("#pnl3").classList.remove("active");
    document.querySelector("#pnl5").classList.remove("active");
    
  }
  showAdmin = () => {
    this.setState({ tab: "admin" });
    document.querySelector("#pnl3").classList.add("active");
    document.querySelector("#pnl1").classList.remove("active");
    document.querySelector("#pnl2").classList.remove("active");
    document.querySelector("#pnl4").classList.remove("active");
    document.querySelector("#pnl5").classList.remove("active");

  }

  //  addClass = (e) => {
  //   var header = document.getElementById("nav");
  //   var btns = header.getElementsByClassName("navigation-list-item");
  //   for (var i = 0; i < btns.length; i++) {
  //     btns[i].addEventListener("click", function() {
  //     var current = document.getElementsByClassName("active");
  //     if (current.length > 0) { 
  //       current[0].className = current[0].className.replace(" active", "");
  //     }
  //     this.className += " active";
  //     });
  //   }
  // }



  render() {
    console.log('fhjgfjgdsj', this.state.isAdmin, this.state.userName);
    
    return (
      <React.Fragment>
        <div class="a-header a-hfn-header-container d-flex align-items-center justify-content-between a-px-20">
          <div class="d-flex align-items-center">
            <div class="a-pwc-logo-grid a-md"></div>
            <span class="divider a-mx-20"></span>
            <div class="font-weight-medium a-nowrap logo" onClick={this.handlePageRefresh}>Data Room Sweeper Tool</div>
            <span class="divider a-mx-20"></span>
          </div>
          <div class="d-flex align-items-center a-pl-10 userlogin">
            <span>Hi, {this.state.userName}</span> <span>{this.state.isAdmin === "Admin" ? "Admin" : null}</span>
          </div>
        </div>

        <div className="d-flex">

          {this.state.isAdmin === "Admin" ?
            <React.Fragment>

              <div className="a-navigation">

                <ul class="navigation-list" id="nav"> 
                  <li className="navigation-list-item active" id="pnl1"  onClick={ this.showProcessVDR}>
                    <span class="z-one-icon appkiticon icon-globe-outline"></span>
                    <div> Process VDR</div>
                  </li>
                  <li className="navigation-list-item" id="pnl2"  onClick={ this.showdataDictionary }>
                    <span class="z-one-icon appkiticon icon-table-data-outline"></span>
                    <div>Data Dictionary</div>
                  </li>
                  <li className="navigation-list-item" id="pnl3" onClick={ this.showAdmin}>
                    <span class="z-one-icon appkiticon icon-bar-chart-outline"></span>
                    <div>Admin</div>
                  </li>
                  <li className="navigation-list-item" id="pnl4" onClick={ this.showAdditionalKeyword }>
                    <span class="z-one-icon appkiticon icon-toggle-outline"></span>
                    <div>Additional Keyword Summary</div>
                  </li>
                  <li className="navigation-list-item" id="pnl5" onClick={ this.showTeamDetails}>
                    <span class="z-one-icon appkiticon icon-community-outline"></span>
                    <div>Team Details</div>
                  </li>

                </ul>
              </div>
              {/* <hr className="verticalHR"></hr>  */}
            </React.Fragment> : null}
          <div className={this.state.isAdmin === "Admin" ? "a-template-content" : "a-template-content withoutLogin"}>
            {this.state.tab === "vdr" ? <VDR userName= {this.state.userName}/> : null}
            {this.state.tab === "dataDictionary" ? <DataDictionary /> : null}
            {this.state.tab === "teamDetails" ? <TeamDetails /> : null}
            {this.state.tab === "additionalkeyword" ? <AdditionalKeyword /> : null}
            {this.state.tab === "admin" ? <Admin /> : null}

          </div>

        </div>
        <div class="footer-wrapper flex-shrink-0 text-center">
          <div class="a-footer">
            <p>© {(new Date().getFullYear())} PwC. All rights reserved. PwC refers to the PwC network and/or one or more of its member firms, each of which is a separate legal entity. Please see <a href="http://www.pwc.com/structure" style={{ "text-decoration": " underline", "color": "#9e9e9e" }} >www.pwc.com/structure</a> for further details. </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
