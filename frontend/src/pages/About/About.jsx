import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import Footer from './../../components/Footer/Footer';


export default function About() {

    const navigate = useNavigate()

    const handleClick = useCallback(() => {
        navigate("/user/settings")
    }, [navigate])

    return (
        <div className="flex flex-col h-full min-w-screen py-5 px-5 sm:px-20">
            <div className='flex items-center justify-start'>
                <button onClick={handleClick} className="text-white">
                        Back
                </button>
            </div>
            <div>
                <h1 className='text-4xl font-semibold text-center mt-10'>InsightLens</h1>
                <div className="p-10 md:mx-10 flex flex-col items-center font-normal text-justify mb-10">
                    <p className="mb-3">
                        We are passionate about data visualization and its power to transform
                        complex information into meaningful insights. Our mission is to empower
                        individuals and organizations with intuitive and impactful visualizations
                        that drive decision-making and innovation.
                    </p>
                    <p className="mb-3">
                        Our team of experts specializes in creating interactive charts, graphs,
                        maps, and dashboards that help our clients unlock the full potential of
                        their data. Whether you&apos;re in business, science, finance, healthcare, or
                        academia, we have the tools and expertise to elevate your data analysis
                        and storytelling.
                    </p>
                    <p className="mb-3">
                        At InsightLens, we understand that effective data visualization
                        goes beyond aesthetics. It&apos;s about delivering clear and actionable
                        insights through thoughtful design, storytelling, and user experience.
                        We work closely with our clients to understand their unique needs and
                        tailor visualizations that resonate with their audience.
                    </p>
                    <p>
                        Join us on a journey of discovery and innovation through the art of data
                        visualization. Let&apos;s turn your data into a visual masterpiece that
                        drives success and growth for your organization.
                    </p>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

