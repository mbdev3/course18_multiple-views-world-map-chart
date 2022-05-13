import React from 'react';
import { Marks } from './Marks';
import { scaleSqrt, max } from 'd3';


export const BubbleMap = ({data,worldAtlas}) => {
  const sizeValue = (d) =>
    d['Total Dead and Missing'];
  const maxRadius = 15;
  const sizeScale = scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, maxRadius]);

  return (
    <Marks
      worldAtlas={worldAtlas}
      data={data}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  );
};
