import axios from "axios";
import { useEffect, useState } from "react";
import { PolarArea } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend
);

const PestleData = () => {
    const [pestleData, setPestleData] = useState()

    useEffect(() => {
        const fetchData = async() => {
            try {
                const noOfPestles = []
                const noOfReports = []
                const response = await axios.get("http://localhost:4000/api/users/pestle");
                const fetchedData = response.data
                console.log(response.data)
                noOfPestles.push(...fetchedData.map(item => item.pestle))
                noOfReports.push(...fetchedData.map(item => item.pestleCounts))
                console.log(noOfPestles)
                console.log(noOfReports)

                const data = {
                    labels: noOfPestles,
                    datasets: [{
                        label: 'Reports',
                        data: noOfReports,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(75, 106, 106, 0.5)',
                            'rgba(175, 92, 02, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(55, 159, 55, 0.5)',],
                    }]
                }
                setPestleData(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const options = {
        responsive: true,
    }

    return (
        <div id="pestle-data" className="flex flex-col justify-between">
        <div>
            <h3 className="text-3xl font-bold text-left m-6">Pestle</h3>
        </div>
        <div className="lg:mx-20 lg:my-5 lg:p-10 w-full sm:min-w-max md:w-2/3 lg:w-3/5 flex self-center shadow-md bg-blue-100">
            {
                pestleData && <PolarArea data={pestleData} options={options} className="flex self-center" />
            }
        </div>
    </div>
    )
}

export default PestleData