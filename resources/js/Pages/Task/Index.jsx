import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "./TasksTable";

export default function Index({ auth, tasks, queryParams = null, success }) {
    queryParams = queryParams || {}

    return (
        <Authenticated user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks</h2>
                    <Link href={route('task.create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add Task
                    </Link>
                </div>
            }>
            <Head title="Tasks" />
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <TasksTable
                    tasks={tasks}
                    queryParams={queryParams}
                    success={success} />
            </div>
        </Authenticated>
    )
}