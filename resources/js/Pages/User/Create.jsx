import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {

    const { data, setData, post, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('user.store'));
    }

    return (
        <Authenticated user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create New User</h2>
                </div>
            }>
            <Head title="Users" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form className="p-4 sm:p-8 bg-white shadow sm:rounded-lg" onSubmit={onSubmit}>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_name"
                                        value="User Name"
                                    />
                                    <TextInput
                                        id="user_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)} />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_email"
                                        value="User Email"
                                    />
                                    <TextInput
                                        id="user_email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('email', e.target.value)} />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_password"
                                        value="User Password"
                                    />
                                    <TextInput
                                        id="user_password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('password', e.target.value)} />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="user_password_confirmation"
                                        value="User Password Confirmation"
                                    />
                                    <TextInput
                                        id="user_password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('password_confirmation', e.target.value)} />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <div className="mt-4 w-full text-right flex gap-1 justify-end">
                                    <Link href={route('user.index')} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</Link>
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