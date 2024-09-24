import { useNavigate } from 'react-router';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Footer from '../../components/Footer/Footer';


export default function HomePage() {

    const navigate = useNavigate()

    return (
        <div className="flex flex-col h-screen min-w-screen justify-between px-5 sm:px-10">
            <nav className='w-full flex items-center justify-between lg:px-10 py-5'>
                <div>
                    <span className='text-2xl font-bold'>
                        InsightLens
                    </span>
                </div>
                <Stack spacing={2} direction="row">
                    <Button variant='contained'
                        onClick={() => navigate("/login")}
                    >
                        LogIn
                    </Button>
                    <Button variant='contained'
                        onClick={() => navigate("/Register")}
                    >
                        Register
                    </Button>
                </Stack>
            </nav>
            <div className='flex flex-col items-center mt-16 mb-10 md:mt-40 md:mb-28'>
                <h1 className='text-6xl md:text-8xl font-semibold'>
                    InsightLens
                </h1>
                <p className='text-xl text-center font-semibold mt-10'>
                    A Data Visualization App built with React and Tailwind CSS.
                </p>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

