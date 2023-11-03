'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Communities() {
  const [searchText, setSearchText] = useState('')

  const communities: { title: string; description: string; id: string }[] = [
    {
      id: '1',
      title: 'ArtBlock',
      description: 'ArtBlock is a community of artists and developers pushing the boundaries of generative art.',
    },
    {
      id: '2',
      title: 'Portrait',
      description: 'Portrait is a community of artists and developers pushing the boundaries of generative art.',
    },
  ]
  return (
    <>
      <div className="flex p-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold">Communities</h1>
        </div>
        <div className="flex-none">
          <input
            type="text"
            className="input input-bordered"
            placeholder="Search"
            value={searchText}
            onChange={e => {
              setSearchText(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {communities
          .filter(
            community =>
              community.title.toLowerCase().includes(searchText.toLowerCase()) ||
              community.description.toLowerCase().includes(searchText.toLowerCase())
          )
          .map(community => (
            <div className="card compact bg-base-100 p-4 shadow-lg" key={community.id}>
              <div className="card-body">
                <h2 className="card-title">{community.title}</h2>
                <p>{community.description}</p>
              </div>
              <div className="card-footer">
                <div className="flex justify-end">
                  <Link href={`/community/${community.id}`}>
                    <button className="btn btn-ghost">View</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
