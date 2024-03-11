import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
export default function HomePage() {
    return (
        <div className="flex flex-col h-screen justify-between px-5 xs:px-5 sm:px-10">
            <nav className='w-full flex items-center justify-between lg:px-10 py-5'>
                <div>
                    <span className='text-2xl font-bold'>InsightLens</span>
                </div>
                <div className=''>
                    <button className='mr-3'><Link to="/login" className='text-white'>LogIn</Link> </button>
                    <button><Link to="/register" className='text-white'>Register</Link></button>
                </div>
            </nav>
            <div className='flex flex-col items-center mt-16 mb-10 md:mt-40 md:mb-28'>
                <h1 className='text-6xl md:text-8xl font-semibold'>InsightLens</h1>
                <p className='text-xl text-center font-semibold mt-10 '>A Data Visualization App built with React and Tailwind CSS.</p>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

