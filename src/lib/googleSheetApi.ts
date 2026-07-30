const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

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

export async function submitToGoogleSheet(data: SheetSubmission): Promise<boolean> {
  if (!GOOGLE_SHEET_URL) {
    console.warn("VITE_GOOGLE_SHEET_URL is not configured.");
    return false;
  }

  const payload = {
    ...data,
    submittedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) return true;
  } catch {
    // GAS deployments often block CORS; fall back to no-cors send.
  }

  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (error) {
    console.error("Failed to submit form to Google Sheet:", error);
    return false;
  }
}
