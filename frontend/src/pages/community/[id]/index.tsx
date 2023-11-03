'use client'
import Link from 'next/link'
import { useRouter } from 'next/router'

import contractDetails from '../../../info/contractDetails.json'
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
  useWaitForTransaction,
} from 'wagmi'
import { ArtBlock__factory } from '../../../../typechain'
import { useEffect, useState } from 'react'

export default function CommunitySales() {
  const router = useRouter()

  const id = BigInt(router.query.id as string) || BigInt(0)

  const { data: community } = useContractRead({
    address: contractDetails.abxTokenContractAddress as `0x${string}`,
    abi: ArtBlock__factory.abi,
    functionName: 'getCommunity',
    args: [id],
  })

  return (
    <>
      <div className="flex p-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold">{community?.title || 'Loading...'}</h1>
        </div>
        <div className="flex-none">
          <kbd className="kbd kbd-lg">Buy NFTs</kbd>
        </div>
      </div>
    </>
  )
  // return <p>Post: {router.query.id}</p>
}
