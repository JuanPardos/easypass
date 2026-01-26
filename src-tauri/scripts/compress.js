const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const releaseDir = path.join(__dirname, '..', 'target', 'release');
const platform = process.platform;
const binaryName = platform === 'win32' ? 'easypass.exe' : 'easypass';
const binaryPath = path.join(releaseDir, binaryName);
const bundleDir = path.join(releaseDir, 'bundle');
const upxCommand = 'upx';

function upxAvailable() {
  const check = spawnSync(upxCommand, ['--version'], { stdio: 'ignore' });
  return !check.error && check.status === 0;
}

function runUpx(target) {
  console.log(`compressing ${target}`);
  const result = spawnSync(upxCommand, ['--best', target], { stdio: 'inherit' });
  if (result.error) {
    console.warn(`skipped ${target}: ${result.error.message}`);
    return;
  }
  if (result.status !== 0) {
    console.warn(`upx exited with ${result.status} for ${target}`);
  }
}

function isExecutable(entryPath, stats) {
  if (platform === 'win32') {
    return entryPath.toLowerCase().endsWith('.exe');
  }
  return Boolean(stats.mode & 0o111);
}

function compressBundleEntries(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      compressBundleEntries(entryPath);
      continue;
    }
    const stats = fs.statSync(entryPath);
    if (!stats.isFile()) {
      continue;
    }
    if (isExecutable(entryPath, stats)) {
      runUpx(entryPath);
    }
  }
}

if (!upxAvailable()) {
  console.log('upx not found, skipping compression');
  process.exit(0);
}

if (fs.existsSync(binaryPath)) {
  runUpx(binaryPath);
} else {
  console.warn(`release binary not found at ${binaryPath}`);
}

compressBundleEntries(bundleDir);
