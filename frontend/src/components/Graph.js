import React, { Component } from 'react'
import './Graph.css'
import {
    PieChart, Pie, Sector, Cell, Legend
  } from 'recharts';

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, purchase, Price, LatestPrice,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{Price}</text>
      <text x={cx} y={cy-120} dy={8} textAnchor="middle" fill={fill}>{"Shares Investment"}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Price ${LatestPrice} `}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`${purchase} shares`}
        </text>

      </g>
    );
  };

class Graph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data :[{LatestPrice: 297.56, Price: "AAPL", purchase: 256},
      {LatestPrice: 180.76, Price: "MSFT", purchase: 256},
      {LatestPrice: 356.13, Price: "ADBE", purchase: 255},
     ],
     
      activeIndex: 0
    }

    this.onPieEnter = this.onPieEnter.bind(this);
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() { 
    return (
        <div className="GRAPH">  
        <h5 style={{color: "#dc3545"}} className="text-center">Current Values</h5>        
          <PieChart width={600} height={400}>
           
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={this.props.data}
          cx={300}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="purchase"
          onMouseEnter={this.onPieEnter}
        >
          {
            this.props.data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
          }
          </Pie>
           
          <Legend
          payload={
            this.props.data.map(
              (item, index) => ({
                color : `${COLORS[index % COLORS.length]}`,
                value: `${item.CompanyName}`,
              })
            )}
            layout='vertical' verticalAlign="bottom" align="center"/>
      </PieChart> 
             
        </div>
      
      )
  }
}

export default Graph;
