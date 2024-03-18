import {useRef} from "react";
import axios from "axios";
import * as d3 from "d3";
import { useNavigate } from "react-router";

const Intensity =() => {
    const svgRef = useRef()
    const legendRef = useRef()

    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/user/intensity")
    }

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
        const w = 250;
        const h = 250;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = w - margin.left - margin.right;
        const height = h - margin.top - margin.bottom - 20;

        const svg = d3.select(svgRef.current)
                        .attr('width', w)
                        .attr('height', h)
                        .append('g')
                        .attr('transform', `translate(${margin.left},${margin.top})`);

                        const color = d3.scaleOrdinal().domain(data.map(d => d.intensity)).range(d3.schemeDark2)

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
                        .attr('fill', color);

                    svg.append('g')
                        .attr('class', 'x-axis')
                        .attr('transform', `translate(0,${height})`)
                        .call(d3.axisBottom(x));

                        const legend = d3.select(legendRef.current)
                        .append('ul')
                        .selectAll('li')
                        .data(data)
                        .enter()
                        .append('li')
                        .attr('class', 'legend-item')
                        .style('list-style-type', 'none')
                        .style('font-size', '14px')
                        .style('margin-bottom', '5px')

                    legend.append('span')
                        .attr('class', 'legend-color')
                        .style('display', 'inline-block')
                        .style('width', '12px')
                        .style('height', '12px')
                        .style('margin-right', '5px')
                        .style('background-color', d => color(d.intensity))

                    legend.append('span')
                        .text(d => (`${(d.intensity_Counts)}` ))
    }



    return (
        <div onClick={handleClick} className="w-full flex flex-col items-center lg:align-content-between p-5">
        <div className="lg:self-start">
            <h3 className="text-2xl font-bold mb-10">Reports by Intensity</h3>
        </div>
        <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-around">
                <div><svg ref={svgRef}></svg></div>
                <div ref={legendRef}></div>
            </div>
    </div>
    )
}

export default Intensity