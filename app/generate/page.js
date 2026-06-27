import { Suspense } from 'react'
import Generate from './GeneratePage'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Generate />
    </Suspense>
  )
}