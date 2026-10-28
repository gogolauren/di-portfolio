'use client';

import React, { useEffect, useMemo, useState } from 'react';

// ─── Layout system ───────────────────────────────────────────────────────────
// Spacing uses a 4px scale (1 = 4px). Every control is 36px tall (h-9), every tag 24px (h-6),
// every page section shares one container width and gutter so edges line up across screens.
const CONTAINER = 'mx-auto w-full max-w-6xl px-6';
const CONTROL = 'h-9 rounded-md text-sm';
const COLOR = {
  primary: 'bg-[#0B6BCB] text-white hover:bg-[#0959A8]',
  secondary: 'border border-[#0B6BCB] bg-white text-[#0B6BCB] hover:bg-[#0B6BCB]/5',
  ghost: 'text-[#0B6BCB] hover:bg-[#0B6BCB]/5',
};

// ─── Data ────────────────────────────────────────────────────────────────────

type Status = 'Active' | 'Inactive';
type Location = 'Pre' | 'Mid' | 'Post';

type Ad = {
  id: string;
  name: string;
  type: 'Spot';
  impressions: number;
  status: Status;
  start: string; // ISO date of the earliest flight, used for sorting by flight time
  flights: string[];
  flightSynced: boolean;
  targets: { location: Location; label: string }[];
  targetSynced: boolean;
  weight: number;
  file?: string;
};

const LINE_ITEM = {
  name: 'Demo Campaign 2025',
  status: 'Active' as Status,
  order: 'Demo Insertion Order 2025',
  brand: 'Soda',
  agency: 'Best Media Company',
  industry: 'Food & Drink',
  estimatedDelivery: 'Not Started',
  flightLeft: '17 days (100%)',
};

const LINE_ITEM_START = '2025-12-07';
const LINE_ITEM_FLIGHT = 'Dec 7, 2025 – Dec 24, 2025';

const INITIAL_ADS: Ad[] = [
  // Multi-roll: Pre-rolls & Post-rolls. Multi-flight: two discrete Dec flights.
  { id: 'ad-2', name: 'Ad 2', type: 'Spot', impressions: 0, status: 'Active', start: '2026-01-01', flights: ['Jan 1, 2026 – Jan 29, 2026 (Sat, Sun)'], flightSynced: false, targets: [{ location: 'Pre', label: 'All Pre-rolls' }, { location: 'Post', label: 'All Post-rolls' }], targetSynced: false, weight: 10 },
  { id: 'ad-1', name: 'Ad 1', type: 'Spot', impressions: 0, status: 'Active', start: '2025-12-01', flights: ['Dec 1, 2025 – Dec 10, 2025', 'Dec 20, 2025 – Dec 31, 2025'], flightSynced: false, targets: [{ location: 'Pre', label: 'All Pre-rolls' }], targetSynced: false, weight: 10 },
  { id: 'ad-3', name: 'Ad 3', type: 'Spot', impressions: 0, status: 'Active', start: LINE_ITEM_START, flights: [LINE_ITEM_FLIGHT], flightSynced: true, targets: [{ location: 'Pre', label: 'All Pre-rolls' }], targetSynced: true, weight: 5 },
  { id: 'ad-5', name: 'Ad 5', type: 'Spot', impressions: 0, status: 'Inactive', start: '2025-12-01', flights: ['Dec 1, 2025 – Dec 3, 2025'], flightSynced: false, targets: [{ location: 'Mid', label: 'Mid-roll 1: All Positions' }], targetSynced: false, weight: 5 },
  { id: 'ad-4', name: 'Ad 4', type: 'Spot', impressions: 0, status: 'Inactive', start: '2025-12-01', flights: ['Dec 1, 2025 – Dec 5, 2025'], flightSynced: false, targets: [{ location: 'Mid', label: 'Mid-roll 1: All Positions' }], targetSynced: false, weight: 5, file: 'AMSC_6702_Pearlman_DYN' },
];

const LOCATION_LABEL: Record<Location, string> = { Pre: 'Pre-rolls', Mid: 'Mid-rolls', Post: 'Post-rolls' };

const WEIGHTS = Array.from({ length: 10 }, (_, i) => i + 1);

// ─── Icons (Material Design paths, 24px grid) ────────────────────────────────

const ICON = {
  arrowBack: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  pause: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z',
  add: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  search: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  expand: 'M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z',
  edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  delete: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
  block: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9A7.902 7.902 0 0 1 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1A7.902 7.902 0 0 1 20 12c0 4.42-3.58 8-8 8z',
  check: 'M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  copy: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
  chart: 'M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z',
  sync: 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z',
  more: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
  upload: 'M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z',
  calendar: 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z',
  target: 'M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z',
  sort: 'M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z',
};

const Icon = ({ d, className = 'h-4 w-4' }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden className={`shrink-0 fill-current ${className}`}>
    <path d={d} />
  </svg>
);

// ─── Primitives ──────────────────────────────────────────────────────────────

const Card = ({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) => (
  <section className="rounded-lg border border-neutral-300 bg-white">
    <header className="flex h-12 items-center justify-between border-b border-neutral-200 px-4">
      <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
      {action}
    </header>
    <div className="p-4">{children}</div>
  </section>
);

// Label above a value or control. All form rows use this so labels align.
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-semibold text-neutral-600">{label}</span>
    <div className="text-sm text-neutral-900">{children}</div>
  </div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`${CONTROL} w-full border border-neutral-300 bg-white px-3 text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-[#0B6BCB] focus:ring-2 focus:ring-[#0B6BCB]/20 ${props.className ?? ''}`}
  />
);

// Native select with one chevron, placed 8px from the right edge. Width classes go on the wrapper.
const Select = ({ className = '', ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className={`relative inline-flex ${className}`}>
    <select
      {...props}
      className={`${CONTROL} w-full appearance-none border border-neutral-300 bg-white py-0 pl-3 pr-8 text-neutral-900 outline-none focus:border-[#0B6BCB] focus:ring-2 focus:ring-[#0B6BCB]/20`}
    />
    <Icon d={ICON.expand} className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
  </div>
);

type BtnVariant = 'primary' | 'secondary' | 'ghost';

const Btn = ({
  variant = 'secondary',
  icon,
  className = '',
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; icon?: string }) => (
  <button
    {...props}
    className={`inline-flex ${CONTROL} items-center justify-center gap-2 px-4 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${COLOR[variant]} ${className}`}
  >
    {icon && <Icon d={icon} />}
    {children}
  </button>
);

const Toggle = ({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) => (
  <label className="flex h-9 cursor-pointer items-center gap-3 text-sm text-neutral-800">
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`relative h-5 w-9 rounded-full transition-colors ${on ? 'bg-[#0B6BCB]' : 'bg-neutral-300'}`}
    >
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? 'left-[18px]' : 'left-0.5'}`} />
    </button>
    {label}
  </label>
);

// Status tag. Same height as data chips so table rows line up.
const StatusTag = ({ status }: { status: Status }) => (
  <span
    className={`inline-flex h-6 items-center gap-1.5 rounded px-2 text-xs font-medium ${
      status === 'Active' ? 'bg-[#E3F5E9] text-[#1B6B3A]' : 'bg-neutral-200 text-neutral-700'
    }`}
  >
    <span className={`h-1.5 w-1.5 rounded-full ${status === 'Active' ? 'bg-[#1B6B3A]' : 'bg-neutral-500'}`} />
    {status}
  </span>
);

// Flight and target chips in one column width. One chip per item; one "Synced" tag when the ad follows the line item.
const ChipGroup = ({ items, synced, icon }: { items: string[]; synced: boolean; icon: string }) => (
  <div className="flex flex-wrap gap-1.5">
    {items.map((text) => (
      <span key={text} className="inline-flex min-h-6 max-w-full items-center gap-1.5 rounded border border-neutral-300 bg-white px-2 py-0.5 text-left text-xs leading-4 text-neutral-800">
        <Icon d={icon} className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
        {text}
      </span>
    ))}
    {synced && (
      <span className="inline-flex min-h-6 items-center gap-1 rounded bg-[#D6E8FA] px-2 py-0.5 text-xs font-medium leading-4 text-[#0B3D6E]">
        <Icon d={ICON.sync} className="h-3.5 w-3.5" />
        Synced
      </span>
    )}
  </div>
);

const FilterChip = ({ label, count, active, disabled, onClick }: { label: string; count: number; active: boolean; disabled: boolean; onClick: () => void }) => (
  <button
    type="button"
    aria-pressed={active}
    disabled={disabled}
    onClick={onClick}
    className={`inline-flex ${CONTROL} items-center gap-2 rounded-full border px-3 transition-colors ${
      disabled
        ? 'cursor-not-allowed border-neutral-200 text-neutral-400'
        : active
          ? 'border-[#0B6BCB] bg-[#D6E8FA] text-[#0B3D6E]'
          : 'border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50'
    }`}
  >
    {label}
    <span className={`rounded px-1.5 text-xs font-semibold ${disabled ? 'text-neutral-400' : 'bg-neutral-100 text-neutral-700'}`}>{count}</span>
  </button>
);

// Save split button: primary action on the left, menu on the right (matches the Save + chevron wireframe).
type MenuEntry = { label: string; icon: string; onSelect: () => void; danger?: boolean };

const SplitButton = ({ label, onClick, disabled, items }: { label: string; onClick: () => void; disabled?: boolean; items: MenuEntry[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-flex">
      <div className={`inline-flex ${CONTROL} overflow-hidden rounded-md bg-[#0B6BCB] text-white`}>
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className="px-4 font-medium transition-colors hover:bg-[#0959A8] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {label}
        </button>
        <span className="my-1.5 w-px bg-white/30" />
        <button
          type="button"
          aria-label="More save options"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          disabled={disabled}
          className="flex w-9 items-center justify-center transition-colors hover:bg-[#0959A8] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon d={ICON.expand} />
        </button>
      </div>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div role="menu" className="absolute right-0 top-11 z-20 w-52 overflow-hidden rounded-md border border-neutral-300 bg-white py-1 shadow-lg">
            {items.map((item) => (
              <button
                key={item.label}
                role="menuitem"
                type="button"
                onClick={() => {
                  setOpen(false);
                  item.onSelect();
                }}
                className={`flex h-9 w-full items-center gap-3 px-3 text-left text-sm hover:bg-neutral-100 ${item.danger ? 'text-[#C23934]' : 'text-neutral-900'}`}
              >
                <Icon d={item.icon} className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Shell ───────────────────────────────────────────────────────────────────

type Screen = 'line-item' | 'ads' | 'edit-ad' | 'new-ad';
type LineItemTab = 'details' | 'targeting' | 'ads';

export default function AdsControlPrototype() {
  const [screen, setScreen] = useState<Screen>('line-item');
  const [tab, setTab] = useState<LineItemTab>('details');
  const [ads, setAds] = useState<Ad[]>(INITIAL_ADS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [bulkEdit, setBulkEdit] = useState(false);
  const [draftWeights, setDraftWeights] = useState<Record<string, number>>({});
  const [query, setQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<Location | null>(null);
  const [menuId, setMenuId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  // The case study page picks the starting view with ?view=; the controls live outside this prototype.
  useEffect(() => {
    const view = new URLSearchParams(window.location.search).get('view');
    if (view === 'ads') {
      setScreen('ads');
      setTab('ads');
    } else if (view === 'ad') {
      setScreen('new-ad');
    }
  }, []);

  const locationCounts = useMemo(() => {
    const counts: Record<Location, number> = { Pre: 0, Mid: 0, Post: 0 };
    ads.forEach((a) => a.targets.forEach((t) => { counts[t.location] += 1; }));
    return counts;
  }, [ads]);

  const visibleAds = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = ads.filter(
      (a) => (!q || a.name.toLowerCase().includes(q)) && (!locationFilter || a.targets.some((t) => t.location === locationFilter)),
    );
    // Status first (Active above Inactive), then flight time
    return [...filtered].sort((a, b) => {
      if (a.status !== b.status) return a.status === 'Active' ? -1 : 1;
      return a.start.localeCompare(b.start);
    });
  }, [ads, query, locationFilter]);

  const openEdit = (id: string) => {
    setEditingId(id);
    setMenuId(null);
    setScreen('edit-ad');
  };

  const backToAds = () => {
    setScreen('ads');
    setTab('ads');
  };

  const saveBulk = () => {
    setAds((prev) => prev.map((a) => (draftWeights[a.id] !== undefined ? { ...a, weight: draftWeights[a.id] } : a)));
    setDraftWeights({});
    setBulkEdit(false);
    notify('Weights updated');
  };

  const cancelBulk = () => {
    setDraftWeights({});
    setBulkEdit(false);
  };

  const duplicateAd = (id: string) => {
    const src = ads.find((a) => a.id === id);
    if (!src) return;
    const copy: Ad = { ...src, id: `${src.id}-copy-${Date.now()}`, name: `${src.name} (copy)`, status: 'Active' };
    setAds((prev) => [...prev, copy]);
    setMenuId(null);
    notify(`Duplicated ${src.name}`);
  };

  const removeAd = (id: string) => {
    const src = ads.find((a) => a.id === id);
    setAds((prev) => prev.filter((a) => a.id !== id));
    setMenuId(null);
    if (src) notify(`Deleted ${src.name}`);
  };

  const setAdStatus = (id: string, status: Status) => {
    setAds((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const editing = ads.find((a) => a.id === editingId);

  return (
    <div
      className={`min-h-screen text-[13px] text-neutral-900 antialiased ${
        screen === 'new-ad' || screen === 'edit-ad' ? 'bg-white' : 'bg-[#F3F4F6]'
      }`}
    >

      {/* Line item header */}
      {(screen === 'line-item' || screen === 'ads') && (
        <div className="border-b border-neutral-300 bg-white">
          <div className={CONTAINER}>
            <div className="flex items-center justify-between pb-3 pt-5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <button aria-label="Back" className="flex h-7 w-7 items-center justify-center rounded text-neutral-600 hover:bg-neutral-100">
                    <Icon d={ICON.arrowBack} className="h-5 w-5" />
                  </button>
                  <h1 className="text-xl text-neutral-900">
                    Line Item: <span className="font-semibold">{LINE_ITEM.name}</span>
                  </h1>
                  <StatusTag status={LINE_ITEM.status} />
                </div>
                <p className="pl-9 text-xs text-neutral-600">
                  <span className="font-semibold">Order:</span> {LINE_ITEM.order}
                  <span className="mx-2 text-neutral-400">|</span>
                  <span className="font-semibold">Brand:</span> {LINE_ITEM.brand}
                  <span className="mx-2 text-neutral-400">|</span>
                  <span className="font-semibold">Agency:</span> {LINE_ITEM.agency}
                </p>
              </div>
              <Btn variant="secondary" icon={ICON.pause}>Pause</Btn>
            </div>
            <div className="flex gap-1">
              {(['details', 'targeting', 'ads'] as LineItemTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTab(t);
                    setScreen(t === 'ads' ? 'ads' : 'line-item');
                  }}
                  className={`h-10 border-b-2 px-3 transition-colors ${
                    tab === t ? 'border-[#0B6BCB] font-semibold text-[#0B6BCB]' : 'border-transparent text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {t === 'details' ? 'Details' : t === 'targeting' ? 'Targeting' : 'Ads'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className={`${CONTAINER} py-6`}>
        {/* ── Line item: Details tab ───────────────────────────────── */}
        {screen === 'line-item' && tab === 'details' && (
          <div className="grid gap-4 md:grid-cols-[1fr_320px]">
            <div className="flex flex-col gap-4">
              <Card title="Information" action={<Btn variant="ghost" icon={ICON.edit} className="px-2">Edit</Btn>}>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <Field label="Line item number"><span>Standard</span></Field>
                  <Field label="External line item number"><span>Standard</span></Field>
                  <Field label="Name"><span>{LINE_ITEM.name}</span></Field>
                  <Field label="Type"><span>abcde</span></Field>
                  <Field label="Industry"><span>{LINE_ITEM.industry}</span></Field>
                </div>
              </Card>
              <Card title="Run" action={<Btn variant="ghost" icon={ICON.add} className="px-2">Add</Btn>}>
                <table className="w-full text-left text-sm">
                  <thead className="text-xs font-semibold text-neutral-600">
                    <tr className="h-8"><th className="font-semibold">Flight</th><th className="font-semibold">Start</th><th className="font-semibold">End</th><th className="font-semibold">Actions</th></tr>
                  </thead>
                  <tbody>
                    <tr className="h-10 border-t border-neutral-200">
                      <td>Custom</td>
                      <td>Dec 7, 2025 12:00 AM</td>
                      <td>Dec 24, 2025 11:59 PM</td>
                      <td>···</td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </div>
            <Card title="Line Item Snapshot">
              <dl className="flex flex-col gap-3">
                <Row k="Estimated Delivery" v={LINE_ITEM.estimatedDelivery} />
                <Row k="Flight Time Left" v={LINE_ITEM.flightLeft} />
                <Row k="Total Impressions" v="0" />
                <Row k="Total Spend" v="$0.00" />
                <Row k="Impressions Yesterday" v="0" />
                <Row k="Spend Yesterday" v="$0.00" />
              </dl>
              <p className="mt-4 text-xs text-neutral-500">Last updated 2 mins ago</p>
            </Card>
          </div>
        )}

        {/* ── Line item: Targeting tab ─────────────────────────────── */}
        {screen === 'line-item' && tab === 'targeting' && (
          <Card title="Targeting">
            <p className="text-sm text-neutral-600">Line item-level targeting. Ads inherit these unless they override them.</p>
          </Card>
        )}

        {/* ── Ads list ─────────────────────────────────────────────── */}
        {screen === 'ads' && (
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card title="Ad Placement Rules">
                <div className="grid grid-cols-3 gap-x-6">
                  <Field label="Ad delivery"><span>Standard</span></Field>
                  <Field label="Priority"><span>Standard</span></Field>
                  <Field label="Fill rate"><span>100%</span></Field>
                </div>
              </Card>
              <Card title="Ads Snapshot">
                <dl className="flex flex-col gap-3">
                  <Row k="Total Impressions" v="0" />
                  {ads.slice(0, 3).map((a) => (
                    <Row key={a.id} k={`Impressions ${a.name}`} v="0" />
                  ))}
                </dl>
              </Card>
            </div>

            <section className="flex flex-col gap-3">
              <div className="flex h-9 items-center justify-between">
                <h2 className="text-base font-semibold">Ads</h2>
                <div className="flex gap-2">
                  {!bulkEdit && <Btn variant="secondary" icon={ICON.edit} onClick={() => setBulkEdit(true)}>Bulk edit</Btn>}
                  <Btn variant="primary" icon={ICON.add} onClick={() => setScreen('new-ad')}>Add new ad</Btn>
                </div>
              </div>

              {bulkEdit && (
                <div className="flex h-12 items-center justify-between rounded-md border border-[#0B6BCB]/30 bg-[#D6E8FA] px-4">
                  <span className="text-sm font-semibold text-[#0B3D6E]">Bulk edit weights</span>
                  <div className="flex gap-2">
                    <Btn variant="ghost" onClick={cancelBulk}>Cancel</Btn>
                    <Btn variant="primary" onClick={saveBulk}>Save</Btn>
                  </div>
                </div>
              )}

              {/* Toolbar: every control is h-9 and sits on one baseline */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Icon d={ICON.search} className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  <Input
                    placeholder="Search ads"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-60 rounded-full pl-9"
                  />
                </div>
                {(['Pre', 'Mid', 'Post'] as Location[]).map((loc) => (
                  <FilterChip
                    key={loc}
                    label={LOCATION_LABEL[loc]}
                    count={locationCounts[loc]}
                    active={locationFilter === loc}
                    disabled={locationCounts[loc] === 0}
                    onClick={() => setLocationFilter((cur) => (cur === loc ? null : loc))}
                  />
                ))}
                <div className="ml-auto flex h-9 items-center gap-2 text-sm text-neutral-600">
                  <Icon d={ICON.sort} />
                  <label htmlFor="ads-sort">Sort by</label>
                  <Select id="ads-sort" defaultValue="status" className="w-32">
                    <option value="status">Status</option>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-neutral-300 bg-white">
                <table className="w-full min-w-[900px] table-fixed text-left text-sm">
                  <colgroup>
                    <col className="w-[9%]" />
                    <col className="w-[7%]" />
                    <col className="w-[10%]" />
                    <col className="w-[10%]" />
                    <col className="w-[26%]" />
                    <col className="w-[26%]" />
                    <col className="w-[7%]" />
                    <col className="w-[5%]" />
                  </colgroup>
                  <thead className="border-b border-neutral-300 bg-neutral-50 text-xs font-semibold text-neutral-600">
                    <tr className="h-10">
                      <th className="px-4 font-semibold">Name</th>
                      <th className="px-4 font-semibold">Type</th>
                      <th className="px-4 font-semibold">Impressions</th>
                      <th className="px-4 font-semibold">Status</th>
                      <th className="px-4 font-semibold">Flight</th>
                      <th className="px-4 font-semibold">Target</th>
                      <th className="px-4 font-semibold">Weight</th>
                      <th className="px-4 font-semibold"><span className="sr-only">Actions</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleAds.length === 0 && (
                      <tr><td colSpan={8} className="h-20 px-4 text-center text-neutral-500">No ads match this view</td></tr>
                    )}
                    {visibleAds.map((a) => (
                      <tr key={a.id} className="border-b border-neutral-200 align-middle last:border-0 hover:bg-neutral-50">
                        <td className="px-4 py-3">
                          <button onClick={() => openEdit(a.id)} className="font-semibold text-[#0B6BCB] hover:underline">{a.name}</button>
                        </td>
                        <td className="px-4 py-3">{a.type}</td>
                        <td className="px-4 py-3">{a.impressions}</td>
                        <td className="px-4 py-3"><StatusTag status={a.status} /></td>
                        <td className="px-4 py-3"><ChipGroup items={a.flights} synced={a.flightSynced} icon={ICON.calendar} /></td>
                        <td className="px-4 py-3"><ChipGroup items={a.targets.map((t) => t.label)} synced={a.targetSynced} icon={ICON.target} /></td>
                        <td className="px-4 py-3">
                          {bulkEdit ? (
                            <Select
                              value={draftWeights[a.id] ?? a.weight}
                              onChange={(e) => setDraftWeights((d) => ({ ...d, [a.id]: Number(e.target.value) }))}
                              className="w-16"
                            >
                              {WEIGHTS.map((w) => <option key={w} value={w}>{w}</option>)}
                            </Select>
                          ) : (
                            a.weight
                          )}
                        </td>
                        <td className="relative px-4 py-3 text-right">
                          <button
                            onClick={() => setMenuId(menuId === a.id ? null : a.id)}
                            className="flex h-7 w-7 items-center justify-center rounded text-neutral-600 hover:bg-neutral-100"
                            aria-label="Row actions"
                          >
                            <Icon d={ICON.more} className="h-5 w-5" />
                          </button>
                          {menuId === a.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setMenuId(null)} />
                              <div role="menu" className="absolute right-4 top-11 z-20 w-52 overflow-hidden rounded-md border border-neutral-300 bg-white py-1 text-left shadow-lg">
                                <MenuItem icon={ICON.edit} onClick={() => openEdit(a.id)}>Edit</MenuItem>
                                <MenuItem icon={ICON.copy} onClick={() => duplicateAd(a.id)}>Duplicate ad</MenuItem>
                                <MenuItem icon={ICON.chart} onClick={() => notify('Opening analytics…')}>View analytics</MenuItem>
                                <MenuItem icon={ICON.delete} danger onClick={() => removeAd(a.id)}>Delete</MenuItem>
                              </div>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-neutral-500">{ads.length} of 30 ads used on this order.</p>
            </section>
          </div>
        )}

        {/* ── Edit ad ──────────────────────────────────────────────── */}
        {screen === 'edit-ad' && editing && (
          <AdForm
            key={editing.id}
            title={`Edit Ad: ${editing.name}`}
            status={editing.status}
            initial={editing}
            ads={ads}
            currentId={editing.id}
            onCancel={backToAds}
            onSave={(next) => {
              setAds((prev) => prev.map((a) => (a.id === next.id ? next : a)));
              backToAds();
              notify(`Saved ${next.name}`);
            }}
            onDeactivate={() => {
              const nextStatus: Status = editing.status === 'Active' ? 'Inactive' : 'Active';
              setAdStatus(editing.id, nextStatus);
              backToAds();
              notify(`${nextStatus === 'Inactive' ? 'Deactivated' : 'Activated'} ${editing.name}`);
            }}
            onDelete={() => {
              removeAd(editing.id);
              backToAds();
            }}
          />
        )}

        {/* ── New ad ───────────────────────────────────────────────── */}
        {screen === 'new-ad' && (
          <AdForm
            title="New Ad"
            ads={ads}
            onCancel={backToAds}
            onSave={(next) => {
              setAds((prev) => [...prev, next]);
              backToAds();
              notify(`Published ${next.name}`);
            }}
            initial={{
              id: `ad-${Date.now()}`,
              name: '',
              type: 'Spot',
              impressions: 0,
              status: 'Active',
              start: LINE_ITEM_START,
              flights: [LINE_ITEM_FLIGHT],
              flightSynced: true,
              targets: [{ location: 'Pre', label: 'All Pre-rolls' }],
              targetSynced: true,
              weight: 1,
            }}
          />
        )}
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-md bg-neutral-900 px-4 py-2.5 text-sm text-white shadow-lg">{toast}</div>
      )}
    </div>
  );
}

// ─── Subcomponents ───────────────────────────────────────────────────────────

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex h-6 items-center justify-between gap-4">
    <dt className="text-neutral-600">{k}</dt>
    <dd className="font-semibold text-neutral-900">{v}</dd>
  </div>
);

const MenuItem = ({ icon, children, onClick, danger }: { icon: string; children: React.ReactNode; onClick: () => void; danger?: boolean }) => (
  <button
    role="menuitem"
    onClick={onClick}
    className={`flex h-9 w-full items-center gap-3 px-3 text-left text-sm hover:bg-neutral-100 ${danger ? 'text-[#C23934]' : 'text-neutral-900'}`}
  >
    <Icon d={icon} />
    {children}
  </button>
);

function AdForm({
  title,
  status,
  initial,
  onCancel,
  onSave,
  onDeactivate,
  onDelete,
  ads,
  currentId,
}: {
  title: string;
  status?: Status;
  initial: Ad;
  onCancel: () => void;
  onSave: (ad: Ad) => void;
  onDeactivate?: () => void; // present only when editing an existing ad
  onDelete?: () => void;
  ads: Ad[];
  currentId?: string;
}) {
  const [name, setName] = useState(initial.name);
  const [weight, setWeight] = useState(initial.weight);
  const [flightDefault, setFlightDefault] = useState(initial.flightSynced);
  const [flightMode, setFlightMode] = useState<'Week' | 'Month' | 'Custom'>('Week');
  const [calendar, setCalendar] = useState<'Broadcast' | 'Standard'>('Broadcast');
  const [posDefault, setPosDefault] = useState(false);
  const [positionType, setPositionType] = useState<'Pre-Roll' | 'Mid-Roll' | 'Post-Roll'>('Pre-Roll');
  const [positionNumber, setPositionNumber] = useState('All');
  const [targetDefault, setTargetDefault] = useState(initial.targetSynced);
  const [dirty, setDirty] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const toggleSection = (k: string) => setCollapsed((c) => ({ ...c, [k]: !c[k] }));

  const canSave = name.trim().length > 0;
  const isEdit = Boolean(onDeactivate);

  const Section = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => (
    <Card
      title={label}
      action={
        <button
          onClick={() => toggleSection(id)}
          className="flex h-7 w-7 items-center justify-center rounded text-neutral-600 hover:bg-neutral-100"
          aria-label={`Toggle ${label}`}
        >
          <Icon d={ICON.expand} className={`h-5 w-5 transition-transform ${collapsed[id] ? '-rotate-90' : ''}`} />
        </button>
      }
    >
      {!collapsed[id] && children}
    </Card>
  );

  return (
    <div className="mx-auto max-w-5xl">
      {/* Action bar: same height and padding in both modes */}
      <div
        className="sticky top-0 z-10 mb-4 h-14 border-b border-neutral-300 bg-white shadow-[0_1px_0_rgba(0,0,0,.04)]"
        style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}
      >
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between">
        <Btn variant="ghost" className="px-0" onClick={onCancel}>Cancel</Btn>
        <span className="text-xs font-semibold tracking-wide text-neutral-500">ART19</span>
        {isEdit ? (
          <SplitButton
            label="Save"
            disabled={!canSave}
            onClick={() => onSave({ ...initial, name: name.trim(), weight, flightSynced: flightDefault, targetSynced: targetDefault })}
            items={[
              {
                label: status === 'Active' ? 'Deactivate Ad' : 'Activate Ad',
                icon: status === 'Active' ? ICON.block : ICON.check,
                onSelect: () => onDeactivate?.(),
              },
              { label: 'Delete', icon: ICON.delete, danger: true, onSelect: () => onDelete?.() },
            ]}
          />
        ) : (
          <Btn variant="primary" disabled={!canSave} icon={ICON.upload} onClick={() => onSave({ ...initial, name: name.trim(), weight, status: 'Active', flightSynced: flightDefault, targetSynced: targetDefault })}>
            Publish Ad
          </Btn>
        )}
        </div>
      </div>

      <div className="grid grid-cols-[200px_minmax(0,1fr)] items-start gap-8">
        <AdPreview ads={ads} currentId={currentId} />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        <div className="flex h-9 items-center gap-3">
          <h1 className="text-xl text-neutral-900">{title}</h1>
          {status && <StatusTag status={status} />}
          {dirty && <span className="text-xs font-semibold text-[#8C5800]">Unsaved changes</span>}
        </div>

        <Section id="info" label="Information">
          <div className="flex flex-col gap-4">
            <Field label="Name">
              <Input
                value={name}
                placeholder="Name your ad"
                onChange={(e) => { setName(e.target.value); setDirty(true); }}
              />
            </Field>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Insertion order"><span>{LINE_ITEM.order}</span></Field>
              <Field label="Line item"><span>{LINE_ITEM.name}</span></Field>
              <Field label="Brand"><span>{LINE_ITEM.brand}</span></Field>
              <Field label="Agency"><span>{LINE_ITEM.agency}</span></Field>
            </div>
          </div>
        </Section>

        <Section id="media" label="Media upload">
          {initial.file ? (
            <div className="rounded-md border border-neutral-300 p-4">
              <p className="mb-3 text-sm"><span className="font-semibold">File name:</span> {initial.file}</p>
              <div className="flex h-16 items-center justify-center rounded bg-neutral-100 text-xs text-neutral-500">Waveform preview</div>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-md border border-dashed border-neutral-400 p-6 text-center text-sm text-neutral-600 hover:bg-neutral-50">
              <input type="file" accept="audio/*" className="hidden" onChange={() => setDirty(true)} />
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D6E8FA] text-[#0B6BCB]">
                <Icon d={ICON.upload} className="h-5 w-5" />
              </span>
              <span>Audio size must be smaller than 2GB. We support mp3 and wav.</span>
            </label>
          )}
        </Section>

        <Section id="flight" label="Flight">
          <div className="flex flex-col gap-4">
            <Toggle on={flightDefault} onChange={(v) => { setFlightDefault(v); setDirty(true); }} label="Default to Line Item settings" />
            {!flightDefault && (
              <div className="flex flex-col gap-4">
                <div className="flex gap-6">
                  {(['Week', 'Month', 'Custom'] as const).map((m) => (
                    <Radio key={m} checked={flightMode === m} onChange={() => setFlightMode(m)} label={m} />
                  ))}
                </div>
                <div className="flex gap-6">
                  {(['Broadcast', 'Standard'] as const).map((c) => (
                    <Radio key={c} checked={calendar === c} onChange={() => setCalendar(c)} label={c} />
                  ))}
                </div>
                <Field label="Broadcast week">
                  <Select className="w-full"><option>Week 50, 2025 (12/08/25 – 12/14/25)</option></Select>
                </Field>
              </div>
            )}
            <div className="rounded-md bg-neutral-50 p-3 text-xs text-neutral-700">
              <span className="font-semibold">Campaign flights:</span> Dec 2025 · Dec 1, 2025 – Dec 31, 2025 11:59 AM (Sat, Sun) · Jan 2026 · Jan 1, 2026 – Jan 29, 2026 11:59 AM
            </div>
          </div>
        </Section>

        <Section id="position" label="Positional targeting">
          <div className="flex flex-col gap-4">
            <Toggle on={posDefault} onChange={(v) => { setPosDefault(v); setDirty(true); }} label="Default to Line Item settings" />
            {!posDefault && (
              <div className="flex flex-col gap-4">
                <Field label="Position type">
                  <div className="flex gap-6">
                    {(['Pre-Roll', 'Mid-Roll', 'Post-Roll'] as const).map((p) => (
                      <Radio key={p} checked={positionType === p} onChange={() => setPositionType(p)} label={p} />
                    ))}
                  </div>
                </Field>
                <Field label="Number">
                  <Select value={positionNumber} onChange={(e) => setPositionNumber(e.target.value)} className="w-full">
                    <option>All</option><option>1</option><option>2</option>
                  </Select>
                </Field>
                <p className="text-xs text-neutral-500">Available positions are determined by the maximum number of ad positions per ASP.</p>
                <Btn variant="ghost" icon={ICON.add} className="w-fit px-2">Add another position</Btn>
              </div>
            )}
            <div className="rounded-md bg-neutral-50 p-3 text-xs text-neutral-700">
              <span className="font-semibold">Campaign targeting:</span> Pre-roll: All · Mid-roll: Mid-roll 1: All positions · Post-roll: All
            </div>
          </div>
        </Section>

        <Section id="weight" label="Rotational weighing">
          <div className="flex flex-col gap-3">
            <Field label="Weight">
              <Select value={weight} onChange={(e) => { setWeight(Number(e.target.value)); setDirty(true); }} className="w-24">
                {WEIGHTS.map((w) => <option key={w} value={w}>{w}</option>)}
              </Select>
            </Field>
            <p className="text-xs text-neutral-500">Each ad can be assigned a weight between 1 and 10.</p>
            <div className="rounded-md bg-neutral-50 p-3 text-xs leading-relaxed text-neutral-700">
              <span className="font-semibold">How weight works:</span> An ad&apos;s weight is only factored into distribution if there are other ads in the same ad location and during the overlapped flight. Impressions are split by dividing the ad&apos;s weight by the total weight of all active ads in that location.
            </div>
          </div>
        </Section>
      </div>
      </div>
    </div>
  );
}

// Left rail of the ad form: every ad, grouped by the roll(s) it plays in.
function AdPreview({ ads, currentId }: { ads: Ad[]; currentId?: string }) {
  const groups: Location[] = ['Pre', 'Mid', 'Post'];
  const chip: Record<Location, { label: string; className: string }> = {
    Pre: { label: 'Pre-roll', className: 'bg-[#DCEBFF] text-[#1E4FA8]' },
    Mid: { label: 'Mid-roll', className: 'bg-[#FADDF2] text-[#A0218A]' },
    Post: { label: 'Post-roll', className: 'bg-[#FFE3BF] text-[#8A4B12]' },
  };
  return (
    <aside className="sticky top-20 flex flex-col gap-6 self-start">
      <h2 className="text-base font-semibold text-neutral-900">Ads preview</h2>
      {groups.map((loc) => {
        const items = ads.filter((a) => a.targets.some((t) => t.location === loc));
        return (
          <div key={loc} className="flex flex-col">
            <div className="flex items-center gap-3 pb-2">
              <span className={`rounded px-2 py-0.5 text-xs font-semibold ${chip[loc].className}`}>{chip[loc].label}</span>
              <span className="h-px flex-1 bg-neutral-200" />
              <span className="text-xs text-neutral-400">{items.length}</span>
            </div>
            {items.length === 0 && <p className="py-2 text-xs text-neutral-400">No ads</p>}
            {items.map((a) => (
              <div
                key={a.id}
                className={`flex items-center justify-between py-1.5 text-sm ${
                  a.id === currentId ? 'font-semibold text-[#0B6BCB]' : a.status === 'Inactive' ? 'text-neutral-400' : 'text-neutral-800'
                }`}
              >
                <span>{a.name}</span>
                {a.status === 'Inactive' && <span className="text-[11px] text-neutral-400">Inactive</span>}
              </div>
            ))}
          </div>
        );
      })}
    </aside>
  );
}

function Radio({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex h-9 cursor-pointer items-center gap-2 text-sm">
      <input type="radio" checked={checked} onChange={onChange} className="h-4 w-4 accent-[#0B6BCB]" />
      {label}
    </label>
  );
}
