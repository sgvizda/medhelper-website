'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { leadSchema, type LeadInput } from '@/lib/validation/lead'
import { submitLead } from '@/actions/submit-lead'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [startedAt, setStartedAt] = useState<number>(0)

  useEffect(() => {
    setStartedAt(Date.now())
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      organization: '',
      position: '',
      email: '',
      phone: '',
      message: '',
      consent: true,
      website: '',
    },
  })

  const messageText = watch('message') || ''

  const onSubmit = async (values: LeadInput) => {
    try {
      const res = await submitLead({
        ...values,
        startedAt,
      })

      if (res.ok) {
        setSubmitted(true)
        toast.success('Дякуємо! Ваше повідомлення успішно надіслано.')
        reset()
      } else {
        toast.error(res.error || 'Помилка при надсиланні форми')
        if (res.fieldErrors) {
          for (const [key, msg] of Object.entries(res.fieldErrors)) {
            setError(key as keyof LeadInput, { message: msg })
          }
        }
      }
    } catch {
      toast.error('Не вдалося зʼєднатися з сервером. Перевірте інтернет-зʼєднання.')
    }
  }

  if (submitted) {
    return (
      <div className="surface-card rounded-2xl border border-teal/30 p-8 sm:p-10 text-center space-y-5 bg-gradient-to-b from-primary-soft/40 to-surface">
        <div className="flex size-14 mx-auto items-center justify-center rounded-2xl bg-teal text-white shadow-glow">
          <CheckCircle2 className="size-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-h3 font-semibold text-foreground">
            Повідомлення надіслано
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Дякуємо за інтерес до MedHelper. Наша команда опрацює ваш запит та
            звʼяжеться з вами за вказаним email найближчим часом.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false)
            setStartedAt(Date.now())
          }}
          className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-surface-muted transition-colors"
        >
          Надіслати ще одне звернення
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="surface-card rounded-2xl border border-border p-6 sm:p-8 lg:p-10 shadow-card space-y-6"
    >
      {/* Honeypot field - invisible to human users */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website-hp">Не заповнюйте це поле:</label>
        <input
          id="website-hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-semibold text-foreground">
            Ваше імʼя <span className="text-teal">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Олена Ковальчук"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full h-11 px-3.5 rounded-xl border bg-surface text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal ${
              errors.name ? 'border-danger' : 'border-border-strong'
            }`}
            {...register('name')}
          />
          {errors.name && (
            <p id="name-error" className="text-[0.75rem] text-danger">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Position / Specialty */}
        <div className="space-y-1.5">
          <label
            htmlFor="position"
            className="text-xs font-semibold text-foreground"
          >
            Посада або спеціальність <span className="text-teal">*</span>
          </label>
          <input
            id="position"
            type="text"
            placeholder="Лікар-кардіолог / Зав. відділенням"
            aria-invalid={Boolean(errors.position)}
            aria-describedby={errors.position ? 'position-error' : undefined}
            className={`w-full h-11 px-3.5 rounded-xl border bg-surface text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal ${
              errors.position ? 'border-danger' : 'border-border-strong'
            }`}
            {...register('position')}
          />
          {errors.position && (
            <p id="position-error" className="text-[0.75rem] text-danger">
              {errors.position.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-foreground">
            Email <span className="text-teal">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="doctor@hospital.ua"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full h-11 px-3.5 rounded-xl border bg-surface text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal ${
              errors.email ? 'border-danger' : 'border-border-strong'
            }`}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className="text-[0.75rem] text-danger">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-xs font-semibold text-foreground">
            Телефон <span className="text-subtle-foreground font-normal">(необовʼязково)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+380 50 123 4567"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={`w-full h-11 px-3.5 rounded-xl border bg-surface text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal ${
              errors.phone ? 'border-danger' : 'border-border-strong'
            }`}
            {...register('phone')}
          />
          {errors.phone && (
            <p id="phone-error" className="text-[0.75rem] text-danger">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Organization */}
      <div className="space-y-1.5">
        <label
          htmlFor="organization"
          className="text-xs font-semibold text-foreground"
        >
          Медичний заклад <span className="text-subtle-foreground font-normal">(необовʼязково)</span>
        </label>
        <input
          id="organization"
          type="text"
          placeholder="КНП «Міська клінічна лікарня»"
          className="w-full h-11 px-3.5 rounded-xl border border-border-strong bg-surface text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
          {...register('organization')}
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="message" className="font-semibold text-foreground">
            Повідомлення <span className="text-teal">*</span>
          </label>
          <span className="font-mono text-[0.7rem] text-subtle-foreground">
            {messageText.length} / 2000
          </span>
        </div>
        <textarea
          id="message"
          rows={4}
          placeholder="Опишіть ваші потреби або питання щодо підключення платформи..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`w-full p-3.5 rounded-xl border bg-surface text-sm leading-relaxed transition-colors focus:outline-none focus:ring-2 focus:ring-teal resize-y min-h-[110px] ${
            errors.message ? 'border-danger' : 'border-border-strong'
          }`}
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" className="text-[0.75rem] text-danger">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Consent Checkbox */}
      <div className="space-y-1.5">
        <label className="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            className="size-4 mt-0.5 rounded border-border-strong text-teal focus:ring-teal"
            {...register('consent')}
          />
          <span className="text-xs text-muted-foreground leading-snug">
            Погоджуюся на обробку персональних даних відповідно до{' '}
            <Link
              href="/privacy"
              target="_blank"
              className="text-primary-strong underline hover:text-foreground"
            >
              Політики конфіденційності
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p className="text-[0.75rem] text-danger">{errors.consent.message}</p>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-muted/60 p-3 text-[0.75rem] text-muted-foreground">
        <AlertCircle className="size-4 shrink-0 text-primary-strong" />
        <span>
          <strong>Важливо:</strong> Не надсилайте у формі персональні медичні дані або виписки реальних пацієнтів.
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white font-medium text-sm transition-all duration-200 hover:bg-graphite hover:shadow-card active:scale-[0.99] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-teal"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin text-teal" />
            <span>Надсилання...</span>
          </>
        ) : (
          <>
            <span>Надіслати звернення</span>
            <Send className="size-4" />
          </>
        )}
      </button>
    </form>
  )
}
