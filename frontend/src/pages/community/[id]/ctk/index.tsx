import { useRouter } from 'next/router'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import contractDetails from '../../../../info/contractDetails.json'
import { ArtBlock__factory } from '../../../../../typechain'
import { useState } from 'react'

export default function () {
  const router = useRouter()

  const { address, isConnected, connector } = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  })

  const id = (router.query.id && BigInt(router.query.id as string)) || BigInt(0)
  const [currentValue, setCurrentValue] = useState('')

  const { data: community }: any = useContractRead({
    address: contractDetails.artBlockContractAddress as `0x${string}`,
    abi: ArtBlock__factory.abi,
    functionName: 'getCommunity',
    args: [id],
  })

  const {
    data: myBalance,
    isRefetching,
    refetch,
  } = useContractRead({
    address: contractDetails.artBlockContractAddress as `0x${string}`,
    abi: ArtBlock__factory.abi,
    functionName: 'getCommunityToken',
    args: [id, address],
  })

  const {
    data: reserveBalance,
    isRefetching: reserveIsRefetching,
    refetch: reserveRefetch,
  } = useContractRead({
    address: contractDetails.artBlockContractAddress as `0x${string}`,
    abi: ArtBlock__factory.abi,
    functionName: 'getCommunityToken',
    args: [id, community?.ctk],
  })

  const { config } = usePrepareContractWrite({
    address: contractDetails.artBlockContractAddress as `0x${string}`,
    abi: ArtBlock__factory.abi,
    functionName: 'buyCommunityToken',
    args: [id, Number.parseInt(currentValue)],
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)
  const { data: receipt, isLoading: isPending } = useWaitForTransaction({ hash: data?.hash })

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-between">
      <div className="flex w-full p-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold">{community?.title}</h1>
        </div>
        <div className="flex-none">
          <kbd className="kbd kbd-lg">Community Token Exchange</kbd>
        </div>
      </div>

      <div className="mb-4 flex flex-col items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Buy Community Token</h2>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">How much you want to trade?</span>
              </label>
              <input
                type="number"
                placeholder="Amount in ABX wei"
                className="input input-bordered w-full max-w-xs"
                value={currentValue}
                onChange={e => {
                  setCurrentValue(e.target.value)
                }}
              />
            </div>
            <div className="card-actions mt-4 justify-end">
              <button
                className={'btn btn-accent btn-outline' + (isLoading || isPending ? 'loading-spinner' : '')}
                disabled={isLoading || isPending}
                onClick={e => {
                  e.preventDefault()
                  write()
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="alert mb-4 border-gray-600 text-center dark:border-gray-400">
        1 ABX = 10^18 ABX wei |
        {address
          ? ` Your Balance: ${myBalance || myBalance !== undefined ? myBalance.toString() : 'Loading...'}`
          : ` Connect Wallet to see your balance`}{' '}
        {` | `}
        Reserve Balance: {reserveBalance || reserveBalance !== undefined
          ? reserveBalance.toString()
          : 'Loading...'}{' '}
        <br />
        {data && isSuccess && (
          <span>
            Transaction Hash: {data?.hash} <br />
            Transaction Link:{' '}
            <a target="_blank" href={'https://sepolia.etherscan.io/tx/' + data?.hash}>
              {'https://sepolia.etherscan.io/tx/' + data?.hash}
            </a>
          </span>
        )}
      </div>
    </div>
  )
}
