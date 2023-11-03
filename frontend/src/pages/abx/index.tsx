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
import { ABXToken__factory } from '../../../typechain'

export default function Content() {
  const { address, isConnected, connector } = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  })

  const [currentValue, setCurrentValue] = useState('')

  console.log('wallet address: ' + address)

  const [showAlert, setShowAlert] = useState(false)
  const [txHash, setTxHash] = useState('')
  console.log('contract Address:')

  console.log(contractDetails.adxTokenContractAddress)
  console.log('ABI:')
  console.log(ABXToken__factory.abi)
  const {
    data: myBalance,
    isRefetching,
    refetch,
  } = useContractRead({
    address: contractDetails.adxTokenContractAddress as `0x${string}`,
    abi: ABXToken__factory.abi,
    functionName: 'balanceOf',
    args: [address],
  })
  console.log(myBalance)

  const { chain, chains } = useNetwork()
  const { isLoading: isNetworkLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
  })

  const { config } = usePrepareContractWrite({
    address: contractDetails.adxTokenContractAddress as `0x${string}`,
    abi: ABXToken__factory.abi,
    functionName: 'buyTokens',
    args: [Number.parseInt(currentValue)],
    value: Number.parseInt(currentValue) * 2,
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
        <span>Current ArtBlock Tokens: {myBalance ? myBalance.toString() : 'Loading...'}</span>
      </div>

      <div className="mb-4 flex flex-col items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Buy ABX</h2>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">How much you want to trade?</span>
              </label>
              <input
                type="number"
                placeholder="Amount in Ether"
                className="input input-bordered w-full max-w-xs"
                value={currentValue}
                onChange={e => {
                  setCurrentValue(e.target.value)
                }}
              />
            </div>
            <div className="card-actions justify-end">
              <button
                className={'btn btn-accent' + (isLoading || isPending ? 'loading-spinner' : '')}
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
      <div className="alert mb-4">
        <span>Wallet address: {address}</span> <br />
        {isSuccess && (
          <span>
            Transaction Hash: {data?.hash} <br />
            Transaction Link:{' '}
            <a target="_blank" href={'https://sepolia.etherscan.io/tx/' + data?.hash}>
              Link
            </a>
          </span>
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
