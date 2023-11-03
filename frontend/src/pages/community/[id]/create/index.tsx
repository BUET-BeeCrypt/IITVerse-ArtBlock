import axios from 'axios'
import { useRouter } from 'next/router'

async function uploadToIPFS(file: File) {
  const data = new FormData()
  data.append('file', file)
  const resFile = await axios({
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
    data: data,
    headers: {
      'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY,
      'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
      'Content-Type': 'multipart/form-data',
    },
  })
}

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
