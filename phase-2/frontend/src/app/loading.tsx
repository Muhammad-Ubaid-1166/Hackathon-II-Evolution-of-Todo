import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <Image
        src="/logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="animate-pulse"
      />
    </div>
  );
}
