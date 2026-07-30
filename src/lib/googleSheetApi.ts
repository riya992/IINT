const GOOGLE_SHEET_URL =
  import.meta.env.VITE_GOOGLE_SHEET_URL ||
  "https://script.google.com/macros/s/AKfycbz4ruVO8cg7lAa7dXIs5GyWOp1QIO0ZQ-YrxT3fPK3tLnQVLgiO6Os8iXO1DT10YYdE/exec";

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

export async function submitStudentEnquiry(
  data: StudentEnquiryPayload,
  formType: FormType = "enquiry"
): Promise<SubmitResult> {
  if (!GOOGLE_SHEET_URL) {
    return { success: false, error: "Form backend is not configured." };
  }

  const payload = {
    formType,
    name: data.name,
    course: data.course,
    state: data.state,
    city: data.city,
    email: data.email,
    phone: data.phone,
    submittedAt: new Date().toISOString(),
  };

  try {
    // text/plain avoids CORS preflight — recommended for Google Apps Script web apps.
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}

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
  const result = await submitStudentEnquiry(
    {
      name: data.name,
      course: data.course || data.program || "",
      state: data.state || "",
      city: data.city || "",
      email: data.email || "",
      phone: data.phone || "",
    },
    data.formType
  );

  return result.success;
}
