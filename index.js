import React from 'react';
import ReactDOM from 'react-dom';
import { useWorldAtlas } from './Data/useWorldAtlas';
import { useData } from './Data/useData';

import { scaleSqrt, max } from 'd3';
import { BubbleMap } from './BubbleMap/index';
import { DateHistogram } from './DateHistogram/index';
const width = window.innerWidth;
const height = window.innerHeight;
const DateHistogramSize = 0.3
const App = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();

  if (!worldAtlas || !data) {
    return <pre>Loading...</pre>;
  }

  return (
    <svg width={width} height={height}>
      <BubbleMap
        data={data}
        worldAtlas={worldAtlas}
      />
      <g transform={`translate(0,${height - DateHistogramSize * height})`}>
        <DateHistogram data={data} height={DateHistogramSize * height} width={width}/>
      </g>
    </svg>
  );
};
const rootElement = document.getElementById(
  'root'
);
ReactDOM.render(<App />, rootElement);
