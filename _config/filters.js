// _config/filters.js
import { DateTime } from "luxon";

export default function(eleventyConfig) {
  // --- date helpers ---
  eleventyConfig.addFilter("htmlDateString", (date) => {
    const d = (date instanceof Date) ? date : new Date(date);
    return DateTime.fromJSDate(d, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });
  eleventyConfig.addFilter("dateToISO", (date) => {
    const d = (date instanceof Date) ? date : new Date(date);
    return DateTime.fromJSDate(d, { zone: "utc" }).toISO({ suppressMilliseconds: true });
  });
  eleventyConfig.addFilter("readableDate", (date) => {
    const d = (date instanceof Date) ? date : new Date(date);
    return DateTime.fromJSDate(d).toFormat("LLL d, yyyy");
  });

  // --- tag helpers ---
  eleventyConfig.addFilter("filterTagList", (tags = []) => {
    const HIDE = new Set(["all", "posts", "post", "tag"]);
    return (tags || []).filter(t => !HIDE.has(String(t).toLowerCase()));
  });
  eleventyConfig.addFilter("tagUrl", (tag) => `/tags/${encodeURIComponent(String(tag).toLowerCase())}/`);

  // --- generic helpers ---
  eleventyConfig.addFilter("getKeys", (obj) => (obj && typeof obj === "object") ? Object.keys(obj) : []);
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v, null, 2));
  eleventyConfig.addFilter("slug", (s) =>
    String(s || "")
      .toLowerCase()
      .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  );
  eleventyConfig.addFilter("unique", (arr = []) => Array.from(new Set(arr)));
  eleventyConfig.addFilter("sortAlpha", (arr = []) =>
    [...arr].sort((a, b) => String(a).localeCompare(String(b)))
  );

  // --- math/list helpers ---
  eleventyConfig.addFilter("min", (...args) => {
    const flat = args.flat();
    const nums = flat.map(n => Number(n)).filter(n => !Number.isNaN(n));
    return nums.length ? Math.min(...nums) : undefined;
  });
  eleventyConfig.addFilter("max", (...args) => {
    const flat = args.flat();
    const nums = flat.map(n => Number(n)).filter(n => !Number.isNaN(n));
    return nums.length ? Math.max(...nums) : undefined;
  });
  eleventyConfig.addFilter("head", (arr, n) =>
    Array.isArray(arr) ? (n < 0 ? arr.slice(n) : arr.slice(0, n)) : arr
  );
}
