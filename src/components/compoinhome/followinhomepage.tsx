import React from 'react'

import {
    Avatar,
    Card,
    CardBody,
    CardFooter,
    Image,
    Link,
} from '@nextui-org/react'
import { Badge } from '@chakra-ui/react'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Text } from '@chakra-ui/react'
import { TotalVisit, TotalVisit1 } from '@/lib/actions/user.visit'
import VisitBtnArticle from '../visit/visitArticle'
import VisitBtnArticleC from '../visit/visitArticleC'
import { getCurrentUser } from '@/lib/session'
import { fetchInBlogPage, fetchInFollowInPage } from '@/lib/actions/user.carousel'
import VisitBtnPOSTAll from '../visit/visitPost'
import CorosuleFollowPost from './corosuleFollowPost'

export default async function FollowinHomePage() {
    const otherInfo = await fetchInFollowInPage()

    return (
        <>
            <div className="grid text-center">
                {otherInfo && otherInfo.length > 0 ? (
                    <>
                        <div className="">

                            <CorosuleFollowPost />
                        </div>
                    </>

                ) : (
                    <h1>คุณยังไม่มีการติดตาม</h1>
                )}

            </div>
        </>
    )
}
