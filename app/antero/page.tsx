import type { Metadata } from "next";
import ServiceDetail, { serviceContent } from "../_components/ServiceDetail";

export const metadata: Metadata = {
  title: `${serviceContent.antero.tag} — ${serviceContent.antero.title} | ilmundo`,
  description: serviceContent.antero.description,
};

export default function AnteroPage() {
  return <ServiceDetail slug="antero" />;
}
