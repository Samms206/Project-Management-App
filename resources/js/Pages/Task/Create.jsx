import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, projects, users }) {

    const { data, setData, post, errors, reset } = useForm({
        image: '',
        name: '',
        status: '',
        project_id: '',
        priority: '',
        description: '',
        due_date: '',
        assigned_user_id: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('task.store'));
    }

    return (
        <Authenticated user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New Task</h2>
                </div>
            }>
            <Head title="Tasks" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form className="p-4 sm:p-8 bg-white shadow sm:rounded-lg" onSubmit={onSubmit}>
                                <div>
                                    <InputLabel
                                        htmlFor="project_id"
                                        value="Project"
                                    />
                                    <SelectInput
                                        name="project_id"
                                        id="project_id"
                                        onChange={(e) => setData('project_id', e.target.value)}
                                        className="mt-1 block w-full"
                                        label="Project ID"
                                    >
                                        <option value="">Select Project</option>
                                        {projects.map((project) => (
                                            <option key={project.id} value={project.id}>
                                                {project.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.project_id} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_image_path"
                                        value="Task Image"
                                    />
                                    <TextInput
                                        id="task_image_path"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('image', e.target.files[0])} />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_name"
                                        value="Task Name"
                                    />
                                    <TextInput
                                        id="task_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)} />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_description"
                                        value="Task Description"
                                    />
                                    <TextAreaInput
                                        id="task_description"
                                        type="text"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('description', e.target.value)} />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_due_date"
                                        value="Task Deadline"
                                    />
                                    <TextInput
                                        id="task_due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('due_date', e.target.value)} />
                                    <InputError message={errors.due_date} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_status"
                                        value="Task Status"
                                    />
                                    <SelectInput
                                        name="status"
                                        id="task_status"
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="mt-1 block w-full"
                                        label="Status"
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="task_priority"
                                        value="Task Priority"
                                    />
                                    <SelectInput
                                        name="priority"
                                        id="task_priority"
                                        onChange={(e) => setData('priority', e.target.value)}
                                        className="mt-1 block w-full"
                                        label="Priority"
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                    <InputError message={errors.priority} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="assigned_user_id"
                                        value="Assigned User"
                                    />
                                    <SelectInput
                                        name="assigned_user_id"
                                        id="assigned_user_id"
                                        onChange={(e) => setData('assigned_user_id', e.target.value)}
                                        className="mt-1 block w-full"
                                        label="Status"
                                    >
                                        <option value="">Select User</option>
                                        {users.map((user)=>(
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.assigned_user_id} className="mt-2" />
                                </div>
                                <div className="mt-4 w-full text-right flex gap-1 justify-end">
                                    <Link href={route('task.index')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</Link>
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}