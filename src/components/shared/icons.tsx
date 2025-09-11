import type { SVGProps } from "react";

export function GoldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 6v12m6-6H6"/>
      <path d="M17.657 7.343l-1.414-1.414a2 2 0 0 0-2.828 0L6.343 12.929a2 2 0 0 0 0 2.828l1.414 1.414a2 2 0 0 0 2.828 0l7.072-7.071a2 2 0 0 0 0-2.828z"/>
    </svg>
  );
}

export function OilDrumIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="3"/>
      <path d="M5 6v12c0 1.66 3.14 3 7 3s7-1.34 7-3V6"/>
      <path d="M5 12h14"/>
    </svg>
  );
}

export function DiamondIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"/>
      <path d="m12 12 7.6-7.6M12 12l-7.6-7.6M12 12v9.3M12 12H2.7M12 12h9.3"/>
    </svg>
  );
}

export function CobaltIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2l-5.5 9h11z"/>
      <path d="M17.5 21l-11-9h11"/>
      <path d="M6.5 3L12 12l5.5-9"/>
      <path d="M6.5 21L12 12l5.5 9"/>
    </svg>
  );
}
