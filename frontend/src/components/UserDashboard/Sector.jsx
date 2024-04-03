import {useRef} from "react";
import axios from "axios";
import * as d3 from "d3";
import { useNavigate } from "react-router";

const Sector = () => {
    const svgRef = useRef();
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/user/sector")
    }

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/users/sector");
            const data = response.data;
            for (let i = 0; i < 6; i++) {
                localStorage.setItem(`sector${i}`, `${data[i].sector}`)
                localStorage.setItem(`percentage${i}`, `${data[i].percentage}`)
            }

            setUpPie(data)

        } catch (error) {
            console.log(error);
        }
    };
    fetchData()


    const setUpPie = (data) => {
        const w = 100;
        const h = 100;
        const radius = w/2;
        const svg = d3.select(svgRef.current)
        .attr('width', w)
        .attr('height', h)
        .append('g')
        .attr('transform', `translate(${w / 2},${h / 2})`);

        const myData = d3.pie().value(d => d.percentage)(data)
        const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius)
        const color = d3.scaleOrdinal().domain(data.map(d => d.sector)).range(d3.schemeSet2)

        svg.selectAll()
        .data(myData)
        .join('path')
        .attr('d', arcGenerator)
        .attr('fill', d => color(d.data.sector))
    }


    return (
        <div onClick={handleClick} className="flex flex-col lg:flex-row items-center p-5">
            <div className="flex flex-col lg:w-1/2">
                <h3 className="text-2xl font-bold mb-10">Reports by Sector</h3>
                <svg ref={svgRef} className="self-center"></svg>
            </div>
            <div className="flex items-center lg:w-1/2">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full flex items-center justify-between">
                        <div className=" font-medium">{localStorage.getItem("sector0")}</div>
                        <div>{localStorage.getItem("percentage0")}%</div>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <div className=" font-medium">{localStorage.getItem("sector1")}</div>
                        <div>{localStorage.getItem("percentage1")}%</div>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <div className=" font-medium">{localStorage.getItem("sector2")}</div>
                        <div>{localStorage.getItem("percentage2")}%</div>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <div className=" font-medium">{localStorage.getItem("sector3")}</div>
                        <div>{localStorage.getItem("percentage3")}%</div>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <div className=" font-medium">{localStorage.getItem("sector4")}</div>
                        <div>{localStorage.getItem("percentage4")}%</div>
                    </div>
                    <div className="w-full flex items-center justify-between">
                        <div className=" font-medium">{localStorage.getItem("sector5")}</div>
                        <div>{localStorage.getItem("percentage5")}%</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sector;
