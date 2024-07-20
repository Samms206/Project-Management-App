import Pagination from "@/Components/Pagination";
import { Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP,TASK_PRIORITY_STATUS_CLASS_MAP,TASK_PRIORITY_STATUS_TEXT_MAP } from "@/constants.jsx";
import { useEffect } from "react";

export default function TasksTable({ 
    tasks, 
    queryParams = null, 
    hideProjectColumn = false, 
    success, 
    routeTable = 'task.index', 
    project_id = null 
}) {

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                router.get(route(routeTable, project_id ), queryParams);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [success, queryParams]);

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route(routeTable, project_id), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name == queryParams.sort_field) {
            if (queryParams.sort_direction == 'asc') {
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route(routeTable, project_id), queryParams);
    };

    const deleteTask = (task) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }
        router.delete(route('task.destroy', task.id));
    };

    return (
        <>
            <div className="w-full">
                <div className="w-full flex justify-between mb-4">
                    <TextInput
                        className=""
                        defaultValue={queryParams.name}
                        placeholder="Task Name"
                        onBlur={e => searchFieldChanged('name', e.target.value)}
                        onKeyPress={e => onKeyPress('name', e)} />

                    <SelectInput
                        className=""
                        defaultValue={queryParams.status}
                        onChange={(e) => searchFieldChanged('status', e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </SelectInput>
                </div>
                {success && (
                    <div className="bg-emerald-500 py-2 px-4 mb-4 text-white rounded">
                        {success}
                    </div>
                )}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"></div>
                <div className="rounded overflow-auto border border-gray-300 sm:rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                            <tr className="text-nowrap">
                                <TableHeading
                                    name="id"
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}>
                                    ID
                                </TableHeading>
                                <th className="px-3 py-2">Image</th>
                                {!hideProjectColumn && (
                                    <th className="px-3 py-2">Project Name</th>
                                )}
                                <TableHeading
                                    name="name"
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}>
                                    Name
                                </TableHeading>
                                <th className="px-3 py-2 text-center">Status</th>
                                <th className="px-3 py-2 text-center">Priority</th>
                                <TableHeading
                                    name="created_at"
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}>
                                    Created Date
                                </TableHeading>
                                <TableHeading
                                    name="due_date"
                                    sort_field={queryParams.sort_field}
                                    sort_direction={queryParams.sort_direction}
                                    sortChanged={sortChanged}>
                                    Due Date
                                </TableHeading>
                                <th className="px-3 py-2">Created By</th>
                                <th className="px-3 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.data.map(task => (
                                <tr className="py-2 px-4 border-b border-gray-200 text-sm" key={task.id}>
                                    <td className="px-3 py-2">{task.id}</td>
                                    <td className="px-3 py-2">
                                        <img width={100} src={task.image_path} alt="" />
                                    </td>
                                    {!hideProjectColumn && (
                                        <td className="px-3 py-2">{task.project.name}</td>
                                    )}
                                    <td className="px-3 py-2 hover:underline">
                                        <Link href={route('task.show', task.id)}>{task.name}</Link>
                                    </td>

                                    <td className="px-3 py-2 text-center text-nowrap">
                                        <span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>
                                            {TASK_STATUS_TEXT_MAP[task.status]}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={
                                            "px-2 py-1 rounded text-white " + 
                                            TASK_PRIORITY_STATUS_CLASS_MAP[task.priority]}
                                        >
                                            {TASK_PRIORITY_STATUS_TEXT_MAP[task.priority]}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                                    <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                                    <td className="px-3 py-2">{task.created_by.name}</td>
                                    <td className="px-3 py-2 text-nowrap">
                                        <Link href={route('task.edit', task.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</Link>
                                        <button onClick={(e) => deleteTask(task)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination links={tasks.meta.links} />
        </>
    );
}