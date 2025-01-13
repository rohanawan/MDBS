import Image from "next/image";
import WaveBackground from "@/assets/waveBg.svg";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-[#093545]">
      <div className="flex justify-center relative z-10 items-center min-h-screen">
        {children}
      </div>
      <div className="absolute bottom-0 w-full">
        <Image
          src={WaveBackground}
          alt="Wave Background"
          width="auto"
          height={100}
          className="w-full"
        />
      </div>
    </div>
  );
}
