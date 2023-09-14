import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'some title',
  description: 'some description',
}

export default function StaticMetadata() {
  return (
    <>
      <h1>Static Metadata</h1>
    </>
  )
}
