import { useState } from "react";
import axios from "axios";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, //x-axis
    LinearScale, //y-axis
    PointElement,
    Legend,
    Tooltip
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
)



const YearData = () => {
    const [yearData, setYearData] = useState()


    const fetchData = async () => {
        try {
            const yearNumbers = []
            const reportCounts = []
            const response = await axios.get("http://localhost:4000/api/users/year");
            const fetchedData = response.data
            yearNumbers.push(...fetchedData.map(item => item.year))
            reportCounts.push(...fetchedData.map(item => item.yearCounts))


            const data = {
                labels: yearNumbers,
                datasets: [{
                    label: 'Reports',
                    data: reportCounts,
                    backgroundColor: 'aqua',
                    borderColor: 'black',
                    pointBorderColor: 'aqua'
                }]
            }
            setYearData(data)

        } catch (error) {
            console.log(error);
        }
    };
    fetchData()

    const options = {
        responsive: true,
        plugins: {
            legend: true,
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Year",
                    color: "red",
                    font: {
                        size: 14,
                        weight: 900
                    }
                }
            },
            y: {
                min: 0,
                max:50,
                title: {
                    display: true,
                    text: "No. of reports",
                    color: "red",
                    font: {
                        size: 14,
                        weight: 900
                    }
                }
            }
        }
    }

    return (
        <div id="year-data" className="flex flex-col justify-between">
                <div>
                    <h3 className="text-3xl font-bold text-left m-6">Start Year</h3>
                </div>
                <div className="lg:mx-20 lg:my-5 lg:p-10 w-full sm:min-w-max md:w-2/3 lg:w-3/5 flex self-center shadow-md bg-blue-100">
                {
                    yearData && <Line data={yearData} options={options}></Line>
                }
                </div>
        </div>
    )
}

export default YearData