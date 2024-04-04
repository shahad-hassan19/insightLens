import { useState } from "react";
import SectorData from './../../Charts/SectorData';
import IntensityData from './../../Charts/IntensityData';
import PestleData from './../../Charts/PestleData';
import YearData from './../../Charts/YearData';
import CountryData from './../../Charts/CountryData';


export default function DataCharts() {
    let [activeChart, setActiveChart] = useState("Sector");
    let [activeButton, setActiveButton] = useState("Sector");

    return (
        <div className="mt-10">
            <div className="flex justify-center align-items-center mb-12" >
                            <button  className={`text-orange-400 bg-transparent cursor-pointer pt-2 pb-1 px-1 sm:px-5 font-semibold ${activeButton === 'Sector' ? 'border-b-2 border-yellow-300' : ''}`} onClick={()=>{
                                setActiveChart("Sector");
                                setActiveButton("Sector")}} >Sector</button>
                            <button className={`text-orange-400 bg-transparent cursor-pointer pt-2 pb-1 px-1 sm:px-5 font-semibold ${activeButton === 'Intensity' ? 'border-b-2 border-yellow-300' : ''}`} onClick={()=>{
                                setActiveChart("Intensity");
                                setActiveButton("Intensity")}} >Intensity</button>
                            <button className={`text-orange-400 bg-transparent cursor-pointer pt-2 pb-1 px-1 sm:px-5 font-semibold ${activeButton === 'Pestle' ? 'border-b-2 border-yellow-300' : ''}`} onClick={()=>{
                                setActiveChart("Pestle")
                                setActiveButton("Pestle")}} >Pestle</button>
                            <button className={`text-orange-400 bg-transparent cursor-pointer pt-2 pb-1 px-1 sm:px-5 font-semibold ${activeButton === 'Year' ? 'border-b-2 border-yellow-300' : ''}`} onClick={()=>{
                                setActiveChart("Year")
                                setActiveButton("Year")}} >Year</button>
                            <button className={`text-orange-400 bg-transparent cursor-pointer pt-2 pb-1 px-1 sm:px-5 font-semibold ${activeButton === 'Country' ? 'border-b-2 border-yellow-300' : ''}`} onClick={()=>{
                                setActiveChart("Country")
                                setActiveButton("Country")}} >Country</button>
            </div>
            <div>
                {
                    activeChart === "Sector" && <SectorData/>
                }
                {
                    activeChart === "Intensity" && <IntensityData/>
                }
                {
                    activeChart === "Pestle" && <PestleData/>
                }
                {
                    activeChart === "Year" && <YearData/>
                }
                {
                    activeChart === "Country" && <CountryData/>
                }
            </div>
        </div>
    )
}

