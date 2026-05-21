import { existsSync, readFileSync } from 'node:fs';

const failures = [];
const warnings = [];

function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function requireFile(path) {
  if (!existsSync(path)) failures.push(`Missing required file: ${path}`);
}

function requireText(path, text, label = text) {
  const content = read(path);
  if (!content.includes(text)) failures.push(`${path} is missing ${label}`);
}

function rejectText(path, patterns) {
  const content = read(path);
  for (const pattern of patterns) {
    if (content.toLowerCase().includes(pattern.toLowerCase())) {
      failures.push(`${path} contains blocked text: ${pattern}`);
    }
  }
}

const requiredFiles = [
  'package.json',
  '.npmrc',
  '.nvmrc',
  'vite.config.ts',
  'vercel.json',
  'netlify.toml',
  '.replit',
  '.gitignore',
  'README.md',
  'scripts/performance-budget.mjs',
  'scripts/content-integrity.mjs',
  'scripts/route-smoke.mjs',
  'scripts/release-readiness.mjs',
  'scripts/release-report.mjs',
  'scripts/handoff-check.mjs',
  'scripts/handoff-manifest.mjs',
  'scripts/generate-sitemap.mjs',
  'scripts/metadata-check.mjs',
  'scripts/static-resilience-check.mjs',
  'scripts/security-headers-check.mjs',
  'scripts/accessibility-qa.mjs',
  'scripts/visual-qa.mjs',
  'scripts/responsive-route-check.mjs',
  'scripts/release-snapshot.mjs',
  'scripts/dependency-hygiene.mjs',
  'scripts/environment-readiness.mjs',
  'scripts/deploy-smoke-kit.mjs',
  'scripts/production-evidence.mjs',
  'scripts/versioning-check.mjs',
  'scripts/maintenance-check.mjs',
  'scripts/continuation-plan.mjs',
  'scripts/launch-readiness.mjs',
  'scripts/ascent-matrix-check.mjs',
  'scripts/cross-link-check.mjs',
  'scripts/tradition-source-check.mjs',
  'scripts/study-layers-check.mjs',
  'scripts/contemplation-protocol-check.mjs',
  'scripts/river-navigator-check.mjs',
  'public/manifest.webmanifest',
  'public/offline.html',
  'public/sw.js',
  'public/robots.txt',
  '.env.example',
  'docs/HANDOFF_KIT.md',
  'docs/LAUNCH_DOMAIN_MONITORING_RUNBOOK.md',
  'CONTRIBUTING.md',
  'CHANGELOG.md',
  '.github/workflows/build-check.yml',
];
requiredFiles.forEach(requireFile);

const packageJson = JSON.parse(read('package.json') || '{}');
const scripts = packageJson.scripts || {};
const requiredScripts = {
  dev: 'vite --host 0.0.0.0',
  build: 'vite build',
  preview: 'vite preview --host 0.0.0.0',
  doctor: 'node scripts/doctor.mjs',
  'content:check': 'node scripts/content-integrity.mjs',
  'route:smoke': 'node scripts/route-smoke.mjs',
  'release:readiness': 'node scripts/release-readiness.mjs',
  'release:report': 'node scripts/release-report.mjs',
  'handoff:check': 'node scripts/handoff-check.mjs',
  'handoff:manifest': 'node scripts/handoff-manifest.mjs',
  'sitemap:generate': 'node scripts/generate-sitemap.mjs',
  'metadata:check': 'node scripts/metadata-check.mjs',
  'static:check': 'node scripts/static-resilience-check.mjs',
  'security:check': 'node scripts/security-headers-check.mjs',
  'a11y:qa': 'node scripts/accessibility-qa.mjs',
  'visual:qa': 'node scripts/visual-qa.mjs',
  'responsive:check': 'node scripts/responsive-route-check.mjs',
  'release:snapshot': 'node scripts/release-snapshot.mjs',
  'dependency:check': 'node scripts/dependency-hygiene.mjs',
  'env:check': 'node scripts/environment-readiness.mjs',
  'deploy:smoke': 'node scripts/deploy-smoke-kit.mjs',
  'production:evidence': 'node scripts/production-evidence.mjs',
  'version:check': 'node scripts/versioning-check.mjs',
  'maintenance:check': 'node scripts/maintenance-check.mjs',
  'continuation:plan': 'node scripts/continuation-plan.mjs',
  'launch:readiness': 'node scripts/launch-readiness.mjs',
  'ascent:check': 'node scripts/ascent-matrix-check.mjs',
  'crosslink:check': 'node scripts/cross-link-check.mjs',
  'tradition:check': 'node scripts/tradition-source-check.mjs',
  'safety:scope:check': 'node scripts/safety-scope-check.mjs',
  'start:guide:check': 'node scripts/start-guidance-check.mjs',
  'study:layers:check': 'node scripts/study-layers-check.mjs',
  'river:navigator:check': 'node scripts/river-navigator-check.mjs',
  'final:gate': 'npm ci && npm run release:check && npm run preview',
  'release:check': 'npm run qa && npm run release:readiness && npm run release:report && npm run release:snapshot && npm run handoff:check && npm run handoff:manifest && npm run production:evidence && npm run version:check && npm run maintenance:check && npm run continuation:plan && npm run launch:readiness',
  qa: 'npm run doctor && npm run dependency:check && npm run env:check && npm run content:check && npm run ascent:check && npm run crosslink:check && npm run tradition:check && npm run safety:scope:check && npm run start:guide:check && npm run study:layers:check && npm run contemplation:check && npm run river:navigator:check && npm run sitemap:generate && npm run metadata:check && npm run security:check && npm run a11y:qa && npm run responsive:check && npm run visual:qa && npm run build && npm run static:check && npm run performance && npm run route:smoke && npm run deploy:smoke',
  check: 'npm run qa',
};
for (const [name, expected] of Object.entries(requiredScripts)) {
  if (scripts[name] !== expected) failures.push(`package.json script "${name}" should be "${expected}"`);
}
if (!packageJson.engines?.node?.includes('>=18')) failures.push('package.json should declare engines.node >=18');

requireText('.npmrc', 'registry=https://registry.npmjs.org/', 'public npm registry');
requireText('.nvmrc', '18', 'Node 18');
requireText('vite.config.ts', 'base: "/"', 'base: "/"');
requireText('vite.config.ts', 'outDir: "dist"', 'outDir: "dist"');
requireText('vercel.json', '"buildCommand": "npm run build"', 'Vercel buildCommand');
requireText('vercel.json', '"outputDirectory": "dist"', 'Vercel outputDirectory');
requireText('netlify.toml', 'command = "npm run build"', 'Netlify build command');
requireText('netlify.toml', 'publish = "dist"', 'Netlify publish directory');
requireText('.github/workflows/build-check.yml', 'npm ci', 'CI npm ci');
requireText('.github/workflows/build-check.yml', 'npm run release:check', 'CI full release check');
requireText('package.json', '"performance": "node scripts/performance-budget.mjs"', 'performance budget script');
requireText('package.json', '"content:check": "node scripts/content-integrity.mjs"', 'content integrity script');
requireText('package.json', '"ascent:check": "node scripts/ascent-matrix-check.mjs"', 'ascent matrix script');
requireText('package.json', 'npm run ascent:check', 'ascent matrix in QA gate');
requireText('src/pages/stage-detail.tsx', 'Integrated Yogic Ascent Matrix', 'integrated ascent matrix render');
requireText('src/data/stage-depth-ascent.ts', 'primaryKosha', 'stage depth ascent data');
requireText('package.json', '"route:smoke": "node scripts/route-smoke.mjs"', 'route smoke script');
requireText('package.json', '"release:check": "npm run qa && npm run release:readiness && npm run release:report && npm run release:snapshot && npm run handoff:check && npm run handoff:manifest && npm run production:evidence && npm run version:check && npm run maintenance:check && npm run continuation:plan && npm run launch:readiness"', 'release check script');
requireText('package.json', '"handoff:check": "node scripts/handoff-check.mjs"', 'handoff check script');
requireText('package.json', '"handoff:manifest": "node scripts/handoff-manifest.mjs"', 'handoff manifest script');
requireText('package.json', '"sitemap:generate": "node scripts/generate-sitemap.mjs"', 'sitemap generator script');
requireText('package.json', '"metadata:check": "node scripts/metadata-check.mjs"', 'metadata check script');
requireText('package.json', '"static:check": "node scripts/static-resilience-check.mjs"', 'static resilience check script');
requireText('package.json', '"security:check": "node scripts/security-headers-check.mjs"', 'security headers check script');
requireText('package.json', 'npm run security:check', 'security headers check in QA');
requireText('package.json', '"a11y:qa": "node scripts/accessibility-qa.mjs"', 'accessibility QA script');
requireText('package.json', '"visual:qa": "node scripts/visual-qa.mjs"', 'visual QA script');
requireText('package.json', '"responsive:check": "node scripts/responsive-route-check.mjs"', 'responsive active-route QA script');
requireText('package.json', '"release:snapshot": "node scripts/release-snapshot.mjs"', 'release snapshot script');
requireText('package.json', 'npm run a11y:qa', 'accessibility QA in QA gate');
requireText('package.json', 'npm run responsive:check', 'responsive active-route QA in QA gate');
requireText('package.json', 'npm run visual:qa', 'visual QA in QA gate');
requireText('package.json', 'npm run release:snapshot', 'release snapshot in release gate');
requireText('package.json', '"dependency:check": "node scripts/dependency-hygiene.mjs"', 'dependency hygiene script');
requireText('package.json', '"env:check": "node scripts/environment-readiness.mjs"', 'environment readiness script');
requireText('package.json', '"deploy:smoke": "node scripts/deploy-smoke-kit.mjs"', 'deployment smoke kit script');
requireText('package.json', '"production:evidence": "node scripts/production-evidence.mjs"', 'production evidence script');
requireText('package.json', '"version:check": "node scripts/versioning-check.mjs"', 'version check script');
requireText('package.json', '"maintenance:check": "node scripts/maintenance-check.mjs"', 'maintenance check script');
requireText('package.json', '"continuation:plan": "node scripts/continuation-plan.mjs"', 'continuation plan script');
requireText('package.json', '"launch:readiness": "node scripts/launch-readiness.mjs"', 'launch readiness script');
requireText('package.json', '"final:gate": "npm ci && npm run release:check && npm run preview"', 'final gate script');
requireText('package.json', 'npm run dependency:check', 'dependency hygiene in QA gate');
requireText('package.json', 'npm run env:check', 'environment readiness in QA gate');
requireText('package.json', 'npm run deploy:smoke', 'deployment smoke kit in QA gate');
requireText('package.json', 'npm run production:evidence', 'production evidence in release gate');
requireText('package.json', 'npm run version:check', 'version check in release gate');
requireText('package.json', 'npm run maintenance:check', 'maintenance check in release gate');
requireText('package.json', 'npm run continuation:plan', 'continuation plan in release gate');
requireText('package.json', 'npm run launch:readiness', 'launch readiness in release gate');
requireText('docs/LAUNCH_DOMAIN_MONITORING_RUNBOOK.md', 'Domain and DNS checklist', 'launch domain runbook');
requireText('docs/MAINTENANCE_VERSIONING_GUARDRAILS.md', 'One-command release gate', 'maintenance guardrails release gate');
requireText('docs/AI_CONTINUATION_PROMPT.md', 'Continue from the current repository state', 'AI continuation prompt');
requireText('.github/PULL_REQUEST_TEMPLATE.md', 'Sacred architecture safety', 'PR template sacred architecture section');
requireText('vercel.json', 'X-Content-Type-Options', 'Vercel security headers');
requireText('vercel.json', 'Content-Security-Policy', 'Vercel CSP header');
requireText('netlify.toml', 'X-Content-Type-Options', 'Netlify security headers');
requireText('netlify.toml', 'Content-Security-Policy', 'Netlify CSP header');
requireText('index.html', 'The Yogic River from Misidentification to Living Awareness', 'final metadata title phrase');
requireText('public/robots.txt', 'Sitemap:', 'robots sitemap pointer');
requireText('src/main.tsx', 'registerServiceWorker', 'service worker registration');
requireText('src/lib/register-service-worker.ts', 'import.meta.env.PROD', 'production-only service worker registration');
requireText('public/sw.js', '/offline.html', 'offline fallback caching');
requireText('public/sw.js', 'navigationPreload', 'navigation preload support');
requireText('src/components/layout.tsx', 'Skip to main content', 'skip link');
requireText('src/components/layout.tsx', 'aria-current', 'active nav aria-current');
requireText('src/index.css', 'prefers-reduced-motion: reduce', 'reduced motion guard');
requireText('src/index.css', 'overflow-x: hidden', 'global overflow guard');
requireText('netlify.toml', 'Cache-Control = "public, max-age=31536000, immutable"', 'Netlify immutable assets header');
requireText('vercel.json', '"value": "public, max-age=31536000, immutable"', 'Vercel immutable assets header');


requireText('src/data/tradition-source-map.ts', 'STAGE_SOURCE_LENS', 'tradition source stage data');
requireText('src/data/tradition-source-map.ts', 'SOURCE_STREAMS', 'tradition source stream data');
requireText('src/components/stage-source-lens.tsx', 'Traditional Source Lens', 'traditional source lens component');
requireText('src/pages/stage-detail.tsx', '<StageSourceLens stageNum={stageNum} />', 'stage detail renders traditional source lens');
requireText('package.json', '"tradition:check": "node scripts/tradition-source-check.mjs"', 'tradition source check script');
requireText('package.json', 'npm run tradition:check', 'tradition source in QA gate');
requireText('package.json', '"safety:scope:check": "node scripts/safety-scope-check.mjs"', 'safety scope check script');
requireText('package.json', 'npm run safety:scope:check', 'safety scope in QA gate');
requireText('src/components/safety-scope-notice.tsx', 'Safety & Scope', 'safety scope component');
requireText('src/pages/practice.tsx', '<SafetyScopeNotice variant="full" id="practice-safety-scope" />', 'practice safety scope panel');
requireText('src/data/start-guidance.ts', 'START_GUIDANCE_PATHS', 'start guidance data');
requireText('src/components/starting-guidance.tsx', 'role="radiogroup"', 'start guidance radiogroup');
requireText('src/components/starting-guidance.tsx', 'aria-live="polite"', 'start guidance polite update');
requireText('src/pages/home.tsx', '<StartingGuidance />', 'home renders starting guidance');
requireText('src/pages/practice.tsx', 'id="protected-zone"', 'protected practice anchor');
requireText('src/pages/stage-detail.tsx', 'id="integrated-yogic-ascent-matrix"', 'integrated ascent matrix anchor');
requireText('package.json', '"start:guide:check": "node scripts/start-guidance-check.mjs"', 'start guidance check script');
requireText('package.json', 'npm run start:guide:check', 'start guidance in QA gate');
requireText('src/components/stage-study-layers.tsx', 'Progressive Study Mode', 'progressive study layers component');
requireText('src/components/stage-study-layers.tsx', 'aria-expanded', 'progressive study aria-expanded');
requireText('src/components/stage-study-layers.tsx', 'aria-controls', 'progressive study aria-controls');
requireText('src/pages/stage-detail.tsx', '<StageStudyLayers stageNum={stageNum} />', 'stage detail renders progressive study layers');
requireText('package.json', '"study:layers:check": "node scripts/study-layers-check.mjs"', 'study layers check script');
requireText('package.json', 'npm run study:layers:check', 'study layers in QA gate');

requireText('src/data/stage-contemplation.ts', 'STAGE_CONTEMPLATION', 'stage contemplation data');
requireText('src/components/stage-contemplation-protocol.tsx', 'Contemplation Protocol', 'stage contemplation protocol component');
requireText('src/components/stage-contemplation-protocol.tsx', 'role="tablist"', 'contemplation tablist role');
requireText('src/components/stage-contemplation-protocol.tsx', 'aria-selected', 'contemplation aria-selected state');
requireText('src/pages/stage-detail.tsx', '<StageContemplationProtocol stageNum={stageNum} />', 'stage detail renders contemplation protocol');
requireText('package.json', '"contemplation:check": "node scripts/contemplation-protocol-check.mjs"', 'contemplation protocol check script');
requireText('package.json', 'npm run contemplation:check', 'contemplation protocol in QA gate');
requireText('src/components/stage-river-navigator.tsx', 'River Stage Navigator', 'stage river navigator component');
requireText('src/components/stage-river-navigator.tsx', 'aria-current', 'stage river navigator aria-current');
requireText('src/pages/stage-detail.tsx', '<StageRiverNavigator stageNum={stageNum} />', 'stage detail renders river navigator');
requireText('package.json', '"river:navigator:check": "node scripts/river-navigator-check.mjs"', 'river navigator check script');
requireText('package.json', 'npm run river:navigator:check', 'river navigator in QA gate');


const blockedRegistryStrings = [
  'applied-caas-gateway',
  'artifactory',
  'internal.openai',
];
rejectText('package.json', blockedRegistryStrings);
rejectText('.npmrc', ['artifactory', 'internal.openai', 'applied-caas-gateway']);

const viteConfig = read('vite.config.ts');
if (/throw new Error\([^)]*(PORT|BASE_PATH)/i.test(viteConfig)) {
  failures.push('vite.config.ts still has required PORT/BASE_PATH crash logic');
}
if (viteConfig.includes('strictPort: true')) {
  warnings.push('strictPort is true; false is usually safer for plug-and-play local dev.');
}

if (failures.length) {
  console.error('\nSadhana OS deployment doctor failed:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  if (warnings.length) {
    console.warn('\nWarnings:');
    for (const warning of warnings) console.warn(`- ${warning}`);
  }
  process.exit(1);
}

console.log('Sadhana OS deployment doctor passed.');
if (warnings.length) {
  console.warn('\nWarnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}
