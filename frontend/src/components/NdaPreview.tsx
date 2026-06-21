"use client";

import { useRef } from "react";
import {
  NdaFormData,
  formatDate,
  getMndaTerm,
  getConfidentialityTerm,
  renderStandardTerms,
} from "../lib/nda";

interface NdaPreviewProps {
  data: NdaFormData;
}

export default function NdaPreview({ data }: NdaPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;
    const html2pdf = (await import("html2pdf.js")).default;
    html2pdf()
      .set({
        margin: [15, 15, 15, 15],
        filename: "mutual-nda.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(previewRef.current)
      .save();
  };

  const standardTermsHtml = renderStandardTerms(data);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shrink-0">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
          Live Preview
        </h2>
        <button
          onClick={handleDownloadPdf}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm"
        >
          Download PDF
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
        <div
          ref={previewRef}
          className="bg-white shadow-sm rounded-lg p-10 max-w-3xl mx-auto text-gray-900"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {/* Document header */}
          <div className="text-center mb-8">
            <h1
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Mutual Non-Disclosure Agreement
            </h1>
            <p
              className="text-xs text-gray-400"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Common Paper Mutual NDA Standard Terms Version 1.0
            </p>
          </div>

          <div
            className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded p-3 mb-7 leading-relaxed"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            This Mutual Non-Disclosure Agreement consists of: (1) this Cover
            Page and (2) the Common Paper Mutual NDA Standard Terms Version 1.0
            identical to those posted at commonpaper.com/standards/mutual-nda/1.0.
            Any modifications of the Standard Terms should be made on the Cover
            Page.
          </div>

          {/* Cover page fields */}
          <div className="space-y-5 mb-8 text-sm leading-relaxed">
            <CoverField
              label="Purpose"
              hint="How Confidential Information may be used"
              value={data.purpose}
              fallback="[Not specified]"
            />
            <CoverField
              label="Effective Date"
              value={formatDate(data.effectiveDate)}
            />
            <CoverField
              label="MNDA Term"
              hint="The length of this MNDA"
              value={
                data.mndaTermType === "years"
                  ? `Expires ${data.mndaTermYears} year(s) from Effective Date.`
                  : "Continues until terminated in accordance with the terms of the MNDA."
              }
            />
            <CoverField
              label="Term of Confidentiality"
              hint="How long Confidential Information is protected"
              value={
                data.confidentialityTermType === "years"
                  ? `${data.confidentialityTermYears} year(s) from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.`
                  : "In perpetuity."
              }
            />
            <div>
              <FieldLabel>Governing Law & Jurisdiction</FieldLabel>
              <p className="mt-1">
                Governing Law:{" "}
                <ValueOrPlaceholder value={data.governingLaw} fallback="[State not specified]" />
              </p>
              <p className="mt-0.5">
                Jurisdiction:{" "}
                <ValueOrPlaceholder
                  value={data.jurisdiction}
                  fallback="[City and state not specified]"
                />
              </p>
            </div>
          </div>

          {/* Signing instruction */}
          <p className="text-sm mb-4 leading-relaxed">
            By signing this Cover Page, each party agrees to enter into this
            MNDA as of the Effective Date.
          </p>

          {/* Signing table */}
          <table className="w-full border-collapse text-sm mb-8">
            <thead>
              <tr>
                <th
                  className="border border-gray-300 p-2 w-1/4 bg-gray-50"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                />
                <th
                  className="border border-gray-300 p-2 text-center bg-gray-50 text-xs font-semibold text-gray-700"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  PARTY 1
                </th>
                <th
                  className="border border-gray-300 p-2 text-center bg-gray-50 text-xs font-semibold text-gray-700"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  PARTY 2
                </th>
              </tr>
            </thead>
            <tbody>
              <SigningRow label="Signature" p1="" p2="" isSignature />
              <SigningRow
                label="Print Name"
                p1={data.party1PrintName}
                p2={data.party2PrintName}
              />
              <SigningRow
                label="Title"
                p1={data.party1Title}
                p2={data.party2Title}
              />
              <SigningRow
                label="Company"
                p1={data.party1Company}
                p2={data.party2Company}
              />
              <SigningRow
                label="Notice Address"
                p1={data.party1Address}
                p2={data.party2Address}
              />
              <SigningRow
                label="Date"
                p1={formatDate(data.effectiveDate)}
                p2={formatDate(data.effectiveDate)}
              />
            </tbody>
          </table>

          {/* Standard Terms */}
          <div className="border-t border-gray-200 pt-7">
            <h2
              className="text-xl font-bold text-center mb-6"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Standard Terms
            </h2>
            <div
              className="text-sm leading-relaxed space-y-4 [&_p]:text-justify"
              dangerouslySetInnerHTML={{ __html: standardTermsHtml }}
            />
          </div>

          {/* Footer */}
          <div
            className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-400 text-center"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Common Paper Mutual Non-Disclosure Agreement{" "}
            <span className="underline">Version 1.0</span> free to use under{" "}
            <span className="underline">CC BY 4.0</span>.
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      {children}
    </p>
  );
}

function ValueOrPlaceholder({
  value,
  fallback,
}: {
  value: string;
  fallback: string;
}) {
  if (!value) return <span className="text-gray-400 italic">{fallback}</span>;
  return <span className="font-medium">{value}</span>;
}

function CoverField({
  label,
  hint,
  value,
  fallback = "[Not specified]",
}: {
  label: string;
  hint?: string;
  value: string;
  fallback?: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      {hint && (
        <p
          className="text-xs text-gray-400 mb-0.5"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          {hint}
        </p>
      )}
      {value ? (
        <p>{value}</p>
      ) : (
        <p className="text-gray-400 italic">{fallback}</p>
      )}
    </div>
  );
}

function SigningRow({
  label,
  p1,
  p2,
  isSignature = false,
}: {
  label: string;
  p1: string;
  p2: string;
  isSignature?: boolean;
}) {
  return (
    <tr>
      <td
        className="border border-gray-300 p-2 text-xs font-medium text-gray-600 bg-gray-50"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        {label}
      </td>
      <td
        className={`border border-gray-300 p-2 text-sm ${isSignature ? "h-14" : ""}`}
      >
        {p1}
      </td>
      <td
        className={`border border-gray-300 p-2 text-sm ${isSignature ? "h-14" : ""}`}
      >
        {p2}
      </td>
    </tr>
  );
}
