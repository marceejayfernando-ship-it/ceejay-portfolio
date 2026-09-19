// EmailJS configuration.
//
// The EmailJS public key is designed to be exposed in client code, so these are
// safe as NEXT_PUBLIC_ vars. Values fall back to the existing working config so
// the contact form keeps functioning if no env file is present.

export const EMAILJS = {
  serviceId:
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_p89xvrr",
  templateId:
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_wo2h41l",
  publicKey:
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "SV8RBoTX1-9pKyU-O",
};
