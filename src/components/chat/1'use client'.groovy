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
import { MailIcon, MessagesSquareIcon, SearchIcon } from 'lucide-react'





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
    text: string
    isRead: boolean
}

const currentUserSenderId = '1';

const data: ChatInfo[] = [
    {
        id: '1',
        senderId: currentUserSenderId,
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
        text: 'สวัสดีครับ',
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
        text: 'สวัสดีครับ',
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
        text: 'สวัสดีครับ',
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
        text: 'สวัสดีครับ',
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
        text: 'สวัสดีครับ',
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
        text: 'สวัสดีครับ',
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
        text: 'สวัสดีครับ',
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
        text: 'สวัสดีครับ',
        isRead: true
    },
];




export default function Chat({
    id,
    senderId,
    isRead,
    reciverId,
    reciver,
    sender,
    text
}: ChatInfo) {
    const [ message, setMessage ] = useState<string>('')



    const selectedUser = useChatStore(state => state.selectedUser);
    const setSelectedUser = useChatStore(state => state.setSelectedUser);


    const handleSelected = (userId: string) => {
        setSelectedUser(userId);
    }

    const selectedChat = data.find((chat) => chat.reciverId === selectedUser);



    return (
        <main className='max-h-screen relative antialiased '>
            <div className='absolute flex flex-col justify-center '>
                <Head>
                    <title>My page title</title>
                    <meta property="og:title" content="My page title" key="title" />
                </Head>
                <div className="flex ">
                    <div className="fixed left-0 ring-1 w-96 ring-black">
                        1
                    </div>
                    <div className="fixed w-1/2 left-1/2 ring-red-400">
                        2
                    </div>
                    <div className="fixed right-0 w-96 ring-1 ring-red-400">
                        3
                    </div>
                </div>
            </div>
        </main>

    )
}