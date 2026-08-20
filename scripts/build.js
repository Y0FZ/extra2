'use strict';

/**
 * Genera el artefacto estatico desplegable en ./dist a partir de ./public.
 * En un proyecto real esto podria ser el resultado de un bundler (Vite,
 * webpack, etc.). Aqui, con fines demostrativos para el ejercicio de CD,
 * copiamos la plantilla estatica y le inyectamos metadatos del build
 * (commit, fecha, actor) tomados de las variables de entorno que expone
 * GitHub Actions.
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'public');
const DIST_DIR = path.join(__dirname, '..', 'dist');

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function injectBuildInfo() {
  const indexPath = path.join(DIST_DIR, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');

  const sha = process.env.GITHUB_SHA ? process.env.GITHUB_SHA.slice(0, 7) : 'local';
  const actor = process.env.GITHUB_ACTOR || 'ejecucion-local';
  const runNumber = process.env.GITHUB_RUN_NUMBER || 'N/A';
  const buildDate = new Date().toISOString();

  const infoHtml = `
    <ul>
      <li><strong>Commit:</strong> <code>${sha}</code></li>
      <li><strong>Disparado por:</strong> ${actor}</li>
      <li><strong>Ejecucion #:</strong> ${runNumber}</li>
      <li><strong>Fecha de build:</strong> ${buildDate}</li>
    </ul>
  `;

  html = html.replace(
    '<p><em>Informacion de build no disponible (ejecucion local).</em></p>',
    infoHtml
  );

  fs.writeFileSync(indexPath, html);
}

function main() {
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
  copyRecursive(SRC_DIR, DIST_DIR);
  injectBuildInfo();
  console.log(`Build generado en: ${DIST_DIR}`);
}

main();
