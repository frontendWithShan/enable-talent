import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { JSX } from "react";
import man from "@/public/images/SectionCTA/for-employers-landing.jpeg";
import woman from "@/public/images/SectionCTA/for-talents-landing.jpeg";
// import fancybutton
import FancyButton from "@/components/FancyButton";

type CTACardProps = {
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  href: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  cardBgClass: string;
};

function CTACard({
  eyebrow,
  title,
  body,
  ctaLabel,
  href,
  imageSrc,
  imageAlt,
  cardBgClass,
}: CTACardProps): JSX.Element {
  return (
    <article
      className={`flex h-full flex-col rounded-3xl ${cardBgClass} p-6 sm:p-8 shadow-sm`}
    >
      <div>
        {/* Image */}
        <div
          className="relative mb-6 
    h-52          /* mobile */
    sm:h-64       /* small devices (optional) */
    md:h-80       /* TABLETS (new larger size) */
    lg:h-64       /* desktop (optional, change as needed) */
    overflow-hidden rounded-3xl
"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-[50%_20%]" // change here
          />
        </div>

        {/* Text */}
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
          {eyebrow}
        </p>

        <h3 className="mt-3 text-xl sm:text-2xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-3 text-base leading-relaxed text-slate-700">{body}</p>
      </div>

      {/* CTA */}
      <div className="mt-6">
        <Link href={href} aria-label={ctaLabel} className="inline-flex">
          <FancyButton label={ctaLabel} as="span" />
        </Link>
      </div>
    </article>
  );
}

export default function SectionCTA(): JSX.Element {
  return (
    <section
      aria-labelledby="cta-section-heading"
      className=" py-2 sm:py-3 lg:py-4"
    >
      <h2 id="cta-section-heading" className="sr-only">
        Find jobs or hire professionals
      </h2>

      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <CTACard
            eyebrow="For talents"
            title="Looking for a job that matches your skills and your life?"
            body="Make a free profile and tell us about your experience and the support you need. We will connect you with jobs that fit you. You will also get easy tips to improve your résumé, prepare for interviews, and learn new skills."
            ctaLabel="Start your Job Search"
            href="https://app.enabledtalent.com/signup"
            imageSrc={woman} // put your image in /public/images
            imageAlt="Young professional using sign language while working on a laptop."
            cardBgClass="bg-[#f4ece0]"
          />

          <CTACard
            eyebrow="For employers"
            title="Ready to hire skilled professionals?"
            body="Post your job and reach qualified candidates from around the world. You can create clear job listings, review applications, and manage your hiring in one place. Our platform makes it easier to find the right people and build an inclusive, reliable team"
            ctaLabel="Post a Job"
            href="https://app.enabledtalent.com/signup-employer"
            imageSrc={man} // put your image in /public/images
            imageAlt="Employer reviewing candidates on a tablet in a modern office."
            cardBgClass="bg-[#dfeaff]"
          />
        </div>
      </div>
    </section>
  );
}
