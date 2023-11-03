import axios from 'axios'
import { useRouter } from 'next/router'
import { useContractRead } from 'wagmi'
import contractDetails from '../../../../info/contractDetails.json'
import { ArtBlock__factory } from '../../../../../typechain'
import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'

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
  const CID = `${resFile.data.IpfsHash}`
  console.log('CID: ' + CID)
  return CID
}

export default function () {
  const router = useRouter()

  const [art, setArt] = useState<{
    title: string
    description: string
    price: number
    isExclusive: boolean
    file: File | null
  }>({
    title: '',
    description: '',
    price: 0,
    isExclusive: false,
    file: null,
  })

  const [loading, setLoading] = useState(false)

  console.log('router.query.id: ' + router.query.id)
  console.log(router)
  const id = (router.query.id && BigInt(router.query.id as string)) || BigInt(0)

  const { data: community } = useContractRead({
    address: contractDetails.artBlockContractAddress as `0x${string}`,
    abi: ArtBlock__factory.abi,
    functionName: 'getCommunity',
    args: [id],
  })

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-between">
      <div className="flex w-full p-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold">{community?.title}</h1>
        </div>
        <div className="flex-none">
          <kbd className="kbd kbd-lg">Upload Art</kbd>
        </div>
      </div>

      <div className="mb-4 flex flex-col items-center justify-center">
        <div className="card w-[32rem] bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-accent">Art Details and File</h2>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full"
                value={art.title}
                onChange={e => {
                  setArt(art => ({ ...art, title: e.target.value }))
                }}
              />

              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Tell us more about your art"
                value={art.description}
                onChange={e => {
                  setArt(art => ({ ...art, description: e.target.value }))
                }}
              ></textarea>

              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
                value={art.price}
                onChange={e => {
                  setArt(art => ({ ...art, price: parseInt(e.target.value) }))
                }}
              />

              <label className="label">
                <span className="label-text">File</span>
              </label>
              <FileUploader
                classes="w-100"
                label="Upload or drop your document here"
                handleChange={(file: File) => {
                  setArt(art => ({ ...art, file }))
                }}
                multiple={false}
                maxFileSize={10000000}
                name="file"
              />

              <label className="label">
                <span className="label-text">Is Exclusive?</span>
              </label>
              <input
                type="checkbox"
                className="checkbox-accent checkbox"
                checked={art.isExclusive}
                onChange={e => {
                  setArt(art => ({ ...art, isExclusive: e.target.checked }))
                }}
              />
            </div>
            <div className="card-actions mt-4 justify-end">
              <button
                className={'btn btn-accent btn-outline '}
                disabled={loading}
                onClick={e => {
                  e.preventDefault()
                  console.log(art)
                  if (!loading && art.file) {
                    setLoading(true)
                    uploadToIPFS(art.file as File).then(CID => {
                      console.log('https://gateway.pinata.cloud/ipfs/' + CID)
                      setLoading(false)
                    })
                  }
                  // write()
                }}
              >
                Create New
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
