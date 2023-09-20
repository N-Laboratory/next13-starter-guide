<h1 align="center">Next 13 Starter Guide</h1>
<p align="center">
  <img src="https://img.shields.io/badge/-Typescript-00bfff.svg?logo=typescript&style=flat">
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=flat">
  <img src="https://img.shields.io/badge/-Node.js-lightyellow.svg?logo=node.js&style=flat">
  <img src="https://img.shields.io/badge/-ESLint-4B32C3.svg?logo=eslint&style=flat">
  <img src="https://img.shields.io/badge/-Vitest-FF8800.svg?logo=vitest&style=flat">
  <img src="https://img.shields.io/badge/-Puppeteer-lightyellow.svg?logo=puppeteer&style=flat">
  <img src="https://img.shields.io/badge/-SonarQube-white.svg?logo=sonarqube&style=flat">
  <img src="https://img.shields.io/badge/-Windows-0078D6.svg?logo=windows&style=flat">
  <img src="https://img.shields.io/badge/-Mac-grey.svg?logo=macos&style=flat">
  <img src="https://img.shields.io/badge/-Linux-black.svg?logo=linux&style=flat">
  <img src="https://img.shields.io/badge/-VSCode-007ACC.svg?logo=visualstudiocode&style=flat">
  <a href="https://twitter.com/NL4boratory" target="_blank">
    <img alt="Twitter: N-LAB" src="https://img.shields.io/twitter/follow/NL4boratory.svg?style=social" />
  </a>
  <a href="https://github.com/N-Laboratory" target="_blank">
    <img src="https://img.shields.io/badge/-FollowMyAccount-grey.svg?logo=github&style=flat">
  </a>
</p>

[日本語版 README はこちら](https://github.com/N-Laboratory/next13-starter-guide/blob/main/README-jp.md)

This project is a template Next 13 project. It use Next 13.4 version.

The minimum required functions are implemented as a template project and the essentials are explained.
This project also implement unit testing, End-to-End testing, and analyzing source code by SonarQube.

## Contents

1. [Create New Project](#create-new-project)
1. [Prettier Setup](#prettier-setup)
1. [EsLint Setup](#eslint-setup)
1. [Default Layout](#default-layout)
1. [Metadata API](#metadata-api)
1. [Error Handling](#error-handling)
1. [Loading page](#loading-page)
1. [Not Found Page](#not-found-page)
1. [Server Components](#server-components)
1. [Client Components](#client-components)
1. [Route Handlers](#route-handlers)
1. [Unit Testing with Vitest](#unit-testing-with-vitest)
1. [End to End Testing with Puppeteer](#end-to-end-testing-with-puppeteer)
1. [Analyzing source code by SonarQube](#analyzing-source-code-by-sonarqube)

## Create [New Project](https://nextjs.org/docs/getting-started/installation)
Run below command to create a new next 13 project.

```bash
npx create-next-app@latest
```

On installation, you'll see the following prompts:

```bash
Need to install the following packages:
  create-next-app@13.4.19
Ok to proceed? (y) y
√ What is your project named? ... next13-starter-guide
√ Would you like to use TypeScript? ... No / Yes
√ Would you like to use ESLint? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like to use `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to customize the default import alias? ... No / Yes
```

After the prompts, create-next-app will create a folder with your project name and install the required dependencies.

### Usage
```bash
npm run dev
```

You can access http://localhost:3000 to use this application.

### Change [source directory](https://nextjs.org/docs/app/building-your-application/configuring/src-directory)
To use the src directory, move the app Router folder or pages Router folder to src/app or src/pages respectively.
If you're using Tailwind CSS, you'll need to add the /src prefix to the tailwind.config.ts file in the content section like below.

```ts
// tailwind.config.ts
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
}
export default config
```

### Enable [app router](https://nextjs.org/docs/app)
If you enable app router, add the following to next.config.js.

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // add
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
```

※If you are using Next 13.4 or later, there is no need to add it.

## [Prettier](https://prettier.io/) Setup
Run below command to install prettier.

```bash
npm install --save-dev prettier eslint-config-prettier
```

※Use eslint-config-prettier to make Prettier and ESLint play nice together.

### Create [configuration file](https://prettier.io/docs/en/configuration)
Create a .prettierrc file in the root of your project.
Prettier uses cosmiconfig for configuration file support. This means you can configure Prettier via .prettierrc.

```json
{
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "printWidth": 100
}
```

### Ignoring Code
To exclude files from formatting, create a .prettierignore file in the root of your project.

```bash
# Ignore artifacts:
build
coverage

# Ignore all HTML files:
**/*.html
```

### Edit eslint configuration file
Add prettier to .eslintrc.json in the extends section.

```json
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```

### Edit package.json
Add the following to package.json in the scripts section.
You can use the prettier command to run Prettier from the command line.
For details https://prettier.io/docs/en/cli

```json
{
  "scripts": {
    "format": "prettier . --write",
    "format-file-patterns": "prettier \"./src/**/*.{js,jsx,ts,tsx,json,css}\" --write",
    "format-ignore-path": "prettier . --write --ignore-path {any file}"
  }
}
```

## [ESLint](https://typescript-eslint.io/) Setup
ESLint do not show Typescript errors by default like below.
```ts
// foo.ts
const foo = '123'
x = 123
/*
$ npm run lint
> next lint
✔ No ESLint warnings or errors
*/
```


### Install [plugins](https://main--typescript-eslint.netlify.app/getting-started)
Install plugins to run ESLint with recommended rules on your TypeScript code.
```bash
npm install --save-dev  @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Edit eslint configuration file
Add the follwing to .eslintrc.json.

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "next/core-web-vitals",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions":  {
    "project": "./tsconfig.json"
  }
}
```

## Default Layout
A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not re-render.You can define a layout by default exporting a React component from a layout.tsx file in app directory like below.
```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
```

## [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
Metadata API (Next 13.2 or later) allows you to define metadata (e.g. meta and link tags inside your HTML head element) for improved SEO and web shareability.It only supported in Server Components.

### Static Metadata
To define static metadata, export a Metadata object from a layout.tsx or page.tsx file.
```tsx
// layout.tsx / page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  // For more supported options
  // https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
  title: 'some title',
  description: 'some description',
}

export default function Page() {}
```

### Dynamic Metadata
You can use generateMetadata function to fetch metadata that requires dynamic values (e.g. current route parameters, external data).
```tsx
// page.tsx
import { Metadata } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
): Promise<Metadata> {
  // If file path is app/products/[id]/page.tsx, you can get id from params.id
  const id = params.id

  // get search param
  const keyword = searchParams.get('keyword')

  // fetch data
  const item = await fetch(`https://.../${id}`).then((res) => res.json())

  return {
    title: item.title,
    description: item.description,
  }
}
export default function Page({ params, searchParams }: Props) {}
```

## [Error Handling](https://nextjs.org/docs/app/api-reference/file-conventions/error)
You can catch unexpected errors using error.tsx like below.
```tsx
// app/foo/error.tsx
'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({error, reset}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <!-- Attempt to recover by trying to re-render the segment -->
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

```tsx
// app/foo/page.tsx
export default async function ErrorHandling() {
  const response = await fetch('https://jsonplaceholder.typicode.com/user')
  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  return (
    <div>
      <h1>Error Handling</h1>
    </div>
  )
}
```
## [Loading Page](https://nextjs.org/docs/app/api-reference/file-conventions/loading)
To show loading indicator before page rendering, use app/loading.tsx.
```tsx
// app/loading.tsx.
export default function Loading() {
  return (
    <div>
      Loading...
    </div>
  )
}
```
```tsx
// app/loading/page.tsx.
export default function Loading() {
  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
  await sleep(5000);

  return (
    <div>
      Check loading indicator.
    </div>
  )
}
```

## [Not Found Page](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
The notFound function allows you to render the not-found file within a route segment as well as inject a tag.
```tsx
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <Link href="/">Return Home</Link>
    </div>
  )
}
```
```tsx
// app/notFound/page.tsx.
import { notFound } from 'next/navigation'

export default async function NotFound() {
  const item = await fetch('https://jsonplaceholder.typicode.com/posts/999').then((res) => res.json())
  if (!item || Object.keys(item).length === 0) {
    // go to app/not-found.tsx
    notFound()
  }

  return (
    <div>
      <h2>Not Found</h2>
    </div>
  )
}
```

## [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
React Server Components allow you to write UI that can be rendered and optionally cached on the server.With Server Components, we're laying the foundations to build complex interfaces while reducing the amount of JavaScript sent to the client, enabling faster initial page loads.

Server Components features:
1. Rendering on the server (Javascript is not sent to the client)
1. Fetch data (async/await is available)
1. Access backend resources (directly)
1. Keep sensitive information on the server (access tokens, API keys, etc)
1. Keep large dependencies on the server / Reduce client-side JavaScript
1. Browser-only APIs, Event listeners (onClick(), onChange(), etc), Lifecycle Effects (useState(), useReducer(), useEffect(), etc) is not available
```tsx
// app/serverComponents/page.tsx.
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
  if (posts.length == 0) {
    notFound()
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p title={post.body}>{post.body}</p>
        </div>
      ))}
    </div>
  )
}
```

## [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
Client Components allows you to write interactive UI that can be rendered on the client at request time. To use Client Components, you can add the React "use client" directive at the top of a file, above your imports.

Client Components features:
1. Rendering on the client (Javascript is executed in the browser)
1. Fetch data (use useState・useEffect・SWR・React-query insted of async/await)
1. Add interactivity and event listeners (onClick(), onChange(), etc)
1. Use State and Lifecycle Effects (useState(), useReducer(), useEffect(), etc)
1. Use browser-only APIs
1. Use custom hooks that depend on state, effects, or browser-only APIs
1. Use React Class components
```tsx
// app/clientComponents/page.tsx.
'use client'

import { useEffect, useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('count', count)
  }, [count])

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Click</button>
    </div>
  )
}
```
### Client-side data fetching with SWR
Next.js has created a React hook library for data fetching called SWR. It is highly recommended if you are fetching data on the client-side. It handles caching, revalidation, focus tracking, refetching on intervals, and more.
```tsx
// app/swr/page.tsx.
'use client'

import axios, { AxiosResponse } from 'axios'
import useSWR from 'swr'

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
    return <div>Loading...</div>
  }

  return (
    <div>
      {data && data.length ? (
        <div>
          {data.map((post) => (
            <div key={post.id}>
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
```


## [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
If you need to fetch data in a client component, you can call a Route Handler from the client. Route Handlers execute on the server and return the data to the client. This is useful when you don't want to expose sensitive information to the client, such as API tokens. Route Handlers are only available inside the app directory. They are the equivalent of API Routes inside the pages directory meaning you do not need to use API Routes and Route Handlers together.
```
app
├── routeHandlers
│     └── page.tsx ← execute on the client
└── api
     └── routeHandlers
          └── route.ts ← execute on the server
```
```tsx
// app/routeHandlers/page.tsx
'use client'

import axios, { AxiosResponse } from 'axios'
import useSWR from 'swr'
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
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input name='postId' type='number' required placeholder='enter postId' />
          <button>search</button>
        </form>
      </div>
      <div>
        {data && Object.keys(data).length !== 0 ? (
          <div>
            <div key={data.id}>
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
```
```ts
// app/api/routeHandlers/route.ts
import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const userSchema = z.object({
  postId: z.string(),
})

type TestResponse = {
  userId: string
  id: string
  title: string
  body: string
}

type RouteHandlerRequest = {
  postId: string
}

export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as RouteHandlerRequest
    const result = userSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({}, { status: 400 })
    }

    const postId = result.data.postId.trim()
    const post = (await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then((res) =>
      res.json(),
    )) as TestResponse
    if (!post || Object.keys(post).length === 0) {
      return NextResponse.json({}, { status: 500 })
    }

    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    return NextResponse.json({}, { status: 500 })
  }
}
```

## Unit Testing with [Vitest](https://vitest.dev/)
### Vitest Setup

```bash
npm install --save-dev vitest @testing-library/react happy-dom @vitejs/plugin-react
```

### Collect coverage
```bash
npm install --save-dev @vitest/coverage-v8
```
Create vitest.config.ts in the root directory and add the following to vitest.config.ts.
```ts
// vitest.config.ts
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/unit-test/setup.ts',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{tsx,js,ts}'],
      all: true,
      reporter: ['html', 'clover', 'text']
    },
    root: '.',
    reporters: ['verbose'],
    outputFile: 'test-report.xml'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src'),
    },
  },
})
```
Add the following to package.json in the scripts section.
```json
{
  "scripts": {
    "test": "vitest --coverage",
  }
}
```

### Client-Components unit testing
```tsx
// clientComponets/page.tsx
'use client'

import { useState } from 'react'

export default function ClientComponents() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  )
}

```
```tsx
// unit-test/clientComponets/page.test.tsx
import { render, fireEvent } from '@testing-library/react'
import { expect, test, describe } from 'vitest'
import ClientComponents from '@/app/clientComponents/page'

describe('unit testing clientComponents/page.tsx', () => {
  describe('initial display check', () => {
    test('should display the initial number', () => {
      // Arrange
      const { getByText } = render(<ClientComponents />)

      // Assert
      expect(getByText('You clicked 0 times')).toBeDefined()
    })
  })

  describe('test useState function', () => {
    test('should display the number of clicks', () => {
      // Arrange
      const { getByText } = render(<ClientComponents />)

      // Act
      fireEvent.click(getByText('Click'))

      // Assert
      expect(getByText('You clicked 1 times')).toBeDefined()
    })
  })
})
```

### Server-Components unit testing
```tsx
// serverComponets/page.tsx
import { notFound } from 'next/navigation'

export default async function ServerComponents() {
  const posts = await fetch(`https://jsonplaceholder.typicode.com/posts`).then((res) => res.json())
  if (!posts || posts.length == 0) {
    notFound()
  }

  return (
    <div>
      <h2>Post List</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p title={post.body}>{post.body}</p>
        </div>
      ))}
    </div>
  )
}
```
```tsx
// unit-test/serverComponets/page.test.tsx
import { render } from '@testing-library/react'
import { expect, test, describe, vi, afterEach } from 'vitest'
import ServerComponents from '@/app/serverComponents/page'

const notFoundMock = vi.hoisted(() => vi.fn())
const responseData = [
  {
    id: 1,
    title: 'test title 1',
    body: 'test body 1',
  },
  {
    id: 2,
    title: 'test title 2',
    body: 'test body 2',
  },
]

describe('unit testing serverComponents/page.tsx', () => {
  const response = {} as Response
  vi.mock('next/navigation', () => ({
    notFound: notFoundMock,
  }))

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('should display the post list', async () => {
    // Arrange
    response.json = vi.fn().mockResolvedValue(responseData)
    vi.spyOn(global, 'fetch').mockResolvedValue(response)
    const { getByText } = render(await ServerComponents())

    // Assert
    expect(getByText('test title 1')).toBeDefined()
    expect(getByText('test body 1')).toBeDefined()
    expect(getByText('test title 2')).toBeDefined()
    expect(getByText('test body 2')).toBeDefined()
    expect(notFoundMock).not.toBeCalled()
  })

  test('should call notFound function', async () => {
    // Arrange
    response.json = vi.fn().mockResolvedValue([])
    vi.spyOn(global, 'fetch').mockResolvedValue(response)
    render(await ServerComponents())

    // Assert
    expect(notFoundMock).toHaveBeenCalledOnce()
  })
})
```

## End to End Testing with [Puppeteer](https://github.com/puppeteer/puppeteer)
End to end testing is a software testing technique that verifies the functionality and performance of an entire software application from start to finish by simulating user scenarios.
Puppeteer is a NodeJS library that allows developers to programmatically control a web-browser.
### Setup
```bash
npm install --save-dev puppeteer
```
Here is the page for the test. You can access it at [localhost:3000/clientComponents](localhost:3000/clientComponents)
```tsx
// clientComponents/page.tsx
'use client'

import { useState } from 'react'

export default function ClientComponents() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  )
}
```
Here is a sample End to End testing code. It tests submit button state.
```ts
// e2e-test/e2e.test.ts
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { launch, PuppeteerLaunchOptions } from 'puppeteer'
import type { Browser, Page } from 'puppeteer'

// Set browser launch option. See the following for more details.
// https://pptr.dev/api/puppeteer.browserlaunchargumentoptions
const options: PuppeteerLaunchOptions = {
  headless: false,
  slowMo: 75,
  defaultViewport: {
    width: 1280,
    height: 1024,
  },
  devtools: true,
  args: ['--window-size=1680,1024'],
}

describe('End to End Testing', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await launch(options)
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
  })

  test('If you click the submit button, should display the number of clicks', async () => {
    try {
      // Arrange
      await page.goto('http://localhost:3000/clientComponents')
      await page.screenshot({
        path: './src/e2e-test/before-click.png',
        fullPage: true,
      })
      const textBeforeClick = await page.$eval('p', (item) => {
        return item.textContent
      })

      // Act
      await page.click('button')
      await page.screenshot({
        path: './src/e2e-test/after-click.png',
        fullPage: true,
      })
      const textAfterClick = await page.$eval('p', (item) => {
        return item.textContent
      })

      // Assert
      expect(textBeforeClick).toBe('You clicked 0 times')
      expect(textAfterClick).toBe('You clicked 1 times')
    } catch (e) {
      console.error(e)
      expect(e).toBeUndefined()
    }
  }, 60000)
})
```
Add the following to scripts section in package.json.
```json
{
  "scripts": {
    "test:e2e": "vitest --coverage --dir src/e2e-test",
  },
}
```
Run below command to run test.
```bash
# run application server
npm run dev

# run End to End testing
npm run test:e2e
```

## Analyzing source code by [SonarQube](https://docs.sonarsource.com/sonarqube/latest/)
SonarQube is a self-managed, automatic code review tool that systematically helps you deliver clean code.
```bash
# install SonarQube tools
npm install --save-dev sonarqube-scanner vitest-sonar-reporter
```
Add the following to vitest.config.ts.
* add lcov to reporter section
* add vitest-sonar-reporter to reporters section
```ts
// vitest.config.ts
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/unit-test/setup.ts',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{tsx,js,ts}'],
      all: true,
      // add lcov
      reporter: ['html', 'clover', 'text', 'lcov']
    },
    root: '.',
    // add vitest-sonar-reporter
    reporters: ['verbose', 'vitest-sonar-reporter'],
    outputFile: 'test-report.xml'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src'),
    },
  },
})
```

Create sonar-project.properties in the root directory and add the following to sonar-project.properties. See [this](https://docs.sonarqube.org/9.6/project-administration/narrowing-the-focus/) for more details.
```properties
sonar.projectKey=next13-starter-guide
sonar.projectName=next13-starter-guide
sonar.sources=src
sonar.tests=src/unit-test/
sonar.test.inclusions=src/unit-test/**/*.test.tsx
sonar.exclusions=**/*plugins*/**, src/unit-test/**/*.test.tsx, src/unit-test/**/setup.ts
sonar.testExecutionReportPaths=test-report.xml
sonar.javascript.file.suffixes=.js,.jsx
sonar.typescript.file.suffixes=.ts,.tsx
sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.login=sqp_XXXXXXXXXXXXXXXXX
```

### Create SonarQube project
Make sure you have installed SonarQube on your development machine.
Run SonarQube server as localhost:9000 before do the following.

To create a SonarQube project, do the following.
1. Access the following url.
http://localhost:9000/projects

1. Click [Create Project] and then click [Manually]

1. Input __next13-starter-guide__ in Project display name and Project key. Click [Set Up]

1. Click [Locally]

1. Click [Generate] and then generate project token

### Analyze your source code
Add project token to sonar.login in sonar-project.properties.
See [this](https://docs.sonarqube.org/latest/user-guide/user-account/generating-and-using-tokens/) for more details of token.
```properties
sonar.login=sqp_XXXXXXXXXXXXXXXXXXXXXX
```

Add the following to scripts section in package.json.
```json
{
  "scripts": {
    "sonar": "sonar-scanner"
  },
}
```

Run below command to run SonarQube analysis.
```bash
# run all tests
npm run test

# run SonarQube analysis
npm run sonar
```

You can access the following url to show result.

http://localhost:9000/dashboard?id=next13-starter-guide
