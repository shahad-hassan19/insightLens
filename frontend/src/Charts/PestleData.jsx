import {useRef} from "react";
import axios from "axios";
import * as d3 from "d3";

const PestleData = () => {
    const svgRef = useRef()

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
        const w = 400;
        const h = 400;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = w - margin.left - margin.right;
        const height = h - margin.top - margin.bottom - 20;

        const svg = d3.select(svgRef.current)
                        .attr('width', w)
                        .attr('height', h)
                        .append('g')
                        .attr('transform', `translate(${margin.left},${margin.top})`);

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
                        .attr('fill', 'steelblue');

                    svg.append('g')
                        .attr('class', 'x-axis')
                        .attr('transform', `translate(0,${height})`)
                        .call(d3.axisBottom(x));

                    svg.append('g')
                        .attr('class', 'y-axis')
                        .call(d3.axisLeft(y));

                    svg.append("text")
                        .attr("transform", `translate(${width / 2}, ${height + 35})`)
                        .style("text-anchor", "middle")
                        .text("Pestle")
                        .attr('font-weight', 700)

                    svg.append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 0 - margin.left)
                        .attr("x", 0 - (height / 2 + 20))
                        .attr("dy", "1em")
                        .style("text-anchor", "middle")
                        .text("No. of Pestles")
                        .attr('font-weight', 700)
    }

    return (
        <div id="pestle-data" className="flex justify-between">
            <div className="flex flex-col">
                <div>
                    <h3 className="text-3xl font-bold text-left m-6">Pestle</h3>
                </div>
                <div className="p-10 flex items-center justify-center">
                    <svg ref={svgRef}></svg>
                </div>
            </div>
        </div>
    )
}

export default PestleData