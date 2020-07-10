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
        <link
          href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
          rel="stylesheet"
        ></link>
        <div id="wrapper">
          <div id="wheel">
            <div id={this.props.style ? this.props.style : this.props.class}>
              <div className="sec">{/* <span className="fa fa-beer"></span> */}</div>
              <div className="sec">
                {/* <span className="fas fa-cocktail"></span> */}
              </div>
              <div className="sec">{/* <span className="fa fa-smile-o"></span> */}</div>
              <div className="sec">{/* <span className="fa fa-heart-o"></span> */}</div>
              <div className="sec">{/* <span className="fa fa-star-o"></span> */}</div>
              <div className="sec">
                {/* <span className="fa fa-lightbulb-o"></span> */}
              </div>
            </div>

            <div id="spin">
              <div
                id={this.props.style ? "" : 'inner-spin'}
                className={this.props.style ? this.props.style : ""}
                onClick={this.wheelSpin}
              ></div>
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
