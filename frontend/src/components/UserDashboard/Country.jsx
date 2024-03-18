import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CountryData = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/user/country")
    }

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/users/country");
            const data = response.data;
            data.sort((a, b) => {
                if (a.countryCounts < b.countryCounts) {
                    return 1;
                } else if (a.countryCounts > b.countryCounts) {
                    return -1;
                } else {
                    return 0;
                }
            });
            for (let i = 0; i < 6; i++) {
                localStorage.setItem(`country${[i]}`, `${data[i].country}`)
                localStorage.setItem(`countryCounts${[i]}`, `${data[i].countryCounts}`)
            }
        } catch (error) {
            console.log(error);
        }
    };
    fetchData()

    return (
            <div onClick={handleClick} className="flex flex-col items-center lg:items-stretch gap-10 align-content-between p-5">
                <div>
                    <h3 className="text-2xl font-bold">Reports by Countries</h3>
                </div>
                <div className="flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-between">
                    <div className=" font-medium">{localStorage.getItem("country0")}</div>
                    <div>{localStorage.getItem("countryCounts0")}</div>
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className=" font-medium">{localStorage.getItem("country1")}</div>
                    <div>{localStorage.getItem("countryCounts1")}</div>
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className=" font-medium">{localStorage.getItem("country2")}</div>
                    <div>{localStorage.getItem("countryCounts2")}</div>
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className=" font-medium">{localStorage.getItem("country3")}</div>
                    <div>{localStorage.getItem("countryCounts3")}</div>
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className=" font-medium">{localStorage.getItem("country4")}</div>
                    <div>{localStorage.getItem("countryCounts4")}</div>
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className=" font-medium">{localStorage.getItem("country5")}</div>
                    <div>{localStorage.getItem("countryCounts5")}</div>
                </div>
                </div>
            </div>
    )
}

export default CountryData

