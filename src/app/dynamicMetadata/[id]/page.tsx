import { Metadata } from 'next'

type Props = {
  params: { id: string }
}

type TestResponse = {
  title: string
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id
  const item = (await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res) =>
    res.json(),
  )) as TestResponse

  return {
    title: item.title,
  }
}

export default function DynamicMetadata({ params }: Props) {
  return (
    <>
      <h1>Dynamic Metadata</h1>
      <p>Id is {params.id}</p>
    </>
  )
}
