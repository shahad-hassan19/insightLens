import axios from "axios";
import { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);



const SectorData = () => {
    const [sectorData, setSectorData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const noOfSectors = []
                const noOfReports = []
                const response = await axios.get("https://insight-lens-backend.vercel.app /api/users/sector");
                const fetchedData = response.data
                console.log(response.data)
                noOfSectors.push(...fetchedData.map(item => item.sector))
                noOfReports.push(...fetchedData.map(item => item.percentage))
                console.log(noOfSectors)
                console.log(noOfReports)

                const data = {
                    labels: noOfSectors,
                    datasets: [{
                        label: 'Reports',
                        data: noOfReports,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(175, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 59, 64, 0.5)',
                            'rgba(189, 51, 164, 0.5)',
                            'rgba(31, 206, 173, 0.5)',
                        ],
                        borderColor:  [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(175, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 59, 64, 0.5)',
                            'rgba(189, 51, 164, 0.5)',
                            'rgba(31, 206, 173, 0.5)',
                        ],
                    }]
                }
                setSectorData(data)

            } catch (error) {
                console.log(error);
            }
        };
        fetchData()
    }, [])

    const options = {
        responsive: true,
    }

    return (
        <div id="sector-data" className="flex flex-col justify-between">
            <div>
                <h3 className="text-3xl font-bold text-left m-6">Sector</h3>
            </div>
            <div className="lg:mx-20 lg:my-5 lg:p-10 w-full sm:min-w-max md:w-2/3 lg:w-3/5 flex self-center shadow-md bg-blue-100">
                {
                    sectorData && <Pie data={sectorData} options={options} />
                }
            </div>
        </div>
    );
};

export default SectorData;
