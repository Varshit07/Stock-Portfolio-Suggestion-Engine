import React, { Component } from "react";
import axios from "axios";
import "./Button.css";
import Graph from "./Graph";
import BarChartShare from "./BarChartShare";
import "./Button.css";
import '../../node_modules/pretty-checkbox/dist/pretty-checkbox.min.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: { Stock: [], LastFive: [], Stock1: [], LastFive1: [] },
      checked: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange = checkedValues => {
    let ch = this.state.checked
    if(checkedValues.target.checked) {ch.push(checkedValues.target.value)}
    else {var index = ch.indexOf(checkedValues.target.value);
    if (index >= 0) {
      ch.splice( index, 1 );
    }}
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

    let formData = new FormData(e.target);
    axios.post("http://127.0.0.1:5000/", formData, config).then((response) => {
      this.setState({
        value: response.data,
      });
    });
  }

  render() {
    return (
      <div className="BUTTON">
        <div className="login-form">
          <div className="main-div">
            <div className="panel">
              <h2 className="p-3 mb-2 bg-danger text-white text-center">
                Stock Portfolio Analysis
              </h2>
            </div>
            <form
              onSubmit={this.handleSubmit}
              style={{ width: "400px", margin: "auto" }}
            >
              <div className="form-group">
                <label htmlFor="sharename">Enter Amount</label>
                <input
                  type="number"
                  className="form-control"
                  name="share"
                  min="5000"
                  placeholder="Amount to Invest"
                  required
                />
              </div>
              <input
              onChange={this.onChange}
                type="checkbox"
                id="ethical"
                className="chkbox"
                value="ethical"
                disabled={this.isDisabled("ethical")}
                name="investmenttype"
              />{" "}
              Ethical Investing
              <br />
              <input
              onChange={this.onChange}
                type="checkbox"
                id="value"
                className="chkbox"
                value="value"
                disabled={this.isDisabled("value")}
                name="investmenttype"
              />{" "}
              Value Investing
              <br />
              <input
              onChange={this.onChange}
                type="checkbox"
                id="growth"
                className="chkbox"
                value="growth"
                disabled={this.isDisabled("growth")}
                name="investmenttype"
              />{" "}
              Growth Investing
              <br />
              <input
              onChange={this.onChange}
                type="checkbox"
                id="index"
                className="chkbox"
                value="index"
                disabled={this.isDisabled("index")}
                name="investmenttype"
              />{" "}
              Index Investing
              <br />
              <input
              onChange={this.onChange}
                type="checkbox"
                id="quality"
                className="chkbox"
                value="quality"
                disabled={this.isDisabled("quality")}
                name="investmenttype"
              />{" "}
              Quality Investing
              <br />
              <button type="submit" className="btn btn-danger">
                Get Info
              </button>
              &nbsp;&nbsp;
              <button type="reset" className="btn btn-danger" name="reset">
                Reset
              </button>
              &nbsp;&nbsp;
              <div className="form-group"></div>
            </form>
          </div>
        </div>

        {this.state.value.Stock.length !== 0 ? (
          <div className="">
            <Graph
              key={this.state.value.Stock}
              data={this.state.value.Stock}
            ></Graph>
            <BarChartShare
              key={this.state.LastFive}
              data={this.state.value.Lastfive}
            ></BarChartShare>
          </div>
        ) : (
          " "
        )}
        {this.state.value.Stock1.length !== 0 ? (
          <div className="">
            <Graph
              key={this.state.value.Stock}
              data={this.state.value.Stock1}
            ></Graph>
            <BarChartShare
              key={this.state.LastFive}
              data={this.state.value.Lastfive1}
            ></BarChartShare>
          </div>
        ) : (
          " "
        )}
      </div>
    );
  }
}

export default Button;
