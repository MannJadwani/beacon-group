"use client";

import { useMemo, useState } from "react";

export type GrievanceScope = "SEBI" | "NON_SEBI";

export type GrievanceTrack = {
  id: string;
  regulator: GrievanceScope;
  title: string;
  description: string;
  complaintOptions?: string[];
};

type StepId = "investor" | "investment" | "complaint";

type WizardStep = {
  id: StepId;
  number: string;
  title: string;
  description: string;
};

const steps: WizardStep[] = [
  {
    id: "investor",
    number: "01",
    title: "Investor Details",
    description: "Your contact information",
  },
  {
    id: "investment",
    number: "02",
    title: "Investment Details",
    description: "Instrument / trust reference",
  },
  {
    id: "complaint",
    number: "03",
    title: "Complaint",
    description: "Issue description and supporting notes",
  },
];

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  address: string;

  issuer: string;
  isin: string;
  folio: string;
  amount: string;
  date: string;

  complaintType: string;
  complaintBody: string;
  consent: boolean;
};

const defaultFormState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",

  issuer: "",
  isin: "",
  folio: "",
  amount: "",
  date: "",

  complaintType: "",
  complaintBody: "",
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
  const params = new URLSearchParams({
    subject,
    body,
  });

  return `mailto:${to}?${params.toString()}`;
}

function stringifyCase(track: GrievanceTrack, form: FormState) {
  return [
    "BEACON TRUSTEESHIP - INVESTOR GRIEVANCE",
    "",
    `Product: ${track.title}`,
    `Regulator: ${track.regulator === "SEBI" ? "SEBI-regulated" : "Not regulated by SEBI"}`,
    form.complaintType ? `Complaint type: ${form.complaintType}` : "Complaint type: (not selected)",
    "",
    "INVESTOR DETAILS",
    `Name: ${form.fullName || ""}`,
    `Email: ${form.email || ""}`,
    `Phone: ${form.phone || ""}`,
    `Address: ${form.address || ""}`,
    "",
    "INVESTMENT DETAILS",
    `Issuer / Trust: ${form.issuer || ""}`,
    `ISIN: ${form.isin || ""}`,
    `Folio / Client ID: ${form.folio || ""}`,
    `Amount: ${form.amount || ""}`,
    `Relevant date: ${form.date || ""}`,
    "",
    "COMPLAINT",
    form.complaintBody || "",
  ].join("\n");
}

export function InvestorGrievanceWizard({
  tracks,
}: {
  tracks: GrievanceTrack[];
}) {
  const [scope, setScope] = useState<GrievanceScope>("SEBI");
  const scopedTracks = useMemo(
    () => tracks.filter((t) => t.regulator === scope),
    [tracks, scope],
  );

  const [trackId, setTrackId] = useState<string>(() => scopedTracks[0]?.id ?? tracks[0]?.id ?? "");
  const track = useMemo(() => tracks.find((t) => t.id === trackId) ?? scopedTracks[0] ?? tracks[0], [tracks, trackId, scopedTracks]);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [form, setForm] = useState<FormState>(defaultFormState);

  const [status, setStatus] = useState<string>("");

  const complaintOptions = track?.complaintOptions ?? ["Any other"]; // sensible default

  const caseText = useMemo(() => {
    if (!track) return "";
    return stringifyCase(track, form);
  }, [track, form]);

  const isStepValid = useMemo(() => {
    if (!track) return false;

    if (activeStep === 0) {
      return Boolean(form.fullName.trim() && form.email.trim() && form.phone.trim());
    }

    if (activeStep === 1) {
      return Boolean(form.issuer.trim() || form.isin.trim() || form.folio.trim());
    }

    return Boolean(form.complaintBody.trim() && form.consent);
  }, [activeStep, form, track]);

  function selectScope(next: GrievanceScope) {
    setScope(next);
    const nextTracks = tracks.filter((t) => t.regulator === next);
    if (nextTracks.length > 0) {
      setTrackId(nextTracks[0].id);
    }
    setActiveStep(0);
    setStatus("");
  }

  function selectTrack(nextId: string) {
    setTrackId(nextId);
    setActiveStep(0);
    setStatus("");
  }

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(caseText);
      setStatus("Copied case summary to clipboard.");
    } catch {
      setStatus("Could not copy to clipboard. Please copy manually.");
    }
  }

  function openEmailDraft() {
    if (!track) return;

    const body = stringifyCase(track, form);
    const subject = `Investor Grievance - ${track.title}`;

    const mailto = buildMailto({
      to: "investorgrievances@beacontrustee.co.in",
      subject,
      body,
    });

    window.location.href = mailto;
  }

  function resetAll() {
    setActiveStep(0);
    setForm(defaultFormState);
    setStatus("");
  }

  return (
    <section className="bg-white py-24 lg:py-32" aria-label="Investor grievance form">
      <div className="wrapper px-5 lg:px-20">
        <div className="flex flex-col gap-10" data-aos="fade-up">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                Complaint Intake
              </span>
              <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                File a complaint
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                Select the applicable product / mandate and provide your details. You can generate an email draft at the end.
              </p>
            </div>

            <div className="flex gap-px bg-primary-navy/10 p-px">
              <button
                type="button"
                onClick={() => selectScope("SEBI")}
                className={
                  "px-6 py-4 text-[11px] font-black uppercase tracking-[0.25em] transition-colors " +
                  (scope === "SEBI" ? "bg-primary-navy text-white" : "bg-white text-primary-navy hover:bg-primary-navy/[0.02]")
                }
              >
                SEBI-regulated
              </button>
              <button
                type="button"
                onClick={() => selectScope("NON_SEBI")}
                className={
                  "px-6 py-4 text-[11px] font-black uppercase tracking-[0.25em] transition-colors " +
                  (scope === "NON_SEBI" ? "bg-primary-navy text-white" : "bg-white text-primary-navy hover:bg-primary-navy/[0.02]")
                }
              >
                Other
              </button>
            </div>
          </div>

          {/* Track selection */}
          <div className="bg-primary-navy/10 p-px">
            <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
              {scopedTracks.map((t, idx) => {
                const isActive = t.id === trackId;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => selectTrack(t.id)}
                    className={
                      "text-left p-7 transition-colors " +
                      (isActive ? "bg-primary-navy text-white" : "bg-white hover:bg-primary-navy/[0.02]")
                    }
                  >
                    <div className="flex items-center justify-between gap-6">
                      <span
                        className={
                          "text-[10px] font-black uppercase tracking-[0.3em] " +
                          (isActive ? "text-accent-gold" : "text-primary-navy/40")
                        }
                      >
                        Option {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={
                          "text-[10px] font-black uppercase tracking-[0.25em] " +
                          (isActive ? "text-white/70" : "text-primary-navy/35")
                        }
                      >
                        {t.regulator === "SEBI" ? "SEBI" : "OTHER"}
                      </span>
                    </div>

                    <div className={"mt-4 text-lg font-medium leading-tight " + (isActive ? "text-white" : "text-primary-navy")}>
                      {t.title}
                    </div>

                    <div className={"mt-3 text-sm leading-relaxed " + (isActive ? "text-white/70" : "text-primary-navy/55")}>
                      {t.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20" data-aos="fade-up">
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-10">
              <div className="border border-primary-navy/10 bg-white">
                <div className="border-b border-primary-navy/10 px-6 py-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                    Steps
                  </p>
                </div>

                <div className="divide-y divide-primary-navy/10">
                  {steps.map((s, idx) => {
                    const isCurrent = idx === activeStep;
                    const isDone = idx < activeStep;

                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setActiveStep(idx)}
                        className={
                          "w-full px-6 py-5 text-left transition-colors hover:bg-primary-navy/[0.02] " +
                          (isCurrent ? "bg-primary-navy text-white hover:bg-primary-navy" : "bg-white")
                        }
                      >
                        <div className="flex items-start justify-between gap-6">
                          <div>
                            <p
                              className={
                                "text-[10px] font-black uppercase tracking-[0.3em] " +
                                (isCurrent
                                  ? "text-accent-gold"
                                  : isDone
                                    ? "text-primary-navy/50"
                                    : "text-primary-navy/35")
                              }
                            >
                              {s.number}
                            </p>
                            <p className={"mt-2 text-sm font-semibold " + (isCurrent ? "text-white" : "text-primary-navy")}>
                              {s.title}
                            </p>
                            <p className={"mt-2 text-sm " + (isCurrent ? "text-white/70" : "text-primary-navy/55")}>
                              {s.description}
                            </p>
                          </div>
                          <span className={"text-accent-gold transition-transform " + (isCurrent ? "translate-x-0.5" : "")}
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border border-primary-navy/10 bg-white">
                <div className="border-b border-primary-navy/10 px-6 py-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                    Case File
                  </p>
                </div>

                <div className="px-6 py-5 text-sm">
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-primary-navy/50">Product</span>
                    <span className="max-w-[220px] text-right font-semibold text-primary-navy">
                      {track?.title ?? ""}
                    </span>
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-6">
                    <span className="text-primary-navy/50">Regulator</span>
                    <span className="text-right font-semibold text-primary-navy">
                      {track?.regulator === "SEBI" ? "SEBI" : "OTHER"}
                    </span>
                  </div>

                  <div className="mt-6 border-t border-primary-navy/10 pt-6">
                    <div className="flex items-start justify-between gap-6">
                      <span className="text-primary-navy/50">Investor</span>
                      <span className="text-right font-semibold text-primary-navy">
                        {form.fullName || "—"}
                      </span>
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-6">
                      <span className="text-primary-navy/50">Email</span>
                      <span className="max-w-[220px] truncate text-right font-semibold text-primary-navy">
                        {form.email || "—"}
                      </span>
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-6">
                      <span className="text-primary-navy/50">Phone</span>
                      <span className="text-right font-semibold text-primary-navy">
                        {form.phone || "—"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-primary-navy/10 pt-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                      Escalation
                    </p>
                    <p className="mt-3 text-sm text-primary-navy/60">
                      {track?.regulator === "SEBI"
                        ? "If you are not satisfied with the resolution, you may lodge a complaint on SEBI SCORES."
                        : "For non-SEBI products, please escalate to Beacon support if needed."}
                    </p>
                    {track?.regulator === "SEBI" && (
                      <a
                        href="https://scores.sebi.gov.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        Open SEBI SCORES <span className="text-accent-gold">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-primary-navy/10 p-px">
                <div className="bg-white p-6">
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="w-full bg-primary-navy px-6 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-white hover:bg-accent-gold"
                  >
                    Copy Case Summary
                  </button>
                  <button
                    type="button"
                    onClick={resetAll}
                    className="mt-3 w-full border border-primary-navy/10 bg-white px-6 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy hover:bg-primary-navy/[0.02]"
                  >
                    Reset
                  </button>

                  {status && (
                    <p className="mt-4 text-sm text-primary-navy/60">{status}</p>
                  )}
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <form
              className="bg-primary-navy/10 p-px"
              onSubmit={(e) => {
                e.preventDefault();
                setStatus("");
                openEmailDraft();
              }}
              aria-label="Complaint form"
            >
              <div className="bg-white p-8 lg:p-10">
                <div className="flex items-start justify-between gap-10">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                      Step {steps[activeStep]?.number}
                    </p>
                    <h3 className="mt-4 text-2xl font-medium leading-tight text-primary-navy">
                      {steps[activeStep]?.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                      {steps[activeStep]?.description}
                    </p>
                  </div>

                  <div className="hidden text-right sm:block">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                      Product
                    </p>
                    <p className="mt-2 max-w-[260px] text-sm font-semibold text-primary-navy">
                      {track?.title}
                    </p>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6">
                  {activeStep === 0 && (
                    <>
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="fullName" className="text-sm font-semibold text-primary-navy">
                            Full name*
                          </label>
                          <input
                            id="fullName"
                            value={form.fullName}
                            onChange={(e) => setField("fullName", e.target.value)}
                            className="w-full border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                            placeholder="Your full name"
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

                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
                          <label htmlFor="address" className="text-sm font-semibold text-primary-navy">
                            Address
                          </label>
                          <input
                            id="address"
                            value={form.address}
                            onChange={(e) => setField("address", e.target.value)}
                            className="w-full border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                            placeholder="City, state"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {activeStep === 1 && (
                    <>
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="issuer" className="text-sm font-semibold text-primary-navy">
                            Issuer / Trust
                          </label>
                          <input
                            id="issuer"
                            value={form.issuer}
                            onChange={(e) => setField("issuer", e.target.value)}
                            className="w-full border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                            placeholder="Issuer / originator / trust name"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="isin" className="text-sm font-semibold text-primary-navy">
                            ISIN
                          </label>
                          <input
                            id="isin"
                            value={form.isin}
                            onChange={(e) => setField("isin", e.target.value)}
                            className="w-full border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                            placeholder="INE..."
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="folio" className="text-sm font-semibold text-primary-navy">
                            Folio / Client ID
                          </label>
                          <input
                            id="folio"
                            value={form.folio}
                            onChange={(e) => setField("folio", e.target.value)}
                            className="w-full border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                            placeholder="Folio / DP ID / Client ID"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="amount" className="text-sm font-semibold text-primary-navy">
                            Amount
                          </label>
                          <input
                            id="amount"
                            value={form.amount}
                            onChange={(e) => setField("amount", e.target.value)}
                            className="w-full border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                            placeholder="Amount involved (optional)"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="date" className="text-sm font-semibold text-primary-navy">
                          Relevant date
                        </label>
                        <input
                          id="date"
                          type="date"
                          value={form.date}
                          onChange={(e) => setField("date", e.target.value)}
                          className="w-full border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                        />
                      </div>
                    </>
                  )}

                  {activeStep === 2 && (
                    <>
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="complaintType" className="text-sm font-semibold text-primary-navy">
                            Complaint type
                          </label>
                          <select
                            id="complaintType"
                            value={form.complaintType}
                            onChange={(e) => setField("complaintType", e.target.value)}
                            className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                          >
                            <option value="">Select option</option>
                            {complaintOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="attachment" className="text-sm font-semibold text-primary-navy">
                            Supporting file (optional)
                          </label>
                          <input
                            id="attachment"
                            type="file"
                            className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-sm text-primary-navy/70"
                          />
                          <p className="text-xs text-primary-navy/50">
                            Attachments won&apos;t be included in the email draft; add them manually after the draft opens.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="complaintBody" className="text-sm font-semibold text-primary-navy">
                          Complaint details*
                        </label>
                        <textarea
                          id="complaintBody"
                          value={form.complaintBody}
                          onChange={(e) => setField("complaintBody", e.target.value)}
                          className="h-44 w-full resize-none border border-primary-navy/10 px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                          placeholder="Describe the issue, timeline, and any actions taken so far."
                          required
                        />
                      </div>

                      <label className="flex items-start gap-3 border border-primary-navy/10 bg-primary-navy/[0.02] px-4 py-4">
                        <input
                          type="checkbox"
                          checked={form.consent}
                          onChange={(e) => setField("consent", e.target.checked)}
                          className="mt-1"
                          required
                        />
                        <span className="text-sm text-primary-navy/70">
                          I confirm the information provided is accurate to the best of my knowledge.
                        </span>
                      </label>
                    </>
                  )}
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-px bg-primary-navy/10 p-px">
                    <button
                      type="button"
                      onClick={() => setActiveStep((v) => Math.max(0, v - 1))}
                      className="bg-white px-7 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy hover:bg-primary-navy/[0.02]"
                      disabled={activeStep === 0}
                    >
                      Back
                    </button>

                    {activeStep < steps.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (!isStepValid) {
                            setStatus("Please complete the required fields in this step.");
                            return;
                          }
                          setStatus("");
                          setActiveStep((v) => Math.min(steps.length - 1, v + 1));
                        }}
                        className="bg-primary-navy px-7 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-white hover:bg-accent-gold"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className={
                          "px-7 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-white " +
                          (isStepValid ? "bg-primary-navy hover:bg-accent-gold" : "bg-primary-navy/40 cursor-not-allowed")
                        }
                        disabled={!isStepValid}
                      >
                        Generate Email Draft
                      </button>
                    )}
                  </div>

                  <div className="text-sm text-primary-navy/50">
                    Email target: <span className="font-semibold">investorgrievances@beacontrustee.co.in</span>
                  </div>
                </div>

                {activeStep === steps.length - 1 && (
                  <div className="mt-10 border-t border-primary-navy/10 pt-8">
                    <p className="text-sm text-primary-navy/60">
                      Prefer an alternate route? You can also email us directly or lodge a complaint on SEBI SCORES (for SEBI-regulated products).
                    </p>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={openEmailDraft}
                        className="bg-accent-gold px-8 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy hover:bg-primary-navy hover:text-white"
                      >
                        Open Email Draft
                      </button>
                      {track?.regulator === "SEBI" && (
                        <a
                          href="https://scores.sebi.gov.in/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white px-8 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy border border-primary-navy/10 hover:bg-primary-navy hover:text-white"
                        >
                          SEBI SCORES
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
