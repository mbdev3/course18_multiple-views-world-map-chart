import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';

import {
  csv,
  scaleLinear,
  max,
  format,
  extent,
  scaleTime,
  timeFormat,
  bin,
  timeMonths,
  sum,
} from 'd3';
import {Marks} from './Marks'
import { AxisBottom } from './axisBottom';
import { AxisLeft } from './axisLeft'; 



const margin = {
  top: 0,
  bottom: 30,
  right: 0,
  left: 60,
};

export const DateHistogram = ({ data,height,width }) => {
  const xValue = (d) => d['Reported Date'];
  const xAxisLabel = 'Date';

  const yValue = (d) =>
    d['Total Dead and Missing'];
  const yAxisLabel = 'Total Dead and Missing';

  const innerHeight =
    height - margin.top - margin.bottom;
  const innerWidth =
    width - margin.right - margin.left;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const xAxisTickFormat = timeFormat('%m/%d/%Y');
  const [start, stop] = xScale.domain();
  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((array) => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1,
    }));

  const yScale = scaleLinear()
    .domain([0, max(binnedData, (d) => d.y)])
    .range([innerHeight, 0])
    .nice();

  return (
    <>
      <rect width={width} height={height} fill="white"/>
    <g
      transform={`translate(${margin.left},${margin.top})`}
    >
      <AxisBottom
          height={height}
          xScale={xScale}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft
          yScale={yScale}
          width={width}
        />
        <text
          className="label"
          textAnchor="middle"
          x={innerWidth / 2}
          y={height - margin.bottom / 2}
        >
          
        </text>
        <text
          className="label"
          textAnchor="middle"
          transform={`translate(${
           -40
          },${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
      <Marks
        binnedData={binnedData}
        xScale={xScale}
        yScale={yScale}
        xValue={xValue}
        yValue={yValue}
        innerHeight={innerHeight}
        tooltip={(d) => d}
      />
    </g>
      </>
  );
};
