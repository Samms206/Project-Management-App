import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import { useEffect } from "react";

export default function Index({ auth, users, queryParams = null, success }) {
    queryParams = queryParams || {}

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                router.get(route('user.index'), queryParams);
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

        router.get(route('user.index'), queryParams);
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
        router.get(route('user.index'), queryParams);
    };

    const deleteUser = (user) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }
        router.delete(route('user.destroy', user.id));
    };

    return (
        <Authenticated user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>
                    <Link href={route('user.create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add User
                    </Link>
                </div>
            }>
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="w-full flex justify-between mb-4">
                        <TextInput
                            className=""
                            defaultValue={queryParams.name}
                            placeholder="User Name"
                            onBlur={e => searchFieldChanged('name', e.target.value)}
                            onKeyPress={e => onKeyPress('name', e)} />
                    </div>
                    {success && (<div className="bg-emerald-500 py-2 px-4 mb-4 text-white rounded">
                        {success}
                    </div>)}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
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
                                        <TableHeading
                                            name="name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}>
                                            Name
                                        </TableHeading>
                                        <TableHeading
                                            name="email"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}>
                                            Email
                                        </TableHeading>
                                        <TableHeading
                                            name="created_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}>
                                            Created Date
                                        </TableHeading>
                                        <th className="px-3 py-2 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map(user => (
                                        <tr className="py-2 px-4 border-b border-gray-200 text-sm" key={user.id}>
                                            <td className="px-3 py-2">{user.id}</td>
                                            <th className="px-3 py-2 hover:underline">
                                                {user.name}
                                            </th>
                                            <th className="px-3 py-2 hover:underline">
                                                {user.email}
                                            </th>
                                            <td className="px-3 py-2 text-nowrap">{user.created_at}</td>
                                            <td className="px-3 py-2 text-nowrap">
                                                <Link href={route('user.edit', user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</Link>
                                                <button
                                                    onClick={(e) => deleteUser(user)}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination links={users.meta.links} />
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}