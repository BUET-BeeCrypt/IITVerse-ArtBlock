import { useRouter } from 'next/router'

export default function () {
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
          <kbd className="kbd kbd-lg">Upload Art</kbd>
        </div>
      </div>
    </>
  )
}
