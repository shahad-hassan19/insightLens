import {useRef} from "react";
import axios from "axios";
import * as d3 from "d3";

const IntensityData =() => {
    const svgRef = useRef()

    const fetchData = async() => {
        try {
            const response = await axios.get("http://localhost:4000/api/users/intensity");
            const data = response.data;
            setUpHistogram(data)
        } catch (error) {
            console.log(error)
        }
    }
    fetchData()

    const setUpHistogram = (data) => {
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
                        .domain(data.map(d => d.intensity))
                        .range([0, width])
                        .padding(0.1);

                    const y = d3.scaleLinear()
                        .domain([0, d3.max(data, d => d.intensity_Counts)])
                        .nice()
                        .range([height, 0]);

                    svg.selectAll('.bar')
                        .data(data)
                        .enter()
                        .append('rect')
                        .attr('class', 'bar')
                        .attr('x', d => x(d.intensity))
                        .attr('y', d => y(d.intensity_Counts))
                        .attr('width', x.bandwidth())
                        .attr('height', d => height - y(d.intensity_Counts))
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
                        .text("Intensity")
                        .attr('font-weight', 700)

                    svg.append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 0 - margin.left)
                        .attr("x", 0 - (height / 2 + 20))
                        .attr("dy", "1em")
                        .style("text-anchor", "middle")
                        .text("Intensity Counts")
                        .attr('font-weight', 700)
    }



    return (
        <div id="intensity-data" className="flex justify-between">
            <div className="flex flex-col">
                <div>
                    <h3 className="text-3xl font-bold text-left m-6">Intensity</h3>
                </div>
                <div className="p-10 flex items-center justify-center">
                    <svg ref={svgRef}></svg>
                </div>
            </div>
        </div>
    )
}

export default IntensityData