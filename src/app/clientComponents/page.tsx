'use client'

import { useEffect, useState } from 'react'

export default function ClientComponents() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('count', count)
  }, [count])

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  )
}
