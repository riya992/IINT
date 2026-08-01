const DEFAULT_GAS_URL =
  "https://script.google.com/macros/s/AKfycbyOYqihZ7QLMUlg5XubFGmnSrneuUTqATIwHzU24hkTwcCupgY9rYXbg4WGvBMg_iqm/exec";

function getGoogleSheetUrl(): string {
  const raw = import.meta.env.VITE_GOOGLE_SHEET_URL as string | undefined;
  const url = (raw || DEFAULT_GAS_URL).trim().replace(/^["']|["']$/g, "");
  return url;
}

function getEnquiryApiToken(): string {
  const raw = import.meta.env.VITE_ENQUIRY_API_TOKEN as string | undefined;
  return (raw || "").trim().replace(/^["']|["']$/g, "");
}

export interface StudentEnquiryPayload {
  name: string;
  course: string;
  state: string;
  city: string;
  email: string;
  phone: string;
}

export type SubmitResult = {
  success: boolean;
  error?: string;
};

export type FormType = "admission" | "contact" | "enquiry";

export interface SheetSubmission {
  formType: FormType;
  name: string;
  email?: string;
  phone?: string;
  state?: string;
  city?: string;
  subject?: string;
  message?: string;
  vision?: string;
  program?: string;
  course?: string;
  archetype?: string;
}

function buildPayload(
  data: StudentEnquiryPayload & Partial<SheetSubmission>,
  formType: FormType
): Record<string, string> {
  const submittedAt = new Date().toISOString();
  const submissionId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `iint-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return {
    formType,
    name: (data.name || "").trim(),
    phone: (data.phone || "").trim(),
    email: (data.email || "").trim(),
    state: (data.state || "").trim(),
    city: (data.city || "").trim(),
    course: (data.course || data.program || data.subject || "").trim(),
    program: (data.program || data.course || "").trim(),
    subject: (data.subject || "").trim(),
    message: (data.message || data.vision || "").trim(),
    vision: (data.vision || "").trim(),
    archetype: (data.archetype || "").trim(),
    sourcePage: typeof window !== "undefined" ? window.location.href : "",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    submittedAt,
    submissionId,
    apiToken: getEnquiryApiToken(),
  };
}

function ensureHiddenFrame(): HTMLIFrameElement {
  let iframe = document.getElementById("iint-gas-frame") as HTMLIFrameElement | null;
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.name = "iint-gas-frame";
    iframe.id = "iint-gas-frame";
    iframe.style.display = "none";
    iframe.setAttribute("aria-hidden", "true");
    document.body.appendChild(iframe);
  }
  return iframe;
}

function submitViaHiddenForm(
  url: string,
  payload: Record<string, string>
): Promise<void> {
  return new Promise((resolve) => {
    ensureHiddenFrame();

    const form = document.createElement("form");
    form.method = "GET";
    form.action = url;
    form.target = "iint-gas-frame";
    form.style.display = "none";
    form.acceptCharset = "UTF-8";

    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    window.setTimeout(() => resolve(), 2200);
  });
}

export async function submitStudentEnquiry(
  data: StudentEnquiryPayload,
  formType: FormType = "enquiry"
): Promise<SubmitResult> {
  const url = getGoogleSheetUrl();
  if (!url) {
    return { success: false, error: "Form backend is not configured." };
  }

  const fields = buildPayload(data, formType);

  try {
    await submitViaHiddenForm(url, fields);
    return { success: true };
  } catch {
    return { success: false, error: "Could not submit enquiry. Please try again." };
  }
}

export async function submitToGoogleSheet(data: SheetSubmission): Promise<boolean> {
  const result = await submitStudentEnquiry(
    {
      name: data.name,
      course: data.course || data.program || data.subject || "",
      state: data.state || "",
      city: data.city || "",
      email: data.email || "",
      phone: data.phone || "",
      ...data,
    },
    data.formType
  );

  return result.success;
}
