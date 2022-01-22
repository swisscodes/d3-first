import React , {useState} from 'react';
import * as d3 from 'd3';
import { useD3 } from '../utils/useD3'

const Barchart = ({data}) => {
  // const [windowSize, setWindowSize] = useState([0, 0])
  const ref = useD3((svgRef) => {
    const dateParser = d3.timeParse("%Y-%m-%d")
    const yAccessor = (d) => d.day.maxtemp_c
    const xAccessor = (d) => dateParser(d.date)

    

    svgRef.attr("width", dimensions.width)
      .attr("height", dimensions.height)
    
    const gBound = svgRef.append('g')
      .style('transform', `translate(
        ${dimensions.margin.left}px,
        ${dimensions.margin.top}px
        )
      `)

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yAccessor))
        .range([dimensions.boundedHeight, 0])
    const freezingTemperaturePlacement = yScale(0)
    const freezingTemperatures = gBound.append("rect")
      .attr("x", 0)
      .attr("width", dimensions.boundedWidth)
      .attr("y", freezingTemperaturePlacement)
      .attr("height", dimensions.boundedHeight  - freezingTemperaturePlacement)
      .attr("fill", "#e0f3f3")

      const xScale = d3.scaleTime()
        .domain(d3.extent(data, xAccessor))
        .range([0, dimensions.boundedWidth])

      const lineGenerator = d3.line()
        .x(d => xScale(xAccessor(d)))
        .y(d => yScale(yAccessor(d)))

      const line = gBound.append("path")
        .attr("d", lineGenerator(data))
        .attr("fill", "none")
        .attr("stroke", "#af9358")
        .attr("stroke-width", 2)

      const yAxisGenerator = d3.axisLeft()
        .scale(yScale)

      const yAxis = gBound.append("g")
        .call(yAxisGenerator)

      const xAxisGenerator = d3.axisBottom()
        .scale(xScale)
      const xAxis = gBound.append("g")
        .call(xAxisGenerator)
          .style("transform", `translateY(${
            dimensions.boundedHeight}px)`)




    // window.addEventListener('resize', updateSize); later



  },

  [data,]) //end of function

  let dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margin: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60,
    },
    
  }
  dimensions.boundedWidth = (dimensions.width
                    - dimensions.margin.left
                    - dimensions.margin.right
                  )
  dimensions.boundedHeight = (dimensions.height
    - dimensions.margin.top
    - dimensions.margin.bottom
    )

    return (
        <div>
          <svg ref={ref}></svg> 
        </div>
    );

    //local functions
    // function updateSize()  {
    //   let width = window.innerWidth
    //   let height = window.innerHeight
    //   setWindowSize([width, height])
    //   console.log('event fired')
    // } //will check later
}

export default Barchart;
