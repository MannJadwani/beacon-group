"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Job = {
  title: string;
  location: string;
  href: string;
};

type FormState = {
  role: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  graduate: string;
  postGraduate: string;
  department: string;
  currentOrganization: string;
  currentDesignation: string;
  currentCtc: string;
  expectedCtc: string;
  noticePeriodDays: string;
  message: string;
  consent: boolean;
};

const defaultFormState: FormState = {
  role: "",
  fullName: "",
  email: "",
  phone: "",
  location: "",
  graduate: "",
  postGraduate: "",
  department: "",
  currentOrganization: "",
  currentDesignation: "",
  currentCtc: "",
  expectedCtc: "",
  noticePeriodDays: "",
  message: "",
  consent: false,
};

function buildMailto({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${to}?${params.toString()}`;
}

function stringifyApplication(form: FormState) {
  return [
    "BEACON TRUSTEESHIP - JOB APPLICATION",
    "",
    `Role: ${form.role}`,
    "",
    "APPLICANT",
    `Name: ${form.fullName}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `Location: ${form.location}`,
    "",
    "EDUCATION",
    `Graduate: ${form.graduate}`,
    `Post Graduate: ${form.postGraduate}`,
    "",
    "WORK",
    `Department: ${form.department}`,
    `Current Organization: ${form.currentOrganization}`,
    `Current Designation: ${form.currentDesignation}`,
    `Current CTC: ${form.currentCtc}`,
    `Expected CTC: ${form.expectedCtc}`,
    `Notice Period (days): ${form.noticePeriodDays}`,
    "",
    "NOTES",
    form.message,
    "",
    "ATTACHMENTS",
    "Please attach your CV / resume to this email.",
  ].join("\n");
}

export function CareersApplyForm({
  jobs,
  resumeEmail,
}: {
  jobs: Job[];
  resumeEmail: string;
}) {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role") ?? "";
  const defaultRole = roleParam || jobs[0]?.title || "";

  const [form, setForm] = useState<FormState>({
    ...defaultFormState,
    role: defaultRole,
  });

  const [status, setStatus] = useState<string>("");

  const canSubmit = useMemo(() => {
    return Boolean(
      form.role &&
        form.fullName.trim() &&
        form.email.trim() &&
        form.phone.trim() &&
        form.consent,
    );
  }, [form]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const applicationBody = useMemo(() => stringifyApplication(form), [form]);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(applicationBody);
      setStatus("Copied application summary to clipboard.");
    } catch {
      setStatus("Could not copy to clipboard. Please copy manually.");
    }
  }

  function openEmailDraft() {
    const subject = `Job Application - ${form.role}`;
    const mailto = buildMailto({
      to: resumeEmail,
      subject,
      body: applicationBody,
    });
    window.location.href = mailto;
  }

  return (
    <section id="apply" className="scroll-mt-28" aria-label="Apply">
      <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
        <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
          <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
          Apply
        </span>
        <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
          Submit your application
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
          This form generates an email draft to <span className="font-semibold">{resumeEmail}</span>.
          Attach your CV after the draft opens.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12" data-aos="fade-up" data-aos-delay={150}>
        <div className="lg:col-span-4">
          <div className="border border-primary-navy/10 bg-white">
            <div className="border-b border-primary-navy/10 px-6 py-5">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                Case File
              </p>
            </div>

            <div className="px-6 py-5 text-sm">
              <div className="flex items-start justify-between gap-6">
                <span className="text-primary-navy/50">Role</span>
                <span className="max-w-[220px] text-right font-semibold text-primary-navy">
                  {form.role || "-"}
                </span>
              </div>
              <div className="mt-3 flex items-start justify-between gap-6">
                <span className="text-primary-navy/50">Applicant</span>
                <span className="max-w-[220px] truncate text-right font-semibold text-primary-navy">
                  {form.fullName || "-"}
                </span>
              </div>
              <div className="mt-3 flex items-start justify-between gap-6">
                <span className="text-primary-navy/50">Email</span>
                <span className="max-w-[220px] truncate text-right font-semibold text-primary-navy">
                  {form.email || "-"}
                </span>
              </div>
              <div className="mt-3 flex items-start justify-between gap-6">
                <span className="text-primary-navy/50">Phone</span>
                <span className="max-w-[220px] truncate text-right font-semibold text-primary-navy">
                  {form.phone || "-"}
                </span>
              </div>

              <div className="mt-6 border-t border-primary-navy/10 pt-6">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="w-full bg-primary-navy px-6 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-white hover:bg-accent-gold"
                >
                  Copy Summary
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setForm({ ...defaultFormState, role: defaultRole });
                    setStatus("");
                  }}
                  className="mt-3 w-full border border-primary-navy/10 bg-white px-6 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy hover:bg-primary-navy/[0.02]"
                >
                  Reset
                </button>
                {status && <p className="mt-4 text-sm text-primary-navy/60">{status}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <form
            className="bg-primary-navy/10 p-px"
            onSubmit={(e) => {
              e.preventDefault();
              setStatus("");
              if (!canSubmit) {
                setStatus("Please fill the required fields and confirm consent.");
                return;
              }
              openEmailDraft();
            }}
          >
            <div className="bg-white p-8 lg:p-10">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="role" className="text-sm font-semibold text-primary-navy">
                    Role*
                  </label>
                  <select
                    id="role"
                    value={form.role}
                    onChange={(e) => setField("role", e.target.value)}
                    className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                    required
                  >
                    {jobs.map((job) => (
                      <option key={job.title} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="location" className="text-sm font-semibold text-primary-navy">
                    Current location
                  </label>
                  <input
                    id="location"
                    value={form.location}
                    onChange={(e) => setField("location", e.target.value)}
                    className="w-full border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                    placeholder="City, state"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-sm font-semibold text-primary-navy">
                    Name*
                  </label>
                  <input
                    id="fullName"
                    value={form.fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                    className="w-full border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-primary-navy">
                    Email*
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className="w-full border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-primary-navy">
                    Phone*
                  </label>
                  <input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    className="w-full border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                    placeholder="+91 ..."
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="department" className="text-sm font-semibold text-primary-navy">
                    Department
                  </label>
                  <select
                    id="department"
                    value={form.department}
                    onChange={(e) => setField("department", e.target.value)}
                    className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                  >
                    <option value="">Select</option>
                    <option value="Legal">Legal</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Operations">Operations</option>
                    <option value="Company Secretary">Company Secretary</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="graduate" className="text-sm font-semibold text-primary-navy">
                    Graduate
                  </label>
                  <select
                    id="graduate"
                    value={form.graduate}
                    onChange={(e) => setField("graduate", e.target.value)}
                    className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                  >
                    <option value="">Select</option>
                    <option value="BCom">BCom</option>
                    <option value="BMS">BMS</option>
                    <option value="BBI">BBI</option>
                    <option value="BAF">BAF</option>
                    <option value="BBA">BBA</option>
                    <option value="LLB">LLB</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="postGraduate" className="text-sm font-semibold text-primary-navy">
                    Post graduate
                  </label>
                  <select
                    id="postGraduate"
                    value={form.postGraduate}
                    onChange={(e) => setField("postGraduate", e.target.value)}
                    className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                  >
                    <option value="">Select</option>
                    <option value="MBA">MBA</option>
                    <option value="MCom">MCom</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="currentOrganization" className="text-sm font-semibold text-primary-navy">
                    Current organization
                  </label>
                  <input
                    id="currentOrganization"
                    value={form.currentOrganization}
                    onChange={(e) => setField("currentOrganization", e.target.value)}
                    className="w-full border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                    placeholder="Company"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="currentDesignation" className="text-sm font-semibold text-primary-navy">
                    Current designation
                  </label>
                  <input
                    id="currentDesignation"
                    value={form.currentDesignation}
                    onChange={(e) => setField("currentDesignation", e.target.value)}
                    className="w-full border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                    placeholder="Title"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="currentCtc" className="text-sm font-semibold text-primary-navy">
                    Current CTC
                  </label>
                  <input
                    id="currentCtc"
                    value={form.currentCtc}
                    onChange={(e) => setField("currentCtc", e.target.value)}
                    className="w-full border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                    placeholder="(optional)"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="expectedCtc" className="text-sm font-semibold text-primary-navy">
                    Expected CTC
                  </label>
                  <input
                    id="expectedCtc"
                    value={form.expectedCtc}
                    onChange={(e) => setField("expectedCtc", e.target.value)}
                    className="w-full border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                    placeholder="(optional)"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="noticePeriodDays" className="text-sm font-semibold text-primary-navy">
                    Notice period (days)
                  </label>
                  <input
                    id="noticePeriodDays"
                    value={form.noticePeriodDays}
                    onChange={(e) => setField("noticePeriodDays", e.target.value)}
                    className="w-full border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="attachment" className="text-sm font-semibold text-primary-navy">
                    Attach CV (optional)
                  </label>
                  <input
                    id="attachment"
                    type="file"
                    className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-sm text-primary-navy/70"
                  />
                  <p className="text-xs text-primary-navy/50">
                    Attachments are not sent automatically; add the file to the email manually.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-semibold text-primary-navy">
                    Note
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setField("message", e.target.value)}
                    className="h-28 w-full resize-none border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                    placeholder="Optional message"
                  />
                </div>
              </div>

              <label className="mt-6 flex items-start gap-3 border border-primary-navy/10 bg-primary-navy/[0.02] px-4 py-4">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setField("consent", e.target.checked)}
                  className="mt-1"
                  required
                />
                <span className="text-sm text-primary-navy/70">
                  I confirm the information provided is accurate.
                </span>
              </label>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className={
                    "px-8 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-white " +
                    (canSubmit ? "bg-primary-navy hover:bg-accent-gold" : "bg-primary-navy/40 cursor-not-allowed")
                  }
                  disabled={!canSubmit}
                >
                  Generate Email Draft
                </button>

                <div className="text-sm text-primary-navy/50">
                  Recipient: <span className="font-semibold">{resumeEmail}</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
