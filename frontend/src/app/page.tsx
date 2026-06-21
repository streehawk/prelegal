"use client";

import { useState } from "react";
import NdaForm from "../components/NdaForm";
import NdaPreview from "../components/NdaPreview";
import { defaultFormData, NdaFormData } from "../utils/nda";

export default function Home() {
  const [formData, setFormData] = useState<NdaFormData>(defaultFormData);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Header bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center px-6 z-10">
        <span className="text-sm font-semibold text-gray-800">Prelegal</span>
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-sm text-gray-500">Mutual NDA Creator</span>
      </div>

      {/* Main content */}
      <div className="flex w-full pt-14">
        {/* Left: form panel */}
        <div className="w-96 shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
          <div className="px-6 pt-6 pb-2">
            <h1 className="text-lg font-semibold text-gray-900">
              Mutual NDA
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Fill in the details to generate your agreement
            </p>
          </div>
          <NdaForm data={formData} onChange={setFormData} />
        </div>

        {/* Right: preview panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <NdaPreview data={formData} />
        </div>
      </div>
    </div>
  );
}
