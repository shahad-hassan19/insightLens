import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
export default function HomePage() {
    return (
        <div className="flex flex-col">
            <nav className='w-full fixed flex items-center justify-between px-10 py-5'>
                <div>
                    <span className='text-2xl font-bold'>InsightLens</span>
                </div>
                <div className=''>
                    <button className='mr-3'><Link to="/login" className='text-white'>LogIn</Link> </button>
                    <button><Link to="/register" className='text-white'>Register</Link></button>
                </div>
            </nav>
            <div className='mt-60 mb-32'>
                <h1 className='text-8xl font-semibold'>InsightLens</h1>
                <p className='texl-2xl font-semibold mt-10'>A Data Visualization App built with React and Tailwind CSS.</p>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

