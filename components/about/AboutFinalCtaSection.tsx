import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import FancyButton from "@/components/FancyButton";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function AboutFinalCtaSection() {
  return (
    <section className="mb-20 w-full py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-[#182434]">
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-1/2">
              <Image
                src="/images/about-us/final-cta/ready-to-be-part-of-something.png"
                alt="Person working on laptop"
                width={600}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-10 md:w-1/2 md:p-12">
              <h2
                className={`${plusJakartaSans.className} mb-4 text-2xl font-extrabold tracking-tight text-white md:text-3xl lg:text-4xl`}
              >
                Ready to be part of something{" "}
                <span className="bg-gradient-to-r from-[#C0412C] to-[#F4C15D] bg-clip-text text-transparent">
                  transformative?
                </span>
              </h2>
              <p className="mb-8 text-lg text-white/90">
                Whether you&apos;re a professional ready to showcase your talents, an employer seeking exceptional team
                members, or an advocate for change - your journey with us starts here.
              </p>
              <div>
                <a href="https://app.enabledtalent.com" target="_blank" rel="noopener noreferrer" className="inline-flex">
                  <FancyButton label="Get Started" color="orange" as="span" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

