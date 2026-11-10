'use client'

import * as React from 'react'
import { useState } from 'react'
import { Calculator, Copy, Check, Info, ShieldAlert } from 'lucide-react'
import { toast } from 'sonner'
import { CountUp } from '@/components/motion/count-up'

export function ScalesCalculator() {
  const [c, setC] = useState(false)
  const [u, setU] = useState(false)
  const [r, setR] = useState(false)
  const [b, setB] = useState(false)
  const [age65, setAge65] = useState(true)
  const [copied, setCopied] = useState(false)

  const score = (c ? 1 : 0) + (u ? 1 : 0) + (r ? 1 : 0) + (b ? 1 : 0) + (age65 ? 1 : 0)

  let riskLevel = 'Низький ризик'
  let riskColor = 'text-emerald-600 bg-emerald-50 border-emerald-200'
  let recommendation = 'Амбулаторне лікування (ризик летальності < 3%)'

  if (score === 2) {
    riskLevel = 'Помірний ризик'
    riskColor = 'text-amber-700 bg-amber-50 border-amber-200'
    recommendation = 'Розглянути стаціонарне лікування або денний стаціонар (~9%)'
  } else if (score >= 3) {
    riskLevel = 'Високий ризик'
    riskColor = 'text-rose-700 bg-rose-50 border-rose-200'
    recommendation = 'Термінова госпіталізація у стаціонар / ВІТ (ризик 15–40%)'
  }

  const generatedText = `Шкала CURB-65: ${score} б. (${[
    c ? 'Свідомість: порушена (+1)' : null,
    u ? 'Сечовина > 7 ммоль/л (+1)' : null,
    r ? 'ЧД ≥ 30/хв (+1)' : null,
    b ? 'АТ < 90/60 (+1)' : null,
    age65 ? 'Вік ≥ 65 р. (+1)' : null,
  ]
    .filter(Boolean)
    .join(', ') || 'критерії відсутні'}). Ступінь тяжкості: ${riskLevel}. Тактика: ${recommendation}.`

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText)
    setCopied(true)
    toast.success('Текст скопійовано для медичної документації')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="surface-card rounded-2xl border border-border p-5 sm:p-7 shadow-card">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary-soft text-primary-strong">
            <Calculator className="size-5" />
          </span>
          <div>
            <h4 className="font-semibold text-sm text-foreground">
              Калькулятор CURB-65
            </h4>
            <p className="text-xs text-muted-foreground">
              Оцінка тяжкості позалікарняної пневмонії
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-primary-strong bg-primary-soft/80 px-2.5 py-1 rounded-full">
          Бали: <CountUp to={score} /> / 5
        </span>
      </div>

      {/* Toggles */}
      <div className="mt-5 space-y-2.5 text-xs">
        {[
          {
            id: 'c',
            label: 'C — Confusion (Порушення свідомості за ШКГ або дезорієнтація)',
            checked: c,
            set: setC,
          },
          {
            id: 'u',
            label: 'U — Urea (Рівень сечовини у сироватці крові > 7.0 ммоль/л)',
            checked: u,
            set: setU,
          },
          {
            id: 'r',
            label: 'R — Respiratory rate (Частота дихання ≥ 30 за хвилину)',
            checked: r,
            set: setR,
          },
          {
            id: 'b',
            label: 'B — Blood pressure (САТ < 90 або ДАТ ≤ 60 мм рт. ст.)',
            checked: b,
            set: setB,
          },
          {
            id: 'age',
            label: '65 — Age (Вік пацієнта 65 років або старше)',
            checked: age65,
            set: setAge65,
          },
        ].map((item) => (
          <label
            key={item.id}
            className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
              item.checked
                ? 'bg-primary-soft/40 border-teal/40 font-medium text-foreground'
                : 'bg-surface hover:bg-surface-muted/50 border-border text-muted-foreground'
            }`}
          >
            <span className="leading-snug">{item.label}</span>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => item.set(e.target.checked)}
              className="size-4 rounded border-border-strong text-teal focus:ring-teal"
            />
          </label>
        ))}
      </div>

      {/* Result Card */}
      <div className={`mt-5 p-4 rounded-xl border ${riskColor}`}>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-xs tracking-wide uppercase flex items-center gap-1.5">
            <ShieldAlert className="size-4" />
            {riskLevel}
          </span>
          <span className="font-mono text-sm font-bold">{score} бали</span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed font-medium">
          {recommendation}
        </p>
      </div>

      {/* Copy Output */}
      <div className="mt-4 rounded-xl border border-border bg-surface-muted/40 p-3.5">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/60">
          <span className="text-xs font-semibold text-muted-foreground">
            Текст для медичної карти (автогенерація):
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-teal hover:bg-surface transition-colors"
          >
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
            <span>{copied ? 'Скопійовано' : 'Копіювати'}</span>
          </button>
        </div>
        <p className="font-mono text-xs text-foreground leading-relaxed">
          {generatedText}
        </p>
      </div>

      <p className="mt-3 text-[0.7rem] text-subtle-foreground flex items-center gap-1">
        <Info className="size-3 shrink-0" />
        Демонстраційний розрахунок. Не є клінічною рекомендацією.
      </p>
    </div>
  )
}
