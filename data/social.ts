// Contact + social links.
// Real profile URLs, sourced from the CV in /public/resume.pdf.

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  /** lucide-react icon name resolved in the component */
  icon: "mail" | "linkedin" | "github" | "phone";
};

export const PLACEHOLDER = "PLACEHOLDER";

export const email = "marceejayfernando@gmail.com";
export const phone = "+63 917 576 8789";

export const socials: SocialLink[] = [
  {
    label: "Email",
    href: `mailto:${email}`,
    handle: email,
    icon: "mail",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/cj-fernando-501828345",
    handle: "cj-fernando-501828345",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/marceejayfernando-shipit",
    handle: "marceejayfernando-shipit",
    icon: "github",
  },
];

// A link is treated as "not ready" when it is empty, the sentinel, an old
// dummy value, or a generic non-profile URL (bare host / LinkedIn feed).
const NON_PROFILE = [
  /^https?:\/\/(www\.)?linkedin\.com\/feed\/?$/i,
  /^https?:\/\/(www\.)?linkedin\.com\/?$/i,
  /^https?:\/\/(www\.)?github\.com\/?$/i,
];

export const isPlaceholder = (href: string) =>
  !href ||
  href === PLACEHOLDER ||
  href.includes("yourprofile") ||
  NON_PROFILE.some((re) => re.test(href.trim()));

export const activeSocials = () => socials.filter((s) => !isPlaceholder(s.href));
