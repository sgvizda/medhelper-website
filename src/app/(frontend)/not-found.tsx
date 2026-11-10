import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80dvh] place-items-center overflow-hidden pt-[var(--header-h)]">
      <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0" />
      <div className="container-page relative text-center">
        <p className="font-mono text-sm tracking-[0.2em] text-primary-strong">404</p>
        <h1 className="text-h2 mt-3">Сторінку не знайдено</h1>
        <p className="text-lead mx-auto mt-4 max-w-md">Можливо, її перенесли або адресу введено з помилкою.</p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/">
            <ArrowLeft /> На головну
          </Link>
        </Button>
      </div>
    </section>
  )
}
