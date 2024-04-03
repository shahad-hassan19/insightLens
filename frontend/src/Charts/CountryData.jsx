import {useRef} from "react";
import axios from "axios";
import * as d3 from "d3";

const CountryData = () => {

    const svgRef = useRef()
    const legendRef = useRef()

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/users/country");
            const data = response.data;
            setUpDonut(data)

        } catch (error) {
            console.log(error);
        }
    };
    fetchData()

    const setUpDonut = (data) => {
        const w = 320;
        const h = 320;
        const radius = w/2;
        const svg = d3.select(svgRef.current)
                        .attr('width', w)
                        .attr('height', h)
                        .append('g')
                        .attr('transform', `translate(${w / 2},${h / 2})`);

        const pie = d3.pie().value(d => d.countryCounts)
        const color = d3.scaleOrdinal().domain(data.map(d => d.country)).range(d3.schemeCategory10)
        const arcGenerator = d3.arc().innerRadius(radius - 100).outerRadius(radius)

        const arcs = pie(data)

        svg.selectAll()
                .data(arcs)
                .join('path')
                .attr('d', arcGenerator)
                .attr('fill', d => color(d.data.country))


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
                .style('background-color', d => color(d.country));
    
            legend.append('span')
                .text(d => (`${d.country} : ${(d.countryCounts)}` ));

    }

    return (
        <div id="country-data" className="flex flex-col justify-between">
            <div>
                <h3 className="text-3xl font-bold text-left m-6">Country</h3>
            </div>
            <div className="md:p-10 flex flex-col lg:flex-row items-center justify-around">
                <svg ref={svgRef}></svg>
                <div className="text-left" ref={legendRef}></div>
            </div>
        </div>
    )
}

export default CountryData

