import React from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface blog {
  authorId: string
}
export default function Data({ authorId }: blog) {
  const { data: blog } = useSWR(`/api/blog=${authorId}`, fetcher)
  return (
    <>
      <div className="">
        {blog.map((blog: any) => (
          <div key={blog.id} className="">
            <p>{blog.title}</p>
          </div>
        ))}
      </div>
    </>
  )
}
