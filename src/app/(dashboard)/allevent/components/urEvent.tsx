'use client'
import { EventInitial } from "@/components/store/EventAll";
import { JoinData, UserInEvent } from "@/types/eventJoinIndex";
import { Event, RegisterEvent } from "@prisma/client";
import { Text } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    Image,
    Link,
} from '@nextui-org/react'
import { Badge } from '@chakra-ui/react'
import VisitEventTag from "@/components/visit/visitTag/visiteventTag";
import { useSession } from 'next-auth/react'
import TagFammily from "./tagFamily";
import TagTarvel from "./tagTarvel";
import Resident from "./tagResident";
import Business from "./tagBusines";

interface Props {
    data: JoinData[] | null
}

const Urevent: React.FC<Props> = ({
    data
}) => {

    const session = useSession()

    const { eventCount, incrumentEvent } = EventInitial((state) => ({
        eventCount: state.eventCount,
        incrumentEvent: state.eventIncrument
    }))

    useEffect(() => {
        if (data) {
            incrumentEvent(data.length)
        }
    }, [data, incrumentEvent])

    const filteredData = data ? data.filter(d => d.event?.tag.some(tag => tag?.tag === 'ครอบครัว')) : null;


    return (

        <div className="
        max-w-full
        items-center
        justify-center
        ml-10
        mr-10
        p-3
        ">
            <div className="text-start w-full p-3 ">
                <Text color="red" as="b" fontSize='large' >
                    คุณมี {eventCount} กิจกรรมในตอนนี้
                </Text>
                <div className="mt-6 max-w-full">
                    <TagFammily data={data} />
                </div>
                <div className="divider" />
                <div className="mt-6 max-w-full">
                    <TagTarvel data={data} />
                </div>
                <div className="divider" />
                <div className="mt-6 max-w-full">
                    <Resident data={data} />
                </div>
                <div className="divider" />
                <div className="mt-6 max-w-full">
                    <Business data={data} />
                </div>
            </div>

        </div>
    );
}

export default Urevent;