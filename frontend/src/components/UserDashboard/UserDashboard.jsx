import PieChart from "../../Charts/PieChart/PieChart";

export default function UserDashboard() {
    return (
        <div id="user-dashboard" className='flex justify-center'>
            <div className="flex flex-col">
                <div>
                    <h3 className="text-3xl font-bold text-left m-6">Sectors</h3>
                </div>
                <div className="flex items-center justify-around">
                    <PieChart/>
                </div>
            </div>
        </div>
    )
}

