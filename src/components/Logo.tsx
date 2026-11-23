import Image from "next/image";
import mark from "../../public/black-hole-mark.png";

/** Lukeyy wordmark: the black hole mark beside the name. */
export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2 font-display text-lg font-bold tracking-[-0.02em]">
      <Image src={mark} alt="" priority className="h-8 w-auto" />
      Lukeyy
    </span>
  );
}
