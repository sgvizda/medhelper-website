'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import {
  Sparkles,
  RotateCcw,
  Check,
  Copy,
  Activity,
  ShieldAlert,
  FileText,
  AlertCircle,
  Terminal,
} from 'lucide-react'
import { toast } from 'sonner'
import { CountUp } from '@/components/motion/count-up'

export function HeroWorkspaceDemo() {
  const reduce = useReducedMotion()
  const [stage, setStage] = useState<'prompt' | 'analyzing' | 'complete'>(
    reduce ? 'complete' : 'prompt',
  )
  const [activeStep, setActiveStep] = useState(0)
  const [copied, setCopied] = useState(false)

  const medicalRecordText =
    'CHA₂DS₂-VASc: 5 б. (вік 72 р. — 1, АГ — 1, ЦД 2 — 1, інсульт — 2). Ризик ТЕ високий. HAS-BLED: 3 б. (АГ — 1, інсульт — 1, вік >65 — 1). Високий ризик кровотечі. Потребує оцінки ризик/користь ОАК та модифікації факторів ризику.'

  const handleCopy = () => {
    navigator.clipboard.writeText(medicalRecordText)
    setCopied(true)
    toast.success('Скопійовано для медичної карти')
    setTimeout(() => setCopied(false), 2500)
  }

  const handleReplay = () => {
    setStage('prompt')
    setActiveStep(0)
  }

  useEffect(() => {
    if (reduce) {
      setStage('complete')
      return
    }

    if (stage === 'prompt') {
      const t1 = setTimeout(() => {
        setStage('analyzing')
      }, 1400)
      return () => clearTimeout(t1)
    }

    if (stage === 'analyzing') {
      const tStep1 = setTimeout(() => setActiveStep(1), 800)
      const tStep2 = setTimeout(() => setActiveStep(2), 1600)
      const tComplete = setTimeout(() => setStage('complete'), 2400)

      return () => {
        clearTimeout(tStep1)
        clearTimeout(tStep2)
        clearTimeout(tComplete)
      }
    }
  }, [stage, reduce])

  return (
    <div className="relative mx-auto w-full max-w-4xl select-none">
      {/* Glow effects */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-r from-teal/20 via-mint/15 to-transparent blur-2xl"
      />

      {/* Floating badges around window on desktop */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-5 -left-4 z-20 hidden md:flex items-center gap-2 rounded-xl border border-border-strong bg-surface/95 px-3 py-1.5 shadow-card backdrop-blur-sm"
      >
        <span className="flex size-2 rounded-full bg-teal animate-pulse" />
        <span className="font-mono text-xs font-semibold text-foreground">
          МКХ-10-АМ: I48.1
        </span>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-4 -right-3 z-20 hidden md:flex items-center gap-2 rounded-xl border border-border-strong bg-surface/95 px-3 py-1.5 shadow-card backdrop-blur-sm"
      >
        <FileText className="size-3.5 text-teal" />
        <span className="text-xs font-medium text-foreground">
          Форма № 003/о (п. 43)
        </span>
      </div>

      {/* Main App Container */}
      <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-float">
        {/* Top Window Bar */}
        <div className="flex h-11 items-center justify-between border-b border-border bg-surface-muted/70 px-4">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#ff5f56]" />
            <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="size-2.5 rounded-full bg-[#27c93f]" />
            <div className="ml-3 hidden sm:flex items-center gap-2 font-mono text-xs text-subtle-foreground">
              <Terminal className="size-3.5 text-teal" />
              <span>MedHelper · Клінічний робочий простір</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-2.5 py-0.5 text-[0.7rem] font-semibold tracking-wide text-primary-strong uppercase">
              <Sparkles className="size-3" /> Демонстрація
            </span>
            {stage === 'complete' && (
              <button
                type="button"
                onClick={handleReplay}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-2"
                title="Перезапустити демонстрацію"
              >
                <RotateCcw className="size-3.5" />
                <span className="hidden sm:inline">Повторити</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-4 p-4 sm:p-6 min-h-[460px] flex flex-col justify-between">
          <div className="space-y-4">
            {/* User message */}
            <div className="flex items-start gap-3">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-ink text-white font-mono text-xs font-bold">
                М
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-surface-muted px-4 py-2.5 text-sm text-foreground max-w-xl border border-border/80">
                <p className="font-medium text-foreground">
                  Пацієнт 72 р., ФП, АГ, ЦД 2 типу, перенесений інсульт (2022).
                  Оцініть ризик тромбоемболії та кровотечі.
                </p>
              </div>
            </div>

            {/* Analysis Progress */}
            <AnimatePresence mode="wait">
              {stage === 'analyzing' && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-xl border border-teal/20 bg-primary-soft/30 p-4"
                >
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-primary-strong mb-3">
                    <Sparkles className="size-4 animate-spin text-teal" />
                    <span>Інтелектуальний аналіз клінічного запиту...</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      'Ідентифікація факторів ризику',
                      'Розрахунок CHA₂DS₂-VASc & HAS-BLED',
                      'Формування медичного висновку',
                    ].map((step, idx) => (
                      <div
                        key={step}
                        className={`flex items-center gap-2 rounded-lg p-2 text-xs transition-all ${
                          idx <= activeStep
                            ? 'bg-surface font-medium text-foreground shadow-sm'
                            : 'text-subtle-foreground opacity-60'
                        }`}
                      >
                        {idx < activeStep ? (
                          <Check className="size-3.5 text-teal" />
                        ) : idx === activeStep ? (
                          <div className="size-2 rounded-full bg-teal animate-ping" />
                        ) : (
                          <div className="size-2 rounded-full bg-border-strong" />
                        )}
                        <span className="truncate">{step}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Complete AI Answer */}
              {stage === 'complete' && (
                <motion.div
                  key="complete"
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-teal text-white shadow-sm">
                      <Sparkles className="size-4" />
                    </div>
                    <div className="space-y-3.5 flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        За наданими показниками розраховано клінічні шкали для
                        визначення тактики антикоагулянтної терапії:
                      </p>

                      {/* Scale Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* CHA2DS2-VASc Card */}
                        <div className="rounded-xl border border-border bg-surface-muted/40 p-3.5">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs tracking-wide text-foreground uppercase">
                              CHA₂DS₂-VASc Score
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-danger/10 px-2 py-0.5 text-xs font-semibold text-danger">
                              <ShieldAlert className="size-3" /> Високий ризик
                            </span>
                          </div>

                          <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-2xl font-bold font-mono text-foreground">
                              <CountUp to={5} />
                            </span>
                            <span className="text-xs text-muted-foreground">
                              балів із 9
                            </span>
                          </div>

                          <div className="mt-2.5 flex flex-wrap gap-1.5 text-[0.725rem]">
                            <span className="rounded-md bg-surface px-2 py-0.5 border border-border">
                              Вік 65–74 р. (+1)
                            </span>
                            <span className="rounded-md bg-surface px-2 py-0.5 border border-border">
                              АГ (+1)
                            </span>
                            <span className="rounded-md bg-surface px-2 py-0.5 border border-border">
                              ЦД 2 (+1)
                            </span>
                            <span className="rounded-md bg-surface px-2 py-0.5 border border-border font-medium text-primary-strong">
                              Інсульт / ТІА (+2)
                            </span>
                          </div>
                        </div>

                        {/* HAS-BLED Card */}
                        <div className="rounded-xl border border-border bg-surface-muted/40 p-3.5">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs tracking-wide text-foreground uppercase">
                              HAS-BLED Score
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-xs font-semibold text-[#8a5d10]">
                              <Activity className="size-3" /> Ризик кровотечі
                            </span>
                          </div>

                          <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-2xl font-bold font-mono text-foreground">
                              <CountUp to={3} />
                            </span>
                            <span className="text-xs text-muted-foreground">
                              бали (≥3: високий ризик)
                            </span>
                          </div>

                          <div className="mt-2.5 flex flex-wrap gap-1.5 text-[0.725rem]">
                            <span className="rounded-md bg-surface px-2 py-0.5 border border-border">
                              Гіпертензія (+1)
                            </span>
                            <span className="rounded-md bg-surface px-2 py-0.5 border border-border">
                              Інсульт в анамнезі (+1)
                            </span>
                            <span className="rounded-md bg-surface px-2 py-0.5 border border-border">
                              Вік &gt; 65 р. (+1)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Ready Medical Record Snippet */}
                      <div className="rounded-xl border border-border bg-surface p-3.5">
                        <div className="flex items-center justify-between pb-2 border-b border-border/80">
                          <span className="text-xs font-semibold text-muted-foreground">
                            Сформований фрагмент для медичної карти (форма № 003/о):
                          </span>
                          <button
                            type="button"
                            onClick={handleCopy}
                            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-teal hover:bg-primary-soft transition-colors"
                          >
                            {copied ? (
                              <Check className="size-3" />
                            ) : (
                              <Copy className="size-3" />
                            )}
                            <span>{copied ? 'Скопійовано' : 'Копіювати'}</span>
                          </button>
                        </div>
                        <p className="mt-2 font-mono text-xs leading-relaxed text-foreground bg-surface-muted/60 p-2.5 rounded-lg border border-border/50">
                          {medicalRecordText}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom subtle note */}
          <div className="pt-2 border-t border-border flex items-center justify-between text-[0.72rem] text-subtle-foreground">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="size-3.5 text-muted-foreground" />
              Приклад відповіді. Розрахунок потребує клінічної оцінки лікарем.
            </span>
            <span className="hidden sm:inline font-mono">
              ESC 2024 / МКХ-10-АМ
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
