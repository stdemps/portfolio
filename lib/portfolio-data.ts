/**
 * Portfolio content — matches Framer site (stevendempster.framer.website).
 * Edit this file to update copy, projects, testimonials, and tools.
 */

export type ProjectKind = "corporate" | "personal"

export type MockupType = "phones" | "browser" | "image" | "gradient-bar"

export interface Project {
  id: string
  title: string
  tagline: string
  kind: ProjectKind
  /** Optional subtitle (e.g. "KPMG Digital Delivery Platform (Client Portal)") */
  subtitle?: string
  /** Optional: path under /public or URL */
  image?: string
  /** Optional: alt text for project image (accessibility) */
  imageAlt?: string
  href?: string
  year?: string
  /** Show "Coming Soon" pill */
  comingSoon?: boolean
  /** Show horizontal gradient bar above title (purple → blue) */
  gradientBar?: boolean
  /** Visual style for project block */
  mockupType?: MockupType
  /** Use gradient background (e.g. for phone mockups) */
  backgroundGradient?: boolean
  /** When true, block spans 2 columns in bento grid on md/lg */
  featured?: boolean
}

export interface Tool {
  name: string
  /** Icon slug for built-in icons (figma, framer, cursor, vscode, notion), or path under /public, or URL */
  icon: string
  link?: string
}

export interface TemplateRepo {
  name: string
  href: string
  description: string
}

export interface WorkExperienceItem {
  title: string
  employer: string
  /** Date range, e.g. "OCT, 2022 - CURRENT" */
  period?: string
  /** Role description (paragraph) */
  description?: string
  url?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  avatar?: string
  link?: string
  /** When true, card spans 2 columns in bento grid on large screens */
  featured?: boolean
}

export const site = {
  name: "Steven Dempster",
  emoji: "👋",
  tagline: "A creative thinker and product design lead at KPMG UK, growing a design team and exploring AI-assisted engineering.",
  heroGreeting: "Hey! 👋 I'm Steven.",
  email: "hello@stevendempster.com",
  linkedIn: "https://linkedin.com/in/stevendempster",
  resumeUrl: undefined as string | undefined,
  about: "",
}

export const tools: Tool[] = [
  { name: "Figma", icon: "figma", link: "https://figma.com" },
  { name: "Framer", icon: "framer", link: "https://framer.com" },
  { name: "Cursor", icon: "cursor", link: "https://cursor.com" },
  { name: "Visual Studio Code", icon: "vscode", link: "https://code.visualstudio.com" },
  { name: "Notion", icon: "notion", link: "https://notion.so" },
  { name: "Claude", icon: "claude", link: "https://anthropic.com" },
]

export const templateRepos: TemplateRepo[] = [
  {
    name: "prototype-starter",
    href: "https://github.com/stdemps/prototype-starter",
    description: "Quick prototypes with Cursor and Next.js",
  },
  {
    name: "product-workspace",
    href: "https://github.com/stdemps/product-workspace",
    description: "Design-to-dev workflow and product templates",
  },
]

export const projects: Project[] = [
  {
    id: "kraken-weddings",
    title: "Designing a wedding musician's online presence from concept to launch",
    tagline: "Kraken Weddings — Live Acoustic Wedding Music",
    subtitle: "Kraken Weddings",
    kind: "personal",
    mockupType: "browser",
    href: "https://kraken-weddings.vercel.app",
    image: "/projects/kraken-weddings.png",
    imageAlt: "Kraken Weddings homepage: hero section with acoustic guitarist performing at a sunlit window, navigation and call-to-action buttons.",
    featured: true,
  },
  {
    id: "sddesigns",
    title: "SDDesigns",
    tagline: "Client-facing app for tax and actions — home and profile flows.",
    kind: "corporate",
    mockupType: "image",
    image: "/projects/sddesigns-mockup.png",
    imageAlt: "SDDesigns app: home screen with Your Actions and Events & Learning, and profile screen with personal and contact details.",
    comingSoon: true,
  },
  {
    id: "client-portal",
    title: "Transforming the client experience by creating a single access point for all their interactions",
    tagline: "KPMG Digital Delivery Platform (Client Portal)",
    subtitle: "KPMG Digital Delivery Platform (Client Portal)",
    kind: "corporate",
    mockupType: "browser",
    comingSoon: true,
    image: "/projects/client-portal-mockup.png",
    imageAlt: "Common Design Atlantis Blazor Docs — Accordion component with overview and code example.",
  },
  {
    id: "ai-expense",
    title: "How we increased productivity using AI to categorise corporate expense data",
    tagline: "AI Expense Categorisation",
    subtitle: "AI Expense Categorisation",
    kind: "corporate",
    gradientBar: true,
    mockupType: "image",
    image: "/projects/ai-expense-mockup.png",
    imageAlt: "Business Account expense review screen: review your expenses with filters, bulk categorisation and approve actions.",
  },
]

export const workExperience: WorkExperienceItem[] = [
  {
    period: "OCT, 2025 - CURRENT",
    title: "Product Design Lead",
    employer: "KPMG UK",
    description: "Add placeholder for now",
  },
  {
    period: "OCT, 2022 - 2024",
    title: "Product Designer",
    employer: "KPMG UK",
    description:
      "Built a design team from scratch, slashed design handoff time by 66% with a design system, and sped up product launches by 75%. Led a varied project portfolio, always exceeding expectations while reshaping the user experience across our full product suite, introducing a unified and familiar experience across all our apps.",
  },
  {
    period: "FEB, 2020 - SEP, 2022",
    title: "Senior Product Analyst",
    employer: "KPMG UK",
    description:
      "Standardised our client onboarding to simplify processes and serve a wider audience. Led the design and delivery of a digital service portal which guides our servicing teams through the onboarding processes, integrating with our CRM - MSDynamics, reducing admin and ensuring data accuracy and improved client management. Boosted team morale and knowledge sharing through a bi-weekly skill share program.",
  },
  {
    period: "SEP, 2018 - FEB, 2020",
    title: "Product Analyst",
    employer: "Tesco Bank",
    description:
      "Delivered on multiple projects like the Savings Comparison Tool and revamped Clubcard & Travel Money features, making financial decisions easier for millions. Championed a database solution saving content creators an hour per rate change, and streamlined teamwork for faster product delivery.",
  },
]

export const testimonials: Testimonial[] = [
  {
    id: "oli",
    name: "Oli Dockray",
    role: "Partner Tax Tech & Innovation",
    quote:
      "Hugely impressed by your commitment, approach and methodology. The design/UX work you've done during your time with us is fantastic, enabling us to build a consistent experience across our product suite.",
    avatar: "/avatars/oli.jpg",
    featured: true,
  },
  {
    id: "jamie",
    name: "Jamie Richards",
    role: "Director Tax Tech & Innovation",
    quote:
      "Steven's a creative force, constantly devising modern designs with a user-centric approach. He's revamped the portals for a contemporary and personalised feel, showcasing his keen understanding of user experience.",
    avatar: "/avatars/jamie.jpg",
  },
  {
    id: "siva",
    name: "Siva Kumar Pandurao",
    role: "Product Owner",
    quote:
      "Steven brings a rare blend of creativity and structure. His designs are not only visually compelling but also deeply considered from a user and business perspective. A real asset to any product team.",
    avatar: "/avatars/siva.jpg",
  },
  {
    id: "sinu",
    name: "Sinu Babu",
    role: "Lead Software Engineer",
    quote:
      "Your Figma mockups, crafted with a keen eye and analytical mind, have been instrumental in APEX development. Your approachable nature fosters collaboration, with junior team members readily seeking and receiving your valuable insights. You're also open to feedback, making you a true asset.",
    avatar: "/avatars/sinu.jpg",
    featured: true,
  },
  {
    id: "shubhangi",
    name: "Shubhangi Jagtap",
    role: "Senior Software Developer",
    quote:
      "Steven's deep business knowledge and analytical skills shaped our product during Research & Design. He seamlessly filled the vacant product owner role, perfectly bridging business and development. He really went above and beyond.",
    avatar: "/avatars/shubhangi.jpg",
    featured: true,
  },
  {
    id: "rozlynn",
    name: "Rozlynn Jacobs",
    role: "Senior Business Analyst",
    quote:
      "You always go over and above what you need to do to help make the project function in the best way possible. Your mock ups, usability studies and demos are excellent. The business area really like this approach.",
    avatar: "/avatars/rozlynn.jpg",
  },
]
