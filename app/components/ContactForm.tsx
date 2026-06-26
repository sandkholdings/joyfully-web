"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "../actions/contact";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (key: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const initial: ContactState = { status: "idle" };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (siteKey && window.grecaptcha) {
      await new Promise<void>((r) => window.grecaptcha!.ready(r));
      const token = await window.grecaptcha.execute(siteKey, { action: "contact" });
      fd.set("recaptchaToken", token);
    }
    await action(fd);
  }

  if (state.status === "success") {
    return (
      <div className="text-center py-12">
        <p className="text-2xl font-bold text-gray-900 mb-2">送信しました</p>
        <p className="text-gray-500">お問い合わせありがとうございます。後ほどご連絡いたします。</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="recaptchaToken" />

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="山田 太郎"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="taro@example.com"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
          お問い合わせ内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="ご質問・ご相談内容をご記入ください"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none"
        />
      </div>

      {state.status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-600">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors"
      >
        {pending ? "送信中..." : "送信する"}
      </button>
    </form>
  );
}
