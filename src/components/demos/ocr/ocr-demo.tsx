'use client'

import * as React from 'react'
import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  ScanText,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  FileSearch,
} from 'lucide-react'
import { toast } from 'sonner'

export function OcrDemo() {
  const reduce = useReducedMotion()
  const [mode, setMode] = useState<'handwritten' | 'printed'>('handwritten')
  const [isScanning, setIsScanning] = useState(false)
  const [copied, setCopied] = useState(false)

  const handwrittenText =
    'Діагноз: ІХС. Стабільна стенокардія напруги II ФК. СН I ст. зі збереженою ФВ (54%). Призначення: Кардіомагніл 75 мг ввечері, Бісопролол 5 мг вранці, Аторвастатин 20 мг на ніч.'

  const printedText =
    'Лабораторне дослідження: Глюкоза крові натще — 6.8 ммоль/л; Глікований гемоглобін (HbA1c) — 7.2%; Креатинін сироватки — 94 мкмоль/л; eGFR (CKD-EPI) — 74 мл/хв/1.73м².'

  const currentResult = mode === 'handwritten' ? handwrittenText : printedText

  const handleScan = () => {
    if (reduce) return
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      toast.success('Розпізнавання завершено успішно')
    }, 1800)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(currentResult)
    setCopied(true)
    toast.success('Текст скопійовано')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="surface-card rounded-2xl border border-border p-5 sm:p-7 shadow-float">
      {/* Mode Switch & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-border">
        <div className="inline-flex rounded-xl bg-surface-muted p-1 text-xs">
          <button
            type="button"
            onClick={() => {
              setMode('handwritten')
              setIsScanning(false)
            }}
            className={`rounded-lg px-3.5 py-1.5 font-medium transition-colors ${
              mode === 'handwritten'
                ? 'bg-surface font-semibold text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Рукописний запис лікаря
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('printed')
              setIsScanning(false)
            }}
            className={`rounded-lg px-3.5 py-1.5 font-medium transition-colors ${
              mode === 'printed'
                ? 'bg-surface font-semibold text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Друкований бланк / Лабораторія
          </button>
        </div>

        <button
          type="button"
          onClick={handleScan}
          disabled={isScanning}
          className="inline-flex items-center gap-1.5 rounded-lg border border-teal/40 bg-primary-soft/60 px-3 py-1.5 text-xs font-semibold text-primary-strong hover:bg-primary-soft transition-colors disabled:opacity-50"
        >
          {isScanning ? (
            <Sparkles className="size-3.5 animate-spin text-teal" />
          ) : (
            <RotateCcw className="size-3.5 text-teal" />
          )}
          <span>{isScanning ? 'Сканування...' : 'Повторити розпізнавання'}</span>
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Left Document Image / Simulation with Scan Beam */}
        <div className="relative rounded-xl border border-border bg-[#faf6ed] p-5 shadow-inner overflow-hidden min-h-[220px] flex flex-col justify-between">
          {/* Label chip */}
          <div className="flex items-center justify-between text-[0.7rem] font-mono text-[#8a7f70] pb-2 border-b border-[#e5dcce]">
            <span>{mode === 'handwritten' ? 'Знімок щоденника лікаря' : 'Скан бланка аналізу'}</span>
            <span>Фото 12 Мп</span>
          </div>

          {/* Document Content Simulation */}
          <div className="my-auto py-2">
            {mode === 'handwritten' ? (
              <div className="space-y-2 italic font-serif text-sm text-[#443827] leading-relaxed select-none transform -rotate-0.5">
                <p className="border-b border-dashed border-[#dcd3c3] pb-1">
                  14.05. Д-з: ІХС. Стаб. стенокардія II ФК. СН I ст.
                </p>
                <p className="border-b border-dashed border-[#dcd3c3] pb-1">
                  ФВ 54%. Кор-л: 75 мг ввечері, Бісопролол 5 мг, Аторвастатин 20 мг.
                </p>
              </div>
            ) : (
              <div className="space-y-1.5 font-mono text-xs text-[#2b2b2b] select-none">
                <p className="font-bold border-b border-[#ddd] pb-1">КЛІНІКО-ДІАГНОСТИЧНА ЛАБОРАТОРІЯ</p>
                <p>Глюкоза крові: 6.8 ммоль/л (норма 3.9-5.9)</p>
                <p>HbA1c: 7.2% | Креатинін: 94 мкмоль/л | eGFR: 74</p>
              </div>
            )}
          </div>

          {/* Animated Scan Beam */}
          {isScanning && !reduce && (
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ repeat: 1, duration: 1.6, ease: 'easeInOut' }}
              className="absolute inset-x-0 h-1 bg-gradient-to-r from-teal via-mint to-teal shadow-[0_0_12px_2px_rgba(23,184,166,0.8)] pointer-events-none"
            />
          )}

          <div className="text-[0.68rem] text-[#8a7f70] flex items-center gap-1 pt-2 border-t border-[#e5dcce]">
            <FileSearch className="size-3" />
            <span>Демонстрація: реальний файл на сервер не передається</span>
          </div>
        </div>

        {/* Right Output Structured Text */}
        <div className="rounded-xl border border-border bg-surface p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="font-semibold text-xs text-foreground flex items-center gap-1.5">
                <ScanText className="size-4 text-teal" /> Розпізнаний структурований текст
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-teal hover:bg-primary-soft transition-colors"
              >
                {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                <span>{copied ? 'Скопійовано' : 'Копіювати'}</span>
              </button>
            </div>

            <p className="mt-3 font-mono text-xs text-foreground leading-relaxed bg-surface-muted/60 p-3 rounded-lg border border-border">
              {currentResult}
            </p>
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between text-[0.7rem] text-subtle-foreground">
            <span className="flex items-center gap-1 text-primary-strong font-medium">
              <Check className="size-3.5 text-teal" /> Готово для вставки в ЕСОЗ
            </span>
            <span>OCR AI v4.2</span>
          </div>
        </div>
      </div>
    </div>
  )
}
