import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid'
export default function TableHeading({
    name,
    sort_table = true,
    sort_field = null,
    sort_direction = null,
    sortChanged = () => {},
    children
}) {
    return (
        <th onClick={(e) => sortChanged(name)} className="px-3 py-2">
            <div className="flex items-center justify-between gap-1 cursor-pointer">
                {children}
                {sort_table && (
                    <div>
                        <ChevronUpIcon className={"w-4 " +
                            (sort_field == name &&
                                sort_direction == 'asc'
                                ? 'text-gray-500'
                                : '')} />
                        <ChevronDownIcon className={"w-4 -mt-2 " +
                            (sort_field == name &&
                                sort_direction == 'desc'
                                ? 'text-gray-500'
                                : '')} />
                    </div>
                )}
            </div>
        </th>
    )
}