export const site = {
  name: "CLI-Rwanda",
  fullName: "Consilium for Local Initiatives",
  tagline: "Strengthening local initiatives for sustainable impact",
  email: "clirwanda@gmail.com",
  phones: ["+250-795-875-656", "+250-787-899-179"],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export const about = {
  intro:
    "Consilium for Local Initiatives (CLI-Rwanda) is a Rwanda-based consulting firm envisioned to strengthen the sustainability, impact, and growth of local initiatives across the nonprofit and social enterprise ecosystem.",
  etymology:
    'Drawing its name from the Latin word “Consilium” meaning counsel or consulting, CLI-Rwanda is founded on the belief that locally driven organizations and businesses thrive when equipped with strategic guidance, credible systems, and access to the right resources and partnerships.',
  vision:
    "A consulting firm to strengthen the sustainability, impact, and growth of local initiatives across the nonprofit and social enterprise ecosystem.",
  mission: [
    "CLI-Rwanda will provide tailored support to start-up, small, and established NGOs, community-based organizations (CBOs), and purpose-driven enterprises in areas including fundraising and resource mobilization, project proposal and grant writing, donor research and partnership building, and comprehensive fund development strategies.",
    "The firm will also support business branding and business development, helping organizations and businesses clearly articulate their value, enhance visibility, and position themselves competitively in both local and international funding and market spaces.",
    "With a strong focus on inclusive and sustainable development, CLI-Rwanda will deliver specialized services in women’s empowerment and climate resilience, alongside thematic needs assessment surveys and evidence-based program design. Through targeted thematic capacity-building workshops, mentoring, and hands-on technical assistance, the firm will build the institutional capacity of local actors to design impactful interventions, manage resources effectively, and scale sustainable solutions.",
  ],
  closing:
    "Ultimately, Consilium for Local Initiatives (CLI-Rwanda) aims to serve as a trusted partner to local changemakers, bridging ideas with opportunities, strengthening local ownership, and contributing to resilient, equitable, and community-led development in Rwanda and beyond.",
};

export const values = [
  {
    title: "Collaboration",
    description:
      "Interconnected partnership across NGOs, CBOs, women-led initiatives, and social enterprises.",
  },
  {
    title: "Local grounding",
    description:
      "Rooted in African realities with a specific commitment to Rwanda and community-led ownership.",
  },
  {
    title: "Sustainability",
    description:
      "Long-term growth nurtured through strategic guidance, climate resilience, and capacity building.",
  },
  {
    title: "Trusted counsel",
    description:
      "Professional advisory excellence that bridges ideas with opportunities for lasting impact.",
  },
] as const;

export const services = [
  {
    title: "Fundraising & resource mobilization",
    description:
      "Tailored strategies that help start-up, small, and established organizations unlock sustainable funding streams.",
  },
  {
    title: "Grant writing & project proposals",
    description:
      "Clear, credible proposals that articulate need, approach, and impact for competitive funding opportunities.",
  },
  {
    title: "Donor research & partnership building",
    description:
      "Targeted donor mapping and relationship strategies that connect local actors with the right partners.",
  },
  {
    title: "Fund development strategy",
    description:
      "Comprehensive fund development plans that strengthen systems, pipelines, and long-term resource growth.",
  },
  {
    title: "Branding & business development",
    description:
      "Support to articulate value, enhance visibility, and compete in local and international markets.",
  },
  {
    title: "Women’s empowerment & climate resilience",
    description:
      "Specialized advisory for inclusive, sustainable development programs that advance equity and resilience.",
  },
  {
    title: "Needs assessments & program design",
    description:
      "Thematic surveys and evidence-based program design that ground interventions in real community priorities.",
  },
  {
    title: "Capacity building & technical assistance",
    description:
      "Workshops, mentoring, and hands-on support that build institutional capacity to scale sustainable solutions.",
  },
] as const;

export const homeHighlights = services.slice(0, 4);

export const testimonials = [
  {
    quote:
      "CLI-Rwanda helped us bring greater clarity to our priorities and turn our ideas into a practical, fundable plan.",
    name: "Client name",
    role: "Program lead, local nonprofit",
  },
  {
    quote:
      "The guidance was thoughtful, locally grounded, and focused on building systems our team could continue to use.",
    name: "Client name",
    role: "Director, community-based organization",
  },
  {
    quote:
      "We gained a stronger story, a clearer partnership strategy, and the confidence to pursue new opportunities.",
    name: "Client name",
    role: "Founder, purpose-driven enterprise",
  },
] as const;
