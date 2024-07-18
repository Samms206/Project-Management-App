import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TasksTable from "./TasksTable";

export default function Index({ auth, tasks, queryParams = null }) {
    queryParams = queryParams || {}

    return (
        <Authenticated user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tasks</h2>}>
            <Head title="Tasks" />
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <TasksTable tasks={tasks} queryParams={queryParams}/>
            </div>
        </Authenticated>
    )
}