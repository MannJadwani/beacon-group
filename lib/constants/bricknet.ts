export type NavLink = {
  label: string;
  href: string;
};

export const bricknetNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
];

export const bricknetPartnerLogos = [
  { src: "/bricknet/images/logo-01@1x.webp", alt: "Partner 01" },
  { src: "/bricknet/images/logo-02@1x.webp", alt: "Partner 02" },
  { src: "/bricknet/images/logo-03@1x.webp", alt: "Partner 03" },
  { src: "/bricknet/images/logo-04@1x.webp", alt: "Partner 04" },
  { src: "/bricknet/images/logo-05@1x.webp", alt: "Partner 05" },
] as const;

export const bricknetStats = [
  { value: "10+", label: "Years of Experience" },
  { value: "1500+", label: "Projects Completed" },
  { value: "4.8/5", label: "Customer Satisfaction Score" },
  { value: "98%", label: "Project Success Rate" },
] as const;

export const bricknetServices = [
  {
    number: "01",
    title: "General Contracting",
    description:
      "End-to-end management for seamless project execution, ensuring timely delivery and high-quality.",
    imageSrc: "/bricknet/images/picture-01@1x.webp",
    imageAlt: "General Contracting",
  },
  {
    number: "02",
    title: "Residential Construction",
    description:
      "Homes that stand the test of time, built with precision, comfort, and durability in mind.",
    imageSrc: "/bricknet/images/picture-02@1x.webp",
    imageAlt: "Residential Construction",
  },
  {
    number: "03",
    title: "Commercial Construction",
    description:
      "Scalable infrastructure built for business, designed to meet operational and growth needs.",
    imageSrc: "/bricknet/images/picture-03@1x.webp",
    imageAlt: "Commercial Construction",
  },
  {
    number: "04",
    title: "Renovation & Remodeling",
    description:
      "Modernize spaces with expert craftsmanship, transforming interiors into functional and stylish.",
    imageSrc: "/bricknet/images/picture-04@1x.webp",
    imageAlt: "Renovation & Remodeling",
  },
  {
    number: "05",
    title: "Architectural Planning",
    description:
      "Smart, functional, and aesthetic design planning that maximizes space and enhances the experience.",
    imageSrc: "/bricknet/images/picture-05@1x.webp",
    imageAlt: "Architectural Planning",
  },
  {
    number: "06",
    title: "Site Management",
    description:
      "Safe and efficient oversight from start to finish, ensuring smooth adherence to project goals.",
    imageSrc: "/bricknet/images/picture-06@1x.webp",
    imageAlt: "Site Management",
  },
] as const;

export const bricknetValues = [
  {
    iconSrc: "/bricknet/images/icon-jackhammer.svg",
    title: "Quality Craftsmanship",
    description:
      "We prioritize attention to detail and use high-quality materials for lasting, exceptional results.",
  },
  {
    iconSrc: "/bricknet/images/icon-clock-seven.svg",
    title: "Timely Delivery",
    description: "We value your time and ensure projects are completed on schedule.",
  },
  {
    iconSrc: "/bricknet/images/icon-constructor.svg",
    title: "Safety First",
    description:
      "We maintain top safety standards to protect both our team and your property.",
  },
  {
    iconSrc: "/bricknet/images/icon-rainbow.svg",
    title: "Innovative Solutions",
    description:
      "We prioritize attention to detail and use high-quality materials for lasting results.",
  },
] as const;

export const bricknetFeaturedProjects = [
  {
    category: "Residential Construction",
    title: "Skyline Residence",
    year: "2025",
    client: "Harrison Family",
    imageSrc: "/bricknet/images/gallery-01@1x.webp",
    imageAlt: "Modern hillside home with panoramic views",
    description:
      "A modern hillside home designed for luxury living, incorporating eco-efficient features and offering breathtaking panoramic views that enhance the overall living experience.",
  },
  {
    category: "Commercial Construction",
    title: "Quantum Business Park",
    year: "2025",
    client: "Innovate Corp.",
    imageSrc: "/bricknet/images/hero-03@1x.webp",
    imageAlt: "State-of-the-art business park",
    description:
      "A state-of-the-art business park with sustainable infrastructure and cutting-edge facilities, designed to foster innovation and collaboration.",
  },
  {
    category: "Renovation",
    title: "The Grand Oak Mansion",
    year: "2025",
    client: "Miller Estate",
    imageSrc: "/bricknet/images/hero-04@1x.webp",
    imageAlt: "Historic mansion restoration",
    description:
      "A meticulous restoration of a historic mansion, preserving its classic architecture while integrating modern amenities for a luxurious living experience.",
  },
] as const;

export const bricknetWorkSteps = [
  {
    number: "01",
    title: "Consultation & Planning",
    description:
      "Understanding your needs, budget, and vision ensures your project aligns with your goals, while staying within financial limits and reflecting your ideas.",
  },
  {
    number: "02",
    title: "Design & Architecture",
    description:
      "Visualizing the project with practical designs brings your ideas to life, focusing on both functionality and aesthetics, align with your overall vision and goals.",
  },
  {
    number: "03",
    title: "Construction & Management",
    description:
      "Building with precision and expert supervision ensures every detail is executed with accuracy, maintaining high quality and meeting your project’s requirements.",
  },
] as const;

export const bricknetTestimonials = [
  {
    quote:
      "\"Bricknet exceeded all expectations. Our home turned out better than we dreamed!\"",
    body:
      "Their team was professional, skilled, and attentive, providing excellent support throughout. Highly recommended for building your forever home.",
    name: "Emily Santos",
    role: "Residential Client",
  },
  {
    quote:
      "\"From consultation to handover, their team was responsive, professional, and reliable.\"",
    body:
      "Bricknet expertly managed our office complex construction, meeting deadlines and maintaining high craftsmanship. Their coordination was impressive, and we'd gladly work with them again.",
    name: "Mark Li",
    role: "Commercial Developer",
  },
] as const;

export const bricknetPricingPlans = [
  {
    name: "Starter Package",
    price: "$1000/mo",
    sublabel: "Start from",
    cta: "Subscribe Package",
    features: [
      "Ideal for small builds or renovations",
      "Includes consultation and 2 revisions",
      "Basic timeline and cost report",
      "Site evaluation and permit assistance",
    ],
  },
  {
    name: "Standard Package",
    price: "$2000/mo",
    sublabel: "Start from",
    cta: "Subscribe Package",
    features: [
      "Mid-sized residential projects",
      "Full project management",
      "3D renderings and layout",
      "Weekly progress updates",
    ],
  },
  {
    name: "Premium Package",
    price: "Custom Pricing",
    sublabel: "",
    cta: "Subscribe Package",
    features: [
      "Large-scale construction",
      "Includes full lifecycle support",
      "Comprehensive design-build service",
      "Premium materials sourcing",
    ],
  },
] as const;

export const bricknetBlogPosts = [
  {
    category: "Client Guide",
    date: "September 16, 2025",
    title: "Choosing the Right Contractor for Your Project",
    author: "Albert Sandy",
    readingTime: "10 minutes reading",
    imageSrc: "/bricknet/images/picture-blog-01@1x.webp",
    imageAlt: "Blog article cover image",
  },
  {
    category: "Construction Tips",
    date: "September 16, 2025",
    title: "How to Plan Your Commercial Build Effectively and Efficiently",
    author: "Albert Sandy",
    readingTime: "5 minutes reading",
  },
  {
    category: "Green Building",
    date: "September 16, 2025",
    title: "Why Sustainable and Efficient Building Matters in 2025",
    author: "Jordy Alba",
    readingTime: "7 minutes reading",
  },
] as const;

export const bricknetFooterColumns = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/projects" },
    ],
  },
  {
    title: "Social Media",
    links: [
      { label: "Twitter/X", href: "https://x.com/peterdraw" },
      { label: "Instagram", href: "https://instagram.com/peterdraw.co" },
      { label: "Facebook", href: "https://www.facebook.com/peterdrawstudio/" },
      { label: "Pinterest", href: "https://id.pinterest.com/peterdraw/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/peterdraw-co/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  },
] as const;
