import Highcharts from "highcharts";

import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";
export default function SensorGraph({ sensorData }) {
  let metricNames = Object.keys(sensorData[0].data);
  var sensorChartdata = [];

  metricNames.map((metric) => {
    let currentMetricData = {};
    let metricData = [];

    sensorData.map((data) => {
      let x = new Date(data.time * 1000);
      const y = data.data[metric];
      x = Date.UTC(x.getFullYear(), x.getMonth(), x.getDate());
      metricData.push([x, y]);
    });

    currentMetricData.name = metric;
    currentMetricData.data = metricData;
    sensorChartdata.push(currentMetricData);

});

const [currentMetric, setCurrentMetric] = useState(
    sensorChartdata[metricNames[0]]
  );


  let chartOptions = {
    chart: {
      type: "spline",
    },
    title: {
      text: "Sensor Data",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        // don't display the year
        month: "%e. %b",
        year: "%b",
      },
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Sensor Readings",
      },
      min: 0,
    },
    tooltip: {
      headerFormat: "<b>{series.name}</b><br>",
      pointFormat: "{point.x:%e. %b}: {point.y:.2f} m",
    },

    plotOptions: {
      series: {
        marker: {
          enabled: true,
          radius: 2.5,
        },
      },
    },

    series: sensorChartdata,
  };

  return (
    <div className=" shadow-2xl w-[70vw]">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}
