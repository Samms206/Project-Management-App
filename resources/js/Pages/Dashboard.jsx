import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP,TASK_PRIORITY_STATUS_CLASS_MAP,TASK_PRIORITY_STATUS_TEXT_MAP } from "@/constants.jsx";

export default function Dashboard({
    auth,
    totalPendingTask,
    myPendingTask,
    totalInprogressTask,
    myInprogressTask,
    totalCompletedTask,
    myCompletedTask,
    myActiveTask
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 px-2 md:px-2 sm:px-2 lg:px-1">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 gap-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    <div className="bg-white text-amber-600 overflow-hidden shadow-sm sm:rounded-lg flex flex-col p-6">
                        <h3 className="text-xl font-semibold">Pending Tasks</h3>
                        <p>
                            <span>{myPendingTask}</span>
                            /
                            <span>{totalPendingTask}</span>
                        </p>
                    </div>
                    <div className="bg-white text-blue-600 overflow-hidden shadow-sm sm:rounded-lg flex flex-col p-6">
                        <h3 className="text-lg font-semibold">In Progress Tasks</h3>
                        <p>
                            <span>{myInprogressTask}</span>
                            /
                            <span>{totalInprogressTask}</span>
                        </p>
                    </div>
                    <div className="bg-white text-green-600 overflow-hidden shadow-sm sm:rounded-lg flex flex-col p-6">
                        <h3 className="text-lg font-semibold">Completed Tasks</h3>
                        <p>
                            <span>{myCompletedTask}</span>
                            /
                            <span>{totalCompletedTask}</span>
                        </p>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6 sm:rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Active Tasks</h3>
                    <div className='rounded overflow-auto border border-gray-300 sm:rounded-lg'>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">ID</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Project Name</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Task Name</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Status</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myActiveTask.data.map((task) => (
                                <tr key={task.id} className="bg-white even:bg-gray-50">
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm">{task.id}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm">{task.project.name}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm">{task.name}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                    <span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>
                                            {TASK_STATUS_TEXT_MAP[task.status]}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-sm">{task.due_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
