import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
);

const CountryData = () => {
    const [countryData, setCountryData] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const noOfCountries = []
                const noOfReports = []
                const response = await axios.get("http://localhost:4000/api/users/country");
                const fetchedData = response.data
                noOfCountries.push(...fetchedData.map(item => item.country))
                noOfReports.push(...fetchedData.map(item => item.countryCounts))

                const data = {
                    labels: noOfCountries,
                    datasets: [{
                        fill: true,
                        label: 'Reports',
                        data: noOfReports,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    }]
                }
                setCountryData(data)

            } catch (error) {
                console.log(error);
            }
        };
        fetchData()
    }, [])

    const options = {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max:50,
            }
        }
    }

    return (
        <div id="country-data" className="flex flex-col justify-between">
            <div>
                <h3 className="text-3xl font-bold text-left m-6">Country</h3>
            </div>
            <div className="lg:mx-20 lg:my-5 lg:p-10 w-full sm:min-w-max md:w-2/3 lg:w-3/5 flex self-center shadow-md bg-blue-100">
                {
                    countryData && <Line data={countryData} options={options}></Line>
                }
            </div>
        </div>
    )
}

export default CountryData

