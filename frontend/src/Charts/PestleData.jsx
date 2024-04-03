import {useRef} from "react";
import axios from "axios";
import * as d3 from "d3";

const PestleData = () => {
    const svgRef = useRef()
    const legendRef = useRef()

    const fetchData = async() => {
        try {
            const response = await axios.get("http://localhost:4000/api/users/pestle");
            const data = response.data;
            setUpBar(data)
        } catch (error) {
            console.log(error)
        }
    }
    fetchData()

    const setUpBar = (data) => {
        const w = 320;
        const h = 320;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = w - margin.left - margin.right;
        const height = h - margin.top - margin.bottom - 20;

        const svg = d3.select(svgRef.current)
                        .attr('width', w)
                        .attr('height', h)
                        .append('g')
                        .attr('transform', `translate(${margin.left},${margin.top})`);

        const color = d3.scaleOrdinal().domain(data.map(d => d.pestle)).range(d3.schemeDark2)

        const x = d3.scaleBand()
                    .domain(data.map(d => d.pestle))
                    .range([0, width])
                    .padding(0.1);

        const y = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.pestleCounts)])
                    .nice()
                    .range([height, 0]);

        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d.pestle))
            .attr('y', d => y(d.pestleCounts))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d.pestleCounts))
            .attr('fill', color);

        svg.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(y));

        svg.append("text")
            .attr("transform", `translate(${width / 2}, ${height + 35})`)
            .style("text-anchor", "middle")
            .text("Pestles")
            .attr('font-weight', 700)

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2 + 20))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("No. of Pestles")
            .attr('font-weight', 700)

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
                .style('background-color', d => color(d.pestle));

        legend.append('span')
                .text(d => (`${d.pestle} : ${(d.pestleCounts)} reports` ))
                .style('font-weight', 700)
    }

    return (
        <div id="pestle-data" className="flex flex-col justify-between">
        <div>
            <h3 className="text-3xl font-bold text-left m-6">Pestle</h3>
        </div>
        <div className="md:p-10 flex flex-col lg:flex-row items-center justify-around">
            <svg ref={svgRef}></svg>
            <div className="text-left" ref={legendRef}></div>
        </div>
    </div>
    )
}

export default PestleData