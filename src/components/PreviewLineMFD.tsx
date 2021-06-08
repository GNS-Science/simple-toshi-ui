import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
import { Typography } from '@material-ui/core';

import { d0, magRateData, IMagRate } from './PreviewMFD_data';

const PreviewMFD: React.FC = () => {
  const ref = useRef<SVGSVGElement>(null);
  const data = magRateData(d0); //[10, 40, 30, 20, 50, 10];
  // const data = d0; //[10, 40, 30, 20, 50, 10];
  const maxData = d3.max(data.map((x) => x.rate)) || 0;
  const width = 800;
  const height = 600;

  useEffect(() => {
    d3.select(ref.current).attr('width', width).attr('height', height).style('border', '1px solid black');
  }, []);

  useEffect(() => {
    draw();
  }, [data]);

  const draw = () => {
    const svg = d3.select(ref.current);
    console.log('DATA', data);
    const x = d3.scaleLinear().domain([5.0, 9.0]).range([0, width]);

    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLog().domain([10e-9, maxData]).range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

    //Add the line
    // prettier-ignore
    svg
      .append<SVGPathElement>('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5);
    // @wooneh I could not get this to work in typescript, maybe you can :)
    //   .attr('d', d3.line()
    //     .x((d) => x(d.mag))
    //     .y((d) => y(d.rate))
    // );

    // // hint from https://stackoverflow.com/a/40767846
    // // prettier-ignore
    // const mySelection: d3.Selection<SVGElement, unknown, HTMLElement, any> = d3.selectAll<SVGElement, unknown>('g');
    // function foo(): d3.Selection<SVGPathElement, unknown, HTMLElement, any> {
    //   return mySelection.append<SVGPathElement>('g');
    // }
    // console.log(foo());
    // // alert(foo().node().tagName || "nothing")

    // Handmade legend
    svg.append('circle').attr('cx', 450).attr('cy', 30).attr('r', 6).style('fill', 'orange');
    svg.append('circle').attr('cx', 450).attr('cy', 60).attr('r', 6).style('fill', '#404080');
    svg.append('text').attr('x', 470).attr('y', 36).text('variable A').style('font-size', '15px');
    svg.attr('alignment-baseline', 'middle');
    svg.append('text').attr('x', 470).attr('y', 66).text('variable B').style('font-size', '15px');
    svg.attr('alignment-baseline', 'middle');
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Wairarapa
      </Typography>

      <div className="chart">
        <svg ref={ref}></svg>
      </div>
    </>
  );
};

export default PreviewMFD;
