export interface IINTBranch {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export const IINT_BRANCHES: IINTBranch[] = [
  {
    id: "rohini",
    name: "Head Branch (Rohini)",
    address:
      "3rd Floor, C - 9/7, above Liberty Showroom, opp. Metro Pillar - 396, Pocket 9, Sector 7, Rohini, Delhi, 110085",
    phone: "7011016060",
  },
  {
    id: "narela",
    name: "Head Branch (Narela)",
    address:
      "IINT Adarsh Computer Education, 1st Floor, Near RK Sweets, Safiabad Road, Narela, Delhi 110040",
    phone: "+91 92126 21301",
  },
  {
    id: "murthal",
    name: "Branch 1 (Murthal Road)",
    address:
      "Opposite GVM College, Near GGSSS School, Murthal Road, Sonepat, Haryana",
    phone: "+91 92555 93976",
  },
  {
    id: "model-town",
    name: "Branch 2 (Model Town)",
    address:
      "Behind R.K. Sweets, Near Kachey Quarter, Model Town, Subhash Chowk, Sonepat, Haryana",
    phone: "+91 82229 73338",
  },
  {
    id: "bawana",
    name: "Branch 3 (Bawana)",
    address:
      "IINT Computer Center, 2nd Floor, Jaipal Tower, Main Auchandi Road, Bawana, Delhi",
    phone: "+91 98910 65660",
  },
];

/** Opens Google Maps directions from the user's current location to the branch. */
export function getGoogleMapsDirectionsUrl(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

/** Embedded map preview URL for iframe embeds. */
export function getGoogleMapsEmbedUrl(address: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

export function openGoogleMapsDirections(address: string): void {
  window.open(getGoogleMapsDirectionsUrl(address), "_blank", "noopener,noreferrer");
}

/** Build a tel: link from a display phone string. */
export function getTelLink(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `tel:+91${digits}`;
  if (digits.startsWith("91")) return `tel:+${digits}`;
  return `tel:+${digits}`;
}
