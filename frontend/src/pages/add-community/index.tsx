import contractDetails from '../../info/contractDetails.json'
import { useState } from 'react'
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
import { ABXToken__factory, ArtBlock__factory } from '../../../typechain'

export default function AddCommunity() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const { address, isConnected, connector } = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  })
  console.log('wallet address: ' + address)

  const [showAlert, setShowAlert] = useState(false)
  const [txHash, setTxHash] = useState('')
  console.log('contract Address:')

  console.log(contractDetails.artBlockContractAddress)
  console.log('ABI:')
  console.log(ArtBlock__factory.abi)

  const {
    data: myBalance,
    isRefetching,
    refetch,
  } = useContractRead({
    address: contractDetails.abxTokenContractAddress as `0x${string}`,
    abi: ABXToken__factory.abi,
    functionName: 'balanceOf',
    args: [address],
  })
  console.log(myBalance)

  const { config } = usePrepareContractWrite({
    address: contractDetails.artBlockContractAddress as `0x${string}`,
    abi: ArtBlock__factory.abi,
    functionName: 'createCommunity',
    args: [title, description],
  })

  const { data, isLoading, isSuccess, write } = useContractWrite(config)
  const { data: receipt, isLoading: isPending } = useWaitForTransaction({ hash: data?.hash })

  return address ? (
    <div className="flex h-full flex-1 flex-col items-center justify-between">
      <div className="success alert mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 005.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>
          Current ArtBlock Tokens: {myBalance || myBalance !== undefined ? myBalance.toString() : 'Loading...'}
        </span>
      </div>

      <div className="mb-4 flex flex-col items-center justify-center">
        <div className="card w-[32rem] bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-accent">Add New Community</h2>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Community Title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full"
                value={title}
                onChange={e => {
                  setTitle(e.target.value)
                }}
              />

              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Tell us more about the community"
                value={description}
                onChange={e => {
                  setDescription(e.target.value)
                }}
              ></textarea>
            </div>
            <div className="card-actions mt-4 justify-end">
              <button
                className={'btn btn-accent btn-outline' + (false ? 'loading-spinner' : '')}
                disabled={false}
                onClick={e => {
                  e.preventDefault()
                  write()
                }}
              >
                Create New
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="alert mb-4 border-gray-600 dark:border-gray-400">
        {isSuccess ? (
          <span>
            Transaction Hash: {data?.hash} <br />
            Transaction Link:{' '}
            <a target="_blank" href={'https://sepolia.etherscan.io/tx/' + data?.hash}>
              {'https://sepolia.etherscan.io/tx/' + data?.hash}
            </a>
          </span>
        ) : (
          `You will be charged 2 ABX for creating a community.`
        )}
      </div>
    </div>
  ) : (
    <div className="alert alert-warning">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="h-6 w-6 shrink-0 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>Connect to a wallet to see your balance.</span>
    </div>
  )
}
