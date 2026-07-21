import React from 'react';
import '../../styles/art.css';

// Работы Mashku Art (превью в static/img/art, взяты с mashku-art.pages.dev)
// + фото стикеров «в среде» с Behance (sticker-*). 5 строк, соседние едут
// в противоположные стороны; стикеры вплетены между работами.
const ROWS: string[][] = [
  ['antalya', 'bluefish_color', 'cow', 'sticker-eye', 'dino', 'face_blue_wb', 'postcard-coffee', 'man', 'meme-filipp', 'sticker-snail', 'snail-bw-fit', 'tree-bw-fit'],
  ['belyakov', 'cat-sitting', 'sticker-shark', 'crab-color', 'dolphin', 'sticker-eye-bw', 'faces', 'man_face', 'sticker-face', 'meme', 'snail-color-fit', 'tree-color-fit'],
  ['bird', 'cat', 'crab', 'sticker-sheet', 'elephant', 'goose', 'many-faces', 'mug', 'sticker-elephant', 'staring-you', 'tunektepe'],
  ['bird_color', 'chicken-face', 'dance-fusion', 'sticker-board', 'shopper-face', 'eyes-poster', 'head', 'many', 'nomadic-eye', 'sticker_fish', 'untitled-65'],
  ['bird_wb', 'cover', 'demon', 'sticker-devil', 'shopper-two-faces', 'face-fish', 'man-fish', 'many_legs', 'red_head', 'totem', 'woman'],
];

function Row({ items, dir }: { items: string[]; dir: 'left' | 'right' }) {
  // Дублируем набор — для бесшовной прокрутки (сдвиг ровно на половину трека).
  const doubled = [...items, ...items];
  return (
    <div className="art-row">
      <div className={`art-track art-track--${dir}`}>
        {doubled.map((name, i) => (
          <span className="art-item" key={`${name}-${i}`}>
            <img src={`/img/art/${name}.png`} alt="" loading="lazy" draggable={false} />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Бегущая сетка работ: строки чередуют направление прокрутки. */
export default function ArtMarquee() {
  return (
    <div className="art-marquee" aria-label="Mashku Art works">
      {ROWS.map((items, i) => (
        <Row key={i} items={items} dir={i % 2 === 0 ? 'left' : 'right'} />
      ))}
    </div>
  );
}
