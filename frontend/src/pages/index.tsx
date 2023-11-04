import { useRef } from 'react'

function Art({ art, sell }: { art: any; sell: (id: number, amount: number) => void }) {
  const priceRef = useRef<HTMLInputElement>(null)
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure className="h-100 ml-5">
        {art.isExclusive ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-16 w-16 text-orange-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-16 w-16 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {art.title} <span className="text-accent">{art.isExclusive && 'Exclusive'}</span>
        </h2>
        <p>{art.description}</p>
        <div className="card-actions flex items-center justify-between">
          <p className="text-left font-bold text-error">{art.price} CTK</p>
          <a href={`https://gateway.pinata.cloud/ipfs/${art.hash}`} target="_blank" className="btn btn-primary">
            Preview
          </a>
          {!art.isExclusive && (
            <div className="join">
              <input className="input join-item input-bordered" placeholder="Price" ref={priceRef} type="number" />
              <button
                className="btn btn-accent join-item"
                onClick={e => {
                  e.preventDefault()
                  sell(art.id, Number(priceRef.current?.value || '0'))
                }}
              >
                Sell
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Content() {
  const arts = [
    {
      id: 1,
      title: 'Art Title',
      description: 'Art Description',
      price: 10,
      isExclusive: false,
      hash: '0x1234567890',
    },
  ]
  return (
    <>
      <div className="mb-4 flex p-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold">My NFTs</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4">
        {arts.map((art, id) => (
          <Art
            art={art}
            sell={(id, price) => {
              console.log(id, price)
            }}
            key={id}
          />
        ))}
      </div>
    </>
  )
}
