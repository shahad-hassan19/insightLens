import {useRef} from "react";
import axios from "axios";
import * as d3 from "d3";
import { useNavigate } from "react-router";


const Year = () => {

    const svgRef = useRef()
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/user/year")
    }

    const fetchData = async () => {
        try {
            const response = await axios.get("https://insight-lens-backend.vercel.app /api/users/year");
            const data = response.data;
            setUpLine(data)

        } catch (error) {
            console.log(error);
        }
    };
    fetchData()

    const setUpLine = (data) => {
        const w = 250;
        const h = 250;
        const margin = { top: 10, right: 15, bottom: 30, left: 35};
        const width = w - margin.left - margin.right;
        const height = h - margin.top - margin.bottom - 10;

        const svg = d3.select(svgRef.current)
                        .attr('width', w)
                        .attr('height', h)
                        .append('g')
                        .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
                    .domain(data.map(d => d.year))
                    .range([0, width])
                    .padding(0.1);

        const y = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.yearCounts)])
                    .nice()
                    .range([height, 0]);

                    svg.selectAll('.bar')
                        .data(data)
                        .enter()
                        .append('rect')
                        .attr('class', 'bar')
                        .attr('x', d => x(d.year))
                        .attr('y', d => y(d.yearCounts))
                        .attr('width', x.bandwidth())
                        .attr('height', d => height - y(d.yearCounts))
                        .attr('fill', 'steelblue');

                    svg.append('g')
                        .attr('class', 'x-axis')
                        .attr('transform', `translate(0,${height})`)
                        .call(d3.axisBottom(x));

                    svg.append('g')
                        .attr('class', 'y-axis')
                        .call(d3.axisLeft(y));

                    svg.append("text")
                        .attr("transform", `translate(${width / 2}, ${height + 30})`)
                        .style("text-anchor", "middle")
                        .text("Year")
                        .attr('font-weight', 700)

                    svg.append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 0 - margin.left - 5)
                        .attr("x", 0 - (height / 2))
                        .attr("dy", "1em")
                        .style("text-anchor", "middle")
                        .text("Year Counts")
                        .attr('font-weight', 700)

    }

    return (
        <div onClick={handleClick} className="w-full flex flex-col items-center lg:align-content-between p-5">
            <div className="lg:self-start">
                <h3 className="text-2xl font-bold mb-10">Yearly Reports</h3>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-center justify-center">
                    <div><svg ref={svgRef}></svg></div>
            </div>
        </div>
    )
}

export default Year