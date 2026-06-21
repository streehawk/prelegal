"use client";

import React from "react";
import { NdaFormData } from "../utils/nda";

interface NdaFormProps {
  data: NdaFormData;
  onChange: (data: NdaFormData) => void;
}

const inputClass =
  "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow";

export default function NdaForm({ data, onChange }: NdaFormProps) {
  const update = <K extends keyof NdaFormData>(
    field: K,
    value: NdaFormData[K]
  ) => onChange({ ...data, [field]: value });

  return (
    <div className="space-y-7 p-6">
      <div>
        <SectionTitle>Document Details</SectionTitle>
        <div className="space-y-4">
          <FormField
            label="Purpose"
            hint="How Confidential Information may be used"
          >
            <textarea
              className={inputClass + " resize-none"}
              rows={3}
              value={data.purpose}
              onChange={(e) => update("purpose", e.target.value)}
            />
          </FormField>
          <FormField label="Effective Date">
            <input
              type="date"
              className={inputClass}
              value={data.effectiveDate}
              onChange={(e) => update("effectiveDate", e.target.value)}
            />
          </FormField>
        </div>
      </div>

      <Divider />

      <div>
        <SectionTitle>Terms</SectionTitle>
        <div className="space-y-5">
          <FormField label="MNDA Term" hint="The length of this MNDA">
            <div className="space-y-2 mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={data.mndaTermType === "years"}
                  onChange={() => update("mndaTermType", "years")}
                  className="text-blue-600 accent-blue-600"
                />
                <span className="text-sm text-gray-700">Expires after</span>
                {data.mndaTermType === "years" && (
                  <>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.mndaTermYears}
                      onChange={(e) =>
                        update("mndaTermYears", parseInt(e.target.value) || 1)
                      }
                    />
                    <span className="text-sm text-gray-600">year(s)</span>
                  </>
                )}
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={data.mndaTermType === "until_terminated"}
                  onChange={() => update("mndaTermType", "until_terminated")}
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-700">
                  Continues until terminated
                </span>
              </label>
            </div>
          </FormField>

          <FormField
            label="Term of Confidentiality"
            hint="How long Confidential Information is protected"
          >
            <div className="space-y-2 mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={data.confidentialityTermType === "years"}
                  onChange={() => update("confidentialityTermType", "years")}
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-700">Expires after</span>
                {data.confidentialityTermType === "years" && (
                  <>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={data.confidentialityTermYears}
                      onChange={(e) =>
                        update(
                          "confidentialityTermYears",
                          parseInt(e.target.value) || 1
                        )
                      }
                    />
                    <span className="text-sm text-gray-600">year(s)</span>
                  </>
                )}
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={data.confidentialityTermType === "perpetuity"}
                  onChange={() =>
                    update("confidentialityTermType", "perpetuity")
                  }
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-700">In perpetuity</span>
              </label>
            </div>
          </FormField>
        </div>
      </div>

      <Divider />

      <div>
        <SectionTitle>Governing Law & Jurisdiction</SectionTitle>
        <div className="space-y-4">
          <FormField label="Governing Law" hint="State whose laws govern this MNDA">
            <input
              type="text"
              placeholder="e.g., Delaware"
              className={inputClass}
              value={data.governingLaw}
              onChange={(e) => update("governingLaw", e.target.value)}
            />
          </FormField>
          <FormField
            label="Jurisdiction"
            hint='Courts where disputes will be resolved (e.g., "New Castle, DE")'
          >
            <input
              type="text"
              placeholder="e.g., New Castle, DE"
              className={inputClass}
              value={data.jurisdiction}
              onChange={(e) => update("jurisdiction", e.target.value)}
            />
          </FormField>
        </div>
      </div>

      <Divider />

      <PartySection
        title="Party 1"
        printName={data.party1PrintName}
        jobTitle={data.party1Title}
        company={data.party1Company}
        address={data.party1Address}
        onChangeName={(v) => update("party1PrintName", v)}
        onChangeTitle={(v) => update("party1Title", v)}
        onChangeCompany={(v) => update("party1Company", v)}
        onChangeAddress={(v) => update("party1Address", v)}
      />

      <Divider />

      <PartySection
        title="Party 2"
        printName={data.party2PrintName}
        jobTitle={data.party2Title}
        company={data.party2Company}
        address={data.party2Address}
        onChangeName={(v) => update("party2PrintName", v)}
        onChangeTitle={(v) => update("party2Title", v)}
        onChangeCompany={(v) => update("party2Company", v)}
        onChangeAddress={(v) => update("party2Address", v)}
      />

      <div className="pb-4" />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-semibold text-gray-800 mb-4">{children}</h2>
  );
}

function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {hint && (
          <span className="block text-xs text-gray-400 font-normal mt-0.5">
            {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function Divider() {
  return <hr className="border-gray-100" />;
}

function PartySection({
  title,
  printName,
  jobTitle,
  company,
  address,
  onChangeName,
  onChangeTitle,
  onChangeCompany,
  onChangeAddress,
}: {
  title: string;
  printName: string;
  jobTitle: string;
  company: string;
  address: string;
  onChangeName: (v: string) => void;
  onChangeTitle: (v: string) => void;
  onChangeCompany: (v: string) => void;
  onChangeAddress: (v: string) => void;
}) {
  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <div className="space-y-3">
        <FormField label="Print Name">
          <input
            type="text"
            placeholder="Full legal name"
            className={inputClass}
            value={printName}
            onChange={(e) => onChangeName(e.target.value)}
          />
        </FormField>
        <FormField label="Title">
          <input
            type="text"
            placeholder="Job title"
            className={inputClass}
            value={jobTitle}
            onChange={(e) => onChangeTitle(e.target.value)}
          />
        </FormField>
        <FormField label="Company">
          <input
            type="text"
            placeholder="Company name"
            className={inputClass}
            value={company}
            onChange={(e) => onChangeCompany(e.target.value)}
          />
        </FormField>
        <FormField label="Notice Address" hint="Email or postal address">
          <textarea
            className={inputClass + " resize-none"}
            rows={2}
            placeholder="Email or postal address"
            value={address}
            onChange={(e) => onChangeAddress(e.target.value)}
          />
        </FormField>
      </div>
    </div>
  );
}
