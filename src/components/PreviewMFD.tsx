import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
import { Typography } from '@mui/material';
import { d0, onlyRate } from './PreviewMFD_data';

function PreviewMFD(props: { width: number; height: number; bar_width: number }): React.ReactElement {
  const ref = useRef<SVGSVGElement>(null);
  const data = onlyRate(d0); //[10, 40, 30, 20, 50, 10];
  // const data = d0; //[10, 40, 30, 20, 50, 10];
  const maxData = d3.max(data) || 0;

  const width = props.width;
  const height = props.height;
  const bar_width = props.bar_width;

  console.log('DATA', data);
  useEffect(() => {
    d3.select(ref.current).attr('width', width).attr('height', height).style('border', '1px solid black');
  }, []);

  useEffect(() => {
    draw();
  }, [data]);

  const draw = () => {
    const svg = d3.select(ref.current);
    const selection = svg.selectAll('rect').data(data);
    const yScale = d3
      .scaleLog()
      .domain([10e-9, maxData])
      .range([0, height - 100]);

    selection.transition().duration(300);
    selection.attr('height', (d) => yScale(d));
    selection.attr('y', (d) => height - yScale(d));

    selection
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * bar_width)
      // eslint-disable-next-line
      .attr('y', (d) => height)
      .attr('width', bar_width - 1)
      .attr('height', 0)
      .attr('fill', 'orange')
      .transition()
      .duration(800)
      .attr('height', (d) => yScale(d))
      .attr('y', (d) => height - yScale(d));

    // prettier-ignore
    selection
      .exit()
      .transition()
      .duration(300)
      // eslint-disable-next-line      
      .attr('y', (d) => height)
      .attr('height', 0)
      .remove();

    // Handmade legend
    // prettier-ignore
    svg.append('circle').attr('cx', width-150).attr('cy', 30).attr('r', 6).style('fill', 'orange');
    // prettier-ignore
    svg.append('circle').attr('cx', width-150).attr('cy', 60).attr('r', 6).style('fill', '#404080');
    // prettier-ignore
    svg.append('text').attr('x', width-130).attr('y', 36).text('variable A').style('font-size', '15px');
    svg.attr('alignment-baseline', 'middle');
    // prettier-ignore
    svg.append('text').attr('x', width-130).attr('y', 66).text('variable B').style('font-size', '15px');
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
}

export default PreviewMFD;
