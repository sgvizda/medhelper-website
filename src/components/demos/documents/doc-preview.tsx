'use client'

import * as React from 'react'
import { useState } from 'react'
import { FileText, AlertCircle, Check, ArrowRight } from 'lucide-react'

export function DocumentsPreview() {
  const [activeDoc, setActiveDoc] = useState<'003_diary' | '027' | '028'>(
    '003_diary',
  )

  return (
    <div className="surface-card rounded-2xl border border-border p-5 sm:p-7 shadow-float">
      {/* Document Selector Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-5 border-b border-border">
        {[
          { id: '003_diary', label: '№ 003/о · Щоденник (п. 43)' },
          { id: '027', label: '№ 027/о · Виписка' },
          { id: '028', label: '№ 028/о · Направлення' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveDoc(tab.id as never)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeDoc === tab.id
                ? 'bg-ink text-white font-semibold shadow-sm'
                : 'bg-surface-muted text-muted-foreground hover:bg-surface hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Input Clinical Note */}
        <div className="md:col-span-5 rounded-xl border border-border bg-surface-muted/50 p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <span>Вихідний клінічний опис</span>
            <span className="font-mono text-[0.7rem] text-primary-strong">
              Вільний текст
            </span>
          </div>

          <p className="font-mono text-xs text-foreground/90 leading-relaxed bg-surface p-3 rounded-lg border border-border">
            «Хворий 64 р., надійшов 12.03 зі скаргами на задишку при незначному
            фіз. навантаженні, набряки гомілок. АТ 160/95 мм рт.ст., ЧСС 88/хв,
            ритм синусовий. 13.03: на фоні діуретиків задишка зменшилась, АТ
            135/80, діурез достатній. 14.03: стан стабільний, набряки регресували,
            готується до виписки.»
          </p>

          <div className="flex items-center gap-2 text-xs text-teal font-medium pt-1">
            <ArrowRight className="size-4 shrink-0" />
            <span>Автоматичне формування медичного бланка</span>
          </div>
        </div>

        {/* Structured Output Form Sheet */}
        <div className="md:col-span-7 rounded-xl border border-border-strong bg-surface p-4 sm:p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-teal" />
              <span className="font-semibold text-xs text-foreground">
                {activeDoc === '003_diary'
                  ? 'Форма № 003/о · Пункт 43 (Листок щоденникових записів)'
                  : activeDoc === '027'
                  ? 'Форма № 027/о · Виписка з медичної карти'
                  : 'Форма № 028/о · Консультативний висновок'}
              </span>
            </div>
            <span className="rounded bg-teal/10 px-2 py-0.5 text-[0.65rem] font-semibold text-primary-strong">
              Структуровано
            </span>
          </div>

          {/* Table / Diary entries */}
          <div
            tabIndex={0}
            role="region"
            aria-label="Таблиця щоденникових записів форми 003/о"
            className="overflow-x-auto text-xs focus-visible:outline-2 focus-visible:outline-teal rounded-lg"
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border font-semibold text-muted-foreground bg-surface-muted/30">
                  <th className="py-2 px-2.5">Дата / Час</th>
                  <th className="py-2 px-2.5">Перебіг хвороби / Стан</th>
                  <th className="py-2 px-2.5">Призначення</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-2.5 px-2.5 font-mono text-[0.72rem] align-top text-muted-foreground">
                    12.03.2026<br />10:30
                  </td>
                  <td className="py-2.5 px-2.5 align-top space-y-1">
                    <p className="font-medium text-foreground">
                      Скарги на задишку, набряки гомілок.
                    </p>
                    <p className="text-[0.72rem] text-muted-foreground">
                      Об-но: АТ 160/95 мм рт. ст., ЧСС 88/хв, тони серця приглушені.
                    </p>
                    {/* Missing data callout */}
                    <div className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-[0.68rem] text-amber-700 font-medium border border-amber-500/20">
                      <AlertCircle className="size-3" />
                      <span>SpO₂: не вказано — очікує оновлення</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-2.5 align-top font-mono text-[0.72rem] text-muted-foreground">
                    Торасемід 20 мг в/в<br />
                    Еналаприл 10 мг<br />
                    Контроль АТ/ЧСС
                  </td>
                </tr>

                <tr>
                  <td className="py-2.5 px-2.5 font-mono text-[0.72rem] align-top text-muted-foreground">
                    13.03.2026<br />09:15
                  </td>
                  <td className="py-2.5 px-2.5 align-top space-y-1">
                    <p className="font-medium text-foreground">
                      Позитивна динаміка. Задишка зменшилась.
                    </p>
                    <p className="text-[0.72rem] text-muted-foreground">
                      Об-но: АТ 135/80 мм рт. ст., діурез достатній.
                    </p>
                  </td>
                  <td className="py-2.5 px-2.5 align-top font-mono text-[0.72rem] text-muted-foreground">
                    Торасемід 10 мг per os<br />
                    Режим II, стіл №10
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between text-[0.7rem] text-subtle-foreground">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <Check className="size-3.5" /> Жодних вигаданих симптомів чи призначень
            </span>
            <span className="font-mono">МОЗ України</span>
          </div>
        </div>
      </div>
    </div>
  )
}
