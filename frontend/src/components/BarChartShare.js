import React, { Component } from "react";
import './BarChartShare.css'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

class CustomizedAxisTick extends Component {
  render() {
    const {
      x, y, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
}

class BarChartShare extends Component {
  render() {
    return (
      <div className="BARCHART">
        <LineChart
          width={580}
          height={300}
          data={this.props.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
        >
          <XAxis dataKey="Date" tick={<CustomizedAxisTick />} />
          <YAxis type="number" domain={['dataMin - 100','dataMax + 100']} />
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Amount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    );
  }
}

export default BarChartShare;
