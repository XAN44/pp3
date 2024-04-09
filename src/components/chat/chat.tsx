import { Text } from '@chakra-ui/react'
import { Input } from '@nextui-org/react'
import Head from 'next/head'
import React from 'react'

interface Message {
    id: string
    text: string
    senderId: string
    sender: {
        id: string
        name: string
        image: string
    }
}

export default function Chat({ id, text, sender, senderId }: Message) {
    return (
        <div className="max-h-screen relative">
            <div className="flex justify-center">
                <div className="w-3/12 fixed  left-0 bottom-0 top-0 inset-0 grid mt-16 overflow-y-scroll">
                    <div className="w-full p-3">
                        <Text className='mb-6' align={'center'} fontWeight={'bold'} fontSize={'larger'}>ข้อความทั้งหมด</Text>
                        <Input labelPlacement='inside' type='text' label='ค้นหารายชื่อ' className='h-1' />

                    </div>
                </div>

            </div>
        </div>
    )
}