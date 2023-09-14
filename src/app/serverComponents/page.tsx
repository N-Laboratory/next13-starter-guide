import { notFound } from 'next/navigation'

type TestResponse = {
  userId: string
  id: string
  title: string
  body: string
}

export default async function ServerComponents() {
  const posts = (await fetch(`https://jsonplaceholder.typicode.com/posts`).then((res) =>
    res.json(),
  )) as TestResponse[]
  if (!posts || posts.length == 0) {
    notFound()
  }

  return (
    <div className='mx-auto max-w-screen-md px-4 md:px-8'>
      <h2>Post List</h2>
      {posts.map((post) => (
        <div key={post.id} className='flex flex-col rounded-lg border p-4 md:p-6'>
          <h3>{post.title}</h3>
          <p title={post.body}>{post.body}</p>
        </div>
      ))}
    </div>
  )
}
