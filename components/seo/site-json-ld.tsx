import { site } from "@/lib/portfolio-data"

interface SiteJsonLdProps {
  siteUrl: string
}

export function SiteJsonLd({ siteUrl }: SiteJsonLdProps) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Product Design Lead",
    url: siteUrl,
    sameAs: [site.linkedIn],
    worksFor: {
      "@type": "Organization",
      name: "KPMG UK",
    },
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl,
    description: site.tagline,
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(person)}
      </script>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(website)}
      </script>
    </>
  )
}
