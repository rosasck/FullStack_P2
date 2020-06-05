function formatString(toFormat) {
  toFormat = toFormat.replace(/&nbsp;/g, " ");
  toFormat = toFormat.replace(/&amp;#39;/g, "'");
  toFormat = toFormat.replace(/&#039;/g, "'");
  toFormat = toFormat.replace(/&quot;/g, '"');
  toFormat = toFormat.replace(/&#34;/g, '"');
  toFormat = toFormat.replace(/&amp;amp;/g, "&");
  toFormat = toFormat.replace(/&amp;/g, "&");
  toFormat = toFormat.replace(/&#38;/g, "&");
  toFormat = toFormat.replace(/&gt;/g, ">");
  toFormat = toFormat.replace(/&#62;/g, ">");
  toFormat = toFormat.replace(/&lt;/g, "<");
  toFormat = toFormat.replace(/&#60;/g, "<");

  return toFormat;
}
