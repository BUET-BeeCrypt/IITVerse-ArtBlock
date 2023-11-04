import { useRouter } from 'next/router'

import contractDetails from '../../../../info/contractDetails.json'
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
import { ArtBlock__factory } from '../../../../../typechain'
import { useEffect, useState } from 'react'

function Art({ art, vote }: { art: any; vote: (u: 'up' | 'down') => void }) {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure className="h-100">
        <div className="ml-4 flex h-full flex-col justify-center">
          {(art.createdAt.valueOf() + art.votingDuration.valueOf()) * BigInt(1000) > BigInt(new Date().getTime()) ? (
            <>
              <button
                className="btn btn-square btn-outline btn-success m-2"
                onClick={e => {
                  e.preventDefault()
                  vote('up')
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
              </button>
              <button
                className="btn btn-square btn-outline btn-error m-2"
                onClick={e => {
                  e.preventDefault()
                  vote('down')
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                  />
                </svg>
              </button>
            </>
          ) : art.verified ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="m-2 h-6 w-6 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="m-2 h-6 w-6 text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          )}
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {art.title} <span className="text-accent">{art.isExclusive && 'Exclusive'}</span>
        </h2>
        <p>{art.description}</p>
        <div className="card-actions flex items-center justify-between">
          <p className="text-left font-bold text-error">{art.price} CTK</p>
          <a href={`https://gateway.pinata.cloud/ipfs/${art.ipfsHash}`} target="_blank" className="btn btn-primary">
            Preview
          </a>
        </div>
      </div>
    </div>
  )
}

export default function () {
  const router = useRouter()

  const [voteId, setVoteId] = useState<[number, boolean]>([-1, false])
  const [alreadyVoted, setAlreadyVoted] = useState<Set<String>>(
    new Set(JSON.parse(localStorage.getItem('voted') || '[]'))
  )

  const id = (router.query.id && BigInt(router.query.id as string)) || BigInt(0)

  const { config } = usePrepareContractWrite({
    address: contractDetails.artBlockContractAddress as `0x${string}`,
    abi: ArtBlock__factory.abi,
    functionName: 'voteProduct',
    args: [BigInt(id), BigInt(voteId[0] === -1 ? 0 : voteId[0]), voteId[1]],
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)
  const { data: receipt, isLoading: isPending } = useWaitForTransaction({ hash: data?.hash })

  useEffect(() => {
    if (voteId[0] !== -1 && write) {
      write()
      setVoteId([-1, false])
    }
  }, [voteId, write])

  const { data: community } = useContractRead({
    address: contractDetails.artBlockContractAddress as `0x${string}`,
    abi: ArtBlock__factory.abi,
    functionName: 'getCommunity',
    args: [id],
  })

  const { data: arts } = useContractRead({
    address: contractDetails.artBlockContractAddress as `0x${string}`,
    abi: ArtBlock__factory.abi,
    functionName: 'getProductList',
    args: [id],
  })

  console.log('arts: ', arts)

  return (
    <>
      <div className="mb-4 flex p-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold">{community?.title}</h1>
        </div>
        <div className="flex-none">
          <kbd className="kbd kbd-lg">Pending NFTs</kbd>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4">
        {arts &&
          arts.map((art, aid) => (
            <Art
              art={art}
              vote={u => {
                if (alreadyVoted.has(`${id}-${aid}`)) {
                  alert('Already voted')
                  return
                }
                setAlreadyVoted(av => new Set(new Set([...Array.from(av), `${id}-${aid}`])))
                localStorage.setItem('voted', JSON.stringify(Array.from(alreadyVoted)))
                console.log(aid, u)
                setVoteId([aid, u === 'up'])
              }}
              key={aid}
            />
          ))}
      </div>
    </>
  )
}
