import Link from "next/link"
import { useRouter } from "next/router"

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const community = {
    id: '1',
    title: 'ArtBlock',
    description: 'ArtBlock is a community of artists and developers pushing the boundaries of generative art.',
  }

  return (
    <>
      <div className="flex p-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold">{community.title}</h1>
        </div>
        <div className="flex-none">
          <Link href={`/community/${router.query.id}/ctk`}>
            <button className="btn btn-ghost">Create Token</button>
          </Link>
        </div>
      </div>
      <div className="flex flex-auto flex-row">
        <div className="h-100 w-full p-4">{children}</div>
      </div>
    </>
  )
}
