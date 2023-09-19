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
このプロジェクトはNext 13の学習用のテンプレートプロジェクトとして作成しました。バージョンはNext 13.4を使用しています。

Next 13のテンプレートプロジェクトとして最低限必要な機能を実装し、要点を解説しています。 ユニットテスト、E2Eテスト、SonarQubeも取り扱っています。

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
Next 13のプロジェクトを新規作成するには以下のコマンドを実行します。
```bash
npx <project-name>@latest
```

インストール時に以下のように各ツールをインストールするか選択できます:

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
インストール後はプロジェクト名のディレクトリが作成されます。

### Usage
以下のコマンドでアプリケーションを起動します。
```bash
npm run dev
```
起動後は以下のURLでアクセスできます。
http://localhost:3000

### Change [source directory](https://nextjs.org/docs/app/building-your-application/configuring/src-directory)

srcディレクトリを使用するには、App Routerフォルダをsrc/appに、Pages Routerフォルダをsrc/pagesに移動します。
Tailwind CSSを使用している場合は、以下のようにtailwind.config.tsのcontentセクションに/srcプレフィックスを追加する必要があります。
```ts
// tailwind.config.ts
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
}
export default config
```

### Enable [app router](https://nextjs.org/docs/app)
App routerを有効にする場合は、next.config.jsに以下を追加します。
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
※Next 13.4以降をお使いの場合は追加する必要はありません。

## [Prettier](https://prettier.io/) Setup
以下のコマンドでPrettierをインストールします。
```bash
npm install --save-dev prettier eslint-config-prettier
```

※eslint-config-prettierを使用することでESLintとの干渉を回避することができます。
### Create [configuration file](https://prettier.io/docs/en/configuration)
プロジェクトのルートに.prettierrcファイルを作成します。
Prettierは設定ファイルのサポートにcosmiconfigを使用しているので、.prettierrcを使ってPrettierを設定することができます。
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
ファイルをフォーマットから除外するには、プロジェクトのルートに.prettierignoreファイルを作成します。
```bash
# Ignore artifacts:
build
coverage

# Ignore all HTML files:
**/*.html
```

### Edit eslint configuration file
.eslintrc.jsonのextendsセクションにprettierを追加します。
```json
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```

### Edit package.json
package.jsonのscriptsセクションに以下を追加します。
```json
{
  "scripts": {
    "format": "prettier . --write",
    "format-file-patterns": "prettier \"./src/**/*.{js,jsx,ts,tsx,json,css}\" --write",
    "format-ignore-path": "prettier . --write --ignore-path {any file}"
  }
}
```
prettierコマンドを使って、コマンドラインからPrettierを実行することができます。
詳細は[こちら](https://prettier.io/docs/en/cli)

## [ESLint](https://typescript-eslint.io/) Setup
create-next-appでNext 13のプロジェクトを新規作成した場合は、初期状態ではESLintはTypescriptのエラーを表示しません。
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
プラグインをインストールすることで、TypeScriptコードに対して推奨されるルールでESLintを実行することができます。
```bash
npm install --save-dev  @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Edit eslint configuration file
.eslintrc.jsonに以下を追加します。
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
レイアウトは、複数のページで共有されるUIです。ナビゲーションの際、レイアウトは状態を保持し、インタラクティブであり続け、再レンダリングしません。デフォルトでは、以下のようにappディレクトリのlayout.tsxファイルからReactコンポーネントをエクスポートすることでレイアウトを定義することができます。
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
メタデータAPI（Next 13.2以降）を使用すると、SEOを向上させるために、HTMLのhead要素内にメタデータ（metaタグやリンクタグなど）を定義できます。

### Static Metadata
静的メタデータを定義するには、layout.tsxまたはpage.tsxファイルからメタデータオブジェクトをエクスポートします。
```tsx
// layout.tsx / page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  // 詳細は以下を参照ください
  // https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
  title: 'some title',
  description: 'some description',
}

export default function Page() {}
```

### Dynamic Metadata
generateMetadata関数を使用すると、動的な値 (現在のルート パラメータや外部データなど) を必要とするメタデータを取得できます。
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
  // ファイルパスが app/products/[id]/page.tsx の場合に、idをparams.idから取得することができます
  const id = params.id

  // 検索パラメータを取得できます
  const keyword = searchParams.get('keyword')

  // データフェッチ
  const item = await fetch(`https://.../${id}`).then((res) => res.json())

  return {
    title: item.title,
    description: item.description,
  }
}
export default function Page({ params, searchParams }: Props) {}
```

## [Error Handling](https://nextjs.org/docs/app/api-reference/file-conventions/error)
以下のように、error.tsxを使って予期しないエラーをキャッチすることができます。
```tsx
// app/foo/error.tsx
'use client' // Client Componentsを指定する必要があります

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
      <!-- 再レンダリング -->
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
各ページの描画前にローディング画面を表示するには、app/loading.tsxを使用します。
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
notFound関数を使うと、not-found.tsxを描画することができます。
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
    // not-found.tsxを描画
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
Server Componentsを使用すると、サーバーでレンダリングされ、オプションでサーバーにキャッシュされるUIを記述できます。Server Componentsを使用すると、クライアントに送信されるJavaScriptの量を減らしながら、初回のページの読み込みを高速化できます。

Server Componentsの特徴:
1. サーバーでのレンダリング（Javascriptはクライアントに送信されません）
1. データの取得（async/awaitの使用が可能）
1. バックエンドリソースへの直接アクセス可能
1. サーバーに機密情報を保持（アクセストークン、APIキーなど）
1. クライアントサイドのJavaScriptを減少
1. ブラウザのみのAPI、イベントリスナー(onClick()、onChange()など)、ライフサイクルエフェクト(useState()、useReducer()、useEffect()など)は使用できません。
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
Client Componentsを使用すると、リクエスト時にクライアントでレンダリングされるインタラクティブなUIを記述できます。Client Componentsを使用するには、"use client "ディレクティブをファイルの一番上（import文の上）に追加します。

Client Componentsの特徴:
1. クライアントサイドでのレンダリング（Javascriptはブラウザで実行）
1. データのフェッチ（async/awaitの代わりにuseState・useEffect・SWR・React-queryを使う）
1. イベントリスナーの追加（onClick()、onChange()など）
1. Stateとライフサイクルエフェクトの使用 (useState(), useReducer(), useEffect() など)
1. ブラウザ専用のAPIの使用
1. State、エフェクト、またはブラウザ専用APIに依存するカスタムフックの使用
1. Reactクラスのコンポーネントの使用
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
Next.jsは、SWRというデータフェッチ用のReactフックライブラリを作成しています。クライアントサイドでデータを取得する場合は、このライブラリを使うことを強くお勧めします。キャッシュ、再検証、フォーカストラッキング、再フェッチなどを手軽に実装できます。
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
Client Componentsでデータを取得する必要がある場合、クライアントからRoute Handlerを呼び出すことができます。Route Handlerはサーバー上で実行され、クライアントにデータを返します。これは、APIトークンのような機密情報をクライアントに公開したくない場合に便利です。Route Handlersはappディレクトリ内でのみ利用可能です。API RoutesとRoute Handlersを一緒に使う必要はありません。
```
app
├── routeHandlers
│     └── page.tsx ← クライアントで実行
└── api
     └── routeHandlers
          └── route.ts ← サーバーで実行
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
ルートディレクトリにvitest.config.tsを作成し、以下を追加します。
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
package.jsonのscriptsセクションに以下を追加します。
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

describe('clientComponents/page.tsxのテスト', () => {
  describe('画面の初期表示確認', () => {
    test('クリック数が初期表示として「0」が表示されていること', () => {
      // Arrange
      const { getByText } = render(<ClientComponents />)

      // Assert
      expect(getByText('You clicked 0 times')).toBeDefined()
    })
  })

  describe('useState関数のテスト', () => {
    test('クリック数が画面に表示されていること', () => {
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

describe('serverComponents/page.tsxのテスト', () => {
  const response = {} as Response
  vi.mock('next/navigation', () => ({
    notFound: notFoundMock,
  }))

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('投稿の一覧が画面に表示されていること', async () => {
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

  test('投稿の一覧が取得できず、notFound関数がコールされること', async () => {
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
エンドツーエンドテストとは、ユーザーシナリオをシミュレートすることで、ソフトウェアアプリケーション全体の機能とパフォーマンスを最初から最後まで検証するソフトウェアテスト手法です。
Puppeteerは、開発者がウェブブラウザをプログラムで制御できるようにするNodeJSライブラリです。
### Setup
```bash
npm install --save-dev puppeteer
```
以下はテスト対象のページの実装です。処理の内容としてはSubmitボタンを押すと、押した回数が画面に表示されるだけのシンプルなページになります。次のURLでアクセスできます。 [localhost:3000/clientComponents](localhost:3000/clientComponents)
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
以下のテストコードではSubmitボタンをクリックして、クリックした回数が画面に正しく表示されているかを検証しています。
```ts
// e2e-test/e2e.test.ts
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { launch, PuppeteerLaunchOptions } from 'puppeteer'
import type { Browser, Page } from 'puppeteer'

// ブラウザの起動オプションを設定しています。設定できる項目の詳細は以下を参照ください
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

  test('Submitボタンをクリックした場合、クリック数が画面に表示されていること', async () => {
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
package.jsonのscriptsセクションに以下を追加します。
```json
{
  "scripts": {
    "test:e2e": "vitest --coverage --dir src/e2e-test",
  },
}
```
以下のコマンドを実行してテストを実行します。
```bash
# アプリの起動
npm run dev

# E2Eの実行
npm run test:e2e
```

## Analyzing source code by [SonarQube](https://docs.sonarsource.com/sonarqube/latest/)
SonarQubeはオープンソースの静的解析プラットフォームで、形式的なソースコードのバグや不適切な記法のチェック、カバレッジの計測などを行い、クリーンなコードの提供を体系的に支援します。
### Setup
```bash
npm install --save-dev sonarqube-scanner vitest-sonar-reporter
```
vitest.config.tsに以下を追加します。
* lcovをreporterセクションに追加
* vitest-sonar-reporterをreportersセクションに追加
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
      // lcovを追加
      reporter: ['html', 'clover', 'text', 'lcov']
    },
    root: '.',
    // vitest-sonar-reporterを追加
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
ルートディレクトリにsonar-project.propertiesを作成して以下を追加します。
詳細は[こちら](https://docs.sonarqube.org/9.6/project-administration/narrowing-the-focus/)
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
前提として開発マシンにSonarQubeがインストールされていることを確認します。
SonarQubeサーバをlocalhost:9000として起動し、以下を実行します。

SonarQubeプロジェクトを作成するために以下を実施します。
1. 次のURLにアクセスします。
http://localhost:9000/projects

1. Create Project > Manuallyを選択します。

1. Create a project画面でProject display nameとProject keyに __next13-starter-guide__ を設定してSet Upを押下します。

1. 「How do you want to analyze your repository?」と表示されるのでLocallyを押下します。

1. Provide a token欄のGenerate a project tokenを選択し、Generateを押下することでプロジェクトトークンが生成されます。

### Analyze your source code
sonar-project.propertiesのsonar.loginにプロジェクトトークンを追加します。
詳細は[こちら](https://docs.sonarqube.org/latest/user-guide/user-account/generating-and-using-tokens/)。
```properties
sonar.login=sqp_XXXXXXXXXXXXXXXXXXXXXX
```
package.jsonのscriptsセクションに以下を追加します。
```json
{
  "scripts": {
    "sonar": "sonar-scanner"
  },
}
```
以下のコマンドを実行して、SonarQubeを実行します。
```bash
# テストの実行
npm run test

# SonarQubeの実行
npm run sonar
```
以下のURLにアクセスすると結果が表示されます。

http://localhost:9000/dashboard?id=next13-starter-guide
