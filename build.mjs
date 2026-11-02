import fs from 'node:fs/promises';
const base=new URL('./',import.meta.url);const read=p=>fs.readFile(new URL(p,base),'utf8');
const data=(await read('content/lectures.mjs')).replace('export const lectures','const lectures');
const state=(await read('src/state.mjs')).replaceAll('export function','function');
const css=await read('src/style.css'),app=await read('src/app.mjs');
const html=`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#c4f649"><title>Kant · TIL</title><style>${css}</style></head><body><div id="app"></div><script>${data}\n${state}\n${app}</script></body></html>`;
await fs.writeFile(new URL('index.html',base),html);console.log('Built offline index.html');
