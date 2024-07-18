import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";

export default function Show({ auth, project, tasks, queryParams = null }) {
    queryParams = queryParams || {}

    return (
        <Authenticated user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {`Project: ${project.data.name}`}
                </h2>
            }>
            <Head title={`Project: ${project.data.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"></div>
                    <div>
                        <img src={project.data.image_path} alt="" className="w-full h-64 object-cover" />
                    </div>
                    <div className="grid gap-1 grid-cols-2 mt-2">
                        <div>
                            <div>
                                <label className="font-bold text-lg">Project ID</label>
                                <p className="mt-1">{project.data.id}</p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Project Name</label>
                                <p className="mt-1">{project.data.name}</p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Project Status</label>
                                <p className="mt-1">
                                    <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.data.status]}>
                                        {PROJECT_STATUS_TEXT_MAP[project.data.status]}
                                    </span>
                                </p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Created By</label>
                                <p className="mt-1">{project.data.created_by.name}</p>
                            </div>
                        </div>
                        <div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Due Date</label>
                                <p className="mt-1">{project.data.due_date}</p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Created Date</label>
                                <p className="mt-1">{project.data.created_at}</p>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Updated By</label>
                                <p className="mt-1">{project.data.created_by.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="font-bold text-lg">Description</label>
                        <p className="mt-1">{project.data.description}</p>
                    </div>
                </div>
            </div>

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"></div>
                    <TasksTable tasks={tasks} queryParams={queryParams}/>
                </div>
            </div>


        </Authenticated>
    );
}