import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, project }) {

    const { data, setData, post, errors, reset } = useForm({
        image: '',
        name: project.data.name || '',
        status: project.data.status || '',
        description: project.data.description || '',
        due_date: project.data.due_date || '',
        _method: 'PUT'
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('project.update', project.data.id));
    }

    return (
        <Authenticated user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Project {project.name}</h2>
                </div>
            }>
            <Head title="Projects" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form className="p-4 sm:p-8 bg-white shadow sm:rounded-lg" onSubmit={onSubmit}>
                                {project.data.image_path && (
                                    <div>
                                        <img src={project.data.image_path} alt="image" className="w-64" />
                                    </div>
                                )}
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="project_image_path"
                                        value="Project Image"
                                    />
                                    <TextInput
                                        id="project_image_path"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('image', e.target.files[0])} />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="project_name"
                                        value="Project Name"
                                    />
                                    <TextInput
                                        id="project_name"
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
                                        htmlFor="project_description"
                                        value="Project Description"
                                    />
                                    <TextAreaInput
                                        id="project_description"
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
                                        htmlFor="project_status"
                                        value="Project Status"
                                    />
                                    <SelectInput
                                        name="status"
                                        id="project_status"
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
                                        htmlFor="project_due_date"
                                        value="Project Deadline"
                                    />
                                    <TextInput
                                        id="project_due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('due_date', e.target.value)} />
                                    <InputError message={errors.due_date} className="mt-2" />
                                </div>
                                <div className="mt-4 w-full text-right flex gap-1 justify-end">
                                    <Link href={route('project.index')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</Link>
                                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}