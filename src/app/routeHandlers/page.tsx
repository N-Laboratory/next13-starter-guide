'use client'

import axios, { AxiosResponse } from 'axios'
import useSWR from 'swr'
import Loading from '../loading'
import { useState } from 'react'

type TestResponse = {
  userId: string
  id: string
  title: string
  body: string
}

type TestRequest = {
  url: string
  postId: string
}

const fetcher = async (request: TestRequest) =>
  await axios
    .post(request.url, { postId: request.postId })
    .then((res: AxiosResponse<TestResponse>) => res.data)

export default function RouteHandlers() {
  const [postId, setPostId] = useState('1')

  const { data, error, isLoading } = useSWR<TestResponse, Error>(
    ['/api/routeHandlers', postId],
    ([url, postId]: [url: string, postId: string]) => fetcher({ url, postId }),
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const targetElement = e.currentTarget?.postId as HTMLInputElement
    if (targetElement) {
      setPostId(targetElement.value)
    }
  }

  if (error) {
    return <div>Failed to load</div>
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <div className='flex flex-col w-full items-center pt-5 pl-5'>
        <form className='mb-3 flex w-full max-w-md gap-2' onSubmit={handleSubmit}>
          <input
            name='postId'
            type='number'
            required
            placeholder='enter postId'
            className='border-black w-full flex-1 rounded border bg-gray-50 px-3 py-2 text-gray-800'
          />
          <button className='inline-block rounded bg-indigo-500 px-8 py-2 text-center text-sm'>
            search
          </button>
        </form>
      </div>
      <div className='mx-auto max-w-screen-md px-4 md:px-8'>
        {data && Object.keys(data).length !== 0 ? (
          <div>
            <div key={data.id} className='flex flex-col rounded-lg border p-4 md:p-6'>
              <h3>{data.title}</h3>
              <p title={data.body}>{data.body}</p>
            </div>
          </div>
        ) : (
          <h2>Not found</h2>
        )}
      </div>
    </div>
  )
}
