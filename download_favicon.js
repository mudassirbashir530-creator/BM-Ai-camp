import fs from 'fs';
import https from 'https';

https.get('https://i.ibb.co/k2b42LsD/23ae5ef8-a3ae-4399-8cfd-be88f3a82bce-removalai-preview.png', (response) => {
  let chunks = [];
  response.on('data', (chunk) => {
    chunks.push(chunk);
  });
  response.on('end', () => {
    let buffer = Buffer.concat(chunks);
    let base64 = buffer.toString('base64');
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
  <style>
    @media (prefers-color-scheme: light) {
      image { filter: brightness(0) invert(1); }
    }
  </style>
  <image href="data:image/png;base64,${base64}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
</svg>`;
    fs.writeFileSync('public/favicon.svg', svg);
    console.log('Done!');
  });
});
