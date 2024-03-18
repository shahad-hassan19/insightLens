import Country from './Country'
import Intensity from './Intensity'
import Sector from './Sector';
import Pestle from './Pestle';
import Year from './Year';

export default function UserDashboard() {
    return (
        <div id="user-dashboard">
            <div className="grid mb-10">
                    <h3 className="text-3xl font-bold text-left m-6">Dashboard</h3>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 m-6">
                    <div className="lg:col-span-3">
                        <div className='grid grid-row-3 gap-5'>
                            <div className='text-black w-full border border-gray-200 rounded-lg shadow bg-blue-100'>
                                <Sector/>
                            </div>
                            <div className='text-black w-full border border-gray-200 rounded-lg shadow bg-blue-100'>
                                <Pestle/>
                            </div>
                            <div className='text-black w-full border border-gray-200 rounded-lg shadow bg-blue-100'>
                                <Intensity/>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="grid grid-rows-2 lg:grid-rows-2 gap-5">
                            <div className='text-black w-full border border-gray-200 rounded-lg shadow bg-blue-100'>
                                <Country/>
                            </div>
                            <div className='text-black w-full border border-gray-200 rounded-lg shadow bg-blue-100'>
                                <Year/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
