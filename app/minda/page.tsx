import type { Metadata } from "next";
import ServiceDetail, { serviceContent } from "../_components/ServiceDetail";

export const metadata: Metadata = {
  title: `${serviceContent.minda.tag} — ${serviceContent.minda.title} | ilmundo`,
  description: serviceContent.minda.description,
};

export default function MindaPage() {
  return <ServiceDetail slug="minda" />;
}
