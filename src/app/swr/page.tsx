'use client'

import axios, { AxiosResponse } from 'axios'
import useSWR from 'swr'
import Loading from '../loading'

type TestResponse = {
  userId: string
  id: string
  title: string
  body: string
}

const fetcher = async (url: string) =>
  await axios.get(url).then((res: AxiosResponse<TestResponse[]>) => res.data)

export default function Swr() {
  const { data, error, isLoading } = useSWR<TestResponse[], Error>(
    'https://jsonplaceholder.typicode.com/posts',
    fetcher,
  )

  if (error) {
    return <div>Failed to load</div>
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='mx-auto max-w-screen-md px-4 md:px-8'>
      {data && data.length ? (
        <div>
          {data.map((post) => (
            <div key={post.id} className='flex flex-col rounded-lg border p-4 md:p-6'>
              <h3>{post.title}</h3>
              <p title={post.body}>{post.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <h2>Not found</h2>
      )}
    </div>
  )
}
