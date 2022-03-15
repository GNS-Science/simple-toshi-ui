import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
import { Typography } from '@mui/material';

import { d0, d1, magRateData, IMagRate } from '../components/PreviewMFD_data';

const PreviewMFD: React.FC = () => {
  const ref = useRef<SVGSVGElement>(null);
  const supraData = magRateData(d0); //[10, 40, 30, 20, 50, 10];
  const subData = magRateData(d1);
  // const data = d0; //[10, 40, 30, 20, 50, 10];
  // const maxData = d3.max(supraData.map((x) => x.rate)) || 0;

  const margin = { top: 20, right: 10, bottom: 20, left: 50 },
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  useEffect(() => {
    d3.select(ref.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('border', '1px solid black')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  }, [height, margin.bottom, margin.left, margin.right, margin.top, width]);

  useEffect(() => {
    const draw = () => {
      const svg = d3.select(ref.current);
      // console.log('DATA', supraData);

      // X axis
      // prettier-ignore
      const x = d3.scaleLinear()
      .domain([5.0, 8.9])
      .range([margin.left, width]);
      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

      // Add Y axis
      // prettier-ignore
      const y = d3.scaleLog()
      .domain([1e-9, 0.2])
      .range([height, 0]);
      svg
        .append('g')
        .attr('transform', 'translate(' + margin.left + ')')
        .call(d3.axisLeft(y));

      // Add the supra line
      // prettier-ignore
      svg.append<SVGPathElement>('path')
      .datum(supraData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 3)
      .attr('d', d3.line<IMagRate>()
          .x((d) => x(d.mag))
          .y((d) => y(d.rate)),
      );

      // Add line 2, subSeismo
      // prettier-ignore
      svg.append<SVGPathElement>('path')
      .datum(subData)
      .attr('fill', 'none')
      .attr('stroke', 'orange')
      .attr('stroke-width', 3)
      .attr('d', d3.line<IMagRate>()
          .x((d) => x(d.mag))
          .y((d) => y(d.rate))
    );

      // Handmade legend
      const w0 = width - 100,
        w1 = width - 80;
      svg.append('circle').attr('cx', w0).attr('cy', 30).attr('r', 6).style('fill', 'orange');
      svg.append('circle').attr('cx', w0).attr('cy', 60).attr('r', 6).style('fill', 'steelblue');
      svg.append('text').attr('x', w1).attr('y', 36).text('sub seismogenic').style('font-size', '15px');
      svg.attr('alignment-baseline', 'middle');
      svg.append('text').attr('x', w1).attr('y', 66).text('supra seismogenic').style('font-size', '15px');
      svg.attr('alignment-baseline', 'middle');
    };

    draw();
  }, [supraData, subData, height, margin.left, width]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Named fault system: Wairarapa
      </Typography>
      <Typography variant="h6" gutterBottom>
        Incremental participation rate by magnitude
      </Typography>
      <div className="chart">
        <svg ref={ref}></svg>
      </div>
    </>
  );
};

export default PreviewMFD;
