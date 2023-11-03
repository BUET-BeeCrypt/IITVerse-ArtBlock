import styles from 'styles/Home.module.scss'
import contractDetails from '../info/contractDetails.json'

import ThemeToggleButton from 'components/Theme/ThemeToggleButton'
import { SetGreetings } from 'components/SetGreetings'

import ThemeToggleList from 'components/Theme/ThemeToggleList'
import { useState } from 'react'
import { useNetwork, useSwitchNetwork, useAccount, useBalance } from 'wagmi'
import ConnectWallet from 'components/Connect/ConnectWallet'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useConnectModal, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit'
import { useContractRead } from 'wagmi'
// import GreeterArtifact from '../../../artifacts/contracts/Greeter.sol/Greeter.json';
import { ABXToken__factory } from '../../typechain'
import { use } from 'chai'



export default function Home() {
  return (
    <div className='flex flex-col min-h-screen p-0'>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <div className="navbar z-50 bg-base-100 shadow-lg flex-none">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl normal-case">ArtBlock</a>
      </div>
      <div className="flex-none">
        {/* <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn btn-circle btn-ghost"></label>
          <div tabIndex={0} className="card dropdown-content card-compact z-[1] mt-3 w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div> */}
        <div className="mx-2">
          <ThemeToggleButton />
        </div>
        <div className="mx-2">
          <ConnectWallet />
        </div>

        {/* <div className="dropdown-end dropdown">
          <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
            <div className="w-10 rounded-full">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </label>
          <ul tabIndex={0} className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
    // <header className={styles.header}>
    //   <div>
    //     <ThemeToggleList />
    //   </div>
    //   <div className="flex items-center">
    //     <ThemeToggleButton /> header <ThemeToggleList />
    //   </div>

    //   <div className="flex items-center">
    //     <ThemeToggleButton />
    //     <ThemeToggleList />
    //   </div>
    // </header>
  )
}

function Main() {
  return (
    <main className='flex flex-row flex-auto'>
      <Sidebar />
      <Content />
    </main>
  )
}

function Sidebar() {
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="flex-none dark:bg-base-900 top-0 left-0 z-40 h-100 w-64 flex-shrink-0 flex-grow-0 -translate-x-full overflow-y-auto bg-base-100 text-base-content shadow-lg transition-transform dark:text-base-100 sm:translate-x-0 "
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ml-3">Dashboard</span>
            </a>
          </li>
          <li>
            <button
              type="button"
              className="group flex w-full items-center rounded-lg p-2 text-base text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 21"
              >
                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap text-left">E-commerce</span>
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <ul id="dropdown-example" className="hidden space-y-2 py-2">
              <li>
                <a
                  href="#"
                  className="group flex w-full items-center rounded-lg p-2 pl-11 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group flex w-full items-center rounded-lg p-2 pl-11 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  Billing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group flex w-full items-center rounded-lg p-2 pl-11 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  Invoice
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap">Kanban</span>
              <span className="ml-3 inline-flex items-center justify-center rounded-full bg-gray-100 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap">Inbox</span>
              <span className="ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                3
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap">Users</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap">Products</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap">Sign In</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap">Sign Up</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}

function Content() {

  const { address, isConnected, connector } = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  })

  console.log("wallet address: " + address)


  const [showAlert, setShowAlert] = useState(false)
  const [txHash, setTxHash] = useState('')
  console.log('contract Address:')

  console.log(contractDetails.adxTokenContractAddress)
  console.log('ABI:')
  console.log(ABXToken__factory.abi)
  const { data, isRefetching, refetch } = useContractRead({
    address: contractDetails.adxTokenContractAddress as `0x${string}`,
    abi: ABXToken__factory.abi,
    functionName: 'balanceOf',
    args:[address],
  })
  console.log(data)

  
  const { chain, chains } = useNetwork()
  const { isLoading: isNetworkLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
  })

  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  const { openChainModal } = useChainModal()
  return (
    <div className="flex flex-1 flex-col">
      {/* <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="mt-2 ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button> */}

      <div className="p-4 sm:ml-64">
        <div className="text-center">
          <p className="font-medium">My DAPP</p>
        </div>

        <div>
          <h4 className="text-center text-sm font-medium">demo: ConnectWalletBtn Full</h4>
          <div className="flex w-full flex-col items-center">
            <ConnectWallet />
          </div>
        </div>

        <div>
          <h4 className="text-center text-sm font-medium">demo: useModal (rainbowkit ^0.4.3)</h4>
          <div className="flex w-full flex-col items-center">
            {openConnectModal && (
              <button
                onClick={openConnectModal}
                type="button"
                className="m-1 rounded-lg bg-orange-500 px-3 py-1 text-white transition-all duration-150 hover:scale-105"
              >
                useConnectModal
              </button>
            )}

            {openAccountModal && (
              <button
                onClick={openAccountModal}
                type="button"
                className="m-1 rounded-lg bg-orange-500 px-3 py-1 text-white transition-all duration-150 hover:scale-105"
              >
                useAccountModal
              </button>
            )}

            {openChainModal && (
              <button
                onClick={openChainModal}
                type="button"
                className="m-1 rounded-lg bg-orange-500 px-3 py-1 text-white transition-all duration-150 hover:scale-105"
              >
                useChainModal
              </button>
            )}
          </div>
        </div>

        <div className="w-full max-w-xl rounded-xl bg-sky-500/10 p-6 text-center">
          <dl className={styles.dl}>
            <dt>Connector</dt>
            <dd>
              {connector?.name}
              {!address && (
                <ConnectButton.Custom>
                  {({ openConnectModal }) => (
                    <span onClick={openConnectModal} className="cursor-pointer hover:underline">
                      Not connected, connect wallet
                    </span>
                  )}
                </ConnectButton.Custom>
              )}
            </dd>
            <dt>Connected Network</dt>
            <dd>{chain ? `${chain?.id}: ${chain?.name}` : 'n/a'}</dd>
            <dt>Switch Network</dt>
            <dd className="flex flex-wrap justify-center">
              {isConnected &&
                chains.map(x => (
                  <button
                    disabled={!switchNetwork || x.id === chain?.id}
                    key={x.id}
                    onClick={() => switchNetwork?.(x.id)}
                    className={
                      (x.id === chain?.id ? 'bg-green-500' : 'bg-blue-500 hover:scale-105') +
                      ' m-1 rounded-lg px-3 py-1 text-white transition-all duration-150'
                    }
                  >
                    {x.name}
                    {isNetworkLoading && pendingChainId === x.id && ' (switching)'}
                  </button>
                ))}
              <ConnectWallet show="disconnected" />
            </dd>
            <dt>Account</dt>
            <dd className="break-all">{address ? `${address}` : 'n/a'}</dd>
            <dt>Balance</dt>
            <dd className="break-all">
              {isBalanceLoading ? 'loading' : balance ? `${balance?.formatted} ${balance?.symbol}` : 'n/a'}
            </dd>
          </dl>
        </div>
        {showAlert ? (
          <div className={'relative sticky top-0 z-50 mb-4 rounded border-0 bg-teal-500 px-6 py-4 text-white'}>
            <span className="mr-5 inline-block align-middle text-xl">
              <i className="fas fa-bell" />
            </span>
            <span className="mr-8 inline-block align-middle">
              <b className="capitalize">Transaction succeded!</b> View on etherscan:
              <a href={'https://rinkeby.etherscan.io/tx/' + txHash} target="_blank" className="italic underline">
                {' '}
                Etherscan Link
              </a>
            </span>
            <button
              className="absolute right-0 top-0 mr-6 mt-4 bg-transparent text-2xl font-semibold leading-none outline-none focus:outline-none"
              onClick={() => setShowAlert(false)}
            >
              <span>×</span>
            </button>
          </div>
        ) : null}
        {address && (
          <div className="flex min-h-screen w-100 items-center justify-center bg-gradient-to-br from-teal-100 via-teal-300 to-teal-500">
            <div className="relative flex flex-col items-center justify-center">
              <div
                id="partnerCard"
                className="max-w-m flex min-h-[500px] flex-col overflow-hidden rounded-md bg-[#1c1c1c] p-2 text-gray-50"
              >
                <div>
                  <h3 className="pb-4 pl-8 pt-2 text-left text-xl">Greeting App</h3>
                </div>

                <div className="flex min-h-[200px] items-center justify-center bg-[#2a2a2a]">
                  <img
                    src="https://media.istockphoto.com/photos/hand-is-turning-a-dice-and-changes-the-word-meet-to-greet-picture-id1084115310?k=20&m=1084115310&s=612x612&w=0&h=TwrnLk7i0jdfixAxbJdd8_LF9ZOnkvM-1DGn-_VELHA="
                    alt="EasyCode"
                    className="w-100 object-cover"
                  />
                </div>
                <div className="grid grid-cols-6">
                  <div className="col-span-4 p-4 pr-0 text-lg">
                    <h4 className="font-bold">Current ArtBlock Tokens:</h4>

                    <div>
                      <p>{data?.toString()}</p>
                      <button
                        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                        disabled={isRefetching}
                        onClick={() => refetch()}
                        style={{ marginLeft: 4 }}
                      >
                        {isRefetching ? 'loading...' : 'refetch'}
                      </button>
                    </div>
                  </div>
                </div>
                <SetGreetings />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="flex-none footer footer-center bg-base-300 p-4 text-base-content">
      <aside>
        <p>Copyright © 2023 - All right reserved by BUET BeeCrypt</p>
      </aside>
    </footer>
  )
}
