export default async function Loading() {
  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))
  await sleep(5000)

  return <>Check loading indicator.</>
}
