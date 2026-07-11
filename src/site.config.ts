const dayMs = 24 * 60 * 60 * 1000;

export const siteConfig = {
  copyright: "© 2026 zhlyxh.com All rights reserved.",
  heroMedia: {
    // 首页头图使用独立配置；暂时留空时由 HomeHero 显示占位框。
    image: "/assets/home_page-first.jpg",
    imageAlt: "两个人牵手的照片",
    caption: "",
  },
  relationship: {
    startDate: "2025-3-15",
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
