const DEFAULT_GAS_URL =
  "https://script.google.com/macros/s/AKfycby0fqdJ0UH5I2zRCwbh2v3wKUYrdNcv6USrVTGiHjAhC_ahnt0RNvLMU4YVhMAMyZrZ/exec";

function getGoogleSheetUrl(): string {
  const raw = import.meta.env.VITE_GOOGLE_SHEET_URL as string | undefined;
  const url = (raw || DEFAULT_GAS_URL).trim().replace(/^["']|["']$/g, "");
  return url;
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
    submittedAt: new Date().toISOString(),
  };
}

async function sendToGoogleSheet(
  url: string,
  payload: Record<string, string>
): Promise<void> {
  await fetch(url, {
    method: "POST",
    mode: "no-cors",
    keepalive: true,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams(payload),
  });
}

function sendBeaconFallback(url: string, payload: Record<string, string>): void {
  const img = new Image();
  img.referrerPolicy = "no-referrer";
  img.src = `${url}?${new URLSearchParams(payload).toString()}&_t=${Date.now()}`;
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
    await sendToGoogleSheet(url, fields);
  } catch {
    sendBeaconFallback(url, fields);
  }

  return { success: true };
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

/** Dev-only: sends one test row to verify Google Sheet connection. */
export async function submitLocalSheetTestRow(): Promise<SubmitResult> {
  return submitStudentEnquiry(
    {
      name: "Localhost Test Row",
      course: "Sheet Connection Check",
      state: "Haryana",
      city: "Sonepat",
      email: "test@iint.local",
      phone: "9999999999",
    },
    "enquiry"
  );
}

export function runLocalSheetTestOnce(): void {
  if (!import.meta.env.DEV) return;
  if (sessionStorage.getItem("iint_sheet_test_sent") === "1") return;

  sessionStorage.setItem("iint_sheet_test_sent", "1");
  void submitLocalSheetTestRow().then(() => {
    console.info("[IINT] Local sheet test row sent — check your Google Sheet.");
  });
}
