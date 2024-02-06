'use client'

import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function SearchBar() {
  const [query, setQuery] = React.useState('')
  const [searchResult, setSearchResult] = React.useState<any[]>([])

  useEffect(() => {
    const fetchSearchResult = async () => {
      if (query.trim() !== '') {
        const response = await fetch('/api/search?q=' + query)
        const json = await response.json()
        setSearchResult(json)
      } else {
        setSearchResult([])
      }
    }
    fetchSearchResult()
  }, [query])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setQuery(event.currentTarget.q.value)
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Input
          variant="underlined"
          size="md"
          color="secondary"
          type="text"
          name="q"
          placeholder="ค้นหา"
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button type="submit">Search</Button>
        {searchResult.map((article) => (
          <div className="" key={article}>
            <Link href={`/article/${article.id}`}>
              <div className="">{article.title}</div>
            </Link>
          </div>
        ))}
      </form>
    </section>
  )
}
