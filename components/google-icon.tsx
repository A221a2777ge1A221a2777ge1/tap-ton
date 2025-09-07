export default function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 0-7.07 17.07" />
      <path d="M12 22a10 10 0 0 0 7.07-17.07" />
      <path d="M2 12h20" />
      <path d="M22 12a10 10 0 0 0-17.07-7.07" />
      <path d="M2 12a10 10 0 0 0 17.07 7.07" />
    </svg>
  );
}
