"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/atoms/Button";
import { useLanguage } from "@/i18n/LanguageContext";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "loading" | "success" | "error";

const inputStyles =
  "w-full rounded-lg border border-theme bg-theme-surface px-4 py-2.5 text-sm text-theme placeholder:text-theme-faint outline-none transition-colors focus:border-green-500/60";

export default function ContactForm() {
  const { t } = useLanguage();
  const f = t.contact.form;
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "Novo contato pelo portfólio");

    setStatus("loading");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-theme-muted">
          {f.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder={f.namePlaceholder}
          className={inputStyles}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-theme-muted">
          {f.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={f.emailPlaceholder}
          className={inputStyles}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-theme-muted">
          {f.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={f.messagePlaceholder}
          className={`${inputStyles} resize-none`}
        />
      </div>

      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        {status === "loading" ? f.submitting : f.submit}
      </Button>

      {status === "success" && (
        <p className="text-sm text-green-400">{f.success}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">
          {WEB3FORMS_ACCESS_KEY ? f.error : f.notConfigured}
        </p>
      )}
    </form>
  );
}
