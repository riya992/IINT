export const WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/HqHGx9fqglZ3WKDw0p58Us";

export const IINT_WEBSITE_URL = "https://www.iintindia.com";
export const IINT_WEBSITE_DISPLAY = "www.iintindia.com";

export interface WhatsAppEnquiryDetails {
  name?: string;
  phone?: string;
  email?: string;
  state?: string;
  city?: string;
  course?: string;
  message?: string;
}

const STORAGE_KEY = "iint_whatsapp_enquiry";

export function saveWhatsAppEnquiry(details: WhatsAppEnquiryDetails): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(details));
  } catch {
    // ignore storage errors
  }
}

export function getWhatsAppEnquiry(): WhatsAppEnquiryDetails {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WhatsAppEnquiryDetails) : {};
  } catch {
    return {};
  }
}

export function buildWhatsAppMessage(
  details: WhatsAppEnquiryDetails = getWhatsAppEnquiry()
): string {
  const lines = ["Hello IINT Team", ""];

  if (details.name?.trim()) lines.push(`Name: ${details.name.trim()}`);
  if (details.phone?.trim()) lines.push(`Phone: ${details.phone.trim()}`);
  if (details.email?.trim()) lines.push(`Email: ${details.email.trim()}`);
  if (details.state?.trim()) lines.push(`State: ${details.state.trim()}`);
  if (details.city?.trim()) lines.push(`City: ${details.city.trim()}`);
  if (details.course?.trim()) lines.push(`Course: ${details.course.trim()}`);
  if (details.message?.trim()) lines.push(`Message: ${details.message.trim()}`);

  if (lines.length === 2) {
    lines.push(
      "I am interested in IINT courses and admissions. Please guide me."
    );
  }

  lines.push("", `Website: ${IINT_WEBSITE_DISPLAY}`);
  return lines.join("\n");
}

/** Copy enquiry message, then open the WhatsApp group invite. */
export async function openWhatsAppGroupWithEnquiry(
  details?: WhatsAppEnquiryDetails
): Promise<boolean> {
  if (details) saveWhatsAppEnquiry(details);

  const message = buildWhatsAppMessage(details ?? getWhatsAppEnquiry());
  let copied = false;

  try {
    await navigator.clipboard.writeText(message);
    copied = true;
  } catch {
    copied = false;
  }

  window.open(WHATSAPP_GROUP_URL, "_blank", "noopener,noreferrer");
  return copied;
}

export function handleWhatsAppGroupClick(
  details?: WhatsAppEnquiryDetails
): void {
  void openWhatsAppGroupWithEnquiry(details);
}
