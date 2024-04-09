'use client'

import React, { useEffect, useState } from 'react'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import useSWR from 'swr'
import { Avatar, Badge, Input } from '@nextui-org/react'
import { AiFillNotification } from 'react-icons/ai'
import useChatStore from '../store/chatStore'
import { Text } from '@radix-ui/themes'
import Head from 'next/head'
import { MailIcon, MessagesSquareIcon, MoreVertical, SearchIcon } from 'lucide-react'
import Image from 'next/image'





interface ChatInfo {
    id: string
    senderId: string
    sender: {
        id: string
        name: string
        image: string
    }
    reciverId: string
    reciver: {
        id: string
        name: string
        image: string
    }
    isRead: boolean
    text: string
}

const currentUserSenderId = '1';

const data: ChatInfo[] = [
    {
        id: '1',
        senderId: '1',
        sender: {
            id: '1',
            name: 'xan kym',
            image: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        reciverId: '2',
        reciver: {
            id: '2',
            name: 'Jane Doe',
            image: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        text: 'test',
        isRead: false
    },
    {
        id: '2',
        senderId: currentUserSenderId,
        sender: {
            id: currentUserSenderId,
            name: 'xan kym',
            image: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        reciverId: '3',
        reciver: {
            id: '3',
            name: 'yin ji',
            image: 'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg'
        },
        text: 'Sawaddee',
        isRead: true
    },
    {
        id: '3',
        senderId: currentUserSenderId,
        sender: {
            id: currentUserSenderId,
            name: 'xan kym',
            image: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        reciverId: '4',
        reciver: {
            id: '4',
            name: 'ew qqqa',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4d_wwke5z9NDBfCLhNlsgWBBE8aQcJ8--ZzO684DV3w&s'
        },
        text: 'Sawaddee',
        isRead: true
    },
    {
        id: '3',
        senderId: currentUserSenderId,
        sender: {
            id: currentUserSenderId,
            name: 'xan kym',
            image: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        reciverId: '4',
        reciver: {
            id: '4',
            name: 'wq ew2',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4d_wwke5z9NDBfCLhNlsgWBBE8aQcJ8--ZzO684DV3w&s'
        },
        text: 'Sawaddee',

        isRead: true
    },
    {
        id: '3',
        senderId: currentUserSenderId,
        sender: {
            id: currentUserSenderId,
            name: 'xan kym',
            image: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        reciverId: '4',
        reciver: {
            id: '4',
            name: 'dasw www',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4d_wwke5z9NDBfCLhNlsgWBBE8aQcJ8--ZzO684DV3w&s'
        },
        text: 'Sawaddee',

        isRead: true
    },
    {
        id: '3',
        senderId: currentUserSenderId,
        sender: {
            id: currentUserSenderId,
            name: 'xan kym',
            image: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        reciverId: '4',
        reciver: {
            id: '4',
            name: 'lw a',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4d_wwke5z9NDBfCLhNlsgWBBE8aQcJ8--ZzO684DV3w&s'
        },
        text: 'Sawaddee',

        isRead: true
    },
    {
        id: '3',
        senderId: currentUserSenderId,
        sender: {
            id: currentUserSenderId,
            name: 'xan kym',
            image: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        reciverId: '4',
        reciver: {
            id: '4',
            name: 'maw sxa',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4d_wwke5z9NDBfCLhNlsgWBBE8aQcJ8--ZzO684DV3w&s'
        },
        text: 'Sawaddee',

        isRead: true
    },
    {
        id: '3',
        senderId: currentUserSenderId,
        sender: {
            id: currentUserSenderId,
            name: 'xan kym',
            image: 'https://www.w3schools.com/howto/img_avatar.png'
        },
        reciverId: '4',
        reciver: {
            id: '4',
            name: 'eqw low',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4d_wwke5z9NDBfCLhNlsgWBBE8aQcJ8--ZzO684DV3w&s'
        },
        text: 'Sawaddee',
        isRead: true
    },
];




export default function Chat({
    id,
    senderId,
    isRead,
    text,
    reciver,
    sender,
}: ChatInfo) {


    const [ searchQuery, setSearchQuery ] = useState('');

    const handleSearch = (event: any) => {
        setSearchQuery(event.target.value);
    };

    const filteredChatInfo = data.filter(chat => {
        return chat.reciver.name.toLowerCase().includes(searchQuery.toLowerCase());
    });


    const selectedUser = useChatStore(state => state.selectedUser);
    const setSelectedUser = useChatStore(state => state.setSelectedUser);


    const handleSelected = (userId: string) => {
        setSelectedUser(userId);
    }



    const selectedChat = data.find((chat) => chat.reciverId === selectedUser);

    const [ showProfile, setShowProfile ] = useState(false)
    const handleShowProfile = () => {
        setShowProfile(!showProfile)
    }

    return (
        <>
            <Head>
                <title>My page title</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            <div className="
                    relative 
                    max-h-screen
                    ">
                <div className="flex justify-center ">
                    <div className="w-96 grid items-center p-3 left-0 top-0 inset-0 mt-16 bottom-0 overflow-y-scroll fixed pr-6 ">
                        <div className="mb-3">
                            <Text weight={'bold'} size={'4'}>ข้อความทั้งหมด</Text>
                        </div>
                        <div className="w-full h-full p-1 ">
                            <Input labelPlacement='inside' type='text' label='ค้นหารายชื่อ' className='h-1'
                                onChange={handleSearch}

                                endContent=
                                {
                                    <SearchIcon className="
                                    text-2xl 
                                    text-default-400 
                                    pointer-events-none 
                                    flex-shrink-0
                                    " />
                                } />
                        </div>

                        <div className="mt-14 w-full ">
                            {searchQuery && filteredChatInfo.map(chat => (
                                <div key={chat.id}>
                                    <p>{chat.reciver.name}</p>
                                    {/* แสดงข้อมูลอื่น ๆ ของแชทที่ถูกกรองไว้ */}
                                </div>
                            ))}

                            {data.map((u, index) => (
                                <div key={index} onClick={() => handleSelected(u.reciverId)} className="
                            p-4 m-3 mb-8 
                            border rounded-3xl shadow-lg bg-base-200 
                            flex justify-between  group/item hover:bg-slate-200">
                                    <div className="flex">
                                        <Avatar src={u.reciver.image} alt={u.reciver.name} />
                                        <div className="ml-3 flex-col flex ">
                                            <Text>{u.reciver.name}</Text>
                                            <Text>{text}</Text>
                                        </div>
                                    </div>
                                    <div className="
                                group/edit invisible group-hover/item:visible 
                                flex items-center justify-end ">
                                        <div className="group-hover/edit:translate-x-0.5 group-hover/edit:
                                    ">
                                            <MessagesSquareIcon />

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="fixed w-[690px] left-0 right-0 mx-auto top-0 overflow-y-auto  bottom-0 mt-16 border border-black rounded-lg">
                        <div className="grid">

                            {selectedUser ? (
                                <>
                                    <div className="grid">

                                        <div className="ml-3 mr-3 mt-6 flex justify-between ">
                                            <div className="flex">
                                                <Avatar src={selectedChat?.reciver.image} />
                                                <div className="ml-3">
                                                    <Text>
                                                        {selectedChat?.reciver.name}
                                                    </Text>
                                                </div>
                                            </div>
                                            <div className="flex ">
                                                <MoreVertical />
                                            </div>
                                        </div>
                                        <div className="mt-9">
                                            {selectedChat?.senderId && (
                                                <div className="chat chat-end">
                                                    <div className="chat-image" >
                                                        <div className="mr-4 w-10 rounded-full">
                                                            <Avatar alt="Tailwind CSS chat bubble component" src={selectedChat?.sender.image} />
                                                        </div>
                                                    </div>
                                                    <div className="chat-header">
                                                        {selectedChat?.sender.name}
                                                        <time className="text-xs opacity-50">12:46</time>
                                                    </div>
                                                    <div className="chat-bubble ">
                                                        {selectedChat?.text}
                                                    </div>
                                                </div>
                                            )}
                                            {selectedChat?.reciverId && (
                                                <div className="chat chat-start">
                                                    <div className="chat-image" >
                                                        <div className="mr-4 w-10 rounded-full">
                                                            <Avatar alt="Tailwind CSS chat bubble component" src={selectedChat?.reciver.image} />
                                                        </div>
                                                    </div>
                                                    <div className="chat-header">
                                                        {selectedChat?.reciver.name}
                                                        <time className="text-xs opacity-50">12:46</time>
                                                    </div>
                                                    <div className="chat-bubble ">
                                                        {selectedChat?.text}
                                                    </div>
                                                </div>
                                            )}

                                        </div>


                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="">
                                        dont selected
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="fixed bottom-0 mx-auto w-[690px] left-0 right-0 rounded-lg p-3 ">
                            <Input
                                type='text'
                                placeholder='พิมพ์ข้อความ...'
                                className='w-full'
                            />
                        </div>
                    </div>

                    <div className=" w-96 fixed right-0">
                        Profile
                    </div>
                </div>
            </div>
        </>

    )
}