import React from 'react';
import "./roulette.scss";

class Roulette extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { spinToggle: false };
  }

 
  
  render() {
// let toggleClass;
// if (this.state.spinToggle) {
//   toggleClass = "inner-wheel";
//   // setSpinToggle(true)
// } else {
//   toggleClass = "";
// }
    return (
      <>
      <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
        </link>
<div id="wrapper">
            
        <div id="wheel">
            <div id={this.props.class}>
                <div class="sec">
                    {/* <span class="fa fa-beer"></span> */}
                </div>
                <div class="sec">
                    {/* <span class="fas fa-cocktail"></span> */}
                </div>
                <div class="sec">
                    {/* <span class="fa fa-smile-o"></span> */}
                </div>
                <div class="sec">
                    {/* <span class="fa fa-heart-o"></span> */}
                </div>
                <div class="sec">
                    {/* <span class="fa fa-star-o"></span> */}
                </div>
                <div class="sec">
                    {/* <span class="fa fa-lightbulb-o"></span> */}
                </div>
            </div>       
           
            <div id="spin">
                <div id="inner-spin" onClick={this.wheelSpin}></div>
            </div>
            
            <div id="shine"></div>
        </div>
        
        
        <div id="txt"></div>
  </div>
      </>
    );
  }
}

export default Roulette;
