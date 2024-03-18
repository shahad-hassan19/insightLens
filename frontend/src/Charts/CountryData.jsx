import {useRef} from "react";
import axios from "axios";
import * as d3 from "d3";

const CountryData = () => {

    const svgRef = useRef()

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
        const w = 400;
        const h = 400;
        const radius = w/2;
        const svg = d3.select(svgRef.current)
                        .attr('width', w)
                        .attr('height', h)
                        .style('overflow', 'visible')
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

    }

    return (
        <div id="country-data" className="flex justify-between">
            <div className="flex flex-col">
                <div>
                    <h3 className="text-3xl font-bold text-left m-6">Country</h3>
                </div>
                <div className="p-10 flex items-center justify-center">
                    <svg ref={svgRef}></svg>
                </div>
            </div>
        </div>
    )
}

export default CountryData

