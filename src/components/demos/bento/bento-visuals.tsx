'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  Activity,
  ShieldCheck,
  FileText,
  Calculator,
  ScanText,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { CountUp } from '@/components/motion/count-up'

export function ClinicalBentoVisual() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)

  const messages = [
    {
      q: 'Диференційна діагностика болю в грудях',
      a: 'Аналіз ЕКГ, тропонінів та факторів ризику за стандартом МОЗ',
    },
    {
      q: 'Антибіотикотерапія при позалікарняній пневмонії',
      a: 'Стратифікація за CURB-65 та протокол емпіричної терапії',
    },
    {
      q: 'Корекція дози прямих оральних антикоагулянтів',
      a: 'Розрахунок кліренсу креатиніну за формулою Кокрофта-Голта',
    },
  ]

  useEffect(() => {
    if (reduce) return
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % messages.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [reduce, messages.length])

  const current = messages[active]

  return (
    <div className="relative mt-4 overflow-hidden rounded-xl border border-border bg-surface-muted/50 p-3.5 text-xs">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/60">
        <span className="flex items-center gap-1.5 font-mono text-[0.7rem] text-primary-strong">
          <Activity className="size-3.5 text-teal" />
          <span>Клінічний діалог · МОЗ України</span>
        </span>
        <div className="flex gap-1">
          {messages.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === active ? 'w-4 bg-teal' : 'w-1.5 bg-border-strong'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2 min-h-[92px]">
        <div className="rounded-lg bg-surface border border-border p-2 text-foreground font-medium flex items-center justify-between">
          <span className="truncate">{current.q}</span>
        </div>
        <div className="rounded-lg bg-primary-soft/60 border border-teal/20 p-2 text-primary-strong flex items-start gap-1.5">
          <Sparkles className="size-3.5 text-teal shrink-0 mt-0.5" />
          <span className="leading-snug">{current.a}</span>
        </div>
      </div>
    </div>
  )
}

export function NhsuBentoVisual() {
  return (
    <div className="relative mt-4 space-y-2.5 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 text-xs font-mono">
      <div className="flex items-center justify-between">
        <span className="text-mint font-semibold flex items-center gap-1.5">
          <ShieldCheck className="size-4" /> МКХ-10-АМ / АКМІ
        </span>
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[0.65rem] text-emerald-300 border border-emerald-500/30">
          Валідовано
        </span>
      </div>

      <div className="space-y-1.5 text-[0.75rem]">
        <div className="flex items-center justify-between bg-white/[0.03] p-1.5 rounded border border-white/5">
          <span className="text-white">I21.0 Гострий інфаркт</span>
          <span className="text-[#a9b7c7]">Основний</span>
        </div>
        <div className="flex items-center justify-between bg-white/[0.03] p-1.5 rounded border border-white/5">
          <span className="text-mint">I50.1 СН (MCC)</span>
          <span className="text-emerald-400">+ ДСГ коефіцієнт</span>
        </div>
        <div className="flex items-center justify-between bg-white/[0.03] p-1.5 rounded border border-white/5">
          <span className="text-white">АКМІ 38306-00 Стентування</span>
          <span className="text-teal">Інтервенція</span>
        </div>
      </div>

      <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[0.7rem] text-[#8596aa]">
        <span>Пакет ПМГ: № 8</span>
        <span className="text-white font-medium">Фінансові ризики: 0</span>
      </div>
    </div>
  )
}

export function DocsBentoVisual() {
  return (
    <div className="relative mt-4 overflow-hidden rounded-xl border border-border bg-surface-muted/40 p-3 text-xs">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/80">
        <span className="font-semibold text-foreground flex items-center gap-1.5 text-[0.75rem]">
          <FileText className="size-3.5 text-teal" /> Форма № 003/о
        </span>
        <span className="font-mono text-[0.65rem] text-muted-foreground">
          п. 43 Щоденники
        </span>
      </div>

      <div className="space-y-1.5 font-mono text-[0.7rem]">
        <div className="flex items-center gap-2">
          <span className="text-subtle-foreground w-12 shrink-0">День 1:</span>
          <div className="h-2 w-full rounded bg-border-strong/40" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-subtle-foreground w-12 shrink-0">День 2:</span>
          <div className="h-2 w-4/5 rounded bg-teal/30" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-subtle-foreground w-12 shrink-0">День 3:</span>
          <div className="h-2 w-3/4 rounded bg-border-strong/40" />
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-1 text-[0.7rem] font-medium text-primary-strong">
        <Check className="size-3" /> Без вигаданих клінічних даних
      </div>
    </div>
  )
}

export function ScalesBentoVisual() {
  return (
    <div className="relative mt-4 rounded-xl border border-border bg-surface p-3 text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <span className="font-semibold text-foreground flex items-center gap-1.5 text-[0.75rem]">
          <Calculator className="size-3.5 text-teal" /> CURB-65 / NEWS2
        </span>
        <span className="font-mono text-teal font-bold text-sm">
          <CountUp to={4} /> / 5
        </span>
      </div>

      <div className="mt-2.5 space-y-1.5">
        <div className="flex justify-between text-[0.7rem] text-muted-foreground">
          <span>Ступінь важкості:</span>
          <span className="font-semibold text-danger">Високий ризик</span>
        </div>
        <div className="h-2 w-full rounded-full bg-surface-muted overflow-hidden">
          <div className="h-full w-4/5 rounded-full bg-danger transition-all duration-700" />
        </div>
      </div>
    </div>
  )
}

export function OcrBentoVisual() {
  return (
    <div className="relative mt-4 overflow-hidden rounded-xl border border-border bg-surface-muted/40 p-3 text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-border/70">
        <span className="font-semibold text-foreground flex items-center gap-1.5 text-[0.75rem]">
          <ScanText className="size-3.5 text-teal" /> Сканування записів
        </span>
        <span className="text-[0.65rem] text-primary-strong font-mono">
          98.6% точність
        </span>
      </div>

      {/* Simulated handwriting transforming into typed text */}
      <div className="mt-2 relative space-y-1 font-mono text-[0.7rem]">
        <div className="text-subtle-foreground italic flex items-center gap-2">
          <span className="line-through decoration-teal">Рукопис:</span>
          <span className="text-foreground font-sans not-italic font-medium">
            → Тіазидний діуретик 12.5 мг
          </span>
        </div>
        <div className="text-subtle-foreground italic flex items-center gap-2">
          <span className="line-through decoration-teal">Рукопис:</span>
          <span className="text-foreground font-sans not-italic font-medium">
            → АТ 145/90 мм рт. ст.
          </span>
        </div>
      </div>
    </div>
  )
}
