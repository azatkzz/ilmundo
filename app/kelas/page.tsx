import type { Metadata } from "next";
import ServiceDetail, { serviceContent } from "../_components/ServiceDetail";

export const metadata: Metadata = {
  title: `${serviceContent.kelas.tag} — ${serviceContent.kelas.title} | ilmundo`,
  description: serviceContent.kelas.description,
};

export default function KelasPage() {
  return <ServiceDetail slug="kelas" />;
}
