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
                <span className="ml-3">Dashboard</span>
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
                <span className="ml-3">Communities</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}
