"use client";

import { useState } from "react";
import { useLang } from "./language";

export function PdfButton() {
  const { lang, t } = useLang();
  const [busy, setBusy] = useState(false);

  async function download() {
    if (busy) return;
    setBusy(true);
    try {
      const [{ pdf }, { CvDocument }] = await Promise.all([import("@react-pdf/renderer"), import("@/lib/pdf/document")]);
      const blob = await pdf(<CvDocument lang={lang} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = lang === "he" ? "Eytan-Turgeman-CV-HE.pdf" : "Eytan-Turgeman-CV-EN.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button type="button" className="pdf-btn" onClick={download} disabled={busy}>
      {busy ? t.pdfBusy : t.pdf}
    </button>
  );
}
