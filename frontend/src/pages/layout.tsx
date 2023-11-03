import ConnectWallet from 'components/Connect/ConnectWallet'
import ThemeToggleButton from 'components/Theme/ThemeToggleButton'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col p-0">
      <Header />
      <main className="flex flex-auto flex-row">
        <Sidebar />
        <div className="h-100 w-full p-4">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <div className="navbar z-50 flex-none bg-base-100 shadow-lg">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl normal-case">ArtBlock</a>
      </div>
      <div className="flex-none">
        <div className="mx-2">
          <ThemeToggleButton />
        </div>
        <div className="mx-2">
          <ConnectWallet />
        </div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer footer-center flex-none bg-base-300 p-4 text-base-content">
      <aside>
        <p>Copyright © 2023 - All right reserved by BUET BeeCrypt</p>
      </aside>
    </footer>
  )
}

function Sidebar() {
  const router = useRouter()
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="dark:bg-base-900 h-100 top-0 left-0 z-40 w-64 flex-none flex-shrink-0 flex-grow-0 -translate-x-full overflow-y-auto bg-base-100 text-base-content shadow-lg transition-transform dark:text-base-100 sm:translate-x-0 "
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link href="/">
              <a
                className={
                  'className="group dark:hover:bg-gray-700" flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white hover:dark:bg-gray-700' +
                  (router.pathname === '/' ? ' bg-gray-100 dark:bg-gray-700' : '')
                }
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
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                <span className="ml-3">Dashboard</span>

                <span className="ml-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-sm font-medium text-gray-900 dark:bg-gray-900 dark:text-gray-300">
                  NFTs
                </span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/abx">
              <a
                className={
                  'className="group dark:hover:bg-gray-700" flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white hover:dark:bg-gray-700' +
                  (router.pathname.startsWith('/abx') ? ' bg-gray-100 dark:bg-gray-700' : '')
                }
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
                    d="M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 005.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="ml-3">ABX Marketplace</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/add-community">
              <a
                className={
                  'className="group dark:hover:bg-gray-700" flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white hover:dark:bg-gray-700' +
                  (router.pathname.startsWith('/add-community') ? ' bg-gray-100 dark:bg-gray-700' : '')
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

                <span className="ml-3"> Add Community</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/community">
              <a
                className={
                  'className="group dark:hover:bg-gray-700" flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white hover:dark:bg-gray-700' +
                  (router.pathname.startsWith('/community') ? ' bg-gray-100 dark:bg-gray-700' : '')
                }
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
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>

                <span className="ml-3">Communities</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}
