const DEFAULT_GAS_URL =
  "https://script.google.com/macros/s/AKfycbxPFpQFK4MuoO-LK7QcT6LB3EKkNe-L2PMpUC2lHrW8YxIm6w9XScXl_SdGNoIDo8rb/exec";

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
  payload: Record<string, string>,
  method: "GET" | "POST"
): Promise<void> {
  return new Promise((resolve) => {
    ensureHiddenFrame();

    const form = document.createElement("form");
    form.method = method;
    form.action = method === "GET" ? `${url}?${new URLSearchParams(payload).toString()}` : url;
    form.target = "iint-gas-frame";
    form.style.display = "none";
    form.acceptCharset = "UTF-8";

    if (method === "POST") {
      Object.entries(payload).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    window.setTimeout(() => resolve(), 2200);
  });
}

function submitViaImageBeacon(url: string, payload: Record<string, string>): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.referrerPolicy = "no-referrer";
    img.src = `${url}?${new URLSearchParams(payload).toString()}&_t=${Date.now()}`;
    img.onload = () => resolve();
    img.onerror = () => resolve();
    window.setTimeout(() => resolve(), 1500);
  });
}

async function submitViaFetchNoCors(
  url: string,
  payload: Record<string, string>
): Promise<void> {
  await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams(payload),
  });
}

async function submitViaJsonNoCors(
  url: string,
  payload: Record<string, string>
): Promise<void> {
  await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
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

  // Try every reliable GAS pattern (GET works when doGet exists; POST when doPost exists)
  const attempts: Array<() => Promise<void>> = [
    () => submitViaHiddenForm(url, fields, "GET"),
    () => submitViaHiddenForm(url, fields, "POST"),
    () => submitViaImageBeacon(url, fields),
    () => submitViaFetchNoCors(url, fields),
    () => submitViaJsonNoCors(url, fields),
  ];

  for (const attempt of attempts) {
    try {
      await attempt();
    } catch {
      // Continue to next method
    }
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
