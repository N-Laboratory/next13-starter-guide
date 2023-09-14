import { notFound } from 'next/navigation'

type TestResponse = {
  title: string
}

export default async function NotFound() {
  const item = (await fetch('https://jsonplaceholder.typicode.com/posts/999').then((res) =>
    res.json(),
  )) as TestResponse

  if (!item || Object.keys(item).length === 0) {
    notFound()
  }

  return (
    <div>
      <h2>Not Found</h2>
    </div>
  )
}
