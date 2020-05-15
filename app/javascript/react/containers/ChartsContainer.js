import * as React from "react";
import { Chart } from "react-google-charts";

const ChartsContainer = ({chartsData, homePage}) => {
  let width;
  let height;
  if (homePage) {
    width = '90%'
    height = '250px'
  } else {
    width = '45%'
    height = '250px'
  }


  return (
    <div className="charts">
      <Chart
        width={width}
        height={height}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={chartsData}
        options={{
          hAxis: {
            title: 'dates',
            textStyle:{color: 'white'}
          },
          vAxis: {
            title: 'Total number of searches',
            textStyle:{color: 'white'}
          },
          backgroundColor: {
          fillOpacity: 0.1
        },
        legendTextStyle: { color: 'white' },
        }}
        rootProps={{ 'data-testid': '1' }}
        />
    </div>
  );
}

export default ChartsContainer
