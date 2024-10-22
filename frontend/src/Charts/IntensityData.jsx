import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const IntensityData =() => {
    const [intensityData, setIntensityData] = useState()

    useEffect(() => {
        const fetchData = async() => {
            try {
                const intensityCount = []
                const noOfReports = []
                const response = await axios.get("https://insight-lens-backend.vercel.app /api/users/intensity");
                const fetchedData = response.data
                console.log(response.data)
                intensityCount.push(...fetchedData.map(item => item.intensity))
                noOfReports.push(...fetchedData.map(item => item.intensity_Counts))


                const data ={
                    labels: intensityCount,
                    datasets: [{
                            label: 'Reports',
                            data: noOfReports,
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                    ]
                }
                setIntensityData(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Intensity",
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
        <div id="intensity-data" className="flex flex-col justify-between">
            <div>
                <h3 className="text-3xl font-bold text-left m-6">Intensity</h3>
            </div>
            <div className="lg:mx-20 lg:my-5 lg:p-10 w-full sm:min-w-max md:w-2/3 lg:w-3/5 flex self-center shadow-md bg-blue-100">
                {
                    intensityData && <Bar data={intensityData} options={options} />
                }
            </div>
        </div>
    )
}

export default IntensityData