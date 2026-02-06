import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

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

files.forEach(file => {
  console.log(`Processing ${file}...`);
  let content = readFileSync(file, 'utf8');

  content = content.replace(
    /(<img\s+src="https:\/\/mjuzyqhxifyvebtnlrra\.supabase\.co\/storage\/v1\/object\/public\/lpr2\/moi%20complet\.png"\s+alt="[^"]*")\s+(className="[^"]*")\s+(loading="eager")\s+(fetchpriority="high")\s*(\/?>)/g,
    '$1\n                    width="436"\n                    height="562"\n                    $2\n                    $3\n                    $4\n                  $5'
  );

  content = content.replace(
    /(<img\s+src="https:\/\/mjuzyqhxifyvebtnlrra\.supabase\.co\/storage\/v1\/object\/public\/lpr2\/lesponceursreunis\.jpg"\s+alt="[^"]*")\s+(className="[^"]*")\s*(\/?>)/g,
    '$1\n                    width="800"\n                    height="600"\n                    $2\n                    loading="lazy"\n                  $3'
  );

  content = content.replace(
    /(<img\s+src="https:\/\/mjuzyqhxifyvebtnlrra\.supabase\.co\/storage\/v1\/object\/public\/lpr2\/marque-alsace%20\.jpg"\s+alt="[^"]*")\s+(className="h-7 w-auto object-contain")\s+(loading="eager")\s*(\/?>)/g,
    '$1\n                    width="64"\n                    height="32"\n                    $2\n                    $3\n                  $4'
  );

  writeFileSync(file, content, 'utf8');
  console.log(`✓ ${file} updated`);
});

console.log('\n✅ All images optimized with explicit dimensions!');
