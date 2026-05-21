'use client';

import React, { useState, useRef, useEffect } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

const SERIES = [
  { id: 'armchair-expert',       name: 'Armchair Expert',                       network: 'Wondery Crime & Journal', category: 'Society',    status: 'Active', episodes: 124, lastRelease: 'May 13, 2026', monthlyDl: '2.4M' },
  { id: 'american-scandal',      name: 'American Scandal',                      network: 'Wondery Crime & Journal', category: 'History',    status: 'Active', episodes: 312, lastRelease: 'May 12, 2026', monthlyDl: '3.1M' },
  { id: 'hysterical',            name: 'Hysterical',                            network: 'Wondery Comedy',          category: 'Comedy',     status: 'Active', episodes:  48, lastRelease: 'May 10, 2026', monthlyDl: '1.2M' },
  { id: 'mrballen',              name: "Mr. Ballen's Medical Mysteries",        network: 'Wondery Crime & Journal', category: 'True Crime', status: 'Active', episodes: 268, lastRelease: 'May 9, 2026',  monthlyDl: '1.9M' },
  { id: 'even-the-rich',         name: 'Even The Rich',                         network: 'Wondery Crime & Journal', category: 'Society',    status: 'Active', episodes: 196, lastRelease: 'May 8, 2026',  monthlyDl: '1.5M' },
  { id: 'how-i-built-this',      name: 'How I Built This Podcast with Guy Raz', network: 'Wondery Crime & Journal', category: 'Business',   status: 'Active', episodes: 154, lastRelease: 'May 7, 2026',  monthlyDl: '980K' },
  { id: 'the-spy-who',           name: 'The Spy Who',                           network: 'Wondery Crime & Journal', category: 'True Crime', status: 'Paused', episodes:  88, lastRelease: 'Apr 22, 2026', monthlyDl: '640K' },
  { id: 'the-big-flop',          name: 'The Big Flop',                          network: 'Wondery Sports',          category: 'Comedy',     status: 'Active', episodes: 412, lastRelease: 'May 14, 2026', monthlyDl: '2.1M' },
  { id: 'scamfluencers',         name: 'Scamfluencers',                         network: 'Wondery Sports',          category: 'True Crime', status: 'Active', episodes:  76, lastRelease: 'May 12, 2026', monthlyDl: '880K' },
  { id: 'new-heights',           name: 'New Heights',                           network: 'Wondery Comedy',          category: 'Sports',     status: 'Active', episodes: 134, lastRelease: 'May 6, 2026',  monthlyDl: '720K' },
];

const NETWORKS = [
  { name: 'Wondery Crime & Journal Network', categories: 'News, History, True Crime', series: 18, monthlyDl: '12.4M' },
  { name: 'Wondery Sports Network',          categories: 'Sports',                    series:  9, monthlyDl: '5.8M'  },
  { name: 'Wondery Comedy Network',          categories: 'Comedy',                    series: 12, monthlyDl: '4.2M'  },
  { name: 'Wondery Kids Network',            categories: 'Family, Education',         series:  7, monthlyDl: '2.1M'  },
];

const EPISODES_24H = [
  { num: 1, title: 'Outbreak',              published: 'Jul 1, 2024', duration: '29:18', downloads: '184K', status: 'Published' },
  { num: 2, title: 'All In Your Head',       published: 'Jul 8, 2024',  duration: '33:42', downloads: '172K', status: 'Published' },
  { num: 3, title: 'We Have Another One',            published: 'Jul 15, 2024', duration: '36:01', downloads: '168K', status: 'Published' },
  { num: 4, title: 'Waiting for Brockovich',              published: 'Jul 15, 2024', duration: '37:55', downloads: '175K', status: 'Published' },
  { num: 5, title: 'Alive and Well',                 published: 'Jul 22, 2024', duration: '40:30', downloads: '163K', status: 'Published' },
  { num: 6, title: 'Into the Multiverse', published: 'Jul 22, 2024', duration: '41:30',     downloads: '182K',    status: 'Published' },
  { num: 7, title: "We're Gucci", published: 'Jul 22, 2024', duration: '41:15',     downloads: '186K',    status: 'Published' },
  { num: 8, title: "What to Listen to Next - MrBallen's Medical Mysteries", published: 'Aug 27, 2024', duration: '33:10',     downloads: '195K',    status: 'Published' },
];

const FEEDS_24H = [
  { name: 'Primary Feed',         type: 'Spot', adFree: 'Yes', dateRange: 'Jan 1 – Aug 31, 2026', adSlots: 'All Pre-Rolls, All Mid-Rolls', status: 'Active' },
  { name: 'Amazon Music Ad Free', type: 'Spot', adFree: 'No',  dateRange: 'Jan 1 – Jan 31, 2026', adSlots: 'All Pre-Rolls, All Mid-Rolls', status: 'Active' },
  { name: 'Audible Ad Free',      type: 'Spot', adFree: 'No',  dateRange: 'Jan 1 – Feb 8, 2026',  adSlots: 'All Pre-Rolls',               status: 'Active' },
];

const SEASONS_24H = [
  { name: 'Season 1', episodes: 52, firstRelease: 'Jan 5, 2024',  lastRelease: 'Dec 20, 2024', status: 'Complete' },
  { name: 'Season 2', episodes: 48, firstRelease: 'Jan 3, 2025',  lastRelease: 'Dec 19, 2025', status: 'Complete' },
  { name: 'Season 3', episodes: 24, firstRelease: 'Jan 2, 2026',  lastRelease: '—',            status: 'Active'   },
];

const WORKSPACES = [
  { id: 'home',       name: 'Home',            icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M3 11 12 4l9 7"/><path d="M5 10v9h14v-9"/><path d="M10 19v-5h4v5"/></svg> },
  { id: 'publisher',  name: 'Publishers',       icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg> },
  { id: 'ads',        name: 'Ads',              icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M4 7h11l5 5-5 5H4z"/></svg> },
  { id: 'settings',   name: 'Settings',         icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1A2 2 0 1 1 4.4 17l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1A2 2 0 1 1 7 4.4l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1A2 2 0 1 1 19.6 7l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg> },
  { id: 'accounting', name: 'Accounting',       icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/></svg> },
  { id: 'reports',    name: 'Reports',          icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M4 19V5M4 19h16M8 16v-4M12 16V9M16 16v-6"/></svg> },
  { id: 'users',      name: 'User Management',  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="9" cy="9" r="3.2"/><path d="M3 19c.8-3 3.2-4.5 6-4.5s5.2 1.5 6 4.5"/><circle cx="17" cy="7" r="2.2"/><path d="M15 13c2.5 0 4.2 1.2 5 3"/></svg> },
];

// ─── Brands data ─────────────────────────────────────────────────────────────

const BRANDS = [
  { id:  1, name: "McDonald's",                          website: 'mcdonalds.com',          industry: 'Food & Drink' },
  { id:  2, name: 'Starbucks',                           website: 'starbucks.com',          industry: 'Food & Drink' },
  { id:  3, name: 'Subway',                              website: 'subway.com',             industry: 'Food & Drink' },
  { id:  4, name: 'Chipotle',                            website: 'chipotle.com',           industry: 'Food & Drink' },
  { id:  5, name: 'KFC',                                 website: 'kfc.com',                industry: 'Food & Drink' },
  { id:  6, name: 'Taco Bell',                           website: 'tacobell.com',           industry: 'Food & Drink' },
  { id:  7, name: 'Pizza Hut',                           website: 'pizzahut.com',           industry: 'Food & Drink' },
  { id:  8, name: "Domino's",                            website: 'dominos.com',            industry: 'Food & Drink' },
  { id:  9, name: 'Burger King',                         website: 'bk.com',                 industry: 'Food & Drink' },
  { id: 10, name: "Wendy's",                             website: 'wendys.com',             industry: 'Food & Drink' },
  { id: 11, name: "Dunkin'",                             website: 'dunkindonuts.com',        industry: 'Food & Drink' },
  { id: 12, name: 'Panera Bread',                        website: 'panerabread.com',         industry: 'Food & Drink' },
  { id: 13, name: 'Chick-fil-A',                         website: 'chick-fil-a.com',         industry: 'Food & Drink' },
  { id: 14, name: "Papa John's",                         website: 'papajohns.com',           industry: 'Food & Drink' },
  { id: 15, name: 'Popeyes',                             website: 'popeyes.com',             industry: 'Food & Drink' },
  { id: 16, name: 'Shake Shack',                         website: 'shakeshack.com',          industry: 'Food & Drink' },
  { id: 17, name: 'Five Guys',                           website: 'fiveguys.com',            industry: 'Food & Drink' },
  { id: 18, name: 'In-N-Out Burger',                     website: 'in-n-out.com',            industry: 'Food & Drink' },
  { id: 19, name: 'Olive Garden',                        website: 'olivegarden.com',         industry: 'Food & Drink' },
  { id: 20, name: 'Red Lobster',                         website: 'redlobster.com',          industry: 'Food & Drink' },
  { id: 21, name: 'Dairy Queen',                         website: 'dairyqueen.com',          industry: 'Food & Drink' },
  { id: 22, name: 'Baskin-Robbins',                      website: 'baskinrobbins.com',       industry: 'Food & Drink' },
  { id: 23, name: 'Krispy Kreme',                        website: 'krispykreme.com',         industry: 'Food & Drink' },
  { id: 24, name: 'IHOP',                                website: 'ihop.com',                industry: 'Food & Drink' },
  { id: 25, name: "Applebee's",                          website: 'applebees.com',           industry: 'Food & Drink' },
  { id: 26, name: 'Dove Chocolate',                      website: 'dovechocolate.com',       industry: 'Food & Drink' },
  { id: 27, name: 'Coca-Cola',                           website: 'coca-cola.com',           industry: 'Food & Drink' },
  { id: 28, name: 'Pepsi',                               website: 'pepsi.com',               industry: 'Food & Drink' },
  { id: 29, name: 'Red Bull',                            website: 'redbull.com',             industry: 'Food & Drink' },
  { id: 30, name: 'Monster Energy',                      website: 'monsterenergy.com',       industry: 'Food & Drink' },
  { id: 31, name: 'Gatorade',                            website: 'gatorade.com',            industry: 'Food & Drink' },
  { id: 32, name: 'Sprite',                              website: 'sprite.com',              industry: 'Food & Drink' },
  { id: 33, name: 'Mountain Dew',                        website: 'mountaindew.com',         industry: 'Food & Drink' },
  { id: 34, name: 'Nespresso',                           website: 'nespresso.com',           industry: 'Food & Drink' },
  { id: 35, name: 'Lipton',                              website: 'lipton.com',              industry: 'Food & Drink' },
  { id: 36, name: 'Arizona Iced Tea',                    website: 'arizonabeverages.com',    industry: 'Food & Drink' },
  { id: 37, name: 'Texas Roadhouse',                     website: 'texasroadhouse.com',      industry: 'Food & Drink' },
  { id: 38, name: 'The Cheesecake Factory',              website: 'thecheesecakefactory.com',industry: 'Food & Drink' },
  { id: 39, name: 'Panda Express',                       website: 'pandaexpress.com',        industry: 'Food & Drink' },
  { id: 40, name: "Chili's",                             website: 'chilis.com',              industry: 'Food & Drink' },
  { id: 41, name: 'Budweiser',                           website: 'budweiser.com',           industry: 'Food & Drink: Cocktails/Beer' },
  { id: 42, name: 'Corona',                              website: 'corona.com',              industry: 'Food & Drink: Cocktails/Beer' },
  { id: 43, name: 'Heineken',                            website: 'heineken.com',            industry: 'Food & Drink: Cocktails/Beer' },
  { id: 44, name: 'Coors',                               website: 'coorsbeer.com',           industry: 'Food & Drink: Cocktails/Beer' },
  { id: 45, name: 'Miller Lite',                         website: 'millerlite.com',          industry: 'Food & Drink: Cocktails/Beer' },
  { id: 46, name: 'Stella Artois',                       website: 'stellaartois.com',        industry: 'Food & Drink: Cocktails/Beer' },
  { id: 47, name: 'Guinness',                            website: 'guinness.com',            industry: 'Food & Drink: Cocktails/Beer' },
  { id: 48, name: 'Blue Moon',                           website: 'bluemoonbrewing.com',     industry: 'Food & Drink: Cocktails/Beer' },
  { id: 49, name: 'Modelo',                              website: 'modelousa.com',           industry: 'Food & Drink: Cocktails/Beer' },
  { id: 50, name: 'Bud Light',                           website: 'budlight.com',            industry: 'Food & Drink: Cocktails/Beer' },
  { id: 51, name: 'Michelob Ultra',                      website: 'michelobultra.com',       industry: 'Food & Drink: Cocktails/Beer' },
  { id: 52, name: 'White Claw',                          website: 'whiteclaw.com',           industry: 'Food & Drink: Cocktails/Beer' },
  { id: 53, name: 'Smirnoff',                            website: 'smirnoff.com',            industry: 'Food & Drink: Cocktails/Beer' },
  { id: 54, name: "Jack Daniel's",                       website: 'jackdaniels.com',         industry: 'Food & Drink: Cocktails/Beer' },
  { id: 55, name: 'Bacardi',                             website: 'bacardi.com',             industry: 'Food & Drink: Cocktails/Beer' },
  { id: 56, name: 'Nike',                                website: 'nike.com',                industry: 'Style & Fashion' },
  { id: 57, name: 'Adidas',                              website: 'adidas.com',              industry: 'Style & Fashion' },
  { id: 58, name: 'Zara',                                website: 'zara.com',                industry: 'Style & Fashion' },
  { id: 59, name: 'H&M',                                 website: 'hm.com',                  industry: 'Style & Fashion' },
  { id: 60, name: 'Gap',                                 website: 'gap.com',                 industry: 'Style & Fashion' },
  { id: 61, name: 'Old Navy',                            website: 'oldnavy.com',             industry: 'Style & Fashion' },
  { id: 62, name: 'J.Crew',                              website: 'jcrew.com',               industry: 'Style & Fashion' },
  { id: 63, name: 'Ralph Lauren',                        website: 'ralphlauren.com',         industry: 'Style & Fashion' },
  { id: 64, name: 'Tommy Hilfiger',                      website: 'tommy.com',               industry: 'Style & Fashion' },
  { id: 65, name: 'Calvin Klein',                        website: 'calvinklein.com',         industry: 'Style & Fashion' },
  { id: 66, name: 'Coach',                               website: 'coach.com',               industry: 'Style & Fashion' },
  { id: 67, name: 'Michael Kors',                        website: 'michaelkors.com',         industry: 'Style & Fashion' },
  { id: 68, name: 'Kate Spade',                          website: 'katespade.com',           industry: 'Style & Fashion' },
  { id: 69, name: 'Gucci',                               website: 'gucci.com',               industry: 'Style & Fashion' },
  { id: 70, name: 'Louis Vuitton',                       website: 'louisvuitton.com',        industry: 'Style & Fashion' },
  { id: 71, name: 'Prada',                               website: 'prada.com',               industry: 'Style & Fashion' },
  { id: 72, name: 'Vans',                                website: 'vans.com',                industry: 'Style & Fashion' },
  { id: 73, name: 'Converse',                            website: 'converse.com',            industry: 'Style & Fashion' },
  { id: 74, name: 'New Balance',                         website: 'newbalance.com',          industry: 'Style & Fashion' },
  { id: 75, name: 'Reebok',                              website: 'reebok.com',              industry: 'Style & Fashion' },
  { id: 76, name: 'Under Armour',                        website: 'underarmour.com',         industry: 'Style & Fashion' },
  { id: 77, name: 'REI',                                 website: 'rei.com',                 industry: 'Style & Fashion' },
  { id: 78, name: 'Lululemon',                           website: 'lululemon.com',           industry: 'Style & Fashion' },
  { id: 79, name: 'Patagonia',                           website: 'patagonia.com',           industry: 'Style & Fashion' },
  { id: 80, name: 'The North Face',                      website: 'thenorthface.com',        industry: 'Style & Fashion' },
  { id: 81, name: 'Columbia Sportswear',                 website: 'columbia.com',            industry: 'Style & Fashion' },
  { id: 82, name: 'Puma',                                website: 'puma.com',                industry: 'Style & Fashion' },
  { id: 83, name: "Levi's",                              website: 'levi.com',                industry: 'Style & Fashion' },
  { id: 84, name: 'Wrangler',                            website: 'wrangler.com',            industry: 'Style & Fashion' },
  { id: 85, name: 'Timberland',                          website: 'timberland.com',          industry: 'Style & Fashion' },
  { id: 86, name: 'Apple',                               website: 'apple.com',               industry: 'Technology & Computing' },
  { id: 87, name: 'Samsung',                             website: 'samsung.com',             industry: 'Technology & Computing' },
  { id: 88, name: 'Google',                              website: 'google.com',              industry: 'Technology & Computing' },
  { id: 89, name: 'Microsoft',                           website: 'microsoft.com',           industry: 'Technology & Computing' },
  { id: 90, name: 'Meta',                                website: 'meta.com',                industry: 'Technology & Computing' },
  { id: 91, name: 'Intel',                               website: 'intel.com',               industry: 'Technology & Computing' },
  { id: 92, name: 'NVIDIA',                              website: 'nvidia.com',              industry: 'Technology & Computing' },
  { id: 93, name: 'Dell',                                website: 'dell.com',                industry: 'Technology & Computing' },
  { id: 94, name: 'HP',                                  website: 'hp.com',                  industry: 'Technology & Computing' },
  { id: 95, name: 'Lenovo',                              website: 'lenovo.com',              industry: 'Technology & Computing' },
  { id: 96, name: 'Sony',                                website: 'sony.com',                industry: 'Technology & Computing' },
  { id: 97, name: 'LG',                                  website: 'lg.com',                  industry: 'Technology & Computing' },
  { id: 98, name: 'Bose',                                website: 'bose.com',                industry: 'Technology & Computing' },
  { id: 99, name: 'Logitech',                            website: 'logitech.com',            industry: 'Technology & Computing' },
  { id: 100, name: 'Adobe',                              website: 'adobe.com',               industry: 'Technology & Computing' },
  { id: 101, name: 'Cisco',                              website: 'cisco.com',               industry: 'Technology & Computing' },
  { id: 102, name: 'Salesforce',                         website: 'salesforce.com',          industry: 'Technology & Computing' },
  { id: 103, name: 'IBM',                                website: 'ibm.com',                 industry: 'Technology & Computing' },
  { id: 104, name: 'Oracle',                             website: 'oracle.com',              industry: 'Technology & Computing' },
  { id: 105, name: 'Snapchat',                           website: 'snapchat.com',            industry: 'Technology & Computing' },
  { id: 106, name: 'Airbnb',                             website: 'airbnb.com',              industry: 'Travel' },
  { id: 107, name: 'Marriott',                           website: 'marriott.com',            industry: 'Travel' },
  { id: 108, name: 'Hilton',                             website: 'hilton.com',              industry: 'Travel' },
  { id: 109, name: 'Hyatt',                              website: 'hyatt.com',               industry: 'Travel' },
  { id: 110, name: 'Expedia',                            website: 'expedia.com',             industry: 'Travel' },
  { id: 111, name: 'Booking.com',                        website: 'booking.com',             industry: 'Travel' },
  { id: 112, name: 'TripAdvisor',                        website: 'tripadvisor.com',         industry: 'Travel' },
  { id: 113, name: 'Delta',                              website: 'delta.com',               industry: 'Travel' },
  { id: 114, name: 'American Airlines',                  website: 'aa.com',                  industry: 'Travel' },
  { id: 115, name: 'United Airlines',                    website: 'united.com',              industry: 'Travel' },
  { id: 116, name: 'Southwest',                          website: 'southwest.com',           industry: 'Travel' },
  { id: 117, name: 'JetBlue',                            website: 'jetblue.com',             industry: 'Travel' },
  { id: 118, name: 'Emirates',                           website: 'emirates.com',            industry: 'Travel' },
  { id: 119, name: 'Hertz',                              website: 'hertz.com',               industry: 'Travel' },
  { id: 120, name: 'Enterprise',                         website: 'enterprise.com',          industry: 'Travel' },
  { id: 121, name: 'Audi',                               website: 'audi.com',                industry: 'Automotive' },
  { id: 122, name: 'BMW',                                website: 'bmw.com',                 industry: 'Automotive' },
  { id: 123, name: 'Mercedes-Benz',                      website: 'mbusa.com',               industry: 'Automotive' },
  { id: 124, name: 'Toyota',                             website: 'toyota.com',              industry: 'Automotive' },
  { id: 125, name: 'Honda',                              website: 'honda.com',               industry: 'Automotive' },
  { id: 126, name: 'Ford',                               website: 'ford.com',                industry: 'Automotive' },
  { id: 127, name: 'Chevrolet',                          website: 'chevrolet.com',           industry: 'Automotive' },
  { id: 128, name: 'Dodge',                              website: 'dodge.com',               industry: 'Automotive' },
  { id: 129, name: 'Jeep',                               website: 'jeep.com',                industry: 'Automotive' },
  { id: 130, name: 'Subaru',                             website: 'subaru.com',              industry: 'Automotive' },
  { id: 131, name: 'Mazda',                              website: 'mazdausa.com',            industry: 'Automotive' },
  { id: 132, name: 'Hyundai',                            website: 'hyundai.com',             industry: 'Automotive' },
  { id: 133, name: 'Kia',                                website: 'kia.com',                 industry: 'Automotive' },
  { id: 134, name: 'Tesla',                              website: 'tesla.com',               industry: 'Automotive' },
  { id: 135, name: 'Volkswagen',                         website: 'vw.com',                  industry: 'Automotive' },
  { id: 136, name: 'Whole Foods Market',                 website: 'wholefoods.com',          industry: 'Shopping' },
  { id: 137, name: "Trader Joe's",                       website: 'traderjoes.com',          industry: 'Shopping' },
  { id: 138, name: 'Walmart',                            website: 'walmart.com',             industry: 'Shopping' },
  { id: 139, name: 'Target',                             website: 'target.com',              industry: 'Shopping' },
  { id: 140, name: 'Costco',                             website: 'costco.com',              industry: 'Shopping' },
  { id: 141, name: 'Kroger',                             website: 'kroger.com',              industry: 'Shopping' },
  { id: 142, name: 'Best Buy',                           website: 'bestbuy.com',             industry: 'Shopping' },
  { id: 143, name: 'Home Depot',                         website: 'homedepot.com',           industry: 'Shopping' },
  { id: 144, name: "Lowe's",                             website: 'lowes.com',               industry: 'Shopping' },
  { id: 145, name: 'IKEA',                               website: 'ikea.com',                industry: 'Shopping' },
  { id: 146, name: 'TJ Maxx',                            website: 'tjmaxx.com',              industry: 'Shopping' },
  { id: 147, name: 'Nordstrom',                          website: 'nordstrom.com',           industry: 'Shopping' },
  { id: 148, name: "Macy's",                             website: 'macys.com',               industry: 'Shopping' },
  { id: 149, name: 'eBay',                               website: 'ebay.com',                industry: 'Shopping' },
  { id: 150, name: 'Amazon',                             website: 'amazon.com',              industry: 'Shopping' },
  { id: 151, name: 'Dove',                               website: 'dove.com',                industry: 'Health & Fitness' },
  { id: 152, name: 'Peloton',                            website: 'onepeloton.com',          industry: 'Health & Fitness' },
  { id: 153, name: 'Fitbit',                             website: 'fitbit.com',              industry: 'Health & Fitness' },
  { id: 154, name: 'Garmin',                             website: 'garmin.com',              industry: 'Health & Fitness' },
  { id: 155, name: 'Planet Fitness',                     website: 'planetfitness.com',       industry: 'Health & Fitness' },
  { id: 156, name: 'GNC',                                website: 'gnc.com',                 industry: 'Health & Fitness' },
  { id: 157, name: 'UCLA Health',                        website: 'uclahealth.com',          industry: 'Health & Fitness' },
  { id: 158, name: 'Mayo Clinic',                        website: 'mayoclinic.org',          industry: 'Health & Fitness' },
  { id: 159, name: 'CVS Health',                         website: 'cvs.com',                 industry: 'Health & Fitness' },
  { id: 160, name: 'Walgreens',                          website: 'walgreens.com',           industry: 'Health & Fitness' },
  { id: 161, name: 'Johnson & Johnson',                  website: 'jnj.com',                 industry: 'Health & Fitness' },
  { id: 162, name: 'Tylenol',                            website: 'tylenol.com',             industry: 'Health & Fitness' },
  { id: 163, name: 'Advil',                              website: 'advil.com',               industry: 'Health & Fitness' },
  { id: 164, name: 'Vicks',                              website: 'vicks.com',               industry: 'Health & Fitness' },
  { id: 165, name: 'Abbott',                             website: 'abbott.com',              industry: 'Health & Fitness' },
  { id: 166, name: 'NBC News',                           website: 'nbcnews.com',             industry: 'News' },
  { id: 167, name: 'CNN',                                website: 'cnn.com',                 industry: 'News' },
  { id: 168, name: 'ABC News',                           website: 'abcnews.go.com',          industry: 'News' },
  { id: 169, name: 'CBS News',                           website: 'cbsnews.com',             industry: 'News' },
  { id: 170, name: 'Fox News',                           website: 'foxnews.com',             industry: 'News' },
  { id: 171, name: 'BBC',                                website: 'bbc.com',                 industry: 'News' },
  { id: 172, name: 'NPR',                                website: 'npr.org',                 industry: 'News' },
  { id: 173, name: 'The New York Times',                 website: 'nytimes.com',             industry: 'News' },
  { id: 174, name: 'Washington Post',                    website: 'washingtonpost.com',      industry: 'News' },
  { id: 175, name: 'Forbes',                             website: 'forbes.com',              industry: 'News' },
  { id: 176, name: 'Nintendo',                           website: 'nintendo.com',            industry: 'Art & Entertainment' },
  { id: 177, name: 'PlayStation',                        website: 'playstation.com',         industry: 'Art & Entertainment' },
  { id: 178, name: 'Xbox',                               website: 'xbox.com',                industry: 'Art & Entertainment' },
  { id: 179, name: 'Disney',                             website: 'disney.com',              industry: 'Art & Entertainment' },
  { id: 180, name: 'Netflix',                            website: 'netflix.com',             industry: 'Art & Entertainment' },
  { id: 181, name: 'Hulu',                               website: 'hulu.com',                industry: 'Art & Entertainment' },
  { id: 182, name: 'HBO',                                website: 'hbo.com',                 industry: 'Art & Entertainment' },
  { id: 183, name: 'Paramount',                          website: 'paramount.com',           industry: 'Art & Entertainment' },
  { id: 184, name: 'Spotify',                            website: 'spotify.com',             industry: 'Art & Entertainment' },
  { id: 185, name: 'YouTube',                            website: 'youtube.com',             industry: 'Art & Entertainment' },
  { id: 186, name: 'Ticketmaster',                       website: 'ticketmaster.com',        industry: 'Art & Entertainment' },
  { id: 187, name: 'Live Nation',                        website: 'livenation.com',          industry: 'Art & Entertainment' },
  { id: 188, name: 'AMC Theaters',                       website: 'amctheatres.com',         industry: 'Art & Entertainment' },
  { id: 189, name: 'Warner Bros.',                       website: 'warnerbros.com',          industry: 'Art & Entertainment' },
  { id: 190, name: 'Universal Pictures',                 website: 'universalpictures.com',   industry: 'Art & Entertainment' },
  { id: 191, name: 'U.S. Department of Homeland Security', website: 'dhs.gov',              industry: "Law, Gov't & Politics" },
  { id: 192, name: 'Amnesty International',              website: 'amnesty.org',             industry: "Law, Gov't & Politics" },
  { id: 193, name: 'ACLU',                               website: 'aclu.org',                industry: "Law, Gov't & Politics" },
  { id: 194, name: 'Red Cross',                          website: 'redcross.org',            industry: "Law, Gov't & Politics" },
  { id: 195, name: 'UNICEF',                             website: 'unicef.org',              industry: "Law, Gov't & Politics" },
  { id: 196, name: 'Lockheed Martin',                    website: 'lockheedmartin.com',      industry: 'U.S. Military' },
  { id: 197, name: 'Raytheon',                           website: 'rtx.com',                 industry: 'U.S. Military' },
  { id: 198, name: 'Northrop Grumman',                   website: 'northropgrumman.com',     industry: 'U.S. Military' },
  { id: 199, name: 'Boeing',                             website: 'boeing.com',              industry: 'U.S. Military' },
  { id: 200, name: 'General Dynamics',                   website: 'gd.com',                  industry: 'U.S. Military' },
];

// ─── Types ───────────────────────────────────────────────────────────────────

type AppState      = 'welcome' | 'publisher' | 'series' | 'ads';
type PubSection    = 'series'  | 'networks'  | 'prefix' | 'ads' | 'saved-american-scandal' | 'saved-hysterical' | 'saved-new-heights';
type SeriesSection = 'general' | 'series'    | 'seasons' | 'feeds' | 'analytics';
type AdsSection    = 'brands'  | 'agencies'  | 'creatives' | 'defaults';

// ─── Status Pill ─────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; dot: string }> = {
    Active:    { bg: 'bg-emerald-50 border border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    Paused:    { bg: 'bg-amber-50 border border-amber-200',     text: 'text-amber-700',   dot: 'bg-amber-400'   },
    Published: { bg: 'bg-emerald-50 border border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    Scheduled: { bg: 'bg-sky-50 border border-sky-200',         text: 'text-sky-600',     dot: 'bg-sky-500'     },
    Complete:  { bg: 'bg-gray-100 border border-gray-200',      text: 'text-[#5E5E5E]',   dot: 'bg-gray-400'    },
    Draft:     { bg: 'bg-gray-100 border border-gray-200',      text: 'text-[#5E5E5E]',   dot: 'bg-gray-400'    },
  };
  const s = map[status] ?? { bg: 'bg-gray-100 border border-gray-200', text: 'text-[#5E5E5E]', dot: 'bg-gray-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      {status}
    </span>
  );
}

// ─── Workspace picker dropdown ────────────────────────────────────────────────

function WorkspacePicker({
  activeWorkspace, onPickPublisher, onPickAds, open, onOpenChange,
}: {
  activeWorkspace: string;
  onPickPublisher: () => void;
  onPickAds: () => void;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onOpenChange(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onOpenChange]);

  const isAds = activeWorkspace === 'ads';
  const btnBg   = isAds ? 'bg-amber-50 hover:bg-amber-100/60'   : 'bg-violet-50 hover:bg-violet-100/60';
  const iconBg  = isAds ? 'bg-amber-500'                         : 'bg-violet-600';
  const lblClr  = isAds ? 'text-amber-500'                       : 'text-violet-400';
  const nameClr = isAds ? 'text-amber-900'                       : 'text-violet-900';
  const chvClr  = isAds ? 'text-amber-400'                       : 'text-violet-400';

  return (
    <div ref={ref} className="relative px-3 pt-4 pb-0">
      <button
        data-demo-target="workspace-picker"
        onClick={() => onOpenChange(!open)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${btnBg}`}
      >
        <div className={`w-8 h-8 rounded-lg grid place-items-center flex-shrink-0 ${iconBg}`}>
          {isAds
            ? <svg className="w-[16px] h-[16px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h11l5 5-5 5H4z"/></svg>
            : <svg className="w-[16px] h-[16px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg>
          }
        </div>
        <div className="flex-1 text-left min-w-0">
          <div className={`text-[10px] font-semibold uppercase tracking-widest leading-none mb-0.5 whitespace-nowrap ${lblClr}`}>Current Workspace</div>
          <div className={`text-sm font-semibold ${nameClr}`}>{isAds ? 'Advertisers' : 'Publishers'}</div>
        </div>
        <svg
          className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${chvClr} ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <div className="absolute bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden" style={{ left: 12, top: 'calc(100% + 4px)', width: 360 }}>
          <div className="px-4 pt-4 pb-2">
            <span className="text-[12px] font-semibold uppercase tracking-widest text-[#5E5E5E]">Switch Workspace</span>
          </div>
          <div className="grid grid-cols-3 gap-1 p-3">
            {WORKSPACES.map((ws) => {
              const isActive = ws.id === activeWorkspace;
              return (
                <button
                  key={ws.id}
                  onClick={() => {
                    onOpenChange(false);
                    if (ws.id === 'publisher') onPickPublisher();
                    if (ws.id === 'ads') onPickAds();
                  }}
                  className={`flex flex-col items-center gap-2 py-4 px-1.5 rounded-xl transition-colors ${isActive ? 'bg-violet-50' : 'hover:bg-gray-50'}`}
                >
                  <div className={`w-14 h-14 rounded-xl grid place-items-center ${isActive ? 'bg-violet-600' : 'bg-gray-100'}`}>
                    <span className={isActive ? 'text-white' : 'text-gray-500'}>{ws.icon}</span>
                  </div>
                  <span className={`text-[11px] text-center leading-tight ${isActive ? 'font-semibold text-violet-700' : 'font-medium text-gray-600'}`}>
                    {ws.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sidebar nav item ─────────────────────────────────────────────────────────

function NavItem({
  label, badge, active, onClick,
}: {
  label: string; badge?: string | number; active?: boolean; onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex items-center w-full text-sm transition-colors text-left rounded-md mx-2 my-0.5 px-3 py-2',
        active
          ? 'bg-[#EBF4FB] text-[#3598DB] font-medium'
          : 'text-gray-900 hover:bg-gray-100',
      ].join(' ')}
      style={{ width: 'calc(100% - 16px)' }}
    >
      <span className="flex-1 min-w-0 truncate">{label}</span>
      {badge != null && (
        <span className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ml-1 ${active ? 'bg-[#3598DB]/10 text-[#3598DB]' : 'bg-gray-200 text-[#5E5E5E]'}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="text-[10px] font-semibold uppercase tracking-widest text-[#5E5E5E] px-5 pt-4 pb-1">
      {label}
    </div>
  );
}

// ─── Table helpers ────────────────────────────────────────────────────────────

function TH({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left text-xs font-medium text-[#5E5E5E] px-4 py-3 border-b border-gray-100 bg-gray-50/80 whitespace-nowrap">
      {children}
    </th>
  );
}

function TD({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <td className={`text-left px-4 py-3.5 text-sm font-normal border-b border-gray-100 ${muted ? 'text-[#5E5E5E]' : 'text-gray-900'}`}>
      {children}
    </td>
  );
}

function AddBtn({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 h-8 px-3.5 bg-[#3598DB] text-white text-xs font-semibold rounded-md hover:bg-[#2d82c4] transition-colors"
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
      {label}
    </button>
  );
}

function StubPage({ title, icon, desc }: { title: string; icon: React.ReactNode; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
      <div className="text-gray-200 mb-4">{icon}</div>
      <div className="text-sm font-semibold text-[#5E5E5E] mb-1.5">{title}</div>
      <div className="text-sm text-[#5E5E5E] max-w-xs leading-relaxed">{desc}</div>
    </div>
  );
}

// ─── Artwork config ───────────────────────────────────────────────────────────
// To swap in a real image for any series or network:
//   1. Drop the file into  public/demos/artwork/  (e.g. hysterical.png)
//   2. Add  img: '/demos/artwork/hysterical.png'  to that entry below.
//      The img field takes priority over the gradient fallback.

const PODCAST_ART: Record<string, { grad: string; label?: string; img?: string }> = {
  'armchair-expert':  { grad: 'linear-gradient(135deg,#fb923c,#dc2626)', img: '/demos/artwork/armchair-expert.png'                   },
  'american-scandal': { grad: 'linear-gradient(135deg,#b91c1c,#7f1d1d)', img: '/demos/artwork/american-scandal.png'                  },
  'hysterical':       { grad: 'linear-gradient(135deg,#a855f7,#6d28d9)', img: '/demos/artwork/hysterical.png'                        },
  'mrballen':         { grad: 'linear-gradient(135deg,#1d4ed8,#0f172a)', img: '/demos/artwork/mrballen-medical-mysteries.png'       },
  'even-the-rich':    { grad: 'linear-gradient(135deg,#f59e0b,#b45309)', img: '/demos/artwork/even-the-rich.png'                     },
  'how-i-built-this': { grad: 'linear-gradient(135deg,#0d9488,#134e4a)', img: '/demos/artwork/how-i-built-this-podcast-with-guy-raz.png' },
  'the-spy-who':      { grad: 'linear-gradient(135deg,#166534,#052e16)', img: '/demos/artwork/the-spy-who.png'                       },
  'the-big-flop':     { grad: 'linear-gradient(135deg,#0ea5e9,#1e3a8a)', img: '/demos/artwork/the-big-flop.png'                     },
  'scamfluencers':    { grad: 'linear-gradient(135deg,#f97316,#92400e)', img: '/demos/artwork/scamfluencers.png'                     },
  'new-heights':      { grad: 'linear-gradient(135deg,#ec4899,#9f1239)', img: '/demos/artwork/new-heights.png'                      },
};

const NETWORK_ART: Record<string, { grad: string; label?: string; img?: string }> = {
  'Wondery Crime & Journal Network': { grad: 'linear-gradient(135deg,#475569,#0f172a)', label: 'WCJ',img: '/demos/artwork/networks.png', },
  'Wondery Sports Network':          { grad: 'linear-gradient(135deg,#2563eb,#1e3a8a)', label: 'WSN',img: '/demos/artwork/networks.png', },
  'Wondery Comedy Network':          { grad: 'linear-gradient(135deg,#9333ea,#3b0764)', label: 'WCN',img: '/demos/artwork/networks.png', },
  'Wondery Kids Network':            { grad: 'linear-gradient(135deg,#10b981,#064e3b)', label: 'WKN',img: '/demos/artwork/networks.png', },
};

function PodcastArt({ id, px = 40 }: { id: string; px?: number }) {
  const art = PODCAST_ART[id] ?? { grad: 'linear-gradient(135deg,#9ca3af,#4b5563)', label: '?' };
  if (art.img) return (
    <img src={art.img} alt={id} className="rounded-lg object-cover flex-shrink-0" style={{ width: px, height: px }} />
  );
  return (
    <div
      className="rounded-lg flex items-center justify-center text-white font-bold leading-tight flex-shrink-0 text-center"
      style={{ width: px, height: px, background: art.grad, fontSize: px <= 28 ? 7 : 9 }}
    >
      {(art.label ?? '').split('\n').map((l, i) => <div key={i}>{l}</div>)}
    </div>
  );
}

function NetworkArt({ name, px = 28 }: { name: string; px?: number }) {
  const art = NETWORK_ART[name] ?? { grad: 'linear-gradient(135deg,#6b7280,#374151)', label: '?' };
  if (art.img) return (
    <img src={art.img} alt={name} className="rounded-lg object-cover flex-shrink-0" style={{ width: px, height: px }} />
  );
  return (
    <div
      className="rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0"
      style={{ width: px, height: px, background: art.grad, fontSize: 7 }}
    >
      {art.label}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function WorkspaceFlowPage() {
  const [appState,       setAppState]       = useState<AppState>('welcome');
  const [navOpen,        setNavOpen]        = useState(true);
  const [pubSection,     setPubSection]     = useState<PubSection>('series');
  const [seriesSection,  setSeriesSection]  = useState<SeriesSection>('general');
  const [adsSection,     setAdsSection]     = useState<AdsSection>('brands');
  const [brandSort,      setBrandSort]      = useState<{ col: 'name' | 'industry'; dir: 'asc' | 'desc' }>({ col: 'name', dir: 'asc' });
  const [brandSearch,    setBrandSearch]    = useState('');
  const [brandPage,      setBrandPage]      = useState(1);
  const [step,           setStep]           = useState(1);
  const [cued24h,        setCued24h]        = useState(false);
  const [pickerOpen,     setPickerOpen]     = useState(false);
  const [demoCursor,     setDemoCursor]     = useState<{ x: number; y: number; visible: boolean; clicking: boolean }>({ x: 0, y: 0, visible: false, clicking: false });

  function openAds() {
    setAppState('ads');
    setAdsSection('brands');
    setBrandSearch('');
    setBrandPage(1);
  }
  function openPublisher() {
    setAppState('publisher');
    setPubSection('series');
    if (step < 2) setStep(2);
    setTimeout(() => setCued24h(true), 400);
  }
  function openSeries() {
    setCued24h(false);
    setAppState('series');
    setSeriesSection('general');
    setStep(3);
  }
  function otherRowClick() {
    setCued24h(true);
    setTimeout(() => setCued24h(false), 1800);
  }
  function backToPublisher() {
    setAppState('publisher');
    setPubSection('series');
    setStep(Math.max(step, 2));
  }
  function handleReset() {
    setAppState('welcome');
    setNavOpen(true);
    setPubSection('series');
    setSeriesSection('general');
    setAdsSection('brands');
    setBrandSearch('');
    setBrandPage(1);
    setStep(1);
    setCued24h(false);
    setPickerOpen(false);
  }

  // ── Static mode ?static=1 — publisher landing + picker open, no animation ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('static') !== '1') return;
    setAppState('publisher');
    setPubSection('series');
    setPickerOpen(true);
  }, []);

  // ── Brands mode ?brands=1 — Ads workspace → System Brands, no animation ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('brands') !== '1') return;
    setAppState('ads');
    setAdsSection('brands');
    const q = params.get('q');
    if (q) setBrandSearch(q);
  }, []);

  // ── Auto-demo ?demo=1 — drives a 3-step workspace flow on a loop ──────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('demo') !== '1') return;
    // Singleton guard: prevent React StrictMode (or repeated mounts) from
    // spawning duplicate demo loops that race on shared state.
    const w = window as unknown as Record<string, unknown>;
    if (w.__demoSingletonRunning === true) return;
    w.__demoSingletonRunning = true;
    w.__demoStarted = true;

    let killed = false;
    let demoStartedAt = 0;
    const onUserInput = (e: Event) => {
      // Ignore clicks during the first 600ms (settling) and any clicks that
      // came from our own programmatic clicks during the demo.
      if (Date.now() - demoStartedAt < 600) return;
      if ((e as MouseEvent).isTrusted === false) return;
      killed = true;
      setDemoCursor((p) => ({ ...p, visible: false }));
      document.removeEventListener('click', onUserInput);
      document.removeEventListener('keydown', onUserInput);
    };
    document.addEventListener('click', onUserInput);
    document.addEventListener('keydown', onUserInput);
    demoStartedAt = Date.now();

    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const moveTo = async (sel: string) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (!el || killed) return;
      const r = el.getBoundingClientRect();
      setDemoCursor({ x: r.left + r.width / 2, y: r.top + r.height / 2, visible: true, clicking: false });
      await wait(720);
    };
    const click = () => {
      if (killed) return;
      setDemoCursor((p) => ({ ...p, clicking: true }));
      setTimeout(() => setDemoCursor((p) => ({ ...p, clicking: false })), 380);
    };

    async function run() {
      // initial paint settle
      await wait(200);
      while (!killed) {
        // Screen 1 — Publisher workspace with series list
        setAppState('publisher');
        setPubSection('series');
        setPickerOpen(false);
        setDemoCursor((p) => ({ ...p, visible: false }));
        await wait(1800);
        if (killed) return;

        // Screen 2 — Move cursor to workspace picker → open dropdown
        await moveTo('[data-demo-target="workspace-picker"]');
        click();
        setPickerOpen(true);
        await wait(2800);
        if (killed) return;

        // Close picker, return to publisher series list
        click();
        setPickerOpen(false);
        setDemoCursor((p) => ({ ...p, visible: false }));
        await wait(1200);
        if (killed) return;
      }
    }
    setTimeout(() => run(), 100);

    return () => {
      // Note: we deliberately do NOT flip `killed` here, because React
      // StrictMode will mount→unmount→mount this effect, and the second
      // mount would inherit a killed flag from the first cleanup. The
      // singleton guard above prevents a second loop from starting; the
      // first loop runs continuously.
      document.removeEventListener('click', onUserInput);
      document.removeEventListener('keydown', onUserInput);
    };
    // run-once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showSidebar = navOpen;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white font-sans">

      {/* ── Topbar ────────────────────────────────────────────────── */}
      <header className="h-14 shrink-0 bg-[#0f0f0f] flex items-center px-4 gap-3 z-40 border-b border-white/5">
        <button
          onClick={() => setNavOpen(v => !v)}
          className="w-9 h-9 grid place-items-center text-white hover:text-gray-300 transition-colors flex-shrink-0"
        >
          {navOpen
            ? <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" strokeLinecap="round"><rect x="4" y="3.5" width="16" height="2.5" rx="1.25"/><rect x="14" y="8.75" width="6" height="2.5" rx="1.25"/><path d="M10.5 8.5 L5 12 L10.5 15.5 Z"/><rect x="14" y="13.75" width="6" height="2.5" rx="1.25"/><rect x="4" y="18" width="16" height="2.5" rx="1.25"/></svg>
            : <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
          }
        </button>
        <div className="flex items-center flex-shrink-0">
          <img src="/demos/artwork/ART19Logo.png" alt="ART19" className="h-8 object-contain" />
        </div>

        <div className="flex-1" />

        <div className="flex items-center h-9 bg-white/5 border border-white/8 rounded-lg px-3.5 gap-2 w-64 focus-within:border-white/15 transition-colors">
          <svg className="w-4 h-4 text-[#5E5E5E] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input className="flex-1 bg-transparent border-0 outline-none text-sm text-white placeholder-[#5E5E5E] font-[inherit] min-w-0" placeholder="Search…" />
          <kbd className="text-[10px] px-1.5 py-0.5 bg-white/8 text-[#5E5E5E] rounded flex-shrink-0">⌘K</kbd>
        </div>

        <button className="relative w-9 h-9 ml-1 grid place-items-center text-[#5E5E5E] hover:text-gray-300 transition-colors">
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5Z"/><path d="M10 18a2 2 0 0 0 4 0"/></svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full border border-[#0f0f0f]" />
        </button>
        <button className="flex items-center gap-2 ml-1 px-2.5 h-9 hover:bg-white/5 rounded-lg transition-colors flex-shrink-0">
          <div className="w-7 h-7 bg-[#3598DB] rounded-full grid place-items-center text-white text-[11px] font-bold flex-shrink-0">JD</div>
          <span className="text-[13px] text-gray-300 font-medium">John Doe</span>
          <svg className="w-3.5 h-3.5 text-[#5E5E5E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </header>

      {/* ── Shell ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar — workspace picker always on top, context nav below */}
        {showSidebar && (
          <aside className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col z-20">

            {/* Workspace picker — always visible at top regardless of nav depth */}
            <WorkspacePicker
              activeWorkspace={appState === 'publisher' || appState === 'series' ? 'publisher' : appState === 'ads' ? 'ads' : ''}
              onPickPublisher={openPublisher}
              onPickAds={openAds}
              open={pickerOpen}
              onOpenChange={setPickerOpen}
            />

            {/* Scrollable nav area below picker */}
            <div className="flex-1 overflow-y-auto pt-3">

              {/* Publisher context nav */}
              {appState === 'publisher' && (
                <>
                  <SectionLabel label="Catalog" />
                  <NavItem label="Series"   badge={10} active={pubSection === 'series'}   onClick={() => setPubSection('series')} />
                  <NavItem label="Networks" badge={4}  active={pubSection === 'networks'} onClick={() => setPubSection('networks')} />
                  <SectionLabel label="Saved Series" />
                  <NavItem label="American Scandal" active={pubSection === 'saved-american-scandal'} onClick={() => setPubSection('saved-american-scandal')} />
                  <NavItem label="Hysterical"       active={pubSection === 'saved-hysterical'}       onClick={() => setPubSection('saved-hysterical')} />
                  <NavItem label="New Heights"      active={pubSection === 'saved-new-heights'}      onClick={() => setPubSection('saved-new-heights')} />
                  <SectionLabel label="Settings" />
                  <NavItem label="Prefix Management" active={pubSection === 'prefix'} onClick={() => setPubSection('prefix')} />
                  <NavItem label="Publisher Ads"     active={pubSection === 'ads'}    onClick={() => setPubSection('ads')} />
                </>
              )}

              {/* Ads context nav */}
              {appState === 'ads' && (
                <>
                  <SectionLabel label="Ad Representatives" />
                  <NavItem label="Wondery Targeted Ads Group" active={false} onClick={() => {}} />
                  <NavItem label="Wondery USA Ads"            active={false} onClick={() => {}} />
                  <NavItem label="Wondery Germany Ads"        active={false} onClick={() => {}} />
                  <SectionLabel label="System Repositories" />
                  <NavItem label="Brands"    active={adsSection === 'brands'}    onClick={() => { setAdsSection('brands'); setBrandPage(1); }} />
                  <NavItem label="Agencies"  active={adsSection === 'agencies'}  onClick={() => setAdsSection('agencies')} />
                  <NavItem label="Creatives" active={adsSection === 'creatives'} onClick={() => setAdsSection('creatives')} />
                  <SectionLabel label="Settings" />
                  <NavItem label="Ad Account Defaults" active={adsSection === 'defaults'} onClick={() => setAdsSection('defaults')} />
                </>
              )}

              {/* Series context nav */}
              {appState === 'series' && (
                <>
                  {/* Back + series header */}
                  <div className="px-4 pt-4 pb-4 border-b border-gray-100">
                    <button
                      onClick={backToPublisher}
                      className="flex items-center gap-1.5 text-sm text-[#5E5E5E] hover:text-[#3598DB] transition-colors mb-4 py-1"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 6-6 6 6 6"/></svg>
                      Publisher
                    </button>
                    <div className="flex items-center gap-3">
                      <PodcastArt id="hysterical" px={40} />
                      <div className="min-w-0">
                        <div className="text-[10px] font-semibold uppercase tracking-widest text-[#5E5E5E] mb-0.5">Series</div>
                        <div className="text-sm font-semibold text-gray-900 truncate">Hysterical</div>
                      </div>
                    </div>
                  </div>
                  <div className="py-1.5">
                    <NavItem label="General Settings" active={seriesSection === 'general'}   onClick={() => setSeriesSection('general')} />
                    <NavItem label="Episodes"         active={seriesSection === 'series'}    onClick={() => setSeriesSection('series')} />
                    <NavItem label="Seasons"          active={seriesSection === 'seasons'}   onClick={() => setSeriesSection('seasons')} />
                    <NavItem label="Feeds"            active={seriesSection === 'feeds'}     onClick={() => setSeriesSection('feeds')} />
                    <NavItem label="Analytics"        active={seriesSection === 'analytics'} onClick={() => setSeriesSection('analytics')} />
                  </div>
                </>
              )}
            </div>
          </aside>
        )}

        {/* ── Main ────────────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto bg-[#f9fafb]">

          {/* Welcome */}
          {appState === 'welcome' && (
            <div className="flex items-center justify-center min-h-full p-12">
              <div className="max-w-md text-center">
                <div className="w-12 h-12 bg-[#3598DB]/10 rounded-2xl grid place-items-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#3598DB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg>
                </div>
                <h1 className="text-xl font-semibold text-gray-900 mb-2">Pick a workspace to get started</h1>
                <p className="text-sm text-[#5E5E5E] leading-relaxed mb-6">
                  Click the <strong className="text-gray-900">Publishers</strong> dropdown in the sidebar to choose a workspace and begin.
                </p>
              </div>
            </div>
          )}

          {/* Publisher */}
          {appState === 'publisher' && pubSection === 'series' && (
            <div className="px-7 py-6">
              <div className="mb-6 flex items-center justify-between gap-6">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900 mb-1">Publishers Workspace</h1>
                  <p className="text-sm text-[#5E5E5E]">Manage your series, networks, and settings across them.</p>
                </div>
                <div className="flex items-center gap-7 flex-shrink-0">
                  {([
                    { v: SERIES.length,   l: 'Series'   },
                    { v: NETWORKS.length, l: 'Networks' },
                    { v: '39.2M',         l: 'Monthly Downloads' },
                  ] as { v: string | number; l: string }[]).map(({ v, l }) => (
                    <div key={l} className="text-center">
                      <div className="text-base font-semibold text-gray-900">{v}</div>
                      <div className="text-sm text-[#5E5E5E]">{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-gray-800">Series</h2>
                    <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-[#5E5E5E] rounded-full font-medium">{SERIES.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center h-8 bg-white border border-gray-200 rounded-md px-3 gap-2 w-48 focus-within:border-[#3598DB] transition-colors">
                      <svg className="w-3.5 h-3.5 text-[#5E5E5E] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
                      <input className="flex-1 bg-transparent border-0 outline-none text-xs text-gray-700 placeholder-[#5E5E5E] font-[inherit] min-w-0" placeholder="Search series…" />
                    </div>
                    <AddBtn label="New Series" />
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr><TH>Series</TH><TH>Network</TH><TH>Category</TH><TH>Status</TH><TH>Episodes</TH><TH>Last Release</TH><TH>Monthly DL</TH></tr>
                    </thead>
                    <tbody>
                      {SERIES.map((s) => (
                        <tr
                          key={s.id}
                          data-demo-target={s.id === 'hysterical' ? 'hysterical-row' : undefined}
                          onClick={s.id === 'hysterical' ? openSeries : otherRowClick}
                          className={`cursor-pointer transition-colors ${s.id === 'hysterical' && cued24h ? 'bg-blue-50/60' : 'hover:bg-gray-50/80'}`}
                        >
                          <TD>
                            <div className="flex items-center gap-2.5">
                              <PodcastArt id={s.id} px={28} />
                              <span className="text-[#3598DB] font-medium text-sm">{s.name}</span>
                            </div>
                          </TD>
                          <TD>{s.network}</TD>
                          <TD>{s.category}</TD>
                          <TD><StatusPill status={s.status} /></TD>
                          <TD>{s.episodes}</TD>
                          <TD>{s.lastRelease}</TD>
                          <TD>{s.monthlyDl}</TD>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-gray-800">Networks</h2>
                    <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-[#5E5E5E] rounded-full font-medium">{NETWORKS.length}</span>
                  </div>
                  <AddBtn label="New Network" />
                </div>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr><TH>Network</TH><TH>Categories</TH><TH>Series</TH><TH>Monthly DL</TH></tr>
                    </thead>
                    <tbody>
                      {NETWORKS.map((n) => (
                        <tr key={n.name} className="cursor-pointer hover:bg-gray-50/80 transition-colors">
                          <TD>
                            <div className="flex items-center gap-2.5">
                              <NetworkArt name={n.name} px={28} />
                              <span className="text-[#3598DB] font-medium">{n.name}</span>
                            </div>
                          </TD>
                          <TD>{n.categories}</TD>
                          <TD>{n.series}</TD>
                          <TD>{n.monthlyDl}</TD>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── Ads workspace ─────────────────────────────────────── */}
          {appState === 'ads' && adsSection === 'brands' && (() => {
            const PAGE_SIZE = 50;
            const q = brandSearch.toLowerCase();
            const filtered = BRANDS.filter(b =>
              b.name.toLowerCase().includes(q) ||
              b.website.toLowerCase().includes(q) ||
              b.industry.toLowerCase().includes(q)
            );
            const sorted = [...filtered].sort((a, b) => {
              const av = brandSort.col === 'name' ? a.name : a.industry;
              const bv = brandSort.col === 'name' ? b.name : b.industry;
              return brandSort.dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
            });
            const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
            const safePage = Math.min(brandPage, totalPages);
            const pageRows = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

            const toggleSort = (col: 'name' | 'industry') => {
              setBrandSort(s => s.col === col ? { col, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { col, dir: 'asc' });
              setBrandPage(1);
            };
            const SortIcon = ({ col }: { col: 'name' | 'industry' }) => (
              <span className="inline-flex flex-col ml-1 opacity-50">
                <svg className={`w-2.5 h-2.5 -mb-0.5 ${brandSort.col === col && brandSort.dir === 'asc' ? 'text-[#3598DB] opacity-100' : ''}`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-8 8h16z"/></svg>
                <svg className={`w-2.5 h-2.5 ${brandSort.col === col && brandSort.dir === 'desc' ? 'text-[#3598DB] opacity-100' : ''}`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 20l8-8H4z"/></svg>
              </span>
            );
            return (
              <div className="px-7 py-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between gap-6">
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900 mb-1">System Brands</h1>
                    <p className="text-sm text-[#5E5E5E]">All brands available for ad targeting across the Wondery network.</p>
                  </div>
                  <div className="flex items-center gap-7 flex-shrink-0">
                    {([
                      { v: BRANDS.length, l: 'Total Brands' },
                      { v: 12,            l: 'Industries'   },
                      { v: '200+',        l: 'Active Ads'   },
                    ] as { v: string | number; l: string }[]).map(({ v, l }) => (
                      <div key={l} className="text-center">
                        <div className="text-base font-semibold text-gray-900">{v}</div>
                        <div className="text-sm text-[#5E5E5E]">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brand performance snapshot */}
                <div className="mb-6 grid grid-cols-3 gap-4">
                  {([
                    {
                      label: 'Total Impressions',
                      value: '1.84B',
                      sub: 'All time across all brands',
                      trend: '+12% vs last month',
                      up: true,
                    },
                    {
                      label: 'Weekly Impressions',
                      value: '38.2M',
                      sub: 'May 12 – May 18, 2026',
                      trend: '+4.7% vs last week',
                      up: true,
                    },
                    {
                      label: 'Weekly Top Performer',
                      value: 'Nike',
                      sub: 'Style & Fashion · nike.com',
                      trend: '9.1M impressions this week',
                      up: true,
                      isText: true,
                    },
                  ]).map(({ label, value, sub, trend, up, isText }) => (
                    <div key={label} className="bg-white border border-gray-200 rounded-xl px-5 py-4">
                      <div className="text-xs font-semibold text-[#5E5E5E] uppercase tracking-widest mb-3">{label}</div>
                      <div className={`font-semibold mb-0.5 ${isText ? 'text-xl text-[#3598DB]' : 'text-2xl text-gray-900'}`}>{value}</div>
                      <div className="text-xs text-[#5E5E5E] mb-2">{sub}</div>
                      <div className={`inline-flex items-center gap-1 text-xs font-medium ${up ? 'text-emerald-600' : 'text-red-500'}`}>
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          {up ? <path d="M12 19V5M5 12l7-7 7 7"/> : <path d="M12 5v14M5 12l7 7 7-7"/>}
                        </svg>
                        {trend}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Table toolbar */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-gray-800">Brands</h2>
                    <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-[#5E5E5E] rounded-full font-medium">{sorted.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center h-8 bg-white border border-gray-200 rounded-md px-3 gap-2 w-52 focus-within:border-[#3598DB] transition-colors">
                      <svg className="w-3.5 h-3.5 text-[#5E5E5E] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
                      <input
                        className="flex-1 bg-transparent border-0 outline-none text-xs text-gray-700 placeholder-[#5E5E5E] font-[inherit] min-w-0"
                        placeholder="Search brands…"
                        value={brandSearch}
                        onChange={e => { setBrandSearch(e.target.value); setBrandPage(1); }}
                      />
                    </div>
                    <button className="flex items-center gap-1.5 h-8 px-3 border border-gray-200 rounded-md text-xs font-medium text-[#5E5E5E] bg-white hover:bg-gray-50 transition-colors">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"/></svg>
                      Bulk Edit
                    </button>
                    <AddBtn label="Add Brand" />
                  </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th
                          className="text-left text-xs font-medium text-[#5E5E5E] px-4 py-3 border-b border-gray-100 bg-gray-50/80 whitespace-nowrap cursor-pointer hover:text-gray-700 select-none"
                          onClick={() => toggleSort('name')}
                        >
                          <span className="inline-flex items-center">Brand <SortIcon col="name" /></span>
                        </th>
                        <TH>Website</TH>
                        <th
                          className="text-left text-xs font-medium text-[#5E5E5E] px-4 py-3 border-b border-gray-100 bg-gray-50/80 whitespace-nowrap cursor-pointer hover:text-gray-700 select-none"
                          onClick={() => toggleSort('industry')}
                        >
                          <span className="inline-flex items-center">Industry <SortIcon col="industry" /></span>
                        </th>
                        <TH>Actions</TH>
                      </tr>
                    </thead>
                    <tbody>
                      {pageRows.map(b => (
                        <tr key={b.id} className="cursor-pointer hover:bg-gray-50/80 transition-colors">
                          <TD><span className="text-[#3598DB] font-medium text-sm">{b.name}</span></TD>
                          <TD>{b.website}</TD>
                          <TD>{b.industry}</TD>
                          <TD>
                            <button className="text-gray-900 font-bold tracking-widest text-sm px-1">···</button>
                          </TD>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-[#5E5E5E]">
                      Showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, sorted.length)} of {sorted.length}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setBrandPage(p => Math.max(1, p - 1))}
                        disabled={safePage === 1}
                        className="h-8 w-8 grid place-items-center border border-gray-200 rounded-md text-[#5E5E5E] hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 6-6 6 6 6"/></svg>
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
                        <button
                          key={pg}
                          onClick={() => setBrandPage(pg)}
                          className={`h-8 w-8 grid place-items-center rounded-md text-xs font-medium transition-colors ${pg === safePage ? 'bg-[#3598DB] text-white' : 'border border-gray-200 text-[#5E5E5E] hover:bg-gray-50'}`}
                        >
                          {pg}
                        </button>
                      ))}
                      <button
                        onClick={() => setBrandPage(p => Math.min(totalPages, p + 1))}
                        disabled={safePage === totalPages}
                        className="h-8 w-8 grid place-items-center border border-gray-200 rounded-md text-[#5E5E5E] hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 6 6 6-6 6"/></svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {appState === 'ads' && adsSection !== 'brands' && (
            <StubPage
              title={adsSection === 'agencies' ? 'Agencies' : adsSection === 'creatives' ? 'Creatives' : 'Ad Account Defaults'}
              icon={<svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M4 6h16M4 12h16M4 18h10"/></svg>}
              desc="This section is coming soon."
            />
          )}

          {pubSection !== 'series' && appState === 'publisher' && (
            <StubPage
              title={
                pubSection === 'networks'               ? 'Networks'          :
                pubSection === 'prefix'                 ? 'Prefix Management' :
                pubSection === 'ads'                    ? 'Publisher Ads'     :
                pubSection === 'saved-american-scandal' ? 'American Scandal'  :
                pubSection === 'saved-hysterical'       ? 'Hysterical'        :
                pubSection === 'saved-new-heights'      ? 'New Heights'       :
                'Publisher Ads'
              }
              icon={<svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M4 6h16M4 12h16M4 18h10"/></svg>}
              desc="This section is coming soon."
            />
          )}

          {/* Series detail */}
          {appState === 'series' && (
            <div className="min-h-full bg-white">
              <div className="px-7 py-5 border-b border-gray-200">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-[#5E5E5E] mb-1.5">Series</div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">Hysterical</h1>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button className="flex items-center gap-1.5 h-8 px-4 bg-[#3598DB] text-white text-sm font-semibold rounded-md hover:bg-[#2d82c4] transition-colors">
                      Edit
                    </button>
                    <button className="h-8 w-8 grid place-items-center border border-gray-200 rounded-md text-[#5E5E5E] hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
                    </button>
                  </div>
                </div>
                <p className="text-xs text-[#5E5E5E] mt-1.5">Wondery Exclusive · Narrative · 8 episodes</p>
              </div>

              <div className="px-7 py-6">
                {seriesSection === 'general' && (
                  <div className="grid grid-cols-3 gap-5 max-w-5xl">
                    <div className="col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <div className="px-5 py-3 border-b border-gray-100">
                        <span className="text-sm font-semibold text-gray-800">Series Information</span>
                      </div>
                      <div className="p-5">
                        <div className="flex gap-4 mb-5">
                          <PodcastArt id="hysterical" px={64} />
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] text-[#5E5E5E] font-semibold uppercase tracking-wide mb-0.5">Title</div>
                            <div className="text-base font-semibold text-gray-900 mb-3">Hysterical</div>
                            <div className="text-[10px] text-[#5E5E5E] font-semibold uppercase tracking-wide mb-1">Description</div>
                            <p className="text-sm text-[#5E5E5E] leading-relaxed">Named 2025 Ambies&#169; Podcast of the Year, Hysterical investigates a mysterious illness that spreads among a group of high school girls in upstate New York. What is causing their sudden, often violent symptoms? Is there something in the water or inside the school? Or is it "all in their head?" The series examines the outbreak in LeRoy, NY, believed by some to be the most severe case of mass hysteria since the Salem Witch Trials. In his search for answers, Dan Taberski (9/12, Missing Richard Simmons, Running from Cops) explores other seemingly inexplicable events of the last few years and discovers they're far more connected than we realize.</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                          {[
                            { l: 'Type', v: 'Full' }, { l: 'Rating', v: 'Clean' },
                            { l: 'Network', v: 'Wondery Comedy' }, { l: 'Language', v: 'English (US)' },
                          ].map(({ l, v }) => (
                            <div key={l}>
                              <div className="text-[10px] text-[#5E5E5E] font-semibold uppercase tracking-wide mb-0.5">{l}</div>
                              <div className="text-sm text-gray-800">{v}</div>
                            </div>
                          ))}
                        </div>
                        <button className="mt-4 text-xs text-[#3598DB] hover:underline flex items-center gap-1">
                          Show More <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                        </button>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <div className="px-5 py-3 border-b border-gray-100">
                        <span className="text-sm font-semibold text-gray-800">Series Release History</span>
                      </div>
                      <div className="p-5 space-y-4">
                        <div>
                          <div className="text-xs font-semibold text-gray-800 mb-1">Previous Releases</div>
                          <p className="text-xs text-[#5E5E5E] leading-relaxed">Scheduled for Dec 10, 2024 – Apr 12, 2025.</p>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-800 mb-1.5">Content Updates</div>
                          <div className="text-xs text-[#5E5E5E] space-y-1 leading-relaxed">
                            <p>Ad Insertion was deleted 2 mins ago,</p>
                            <p>Media replaced 30 days ago,</p>
                            <p>Title was edited 30 days ago.</p>
                          </div>
                        </div>
                        <button className="text-xs text-[#3598DB] hover:underline flex items-center gap-1">
                          View All Histories <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 6 6 6-6 6"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {seriesSection === 'series' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold text-gray-800">Episodes</h2>
                        <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-[#5E5E5E] rounded-full">{EPISODES_24H.length}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 h-8 px-3 border border-gray-200 rounded-md text-xs font-medium text-[#5E5E5E] bg-white hover:bg-gray-50 transition-colors">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"/></svg>
                          Bulk Edit
                        </button>
                        <AddBtn label="New Episode" />
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <table className="w-full border-collapse">
                        <thead><tr><TH>Season</TH><TH>#</TH><TH>Title</TH><TH>Published</TH><TH>Duration</TH><TH>Feed</TH><TH>Type</TH><TH>Status</TH><TH>Downloads</TH><TH>Actions</TH></tr></thead>
                        <tbody>
                          {EPISODES_24H.map((ep) => (
                            <tr key={ep.num} className="hover:bg-gray-50/80 cursor-pointer transition-colors">
                              <TD>1</TD>
                              <TD>{ep.num}</TD>
                              <TD><span className="text-[#3598DB] font-medium">{ep.title}</span></TD>
                              <TD><span className="whitespace-nowrap">{ep.published}</span></TD>
                              <TD>{ep.duration}</TD>
                              <TD><span className="text-xs text-[#5E5E5E]">Primary Feed, Amazon Music Ad Free, Wondery+</span></TD>
                              <TD>Full</TD>
                              <TD><StatusPill status={ep.status} /></TD>
                              <TD>{ep.downloads}</TD>
                              <TD><button className="text-gray-900 font-bold tracking-widest text-sm px-1">···</button></TD>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {seriesSection === 'seasons' && (
                  <div className="max-w-5xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold text-gray-800">Seasons</h2>
                        <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-[#5E5E5E] rounded-full">{SEASONS_24H.length}</span>
                      </div>
                      <AddBtn label="New Season" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <table className="w-full border-collapse">
                        <thead><tr><TH>Season</TH><TH>Episodes</TH><TH>First Release</TH><TH>Last Release</TH><TH>Status</TH></tr></thead>
                        <tbody>
                          {SEASONS_24H.map((s) => (
                            <tr key={s.name} className="hover:bg-gray-50/80 cursor-pointer transition-colors">
                              <TD><span className="font-medium text-gray-800">{s.name}</span></TD>
                              <TD>{s.episodes}</TD>
                              <TD>{s.firstRelease}</TD>
                              <TD>{s.lastRelease}</TD>
                              <TD><StatusPill status={s.status} /></TD>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {seriesSection === 'feeds' && (
                  <div className="max-w-5xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold text-gray-800">Feeds</h2>
                        <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-[#5E5E5E] rounded-full">{FEEDS_24H.length}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center h-8 bg-white border border-gray-200 rounded-md px-3 gap-2 w-40 focus-within:border-[#3598DB] transition-colors">
                          <svg className="w-3.5 h-3.5 text-[#5E5E5E] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
                          <input className="flex-1 bg-transparent border-0 outline-none text-xs placeholder-[#5E5E5E] font-[inherit] min-w-0" placeholder="Search…" />
                        </div>
                        <AddBtn label="New Feed" />
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr><TH>Name</TH><TH>Type</TH><TH>Ad-Free</TH><TH>Date Range</TH><TH>Ad Slots</TH><TH>Status</TH><TH>Actions</TH></tr>
                        </thead>
                        <tbody>
                          {FEEDS_24H.map((f) => (
                            <tr key={f.name} className="hover:bg-gray-50/80 cursor-pointer transition-colors">
                              <TD><span className="text-[#3598DB] font-medium">{f.name}</span></TD>
                              <TD>{f.type}</TD>
                              <TD>{f.adFree}</TD>
                              <TD>
                                <span className="inline-block text-xs border border-gray-200 rounded-full px-2.5 py-0.5 text-[#5E5E5E] bg-gray-50">
                                  {f.dateRange}
                                </span>
                              </TD>
                              <TD>{f.adSlots}</TD>
                              <TD><StatusPill status={f.status} /></TD>
                              <TD><button className="text-gray-300 hover:text-[#5E5E5E] font-bold text-base px-1 tracking-widest leading-none">···</button></TD>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {seriesSection === 'analytics' && (
                  <StubPage
                    title="Analytics"
                    desc="Downloads, listeners, and demographics for 24 Hours."
                    icon={<svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M4 19V5M4 19h16M8 16v-4M12 16V9M16 16v-6"/></svg>}
                  />
                )}
              </div>
            </div>
          )}
        </main>
      </div>


      {/* ── Demo cursor (visible only when ?demo=1) ───────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: demoCursor.x,
          top: demoCursor.y,
          width: 24,
          height: 24,
          marginLeft: -2,
          marginTop: -2,
          opacity: demoCursor.visible ? 1 : 0,
          transition:
            'left 700ms cubic-bezier(0.45, 0.05, 0.2, 1), top 700ms cubic-bezier(0.45, 0.05, 0.2, 1), opacity 220ms ease',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="#0f0f0f" strokeWidth="1.4" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}>
          <path d="M5 3 L5 19 L9.5 14.5 L12 21 L15 19.5 L12.5 13 L19 13 Z" />
        </svg>
        {demoCursor.clicking && (
          <span
            style={{
              position: 'absolute',
              top: -8,
              left: -8,
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'rgba(251, 191, 36, 0.55)',
              animation: 'demoClickPulse 600ms ease-out forwards',
            }}
          />
        )}
      </div>
      <style>{`
        @keyframes demoClickPulse {
          0% { transform: scale(0.4); opacity: 0.9; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
