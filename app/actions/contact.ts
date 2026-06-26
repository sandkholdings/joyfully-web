"use server";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const honeypot = formData.get("website") as string;
  if (honeypot) return { status: "error", message: "Invalid submission." };

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();
  const recaptchaToken = formData.get("recaptchaToken") as string;

  if (!name || !email || !message) {
    return { status: "error", message: "必須項目をすべて入力してください。" };
  }

  // reCAPTCHA v3 verification (env gate)
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (recaptchaSecret && recaptchaToken) {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
    });
    const data = await res.json();
    if (!data.success || data.score < 0.5) {
      return { status: "error", message: "送信に失敗しました。もう一度お試しください。" };
    }
  }

  // Send email via Resend (env gate)
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: "Joyfully お問い合わせ <noreply@joyfully.jp>",
      to: "kengo@delqui.io",
      subject: `【Joyfully】お問い合わせ: ${name}様`,
      text: `名前: ${name}\nメール: ${email}\n\n${message}`,
    });
  } else {
    console.log("[contact]", { name, email, message });
  }

  return { status: "success" };
}
