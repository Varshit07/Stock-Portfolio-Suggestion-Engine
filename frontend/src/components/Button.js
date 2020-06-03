import React, { Component } from "react";
import axios from "axios";
import "./Button.css";
import Graph from "./Graph";
import BarChartShare from "./BarChartShare";
import "./Button.css";
import ReactTooltip from "react-tooltip";
import '../../node_modules/pretty-checkbox/dist/pretty-checkbox.min.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: { Stock: [], LastFive: [], Stock1: [], LastFive1: [] },
      checked: [],
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: false, });
  }
  onChange = checkedValues => {
    let ch = this.state.checked;
    if (checkedValues.target.checked) { ch.push(checkedValues.target.value) }
    else {
      var index = ch.indexOf(checkedValues.target.value);
      if (index >= 0) {
        ch.splice(index, 1);
      }
    }
    this.setState({
      checked: ch,
    });
  };

  isDisabled = id => {
    return (
      this.state.checked.length > 1 && this.state.checked.indexOf(id) === -1
    );
  };

  handleSubmit(e) {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    //axios.defaults.withCredentials = true;

    this.setState({
      isLoading: true,
      shouldTitleUpdate: true,
    });
    let formData = new FormData(e.target);
    axios.post("http://127.0.0.1:5000/", formData, config).then((response) => {
      this.setState({
        value: response.data,
        isLoading: false,
      });
    });
  }

  render() {
    
    const { isLoading } = this.state;
    return (
      <div className="BUTTON">
        <div className="login-form">
          <div className="main-div">
            <div className="panel">
              <h2 className="p-3 mb-2 bg-danger text-white text-center">
                Stock Portfolio Suggestion Engine
              </h2>
            </div>
            <form
              onSubmit={this.handleSubmit}
              style={{ width: "400px", margin: "auto" }}
            >
              <div className="form-group">
                <label title="Enter Amount to Invest" htmlFor="sharename">Enter Amount to Invest</label>
                <input
                  type="number"
                  className="form-control"
                  name="share"
                  min="5000"
                  max="100000000"
                  placeholder="Minimum investment is $5000"
                  required
                />
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  onChange={this.onChange}
                  type="checkbox"
                  id="ethical"
                  className="custom-control-input"
                  value="ethical"
                  disabled={this.isDisabled("ethical")}
                  name="investmenttype"
                />{" "}
                <label data-tip="This is ethical investing" data-for="ethical-label" htmlFor="ethical" className="custom-control-label">Ethical Investing</label>
                <ReactTooltip id='ethical-label' place="right" type='dark' effect='float'><span>Ethical investing strategy applies your values— social, moral, religious — to your portfolios and investment strategies.</span></ReactTooltip>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  onChange={this.onChange}
                  type="checkbox"
                  id="value"
                  className="custom-control-input"
                  value="value"
                  disabled={this.isDisabled("value")}
                  name="investmenttype"
                />{" "}
                <label data-tip="This is value investing" data-for="value-label" htmlFor="value" className="custom-control-label">Value Investing</label>
                <ReactTooltip id='value-label' place="right" type='dark' effect='float'><span>Value investing strategy involves picking stocks that appear to be trading for less than their intrinsic or book value. </span></ReactTooltip>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  onChange={this.onChange}
                  type="checkbox"
                  id="growth"
                  className="custom-control-input"
                  value="growth"
                  disabled={this.isDisabled("growth")}
                  name="investmenttype"
                />{" "}
                <label data-tip="This is growth investing" data-for="growth-label" htmlFor="growth" className="custom-control-label">Growth Investing</label>
                <ReactTooltip id='growth-label' place="right" type='dark' effect='float'><span>Growth investing strategy focuses on businesses with the potential to grow in both size and importance within their industries. </span></ReactTooltip>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  onChange={this.onChange}
                  type="checkbox"
                  id="index"
                  className="custom-control-input"
                  value="index"
                  disabled={this.isDisabled("index")}
                  name="investmenttype"
                />{" "}
                <label data-tip="This is index investing" data-for="index-label" htmlFor="index" className="custom-control-label">Index Investing</label>
                <ReactTooltip id='index-label' place="right" type='dark' effect='float'><span>Index investing strategy attempts to generate returns similar to a broad market index. </span></ReactTooltip>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  onChange={this.onChange}
                  type="checkbox"
                  id="quality"
                  className="custom-control-input"
                  value="quality"
                  disabled={this.isDisabled("quality")}
                  name="investmenttype"
                />{" "}
                <label data-tip="This is quality investing" data-for="quality-label" htmlFor="quality" className="custom-control-label">Quality Investing</label>
                <ReactTooltip id='quality-label' place="right" type='dark' effect='float'><span>
                  Quality investing strategy clearly defines fundamental criteria that identifies companies with outstanding quality characteristics.</span></ReactTooltip>
              </div>
              <br />
              <div className="col text-center">
                <button type="submit" className="btn btn-danger" disabled={!(this.state.checked.length === 1 || this.state.checked.length === 2)}>
                  Get Stock Suggestions
              </button>
              </div>
              <div className="form-group"></div>
            </form>
          </div>
        </div>
        {isLoading ? 
        <div className="d-flex justify-content-center">
          <h4 style={{ color: 'grey' }}>
            Loading Shares Investment... &nbsp; 
          </h4>
          <div className="spinner-border loading text-danger" role="status">
          <span className="sr-only">Loading...</span>
          </div>
        <br />
        <br />
        <br /> 
        </div> 
        : ""}


        {isLoading ? 
        <div className="d-flex justify-content-center">
          <br />
          <br />
          <br />
          <h4 style={{ color: 'grey' }}>
            Loading 5-Day Portfolio... &nbsp;
          </h4>
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div> : ""}


        {this.state.value.Stock.length !== 0 && this.state.value.Stock1.length !== 0 && !isLoading ? (
          <div className="container">

            <div className="row">

              <div className="col-md-6">
                <h2 style={{ textTransform: "capitalize", color: "#dc3545" }} className="text-center">{this.state.value.checked[0]} Investing</h2>

                <h5 style={{ textTransform: "capitalize", color: "#dc3545" }} className="text-center">Current Value: ${this.state.value.Lastfive[4].Amount}</h5>

                <Graph
                  key={this.state.value.Stock}
                  data={this.state.value.Stock}
                ></Graph>
              </div>

              <div className="col-md-6">
                <h2 style={{ textTransform: "capitalize", color: "#dc3545" }} className="text-center">{this.state.value.checked[1]} Investing</h2>

                <h5 style={{ textTransform: "capitalize", color: "#dc3545" }} className="text-center">Current Value: ${this.state.value.Lastfive1[4].Amount}</h5>

                <Graph
                  key={this.state.value.Stock}
                  data={this.state.value.Stock1}
                ></Graph>

              </div>
            </div>

            <div className="row">
              <div className="col-md-6 graphplot">
                <br />
                <br />
                <h5 style={{ color: "#dc3545" }} className="text-center">
                  5-Day Portfolio
                </h5>
                <br />
                <br />
                <BarChartShare
                  key={this.state.LastFive}
                  data={this.state.value.Lastfive}
                ></BarChartShare>
              </div>


              <div className="col-md-6 graphplot">
                <br />
                <br />

                <h5 style={{ color: "#dc3545" }} className="text-center">
                  5-Day Portfolio
                </h5>

                <br />
                <br />

                <BarChartShare
                  key={this.state.LastFive}
                  data={this.state.value.Lastfive1}
                >
                </BarChartShare>
              </div>
            </div>
          </div>
        ) : (
            (this.state.value.Stock.length !== 0 && !isLoading ?
              (<div className="container">

                <div className="row">

                  <div className="col-md-12 graphplot">

                    <h2 style={{ textTransform: "capitalize", color: "#dc3545" }} className="text-center">
                      {this.state.checked} Investing
                    </h2>

                    <h5 style={{ textTransform: "capitalize", color: "#dc3545" }} className="text-center">
                      Current Value: ${this.state.value.Lastfive[4].Amount}
                    </h5> 

                    <Graph
                      key={this.state.value.Stock}
                      data={this.state.value.Stock}
                    ></Graph>
                  </div> 
                  <div className="col-md-12 graphplot">
                    <br />
                    <br />
                    <h5 style={{ color: "#dc3545" }} className="text-center">
                      5-Day Portfolio
                    </h5>

                    <br />

                    <BarChartShare
                      key={this.state.LastFive}
                      data={this.state.value.Lastfive}
                    ></BarChartShare>
                  </div>
                </div>
              </div>) : " ")
          )}
        <br />
        <br />
      </div>

    );
  }

}

export default Button;
