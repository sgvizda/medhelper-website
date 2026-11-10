'use client'

import * as React from 'react'
import { useState } from 'react'
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

export function NhsuCard() {
  const [variant, setVariant] = useState<'A' | 'B'>('A')
  const [expanded, setExpanded] = useState<string | null>('diag')

  const toggle = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id))
  }

  return (
    <div className="relative rounded-2xl border border-white/15 bg-white/[0.04] p-5 sm:p-6 backdrop-blur-md shadow-float text-white">
      {/* Top Bar with variant switch */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-mint" />
          <div>
            <h4 className="font-semibold text-sm text-white">
              Картка кодування ЕСОЗ · Валідація НСЗУ
            </h4>
            <p className="text-[0.7rem] text-[#a9b7c7]">
              Клінічний аналіз та фінансові ризики
            </p>
          </div>
        </div>

        {/* Variant toggle */}
        <div className="inline-flex rounded-lg bg-white/10 p-1 text-xs">
          <button
            type="button"
            onClick={() => setVariant('A')}
            className={`rounded-md px-3 py-1 font-medium transition-colors ${
              variant === 'A'
                ? 'bg-mint text-ink font-semibold'
                : 'text-[#a9b7c7] hover:text-white'
            }`}
          >
            Варіант A (Оптимальний)
          </button>
          <button
            type="button"
            onClick={() => setVariant('B')}
            className={`rounded-md px-3 py-1 font-medium transition-colors ${
              variant === 'B'
                ? 'bg-amber-400 text-ink font-semibold'
                : 'text-[#a9b7c7] hover:text-white'
            }`}
          >
            Варіант B (Альтернатива)
          </button>
        </div>
      </div>

      {/* Coding Details Accordion */}
      <div className="mt-4 space-y-3 text-xs">
        {/* Main Diagnosis */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <button
            type="button"
            onClick={() => toggle('diag')}
            className="w-full flex items-center justify-between p-3.5 text-left font-medium hover:bg-white/[0.02]"
          >
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-mint" />
              <span>Основний діагноз (МКХ-10-АМ)</span>
            </span>
            <span className="flex items-center gap-2 font-mono text-mint">
              {variant === 'A' ? 'I21.0' : 'I25.1'}
              {expanded === 'diag' ? (
                <ChevronUp className="size-3.5" />
              ) : (
                <ChevronDown className="size-3.5" />
              )}
            </span>
          </button>

          {expanded === 'diag' && (
            <div className="p-3.5 pt-0 border-t border-white/5 space-y-2 text-[#a9b7c7]">
              {variant === 'A' ? (
                <div>
                  <p className="text-white font-medium">
                    I21.0 Гострий трансмуральний інфаркт міокарда передньої стінки
                  </p>
                  <p className="mt-1 text-[0.75rem]">
                    Повний код підтверджений ЕКГ (елевація ST) та біомаркерами.
                    Відповідає пріоритетному пакету ПМГ.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-white font-medium">
                    I25.1 Атеросклеротична хвороба серця
                  </p>
                  <p className="mt-1 text-[0.75rem] text-amber-300">
                    Увага: кодування хронічної форми при наявності гострої ішемії
                    не дозволяє застосувати підвищений тариф за пріоритетним
                    пакетом.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Comorbidities & CC/MCC */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <button
            type="button"
            onClick={() => toggle('comorb')}
            className="w-full flex items-center justify-between p-3.5 text-left font-medium hover:bg-white/[0.02]"
          >
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-teal" />
              <span>Супутні діагнози та CC/MCC</span>
            </span>
            <span className="flex items-center gap-2 font-mono text-teal">
              {variant === 'A' ? 'MCC виявлено' : 'Без CC/MCC'}
              {expanded === 'comorb' ? (
                <ChevronUp className="size-3.5" />
              ) : (
                <ChevronDown className="size-3.5" />
              )}
            </span>
          </button>

          {expanded === 'comorb' && (
            <div className="p-3.5 pt-0 border-t border-white/5 space-y-2 text-[#a9b7c7]">
              {variant === 'A' ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between bg-white/[0.04] p-2 rounded">
                    <span className="text-white">
                      I50.1 Лівошлуночкова недостатність
                    </span>
                    <span className="rounded bg-mint/20 px-1.5 py-0.5 text-mint font-semibold text-[0.65rem]">
                      MCC
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-white/[0.04] p-2 rounded">
                    <span className="text-white">
                      E11.9 ЦД 2 типу без ускладнень
                    </span>
                    <span className="rounded bg-white/10 px-1.5 py-0.5 text-white text-[0.65rem]">
                      CC (приклад)
                    </span>
                  </div>
                  <p className="text-[0.72rem] text-emerald-400">
                    ✓ Вплив на ДСГ: коректно підвищує ваговий коефіцієнт
                    клініко-спорідненої групи.
                  </p>
                </div>
              ) : (
                <div className="text-amber-300 space-y-1">
                  <p>Супутні стани зазначені як другорядні без деталізації.</p>
                  <p className="text-[0.72rem] text-amber-200">
                    Ризик недоотримання фінансування через невраховану тяжкість
                    пацієнта (коефіцієнт ДСГ базовий).
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Interventions ACHI / АКМІ */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
          <button
            type="button"
            onClick={() => toggle('achi')}
            className="w-full flex items-center justify-between p-3.5 text-left font-medium hover:bg-white/[0.02]"
          >
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-mint" />
              <span>Інтервенція АКМІ та анестезія</span>
            </span>
            <span className="flex items-center gap-2 font-mono text-mint">
              38306-00
              {expanded === 'achi' ? (
                <ChevronUp className="size-3.5" />
              ) : (
                <ChevronDown className="size-3.5" />
              )}
            </span>
          </button>

          {expanded === 'achi' && (
            <div className="p-3.5 pt-0 border-t border-white/5 space-y-2 text-[#a9b7c7]">
              <p className="text-white">
                38306-00 Черезшкірне введення одного стента в коронарну артерію
              </p>
              <p className="text-[0.72rem]">
                Анестезія: місцева інфільтраційна + седація (код блоку 92514).
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Financial Risks Checklist */}
      <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 space-y-2">
        <h5 className="font-semibold text-xs text-white flex items-center gap-1.5">
          <Info className="size-3.5 text-mint" /> Чек-лист фінансових ризиків НСЗУ:
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[0.75rem]">
          <div className="flex items-center gap-2">
            {variant === 'A' ? (
              <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="size-3.5 text-amber-400 shrink-0" />
            )}
            <span className={variant === 'A' ? 'text-white' : 'text-amber-200'}>
              Відповідність критеріям пакета ПМГ
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
            <span className="text-white">Повнота обовʼязкових полів ЕСОЗ</span>
          </div>

          <div className="flex items-center gap-2">
            {variant === 'A' ? (
              <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="size-3.5 text-amber-400 shrink-0" />
            )}
            <span className={variant === 'A' ? 'text-white' : 'text-amber-200'}>
              {variant === 'A'
                ? 'ДСГ коефіцієнт враховано'
                : 'Ризик заниження тарифу'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
            <span className="text-white">Форма надання: екстрена госпіталізація</span>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <p className="mt-4 text-[0.7rem] text-[#8596aa] italic">
        * Приклад структури відповіді. Остаточне рішення щодо кодування в ЕСОЗ ухвалює відповідальний лікар або медичний статистик.
      </p>
    </div>
  )
}
