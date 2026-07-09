const dayMs = 24 * 60 * 60 * 1000;

export const siteConfig = {
  copyright: "© 2026 zhlyxh.com All rights reserved.",
  heroMedia: {
    image: "/assets/photos/2026_06_17_17_49_59_IMG_9752.JPG",
    caption: "2025.10.25"
  },
  relationship: {
    startDate: "2025-9-12",
  },
} as const;

export function getTogetherDays(referenceDate = new Date()) {
  const [year, month, day] = siteConfig.relationship.startDate.split("-").map(Number);
  const start = Date.UTC(year, month - 1, day);
  const current = Date.UTC(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  );

  return Math.max(1, Math.floor((current - start) / dayMs) + 1);
}

export function formatDateLabel(date = siteConfig.relationship.startDate) {
  return date.replaceAll("-", ".");
}
