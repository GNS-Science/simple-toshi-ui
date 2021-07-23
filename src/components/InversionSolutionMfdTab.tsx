import * as d3 from 'd3';
import { graphql } from 'babel-plugin-relay/macro';
import React, { useRef, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { magRateData, IMagRate } from './PreviewMFD_data';
import { InversionSolutionMfdTabQuery } from './__generated__/InversionSolutionMfdTabQuery.graphql';

export const inversionSolutionMfdTabQuery = graphql`
  query InversionSolutionMfdTabQuery($id: ID!) {
    node(id: $id) {
      ... on InversionSolution {
        mfd_table {
          name
          column_types
          column_headers
          rows
        }
      }
    }
  }
`;

interface InversionSolutionMfdTabProps {
  queryRef: PreloadedQuery<InversionSolutionMfdTabQuery, Record<string, unknown>>;
}

// function InversionSolutionMfdTab(): React.ReactElement {
const InversionSolutionMfdTab: React.FC<InversionSolutionMfdTabProps> = ({
  queryRef,
}: InversionSolutionMfdTabProps) => {
  const data = usePreloadedQuery<InversionSolutionMfdTabQuery>(inversionSolutionMfdTabQuery, queryRef);
  const rows = data?.node?.mfd_table?.rows;

  // console.log(data.node.mfd_table.column_headers);

  const series = [
    'trulyOffFaultMFD.all',
    'targetOnFaultSupraSeisMFD_SansTVZ',
    'targetOnFaultSupraSeisMFD_TVZ',
    'totalSubSeismoOnFaultMFD',
    'solutionMFD_rateWeighted',
  ];

  const seriesMfd = (series: string[], index: number): Array<IMagRate> => {
    return magRateData(rows.filter((row) => row[1] == series[index]).map((r) => [parseFloat(r[2]), parseFloat(r[3])]));
  };

  const ref = useRef<SVGSVGElement>(null);
  const seriesData = [0, 1, 2, 3, 4].map((idx) => seriesMfd(series, idx));

  // console.log(seriesData);

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
    draw();
  }, seriesData);

  const draw = () => {
    const svg = d3.select(ref.current);
    // console.log('DATA', onFaultSupraSansData);

    // X axis
    // prettier-ignore
    const x = d3.scaleLinear()
      .domain([5.0, 9.0])
      .range([margin.left, width]);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // Add Y axis
    // prettier-ignore
    const y = d3.scaleLog()
      .domain([1e-7, 5])
      .range([height, 0]);
    svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ')')
      .call(d3.axisLeft(y));

    // Add the supra line
    // prettier-ignore
    svg.append<SVGPathElement>('path')
      .datum(seriesData[0])
      .attr('fill', 'none')
      .attr('stroke', 'orange')
      .attr('stroke-width', 2)
      .attr('d', d3.line<IMagRate>()
          .x((d) => x(d.mag))
          .y((d) => y(d.rate)),
      );

    // Add line 2, subSeismo
    // prettier-ignore
    svg.append<SVGPathElement>('path')
      .datum(seriesData[1])
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', d3.line<IMagRate>()
          .x((d) => x(d.mag))
          .y((d) => y(d.rate))
    );

    // prettier-ignore
    svg.append<SVGPathElement>('path')
      .datum(seriesData[2])
      .attr('fill', 'none')
      .attr('stroke', 'lightgray')
      .attr('stroke-width', 2)
      .attr('d', d3.line<IMagRate>()
          .x((d) => x(d.mag))
          .y((d) => y(d.rate))
    );

    // prettier-ignore
    svg.append<SVGPathElement>('path')
      .datum(seriesData[3])
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('d', d3.line<IMagRate>()
          .x((d) => x(d.mag))
          .y((d) => y(d.rate))
    );

    // prettier-ignore
    svg.append<SVGPathElement>('path')
      .datum(seriesData[4])
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('d', d3.line<IMagRate>()
          .x((d) => x(d.mag))
          .y((d) => y(d.rate))
    );

    // Handmade legend
    const w0 = width - 180,
      w1 = width - 170;
    svg.append('circle').attr('cx', w0).attr('cy', 30).attr('r', 6).style('fill', 'orange');
    svg.append('circle').attr('cx', w0).attr('cy', 60).attr('r', 6).style('fill', 'steelblue');
    svg.append('text').attr('x', w1).attr('y', 36).text(series[0]).style('font-size', '12px');
    svg.attr('alignment-baseline', 'middle');
    svg.append('text').attr('x', w1).attr('y', 66).text(series[1]).style('font-size', '12px');
    svg.attr('alignment-baseline', 'middle');
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Solution Target vs final Magnitude Frequency distribution
      </Typography>
      <div className="chart">
        <svg ref={ref}></svg>
      </div>
    </>
  );
};

export default InversionSolutionMfdTab;
