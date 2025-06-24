#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';

const GITHUB_API = 'https://raw.githubusercontent.com/2RK-dev/disc-hard/develop/src/main/resources/api/';
const FILES = ['rest.yml', 'commons.yml'];
const OUT_DIR = path.resolve('./openapi');

async function fetchAndSave(file) {
  const url = GITHUB_API + file;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${file}: ${res.status}`);
  const text = await res.text();
  await fs.writeFile(path.join(OUT_DIR, file), text);
  console.log(`Fetched ${file}`);
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  for (const file of FILES) {
    await fetchAndSave(file);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
