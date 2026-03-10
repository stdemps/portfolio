import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  /** When true, render as single slide in horizontal carousel (playground mode) */
  carousel?: boolean;
  /** When provided (Playground mode), clicking "Let's chat" switches to Contact patch */
  onContactClick?: () => void;
}

export function Hero({ carousel = false, onContactClick }: HeroProps) {
  const content = (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:pt-24 lg:pb-[6.5rem]">
      <div className="xl:grid xl:grid-cols-[1fr_auto] xl:items-end xl:gap-16">
        {/* Left: headline + CTA */}
        <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-none">
          <p className="flex flex-wrap items-center gap-2 text-base text-muted-foreground md:text-lg">
            Hey!{" "}
            <Image
              src={site.avatar}
              alt=""
              width={28}
              height={28}
              className="inline-block h-7 w-7 md:h-8 md:w-8"
              aria-hidden
              priority
            />{" "}
            I&apos;m Steven.
          </p>
          <h1 className="mt-4 font-display text-3xl font-medium leading-[1.25] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-heroBlue">Product design lead</span>
            {" at KPMG UK, growing the design function and exploring "}
            <span className="text-heroPink">AI-assisted product development</span>
            {"."}
          </h1>
          <div className="mt-6 md:mt-8">
            <Button
              variant="default"
              size="lg"
              className="group gap-2 px-6 text-base font-semibold shadow-md transition-transform duration-200 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-offset-2 md:px-8"
              asChild
            >
              <Link href="#contact">
                Let&apos;s chat{" "}
                <span
                  className="cta-arrow inline-block transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Right: sidebar descriptor — visible only at xl+ */}
        <div className="hidden xl:flex xl:flex-col xl:items-end xl:gap-4 xl:pb-1 xl:text-right">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
            Based in the UK. Designing products at KPMG since 2022.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
            Musician. Reggie's dad. Product Builder.
          </p>
        </div>
      </div>
    </div>
  );

  if (carousel) {
    return (
      <section className={cn("flex h-full flex-col", "border-b-0")}>
        <div className="moog-screen-bank h-full w-full">
          <div className="moog-screen-bank-content flex flex-1 flex-col justify-center px-4 py-6 md:px-6 md:py-8">
            <div
              data-moog-bank-item
              className="text-sm md:text-base [&_h1]:font-synth [&_h1]:text-2xl [&_h1]:md:text-4xl [&_h1]:lg:text-5xl"
            >
              <p className="flex flex-wrap items-center gap-2 text-slate-400">
                Hey!{" "}
                <Image
                  src={site.avatar}
                  alt=""
                  width={28}
                  height={28}
                  className="inline-block h-7 w-7 md:h-8 md:w-8"
                  aria-hidden
                  priority
                />{" "}
                I&apos;m Steven.
              </p>
              <h1 className="mt-4 font-synth text-2xl font-semibold leading-[1.25] tracking-tight text-foreground md:text-4xl lg:text-5xl">
                <span className="text-heroBlue">Product design lead</span>
                {" at KPMG UK, growing the design function and exploring "}
                <span className="text-heroPink">
                  AI-assisted product development
                </span>
                {"."}
              </h1>
              <div className="mt-6 md:mt-8">
                {onContactClick ? (
                  <Button
                    variant="outline"
                    size="lg"
                    className="moog-cta group h-11 gap-2 px-6 text-base font-semibold md:h-12 md:px-8"
                    onClick={onContactClick}
                  >
                    Let&apos;s chat{" "}
                    <span
                      className="cta-arrow inline-block transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5"
                      aria-hidden
                    >
                      →
                    </span>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="lg"
                    className="moog-cta group h-11 gap-2 px-6 text-base font-semibold md:h-12 md:px-8"
                    asChild
                  >
                    <Link href="#contact">
                      Let&apos;s chat{" "}
                      <span
                        className="cta-arrow inline-block transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5"
                        aria-hidden
                      >
                        →
                      </span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <section className="border-b border-border/60">{content}</section>;
}
