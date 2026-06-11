import type { Metadata } from "next";
import ServiceDetail, { serviceContent } from "../_components/ServiceDetail";

export const metadata: Metadata = {
  title: `${serviceContent.unik.tag} — ${serviceContent.unik.title} | ilmundo`,
  description: serviceContent.unik.description,
};

export default function UnikPage() {
  return <ServiceDetail slug="unik" />;
}
