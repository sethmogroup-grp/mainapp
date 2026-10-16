import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useSectionData from '../hooks/useSectionData';
import { getSubsidiariesSection } from '../services/contentServices';
import { SUBSIDIARIES_DEFAULTS, SUBSIDIARY_LOGOS } from '../data/homeDefaults';
import './SubsidiariesSection.css';

const isExternal = (url = '') => /^https?:\/\//i.test(url);

/* The picture is drawn on a 540 x 660 canvas. Every spot is the centre of a logo (x, y)
   plus the logo width, taken from the approved layout. */
const CANVAS = { w: 540, h: 660 };
const HUB = { x: 282, y: 325, w: 108 };

const SLOTS = [
  { x: 427, y: 50, w: 118 },   // 1 top right
  { x: 260, y: 125, w: 108 },  // 2 top centre
  { x: 82, y: 235, w: 98 },    // 3 left
  { x: 452, y: 225, w: 116 },  // 4 right
  { x: 78, y: 450, w: 118 },   // 5 lower left
  { x: 458, y: 448, w: 138 },  // 6 lower right
  { x: 268, y: 532, w: 114 },  // 7 bottom centre
  { x: 102, y: 622, w: 104 },  // 8 bottom left
  { x: 441, y: 622, w: 118 },  // 9 bottom right
];

// Any extra companies the admin adds are spread on a ring around the hub
const ringSlot = (i, total) => {
  const angle = -Math.PI / 2 + (i / total) * Math.PI * 2;
  return {
    x: HUB.x + Math.cos(angle) * 215,
    y: HUB.y + Math.sin(angle) * 270,
    w: 112,
  };
};

const buildSlots = (count) =>
  Array.from({ length: count }, (_, i) => (count <= SLOTS.length ? SLOTS[i] : ringSlot(i, count)));

// Where a dotted arrow should stop so it points at (but doesn't touch) the logo
const arrowFor = (slot, logoRatio = 0.45) => {
  const dx = slot.x - HUB.x;
  const dy = slot.y - HUB.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;

  const startGap = 46;
  const halfW = slot.w / 2;
  const halfH = (slot.w * logoRatio) / 2;
  const endGap = Math.abs(ux) * halfW + Math.abs(uy) * halfH + 14;

  return {
    x1: HUB.x + ux * startGap,
    y1: HUB.y + uy * startGap,
    x2: slot.x - ux * endGap,
    y2: slot.y - uy * endGap,
  };
};

const Logo = ({ item, style }) => {
  const img = (
    <img src={item.logo} alt={item.name} loading="lazy" decoding="async" draggable="false" />
  );
  if (!item.link) {
    return (
      <div className="sub-logo" style={style}>
        {img}
      </div>
    );
  }
  return isExternal(item.link) ? (
    <a className="sub-logo" style={style} href={item.link} target="_blank" rel="noopener noreferrer">
      {img}
    </a>
  ) : (
    <Link className="sub-logo" style={style} to={item.link}>
      {img}
    </Link>
  );
};

const pct = (value, total) => `${(value / total) * 100}%`;

const SubsidiariesSection = () => {
  const data = useSectionData(getSubsidiariesSection, SUBSIDIARIES_DEFAULTS);

  const items = useMemo(() => {
    const saved =
      Array.isArray(data?.items) && data.items.length ? data.items : SUBSIDIARIES_DEFAULTS.items;
    return saved
      .map((item) => ({ ...item, logo: item.logo || SUBSIDIARY_LOGOS[item.id] || '' }))
      .filter((item) => item.logo);
  }, [data]);

  const slots = useMemo(() => buildSlots(items.length), [items.length]);
  const hubLogo = data?.hubLogo || SUBSIDIARY_LOGOS.hub;

  return (
    <section className="sub">
      <div className="sub-inner">
        <div className="sub-canvas" style={{ aspectRatio: `${CANVAS.w} / ${CANVAS.h}` }}>
          <svg
            className="sub-lines"
            viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`}
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <marker
                id="sub-arrowhead"
                viewBox="0 0 10 10"
                refX="8.5"
                refY="5"
                markerUnits="userSpaceOnUse"
                markerWidth="12"
                markerHeight="12"
                orient="auto-start-reverse"
              >
                <path d="M1.5 1.5 L8.5 5 L1.5 8.5" fill="none" stroke="#272f4d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>
            {slots.map((slot, i) => {
              const { x1, y1, x2, y2 } = arrowFor(slot);
              return (
                <line
                  key={`line-${items[i].id}`}
                  className="sub-line"
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  markerEnd="url(#sub-arrowhead)"
                />
              );
            })}
          </svg>

          <div
            className="sub-logo sub-hub"
            style={{
              left: pct(HUB.x, CANVAS.w),
              top: pct(HUB.y, CANVAS.h),
              width: pct(HUB.w, CANVAS.w),
            }}
          >
            <img src={hubLogo} alt="Sethmo Group" decoding="async" draggable="false" />
          </div>

          {items.map((item, i) => (
            <Logo
              key={item.id}
              item={item}
              style={{
                left: pct(slots[i].x, CANVAS.w),
                top: pct(slots[i].y, CANVAS.h),
                width: pct(slots[i].w, CANVAS.w),
              }}
            />
          ))}
        </div>

        <h2 className="sub-title">{data?.title}</h2>
      </div>
    </section>
  );
};

export default SubsidiariesSection;
