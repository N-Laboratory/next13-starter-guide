export default async function ErrorHandling() {
  const response = await fetch('https://jsonplaceholder.typicode.com/user')
  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  return (
    <>
      <h1>Error Handling</h1>
    </>
  )
}
