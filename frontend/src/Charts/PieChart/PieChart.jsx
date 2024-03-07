import {useRef} from "react";
import axios from "axios";
import * as d3 from "d3";

const PieChart = () => {
    const svgRef = useRef();

    const legendRef = useRef()

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/users/sector");
            const data = response.data;
            setUpChart(data)

        } catch (error) {
            console.error(error);
        }
    };
    fetchData()


    const setUpChart = (data) => {
        const w = 400;
        const h = 400;
        const radius = w/2;
        const svg = d3.select(svgRef.current)
        .attr('width', w)
        .attr('height', h)
        .style('overflow', 'visible')
        .style('margin-top', '200px')

        const formattedData = d3.pie().value(d => d.percentage)(data)
        const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius)
        const color = d3.scaleOrdinal().domain(data.map(d => d.sector)).range(d3.schemeSet2)

        svg.selectAll()
        .data(formattedData)
        .join('path')
        .attr('d', arcGenerator)
        .attr('fill', d => color(d.data.sector))
        .style('opacity', 0.7)

        // svg.selectAll()
        // .data(formattedData)
        // .join('text')
        // .text(d => `${d.data.sector}: ${d.data.percentage}`)
        // .attr('transform', (d) => `translate(${arcGenerator.centroid(d)})`)
        // .style('text-anchor', 'middle')

        const legend = d3.select(legendRef.current)
            .append('ul')
            .selectAll('li')
            .data(data)
            .enter()
            .append('li')
            .attr('class', 'legend-item')
            .style('list-style-type', 'none')
            .style('font-size', '14px')
            .style('margin-bottom', '5px');

        legend.append('span')
            .attr('class', 'legend-color')
            .style('display', 'inline-block')
            .style('width', '12px')
            .style('height', '12px')
            .style('margin-right', '5px')
            .style('background-color', d => color(d.sector));

        legend.append('span')
            .text(d => (`${d.sector} : ${(d.percentage)}%` ));

    }


    return (
        <div className="m-10 p-10 flex items-center justify-evenly">
            <svg ref={svgRef}></svg>
            <div className="text-left" ref={legendRef}></div>
        </div>
    );
};

export default PieChart;
