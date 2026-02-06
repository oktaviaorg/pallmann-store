import { readFileSync, writeFileSync } from 'fs';

const SUPABASE_URL = 'https://mjuzyqhxifyvebtnlrra.supabase.co/storage/v1/object/public/lpr2';

const files = [
  'src/pages/HomePage.tsx',
  'src/pages/LandingBasRhin.tsx',
  'src/pages/LandingBelfort.tsx',
  'src/pages/LandingColmar.tsx',
  'src/pages/LandingColmarMulhouse.tsx',
  'src/pages/LandingDijon.tsx',
  'src/pages/LandingMulhouse.tsx',
  'src/pages/LandingSarrebourg.tsx',
  'src/pages/LandingStrasbourg.tsx',
  'src/pages/AboutPage.tsx'
];

console.log('🔄 Updating images to use responsive variants...\n');

files.forEach(file => {
  console.log(`Processing ${file}...`);
  let content = readFileSync(file, 'utf8');
  let modified = false;

  const moiCompletPattern = new RegExp(
    `src="${SUPABASE_URL}/moi%20complet\\.png"`,
    'g'
  );

  if (moiCompletPattern.test(content)) {
    content = content.replace(
      moiCompletPattern,
      `srcSet="${SUPABASE_URL}/moi-complet-mobile.webp 375w, ${SUPABASE_URL}/moi-complet-tablet.webp 768w, ${SUPABASE_URL}/moi-complet-desktop.webp 1920w"\n                    sizes="(max-width: 375px) 333px, (max-width: 768px) 436px, 872px"\n                    src="${SUPABASE_URL}/moi-complet-desktop.webp"`
    );
    modified = true;
  }

  const lesponceursPattern = new RegExp(
    `src="${SUPABASE_URL}/lesponceursreunis\\.jpg"`,
    'g'
  );

  if (lesponceursPattern.test(content)) {
    content = content.replace(
      lesponceursPattern,
      `srcSet="${SUPABASE_URL}/lesponceursreunis-mobile.webp 375w, ${SUPABASE_URL}/lesponceursreunis-desktop.webp 1920w"\n                    sizes="(max-width: 768px) 375px, 800px"\n                    src="${SUPABASE_URL}/lesponceursreunis-desktop.webp"`
    );
    modified = true;
  }

  const marquePattern = new RegExp(
    `src="${SUPABASE_URL}/marque-alsace%20\\.jpg"`,
    'g'
  );

  if (marquePattern.test(content)) {
    content = content.replace(
      marquePattern,
      `src="${SUPABASE_URL}/marque-alsace-optimized.webp"`
    );
    modified = true;
  }

  if (modified) {
    writeFileSync(file, content, 'utf8');
    console.log(`  ✓ Updated with responsive images`);
  } else {
    console.log(`  - No changes needed`);
  }
});

console.log('\n✅ All files processed!');
console.log('\n⚠️  IMPORTANT: Make sure the following images exist on Supabase:');
console.log(`   - ${SUPABASE_URL}/moi-complet-mobile.webp`);
console.log(`   - ${SUPABASE_URL}/moi-complet-tablet.webp`);
console.log(`   - ${SUPABASE_URL}/moi-complet-desktop.webp`);
console.log(`   - ${SUPABASE_URL}/lesponceursreunis-mobile.webp`);
console.log(`   - ${SUPABASE_URL}/lesponceursreunis-desktop.webp`);
console.log(`   - ${SUPABASE_URL}/marque-alsace-optimized.webp`);
console.log('\nSee MOBILE_OPTIMIZATION_GUIDE.md for instructions on creating these images.');
