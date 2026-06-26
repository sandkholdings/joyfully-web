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

  // Post to Slack via slack-gateway
  const gatewayUrl = process.env.SLACK_GATEWAY_URL;
  const gatewayKey = process.env.SLACK_GATEWAY_INTERNAL_KEY;
  const channel = process.env.INQUIRY_SLACK_CHANNEL ?? "C0ARWPK4CLS";

  if (gatewayUrl && gatewayKey) {
    await fetch(`${gatewayUrl}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Internal-Key": gatewayKey,
      },
      body: JSON.stringify({
        channel,
        text: `📥 新規問い合わせ — joyfully.jp`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `📥 *新規問い合わせ* — joyfully.jp\n• 氏名: *${name}*\n• メール: ${email}\n• 内容: ${message}`,
            },
          },
        ],
      }),
    });
  } else {
    console.log("[contact]", { name, email, message });
  }

  return { status: "success" };
}
