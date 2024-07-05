import axios from "axios"
import { useState } from "react"


export default function NewReport() {
    const [formData, setFormData] = useState({
        title: '',
        intensity: '',
        insight: '',
        sector: '',
        pestle: '',
        country: '',
        url: '',
        start_year: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async () => {
        try {
            await axios.post('https://insight-lens-backend.vercel.app/api/users/addNewReport', formData);
            alert("Report added successfully")
        } catch (error) {
            console.log(error)
        }
    }

    const inputFields = [
        { id: 'title', label: 'Title', type: 'text', placeholder: 'Title', required: true},
        { id: 'intensity', label: 'Intensity', type: 'number', placeholder: 'Intensity', required: true},
        { id: 'insight', label: 'Insight', type: 'text', placeholder: 'Insight', },
        { id: 'url', label: 'URL', type: 'text', placeholder: 'URL', required: true},
        { id: 'start_year', label: 'Start Year', type: 'number', placeholder: 'Start Year', required: true}
    ];

    const selectFields = [
        { id: 'sector', label: 'Sector', options: ['NA', 'Energy', 'Government', 'Financial services', 'Aerospace & defence', 'Food and agriculture'], required: true},
        { id: 'pestle', label: 'Pestle', options: ['NA', 'Economic', 'Industries', 'Political', 'Organization', 'Environmental'], required: true},
        { id: 'country', label: 'Country', options: ['India', 'United States of America', 'Russia', 'Iran', 'China', 'Saudi Arabia'], required: true}
    ];

    const allFieldsFilled = () => {
        return inputFields.concat(selectFields).every(field => {
            return !!formData[field.id];
        });
    };

    return (
        <div className="flex flex-col justify-between">
            <div>
                <h3 className="text-3xl font-bold text-left m-6">
                    Add New Report
                </h3>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col w-4/5 md:w-1/2 lg:w-1/3 self-center">
            {inputFields.map(({ id, label, type, placeholder }) => (
                    <div className="flex flex-col mb-5" key={id}>
                        <label className="text-sm font-medium mb-1 cursor-pointer" htmlFor={id}>
                            {label}
                        </label>
                        <input
                            id={id}
                            value={formData[id]}
                            onChange={handleChange}
                            type={type}
                            placeholder={placeholder}
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        />
                    </div>
                ))}
                {selectFields.map(({ id, label, options }) => (
                    <div className="flex flex-col mb-5" key={id}>
                        <label className="text-sm font-medium mb-1 cursor-pointer" htmlFor={id}>
                            {label}
                        </label>
                        <select
                            id={id}
                            value={formData[id]}
                            onChange={handleChange}
                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                        >
                            {options.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}

                {!allFieldsFilled() && (
                    <p className="text-red-500 text-sm m-5 text-center">
                        Please fill out all fields.
                    </p>
                )}

                <button type="submit" disabled={!allFieldsFilled()} className="w-1/2 self-center bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">
                    Add Report
                </button>
            </form>
        </div>
    )
}

