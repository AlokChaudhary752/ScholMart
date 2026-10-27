import fs from 'node:fs';
import zlib from 'node:zlib';

function createPng(width, height, r, g, b) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth
  ihdrData.writeUInt8(2, 9); // color type (RGB)
  ihdrData.writeUInt8(0, 10);
  ihdrData.writeUInt8(0, 11);
  ihdrData.writeUInt8(0, 12);
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Raw image data: filter byte 0 followed by width * 3 bytes per scanline
  const rawScanline = Buffer.alloc(1 + width * 3);
  rawScanline[0] = 0; // Filter: None
  for (let x = 0; x < width; x++) {
    rawScanline[1 + x * 3] = r;
    rawScanline[1 + x * 3 + 1] = g;
    rawScanline[1 + x * 3 + 2] = b;
  }

  const rawData = Buffer.concat(Array.from({ length: height }, () => rawScanline));
  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);

  // IEND
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);

  const typeBuf = Buffer.from(type, 'ascii');
  const typeAndData = Buffer.concat([typeBuf, data]);

  // Calculate CRC32
  let crc = 0xffffffff;
  for (let i = 0; i < typeAndData.length; i++) {
    const byte = typeAndData[i];
    crc ^= byte;
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  crc = (crc ^ 0xffffffff) >>> 0;

  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);

  return Buffer.concat([len, typeAndData, crcBuf]);
}

// Brand navy/orange icon
const png192 = createPng(192, 192, 11, 25, 44); // #0B192C
const png512 = createPng(512, 512, 255, 101, 0); // #FF6500

fs.writeFileSync('public/icon-192.png', png192);
fs.writeFileSync('public/icon-512.png', png512);
console.log('PWA icons created successfully.');
