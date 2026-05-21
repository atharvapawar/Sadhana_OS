#!/usr/bin/env node
import { readFileSync } from "node:fs";

const stageDetail = readFileSync("src/pages/stage-detail.tsx", "utf8");
const component = readFileSync("src/components/stage-study-layers.tsx", "utf8");
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

const requiredStageAnchors = [
  'id="stage-intelligence"',
  'id="deep-stage-architecture"',
  'id="integrated-yogic-ascent-matrix"',
  'id="cross-linking-intelligence"',
  'id="practice-safety-gate"',
];

const requiredComponentSignals = [
  "Progressive Study Mode",
  "aria-expanded",
  "aria-controls",
  "role=\"region\"",
  "Quick orientation",
  "Sequence logic",
  "Body-prana-inner science map",
  "Safe practice gate",
  "Integration and cross-linking",
  "/practice#protected-zone",
];

const failures = [];

if (!stageDetail.includes("<StageStudyLayers stageNum={stageNum} />")) {
  failures.push("Stage detail page does not render StageStudyLayers.");
}

for (const anchor of requiredStageAnchors) {
  if (!stageDetail.includes(anchor)) {
    failures.push(`Missing stage anchor: ${anchor}`);
  }
}

for (const signal of requiredComponentSignals) {
  if (!component.includes(signal)) {
    failures.push(`Missing progressive study signal: ${signal}`);
  }
}

if (!packageJson.scripts?.["study:layers:check"]) {
  failures.push("package.json is missing study:layers:check script.");
}

if (!packageJson.scripts?.qa?.includes("study:layers:check")) {
  failures.push("npm run qa does not include study:layers:check.");
}

if (failures.length) {
  console.error("Progressive study layer check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Progressive study layer check passed.");
