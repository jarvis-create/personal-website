const fs = require('fs');

let cssContent = fs.readFileSync('src/styles/editorial.css', 'utf8');

// Match the reference typography perfectly
cssContent = cssContent.replace(
  /\.m-num \{[\s\S]*?line-height: 1;\s*\}/,
  `.m-num {
  font-family: 'Playfair Display', serif;
  font-size: clamp(38px, 4vw, 56px);
  color: #e0b089;
  line-height: 1;
  font-weight: 400;
  letter-spacing: -0.02em;
}`
);

cssContent = cssContent.replace(
  /\.m-text \{[\s\S]*?text-transform: uppercase;\s*\}/,
  `.m-text {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  line-height: 1.8;
  letter-spacing: 0.12em;
  color: #999081;
  text-transform: uppercase;
  padding-top: 8px;
}`
);

// Fix the photo ratio and color processing
cssContent = cssContent.replace(
  /\.about-photo-wrap \{[\s\S]*?margin-bottom: 32px;\s*\}/,
  `.about-photo-wrap {
  width: 140px;
  height: 140px;
  background: #e2dacd;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}`
);

cssContent = cssContent.replace(
  /\.about-photo \{[\s\S]*?filter: sepia\(12%\);\s*\}/,
  `.about-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(30%) contrast(1.1) brightness(0.9);
  mix-blend-mode: multiply;
}`
);

// Fix metric grid spacing
cssContent = cssContent.replace(
  /\.about-metric \{[\s\S]*?border-top: 1px solid rgba\(201, 184, 162, 0\.18\);\s*\}/,
  `.about-metric {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 20px;
  padding: 32px 0;
  border-top: 1px solid rgba(224, 176, 137, 0.15);
}`
);
cssContent = cssContent.replace(
  /\.about-metric:last-child \{[\s\S]*?border-bottom: 1px solid rgba\(201, 184, 162, 0\.18\);\s*\}/,
  `.about-metric:last-child {
  border-bottom: 1px solid rgba(224, 176, 137, 0.15);
}`
);

// Title styling
cssContent = cssContent.replace(
  /\.about-title \{[\s\S]*?color: var\(--ink\);\s*\}/,
  `.about-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(42px, 4.5vw, 68px);
  line-height: 1.05;
  font-weight: 400;
  letter-spacing: -0.02em;
  margin: 0 0 28px;
  color: var(--ink);
}`
);

cssContent = cssContent.replace(
  /\.about-copy \{[\s\S]*?margin: 0 0 14px;\s*\}/,
  `.about-copy {
  font-size: 16px;
  line-height: 1.9;
  color: var(--ink-soft);
  margin: 0 0 20px;
  max-width: 65ch;
}`
);

// Watermark
cssContent = cssContent.replace(
  /\.about-watermark \{[\s\S]*?pointer-events: none;\s*\}/,
  `.about-watermark {
  position: absolute;
  right: -20px;
  bottom: -40px;
  font-family: 'Playfair Display', serif;
  font-size: clamp(220px, 30vw, 400px);
  color: rgba(26, 23, 20, 0.04);
  line-height: 1;
  pointer-events: none;
}`
);

fs.writeFileSync('src/styles/editorial.css', cssContent);

let appContent = fs.readFileSync('src/App.tsx', 'utf8');

// The photo in the design is a square with empty space or just text "PHOTO.JPG" 
// We will match the square format
appContent = appContent.replace(
  /<img src="\/oluwafemi-joshua.png" alt="Oluwafemi Joshua" className="about-photo" \/>/,
  `<img src="/oluwafemi-joshua.png" alt="Oluwafemi Joshua" className="about-photo" />`
);

fs.writeFileSync('src/App.tsx', appContent);
