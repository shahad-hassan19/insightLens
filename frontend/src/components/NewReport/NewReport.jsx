import axios from "axios"
import { useState } from "react"


export default function NewReport() {
    const [title, setTitle] = useState('')
    const [intensity, setIntensity] = useState('')
    const [insight, setInsight] = useState('')
    const [sector, setSector] = useState('')
    const [pestle, setPestle] = useState('')
    const [country, setCountry] = useState('')
    const [url, setUrl] = useState('')
    const [start_year, setYear] = useState('')

    const handleSubmit = async () => {
        try {
            await axios.post('https://insight-lens-backend.vercel.app/api/users/addNewReport', {title, intensity, insight, sector, pestle, country, url, start_year});
            alert("Report added successfully")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col justify-between">
            <div>
                <h3 className="text-3xl font-bold text-left m-6">
                    Add New Report
                </h3>
            </div>
            <form className="flex flex-col w-4/5 md:w-1/2 lg:w-1/3 self-center">
                <div className="flex flex-col mb-5">
                    <label className="text-sm font-medium mb-1 cursor-pointer" htmlFor="title">
                        Title
                    </label>
                    <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} type="text"  placeholder="Title" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"/>
                </div>
                <div className="flex flex-col mb-5">
                    <label className="text-sm font-medium mb-1 cursor-pointer" htmlFor="intensity">
                        Intensity
                    </label>
                    <input id="intensity" value={intensity} onChange={(e) => setIntensity(e.target.value)} type="number"  placeholder="Intensity" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"/>
                </div>
                <div className="flex flex-col mb-5">
                    <label className="text-sm font-medium mb-1 cursor-pointer" htmlFor="insight">
                        Insight
                    </label>
                    <input id="insight" value={insight} onChange={(e) => setInsight(e.target.value)} type="text" placeholder="Insight" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"/>
                </div>
                <div className="flex flex-col mb-5">
                    <label className="text-sm font-medium mb-1 cursor-pointer" htmlFor="sector">
                        Sector
                    </label>
                    <select id="sector" value={sector} onChange={(e) => setSector(e.target.value)} className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150">
                        <option value="NA">NA</option>
                        <option value="Energy">Energy</option>
                        <option value="Government">Government</option>
                        <option value="Financial services">Financial services</option>
                        <option value="Aerospace & defence">Aerospace & defence</option>
                        <option value="Food and agriculture">Food and agriculture</option>
                    </select>
                </div>
                <div className="flex flex-col mb-5">
                    <label className="text-sm font-medium mb-1 cursor-pointer" htmlFor="pestle">
                        Pestle
                    </label>
                    <select id="pestle" value={pestle} onChange={(e) => setPestle(e.target.value)} className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150">
                        <option value="NA">NA</option>
                        <option value="Economic">Economic</option>
                        <option value="Industries">Industries</option>
                        <option value="Political">Political</option>
                        <option value="Organization">Organization</option>
                        <option value="Environmental">Environmental</option>
                    </select>
                </div>
                <div className="flex flex-col mb-5">
                    <label className="text-sm font-medium mb-1 cursor-pointer" htmlFor="country">
                        Country
                    </label>
                    <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150">
                        <option value="India">India</option>
                        <option value="United States of America">United States of America</option>
                        <option value="Russia">Russia</option>
                        <option value="Iran">Iran</option>
                        <option value="China">China</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                    </select>
                </div>
                <div className="flex flex-col mb-5">
                    <label className="text-sm font-medium mb-1 cursor-pointer" htmlFor="url">
                        URL
                    </label>
                    <input id="url" value={url} onChange={(e) => setUrl(e.target.value)} type="text" placeholder="URL" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"/>
                </div>
                <div className="flex flex-col mb-5">
                    <label className="text-sm font-medium mb-1 cursor-pointer" htmlFor="start_year">
                        Start Year
                    </label>
                    <input id="start_year" value={start_year} onChange={(e) => setYear(e.target.value)} type="number" placeholder="Start Year" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"/>
                </div>
                <button onClick={handleSubmit} type="submit" className="w-1/2 self-center bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">
                    Add Report
                </button>
            </form>
        </div>
    )
}

