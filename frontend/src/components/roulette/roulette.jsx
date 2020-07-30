import React from 'react';
import "./roulette.scss";

class Roulette extends React.Component {
  render() {
    return (
      <>
        <link
          href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
          rel="stylesheet"
        ></link>
        <div id="wrapper">
          <div id="wheel">
            <div id={this.props.style ? this.props.style : this.props.class}>
              <div className="sec">{/* <span class="fa fa-beer"></span> */}</div>
              <div className="sec">
                {/* <span class="fas fa-cocktail"></span> */}
              </div>
              <div className="sec">{/* <span class="fa fa-smile-o"></span> */}</div>
              <div className="sec">{/* <span class="fa fa-heart-o"></span> */}</div>
              <div className="sec">{/* <span class="fa fa-star-o"></span> */}</div>
              <div className="sec">
                {/* <span class="fa fa-lightbulb-o"></span> */}
              </div>
            </div>

            <div id="spin" onClick={this.props.handleSubmit}>
              <div
                id={this.props.style ? "" : 'inner-spin'}
                className={this.props.style ? this.props.style : ""}
                
              ></div>
            </div >

            <div id="shine"></div>
          </div>

          <div id="txt"></div>
        </div>
      </>
    );
  }
}

export default Roulette;
