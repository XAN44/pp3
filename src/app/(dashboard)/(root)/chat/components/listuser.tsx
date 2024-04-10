'use client'

import { User } from "@prisma/client";
import Boxuser from "./Boxuser";

interface UserListProps {
    items: User[];
}
const ListUser: React.FC<UserListProps> = ({ items }) => {
    return (
        <aside className="
        fixed
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        overflow-y-auto
        border-r
        border-gray-200
        block
        w-full
        left-0
        ">
            <div className="px-5">
                <div className="flex-col">
                    <div className="
                    text-2xl
                    font-bold
                    text-neutral-800
                    py-4
                    ">
                        แชท
                    </div>
                </div>
                {items.map((item) => (
                    <Boxuser
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </aside>
    );
}

export default ListUser;