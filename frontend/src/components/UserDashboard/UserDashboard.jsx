import Country from './Country'
import Intensity from './Intensity'
import Sector from './Sector';
import Pestle from './Pestle';
import Year from './Year';

export default function UserDashboard() {
    return (
        <div id="user-dashboard" className=''>
            <div className="grid mb-10">
                    <h3 className="text-3xl font-bold text-left m-6">Dashboard</h3>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 p-5 lg:p-10">
                    <div className="lg:col-span-3">
                        <div className='grid gap-5'>
                            <div className='text-black w-full border border-gray-200 rounded-lg shadow bg-blue-100 cursor-pointer'>
                                <Sector/>
                            </div>
                            <div className='text-black w-full border border-gray-200 rounded-lg shadow bg-blue-100 cursor-pointer'>
                                <Pestle/>
                            </div>
                            <div className='text-black w-full border border-gray-200 rounded-lg shadow bg-blue-100 cursor-pointer'>
                                <Intensity/>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="grid gap-5">
                            <div className='text-black w-full border border-gray-200 rounded-lg shadow bg-blue-100 cursor-pointer'>
                                <Country/>
                            </div>
                            <div className='text-black w-full border border-gray-200 rounded-lg shadow bg-blue-100 cursor-pointer'>
                                <Year/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
