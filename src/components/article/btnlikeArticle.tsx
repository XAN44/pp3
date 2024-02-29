'use client'
import { Badge, Button, Divider, Image, useSwitch } from '@nextui-org/react'
import { Avatar, AvatarImage } from '../ui/avatar'
import Followbtn from '../follow/followbtn'
import { Text } from '@chakra-ui/react'
import { Heart } from 'lucide-react'
import useSWR from 'swr'
import React, { useEffect, useState } from 'react'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

type Props = {}

interface LikeData {
  id: string
  articleId: string
  totalLike: number
}

function btnlikeArticle({ id, articleId, totalLike: Total }: LikeData) {
  const [liked, setLiked] = React.useState(false)
  const [totalLike, setTotal] = useState(0)

  const { data: Like, mutate: MutaLike } = useSWR<LikeData>(
    `/api/like?id=` + id,
    fetcher
  )

  return (
    <div>
      <div className="flex items-center justify-start">
        <Heart onClick={handleLike} color={liked ? '#FF0000' : '#000000'} />

        {Like && <div>Total Likes: {Like.totalLike}</div>}
      </div>
    </div>
  )
}

export default btnlikeArticle
