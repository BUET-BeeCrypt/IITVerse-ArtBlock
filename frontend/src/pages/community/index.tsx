'use client'

import contractDetails from '../../info/contractDetails.json'

import Link from 'next/link'
import { useState } from 'react'
import { Community } from './TypeCommunity'
import { ArtBlock__factory } from '../../../typechain'
import { useContractRead } from 'wagmi'

export default function Communities() {
  const [searchText, setSearchText] = useState('')

  const { data: communities }: any = useContractRead({
    address: contractDetails.artBlockContractAddress as `0x${string}`,
    abi: ArtBlock__factory.abi,
    functionName: 'getCommunityList',
  })

  console.log(ArtBlock__factory.abi)

  console.log(communities)

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
        {communities &&
          communities
            .filter(
              community =>
                community.title.toLowerCase().includes(searchText.toLowerCase()) ||
                community.description.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((community, id) => (
              <div className="card compact bg-base-100 p-4 shadow-lg" key={id}>
                <div className="card-body">
                  <h2 className="card-title">{community.title}</h2>
                  <p>{community.description}</p>
                </div>
                <div className="card-footer">
                  <div className="flex justify-end">
                    <Link href={`/community/${id}`}>
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
