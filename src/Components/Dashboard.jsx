import CanvasJSReact from "@canvasjs/react-charts";

//var CanvasJSReact = require('@canvasjs/react-charts');
import React from "react";
import { Component } from "react";
import { Outlet } from "react-router-dom";

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

//Create Chart
class Dashboard extends Component {
  render() {
    const options1 = {
      theme: "light1", // "light1", "dark1", "dark2"
      animationEnabled: true, //Change to false
      animationDuration: 1200, //Change it to 2000
      title: {
        text: "Sales Growth Chart",
      },
      data: [
        {
          //Change type to "line", "bar", "area", "pie", etc.
          type: "column",
          dataPoints: [
            { label: "JAN 2023", y: 10 },
            { label: "FEB 2023", y: 15 },
            { label: "MAR 2023", y: 25 },
            { label: "APR 2023", y: 30 },
            { label: "MAY 2023", y: 60 },
          ],
        },
      ],
    };

    const options2 = {
      theme: "light2",
      animationEnabled: true,
      exportFileName: "Product Analytics",
      exportEnabled: true,
      title: {
        text: "Top Categories of Items",
      },
      data: [
        {
          type: "pie",
          showInLegend: true,
          legendText: "{label}",
          toolTipContent: "{label}: <strong>{y}%</strong>",
          indexLabel: "{y}%",
          indexLabelPlacement: "inside",
          dataPoints: [
            { y: 32, label: "Hot Drinks" },
            { y: 22, label: "Cool Drinks" },
            { y: 15, label: "Baking Items" },
            { y: 19, label: "Milk Products" },
            { y: 5, label: "Fresh Juices" },
            { y: 7, label: "Others" },
          ],
        },
      ],
    };

    const options3 = {
      theme: "dark1",
      animationEnabled: true,
      title: {
        text: "Number of New Customers",
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: "spline",
          name: "2022",
          showInLegend: true,
          dataPoints: [
            { y: 155, label: "Jan" },
            { y: 150, label: "Feb" },
            { y: 152, label: "Mar" },
            { y: 148, label: "Apr" },
            { y: 142, label: "May" },
            { y: 150, label: "Jun" },
            { y: 146, label: "Jul" },
            { y: 149, label: "Aug" },
            { y: 153, label: "Sept" },
            { y: 158, label: "Oct" },
            { y: 154, label: "Nov" },
            { y: 150, label: "Dec" },
          ],
        },
        {
          type: "spline",
          name: "2023",
          showInLegend: true,
          dataPoints: [
            { y: 172, label: "Jan" },
            { y: 173, label: "Feb" },
            { y: 175, label: "Mar" },
            { y: 172, label: "Apr" },
            { y: 162, label: "May" },
            { y: 165, label: "Jun" },
            { y: 172, label: "Jul" },
            { y: 168, label: "Aug" },
            { y: 175, label: "Sept" },
            { y: 170, label: "Oct" },
            { y: 165, label: "Nov" },
            { y: 169, label: "Dec" },
          ],
        },
      ],
    };

    const options4 = {
      theme: "dark2",
      animationEnabled: true,
      title: {
        text: "Sold VS Profit",
      },
      subtitles: [
        {
          text: "Click Legend to Hide or Unhide Data Series",
        },
      ],
      axisX: {
        title: "States",
      },
      axisY: {
        title: "Units Sold",
        titleFontColor: "#6D78AD",
        lineColor: "#6D78AD",
        labelFontColor: "#6D78AD",
        tickColor: "#6D78AD",
      },
      axisY2: {
        title: "Profit in USD",
        titleFontColor: "#51CDA0",
        lineColor: "#51CDA0",
        labelFontColor: "#51CDA0",
        tickColor: "#51CDA0",
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries,
      },
      data: [
        {
          type: "spline",
          name: "Units Sold",
          showInLegend: true,
          xValueFormatString: "MMM YYYY",
          yValueFormatString: "#,##0 Units",
          dataPoints: [
            { x: new Date(2017, 0, 1), y: 120 },
            { x: new Date(2017, 1, 1), y: 135 },
            { x: new Date(2017, 2, 1), y: 144 },
            { x: new Date(2017, 3, 1), y: 103 },
            { x: new Date(2017, 4, 1), y: 93 },
            { x: new Date(2017, 5, 1), y: 129 },
            { x: new Date(2017, 6, 1), y: 143 },
            { x: new Date(2017, 7, 1), y: 156 },
            { x: new Date(2017, 8, 1), y: 122 },
            { x: new Date(2017, 9, 1), y: 106 },
            { x: new Date(2017, 10, 1), y: 137 },
            { x: new Date(2017, 11, 1), y: 142 },
          ],
        },
        {
          type: "spline",
          name: "Profit",
          axisYType: "secondary",
          showInLegend: true,
          xValueFormatString: "MMM YYYY",
          yValueFormatString: "$#,##0.#",
          dataPoints: [
            { x: new Date(2017, 0, 1), y: 19034.5 },
            { x: new Date(2017, 1, 1), y: 20015 },
            { x: new Date(2017, 2, 1), y: 27342 },
            { x: new Date(2017, 3, 1), y: 20088 },
            { x: new Date(2017, 4, 1), y: 20234 },
            { x: new Date(2017, 5, 1), y: 29034 },
            { x: new Date(2017, 6, 1), y: 30487 },
            { x: new Date(2017, 7, 1), y: 32523 },
            { x: new Date(2017, 8, 1), y: 20234 },
            { x: new Date(2017, 9, 1), y: 27234 },
            { x: new Date(2017, 10, 1), y: 33548 },
            { x: new Date(2017, 11, 1), y: 32534 },
          ],
        },
      ],
    };

    return (
      <div   className="bg-gray-100">
        <div className=" grid grid-cols-4 pt-24 text-center ml-72">
          <div className="h-20 w-48  bg-sky-500 text-white pt-2 text-2xl shadow-md rounded-lg shadow-black">
            Total Profit <br /> 2000k
          </div>
          <div className="h-20 w-48  bg-sky-500 text-white pt-2 text-2xl shadow-md rounded-lg shadow-black ">
            Likes <br /> 1M+
          </div>
          <div className="h-20 w-48  bg-sky-500 text-white pt-2 text-2xl shadow-md rounded-lg shadow-black">
            Total Sales
            <br />
            100k{" "}
          </div>
          <div className="h-20 w-48  bg-sky-500 text-white pt-2 text-2xl shadow-md rounded-lg shadow-black">
            New Customers
            <br />
            10k
          </div>
        </div>

        <div className="grid grid-cols-2 h-1/4 gap-7 mt-6 mb-14 ml-72 mr-20">
          <div className="shadow-2xl  shadow-black">
            {" "}
            <CanvasJSChart options={options2} />
          </div>
          <div className="shadow-2xl  shadow-black">
            <CanvasJSChart options={options1} />
          </div>
        </div>

        <div className="grid grid-cols-2 h-1/4 gap-7 ml-72 mr-20">
          <div className="shadow-2xl shadow-black">
            <CanvasJSChart options={options3} />
          </div>
          <div className="shadow-2xl shadow-black">
            <CanvasJSChart options={options4} />
          </div>
          <div></div>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    );
  }
}
export default Dashboard;
