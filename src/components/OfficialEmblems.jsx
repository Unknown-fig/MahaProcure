import React from 'react';
import maharashtraSealImg from '../assets/emblem-maharashtra.png';
import maharashtraSealTransImg from '../assets/emblem-maharashtra-transparent.png';
import maharashtraSealGoldImg from '../assets/emblem-maharashtra-gold.png';
import ashokaImg from '../assets/emblem-india.png';
import ashokaTransImg from '../assets/emblem-india-transparent.png';
import ashokaGoldImg from '../assets/emblem-india-gold.png';

/**
 * State Emblem of India (Ashoka Lion Capital with Satyameva Jayate - सत्यमेव जयते)
 */
export function AshokaEmblem({ className = "h-12 w-auto", gold = false, transparent = true }) {
  const imgSrc = gold ? ashokaGoldImg : (transparent ? ashokaTransImg : ashokaImg);
  return (
    <img
      src={imgSrc}
      alt="State Emblem of India (सत्यमेव जयते)"
      className={`object-contain inline-block select-none ${className}`}
    />
  );
}

/**
 * Official Maharashtra State Seal (महाराष्ट्र शासन राजमुद्रा)
 */
export function MaharashtraSeal({ className = "size-12", gold = false, transparent = true }) {
  const imgSrc = gold ? maharashtraSealGoldImg : (transparent ? maharashtraSealTransImg : maharashtraSealImg);
  return (
    <img
      src={imgSrc}
      alt="महाराष्ट्र शासन राजमुद्रा (Government of Maharashtra Seal)"
      className={`object-contain inline-block select-none ${className}`}
    />
  );
}

/**
 * Digital India Crest
 */
export function DigitalIndiaLogo({ className = "h-8" }) {
  return (
    <div className={`flex items-center gap-1 font-bold text-xs select-none ${className}`}>
      <div className="flex flex-col leading-none">
        <span className="text-[#ff9933] text-[9px] tracking-widest font-black">DIGITAL</span>
        <span className="text-[#138808] text-[12px] tracking-tight font-extrabold -mt-0.5">INDIA</span>
        <span className="text-muted-foreground text-[6px] tracking-wider uppercase">Power To Empower</span>
      </div>
    </div>
  );
}

/**
 * Startup India Official Badge
 */
export function StartupIndiaLogo({ className = "h-8" }) {
  return (
    <div className={`flex items-center gap-1 select-none ${className}`}>
      <span className="rounded bg-[#0f2942] text-white px-1.5 py-0.5 text-[9px] font-black tracking-wide">
        #startup<span className="text-[#ff9933]">india</span>
      </span>
      <span className="text-[9px] font-semibold text-muted-foreground hidden lg:inline">
        DPIIT Recognized
      </span>
    </div>
  );
}
