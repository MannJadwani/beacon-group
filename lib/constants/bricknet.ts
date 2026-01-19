export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const bricknetNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/who-we-are",
    children: [
      { label: "Who We Are", href: "/who-we-are" },
      { label: "Our Team", href: "/team" },
      { label: "Design Concept 4", href: "/hero-4" },
      { label: "Bright Theme", href: "/bright-theme" },
      { label: "Bubbly Theme", href: "/bubbly-theme" },
      { label: "Who We Are (v2)", href: "/who-we-are-2" },
      { label: "Who We Are (v3)", href: "/who-we-are-3" },
      { label: "Blue Variant", href: "/variant-blue" },
    ],
  },
  { label: "Services", href: "/#services" },
  { label: "Research", href: "/#research" },
  { label: "Press & Media", href: "/#media" },
  { label: "Contact", href: "/contact" },
];

export const bricknetPartnerLogos = [
  {
    src: "https://beacontrustee.co.in/assets/images/tumbstone-logo/power-finance-corporation-india.png",
    alt: "Power Finance Corporation",
  },
  {
    src: "https://beacontrustee.co.in/assets/images/tumbstone-logo/rec.png",
    alt: "Rural Electrification Corporation",
  },
  {
    src: "https://beacontrustee.co.in/assets/images/tumbstone-logo/nhai.jpg",
    alt: "National Highways Authority of India",
  },
  {
    src: "https://beacontrustee.co.in/assets/images/tumbstone-logo/ntpc.png",
    alt: "NTPC Limited",
  },
  {
    src: "https://beacontrustee.co.in/assets/images/tumbstone-logo/gail.png",
    alt: "Gas Authority of India",
  },
] as const;

export const bricknetStats = [
  { value: "1st", label: "Listed trustee company in India" },
  { value: "6", label: "Core trustee service verticals" },
  { value: "20+", label: "Prominent locations nationwide" },
  { value: "ISO 27001", label: "Information security certified" },
] as const;

export const bricknetServices = [
  {
    number: "01",
    title: "Debenture Trustee",
    description:
      "Paving a smooth road for debt fund raising while protecting debenture holder interests.",
    imageSrc: "https://beacontrustee.co.in/assets/images/banners/head-banner-1.jpg",
    imageAlt: "Debenture trustee services",
  },
  {
    number: "02",
    title: "Security Trustee",
    description:
      "Holding and administering security for lenders with disciplined documentation and oversight.",
    imageSrc: "https://beacontrustee.co.in/assets/images/banners/head-banner-2.jpg",
    imageAlt: "Security trustee services",
  },
  {
    number: "03",
    title: "Alternative Investment Funds",
    description:
      "Acting as pillars for fund managers with trusted governance and trustee administration.",
    imageSrc: "https://beacontrustee.co.in/assets/images/banners/head-banner-3.jpg",
    imageAlt: "Alternative investment fund trustee services",
  },
  {
    number: "04",
    title: "Securitization",
    description:
      "Assisting in unlocking capital through securitization mandates across DA, PTC, and SDI.",
    imageSrc: "https://beacontrustee.co.in/assets/images/banners/head-banner-4.jpg",
    imageAlt: "Securitization trustee services",
  },
  {
    number: "05",
    title: "Escrow Services",
    description:
      "Enabling responsible transactions with escrow and monitoring services tailored to complex deals.",
    imageSrc: "https://beacontrustee.co.in/assets/images/banners/head-banner-5.jpg",
    imageAlt: "Escrow services",
  },
  {
    number: "06",
    title: "Research",
    description:
      "Transforming into a digital enterprise with research reports and regulatory updates.",
    imageSrc: "https://beacontrustee.co.in/assets/images/banners/head-banner-6.jpg",
    imageAlt: "Beacon research updates",
  },
] as const;

export const bricknetValues = [
  {
    iconSrc: "/bricknet/images/icon-handshake.svg",
    title: "Customer-Centric Solutions",
    description:
      "Relationship-focused trustee support that keeps client goals and outcomes in view.",
  },
  {
    iconSrc: "/bricknet/images/icon-jackhammer.svg",
    title: "Integrity",
    description:
      "Transparent governance and regulatory rigor across every mandate and stakeholder touchpoint.",
  },
  {
    iconSrc: "/bricknet/images/icon-magnifying.svg",
    title: "Simplicity",
    description:
      "Making complex compliance clear and actionable for issuers, investors, and regulators.",
  },
  {
    iconSrc: "/bricknet/images/icon-rainbow.svg",
    title: "Resourcefulness",
    description:
      "Proactive execution that keeps transactions moving and risks addressed early.",
  },
  {
    iconSrc: "/bricknet/images/icon-lightbulb.svg",
    title: "Mission Orientation",
    description:
      "Committed to protecting stakeholder interests through every phase of the lifecycle.",
  },
  {
    iconSrc: "/bricknet/images/icon-constructor.svg",
    title: "Industry Expertise",
    description:
      "Deep experience across capital markets, securitization, and escrow structures.",
  },
] as const;

export const bricknetFeaturedProjects = [
  {
    category: "Beacon in Media",
    title: "Economic Times",
    year: "Jan 2024",
    client: "Pratapsingh Nathani",
    imageSrc: "https://beacontrustee.co.in/assets/images/banners/head-banner-2.jpg",
    imageAlt: "Beacon leadership insights",
    description:
      "Infrastructure insights on Gujarat highlight logistics strength, export readiness, and diversified growth.",
  },
  {
    category: "Beacon in Media",
    title: "Economic Times",
    year: "Jan 2024",
    client: "Pratapsingh Nathani",
    imageSrc: "https://beacontrustee.co.in/assets/images/banners/head-banner-3.jpg",
    imageAlt: "Beacon transaction security",
    description:
      "BeaconTxn secures retail transactions with high-volume escrow services for safer exchanges.",
  },
  {
    category: "Beacon in Media",
    title: "Economic Times",
    year: "Dec 2023",
    client: "Pratapsingh Nathani",
    imageSrc: "https://beacontrustee.co.in/assets/images/banners/head-banner-4.jpg",
    imageAlt: "Beacon securitization scale",
    description:
      "Beacon processes over USD 3B in securitized pools monthly across DA, PTC, and SDI.",
  },
] as const;

export const bricknetWorkSteps = [
  {
    number: "01",
    title: "Mandate and Onboarding",
    description:
      "Align on issuer needs, structure, and trustee appointment to set a clear governance path.",
  },
  {
    number: "02",
    title: "Documentation and Security",
    description:
      "Coordinate documentation, security creation, and escrow frameworks to safeguard stakeholders.",
  },
  {
    number: "03",
    title: "Monitoring and Reporting",
    description:
      "Ongoing monitoring, compliance reporting, and investor communication through the lifecycle.",
  },
] as const;

export const bricknetTestimonials = [
  {
    quote: "\"Outstanding work in the REC bond issuance.\"",
    body:
      "Beacon's commitment to efficiency and compliance was instrumental to a smooth issuance.",
    name: "Sumit Mehra",
    role: "Chief Manager (Finance), REC Limited",
  },
  {
    quote: "\"Bond issuances for PFC were smooth and seamless.\"",
    body:
      "The team delivered dependable coordination and support throughout the process.",
    name: "Vishna Ram Jakhar",
    role: "Chief Manager (Finance), Power Finance Corporation",
  },
  {
    quote: "\"Beacon ensured our NTPC issuances ran smoothly.\"",
    body:
      "Their attention to compliance and responsiveness made the entire exercise seamless.",
    name: "Anita Srivastava",
    role: "Additional General Manager (Finance), NTPC Limited",
  },
  {
    quote: "\"Exceptional services for U.P. Power Corporation.\"",
    body:
      "Professionalism, compliance, and responsiveness exceeded expectations across the issuance.",
    name: "Neeraj Chaurasia",
    role: "Dy General Manager (Finance), U.P. Power Corporation",
  },
  {
    quote: "\"A trusted partner for Andhra Pradesh State Beverages Corporation.\"",
    body:
      "Expertise and dedication played a pivotal role in the success of the issuance.",
    name: "Andhra Pradesh State Beverages Corp.",
    role: "Issuer",
  },
] as const;

export const bricknetPricingPlans = [
  {
    name: "SEBI Regulated Services",
    price: "Core Trustee Mandates",
    sublabel: "Coverage",
    cta: "Explore Services",
    href: "/services",
    features: [
      "Debenture Trustee",
      "Security Trustee",
      "Escrow Agent",
      "Securitization (DA / PTC / SDI)",
    ],
  },
  {
    name: "Other Regulated Services",
    price: "Structured Oversight",
    sublabel: "Coverage",
    cta: "Explore Services",
    href: "/other-regulated-services",
    features: [
      "Facility Agent",
      "Safe Keeping Agent",
      "Deposit Trustee",
      "REIT & InvIT",
    ],
  },
  {
    name: "Unregulated Services",
    price: "Specialized Support",
    sublabel: "Coverage",
    cta: "Explore Services",
    href: "/unregulated-services",
    features: [
      "Share Pledge Trustee",
      "ESOP Trustee",
      "Employee Welfare Trust",
      "Advisory Services",
    ],
  },
] as const;

export const bricknetBlogPosts = [
  {
    category: "Research Report",
    date: "December 01, 2023",
    title: "Report on AIF - Part I",
    author: "Beacon Research",
    readingTime: "PDF download",
    imageSrc:
      "https://beacontrustee.co.in/cms/documents/png/report_on_aif_-_part_1_20231201154110_1697.jpg",
    imageAlt: "Report on AIF cover",
    href: "https://beacontrustee.co.in/cms/documents/pdf/report_on_aif_part_1_final_20231201154110_5883.pdf",
  },
  {
    category: "Research Report",
    date: "December 01, 2023",
    title: "Report on Securitization",
    author: "Beacon Research",
    readingTime: "PDF download",
    href: "https://beacontrustee.co.in/cms/documents/pdf/secu_1_20231201153658_8535.pdf",
  },
  {
    category: "Regulatory Update",
    date: "January 12, 2026",
    title: "Simplification of requirements for accreditation to investors",
    author: "Beacon Research",
    readingTime: "PDF download",
    href:
      "https://beacontrustee.co.in/cms/documents/pdf/simplification_of_requirements_for_grant_of_accreditation_to_investors_20260112183332_2301.pdf",
  },
] as const;

// Team member types and data
export type TeamMemberCategory = "advisory" | "directors" | "management";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  category: TeamMemberCategory;
  image: string;
  bio: string;
  highlights?: string[];
};

export const bricknetTeamCategories = [
  { id: "advisory" as const, label: "Advisory Board", description: "Strategic guidance from industry veterans" },
  { id: "directors" as const, label: "Board of Directors", description: "Governance and leadership oversight" },
  { id: "management" as const, label: "Management Team", description: "Operational excellence and execution" },
] as const;

export const bricknetTeamMembers: TeamMember[] = [
  // Advisory Board
  {
    id: "surinder-singh-kohli",
    name: "Surinder Singh Kohli",
    role: "Mentor & Advisor",
    category: "advisory",
    image: "https://beacontrustee.co.in/assets/images/surinder_singh.png",
    bio: "Mr. Kohli, a Bachelor in Mechanical Engineering from Banaras Hindu University and a Diploma holder in Industrial Finance from Indian Institute of Bankers (CAIIB) has had a 30+ years stint in the Financial Services Industry and has held crucial positions in India's marquee establishments.",
    highlights: [
      "Ex-CMD IIFCL",
      "Ex-CMD Punjab National Bank",
      "Chairman, PNB Gilts Ltd",
      "Director at SIDBI, ECGC"
    ],
  },
  {
    id: "satish-kalani",
    name: "Satish Kalani",
    role: "Mentor & Advisor",
    category: "advisory",
    image: "https://beacontrustee.co.in/assets/images/Satish Kalani.png",
    bio: "In a career spanning 35 years, Mr. Kalani has worked with reputed companies like Dawn Mills, Elphinstone Mills, Reliance Industries, Ambalal Sarabhai Enterprises and Tata Chemicals. His last stint was with Tata Chemicals as VP-Taxation where he developed impeccable knowledge in corporate taxation.",
    highlights: [
      "35+ years experience",
      "Ex-VP Taxation, Tata Chemicals",
      "Corporate taxation expertise",
      "Reliance Industries alumnus"
    ],
  },

  // Board of Directors
  {
    id: "pratapsingh-nathani",
    name: "Pratapsingh Nathani",
    role: "Chairman & Managing Director",
    category: "directors",
    image: "https://beacontrustee.co.in/assets/images/Pratapsingh Nathani.png",
    bio: "With over two decades long stint in the Financial Services sector, Mr. Nathani has mapped the entire financial market's landscape during his successful stint beginning from Apple Finance, raising debt for Government Institutions via Non-SLR bonds at Centrum & Darashaw, setting up Loan Syndication franchise for JM Morgan Stanley, and running Loan Syndications & Debt Capital Markets at ING Vysya Bank.",
    highlights: [
      "20+ years in Financial Services",
      "JM Morgan Stanley alumnus",
      "ING Vysya Bank leadership",
      "Debt Capital Markets expert"
    ],
  },
  {
    id: "jaydeep-bhattacharya",
    name: "Jaydeep Bhattacharya",
    role: "Director",
    category: "directors",
    image: "https://beacontrustee.co.in/assets/images/management_cropped/jaydeep.png",
    bio: "Having worked for around two decades in the trusteeship industry, Mr. Jaydeep Bhattacharya has gained opulent experience in various facets of the trustee services along with business management verticals like Finance & Accounts, Audit & Taxation, Information Technology, Operations, Statutory & Compliance Reporting.",
    highlights: [
      "20 years trusteeship expertise",
      "IDBI Trusteeship founder member",
      "Axis Trustee Services alumnus",
      "Strategy & execution specialist"
    ],
  },
  {
    id: "mahesh-ghadi",
    name: "Mahesh Ghadi",
    role: "Additional Director",
    category: "directors",
    image: "https://beacontrustee.co.in/assets/images/management_cropped/mahesh.png",
    bio: "With a plethora of knowledge of the capital market domain, Mr. Mahesh Ghadi has been involved in managing global funds set up, operations, compliance and legal for the last six years. He comes with prior experience on the complexities of multi country fund operations.",
    highlights: [
      "Chartered Financial Analyst",
      "Master's in Finance",
      "Global fund operations expert",
      "JM Financial Mutual Fund alumnus"
    ],
  },
  {
    id: "sanjay-bhasin",
    name: "Sanjay Bhasin",
    role: "Non-Executive Director",
    category: "directors",
    image: "https://beacontrustee.co.in/assets/images/management_cropped/sanjay_bhasin.png",
    bio: "With more than three decades in Financial Services with a penchant for diverse businesses in unfamiliar territories, Mr. Bhasin is an experienced leader who has run large and complex businesses in India, UK and West Africa. He has managed varied asset classes as well as those domiciled in US and Europe.",
    highlights: [
      "30+ years in Financial Services",
      "JM Morgan Stanley Fixed Income",
      "WestLB 'Bad Bank' leadership",
      "Multi-geography expertise"
    ],
  },
  {
    id: "sanjay-sinha",
    name: "Sanjay Sinha",
    role: "Independent Director",
    category: "directors",
    image: "https://beacontrustee.co.in/assets/images/management_cropped/sanjay-sinha.png",
    bio: "Mr. Sinha, a veteran finance professional with a rich experience of over 3 decades in areas such as corporate finance, portfolio management, strategic planning. He is actively involved in various regulatory and government committees contributing towards overall market development and policy matters.",
    highlights: [
      "Ex-MD & CEO, Axis Trustee Services",
      "30+ years corporate finance",
      "Regulatory committee member",
      "State Bank of India alumnus"
    ],
  },
  {
    id: "vasan-paulraj",
    name: "Vasan Paulraj",
    role: "Independent Director",
    category: "directors",
    image: "https://beacontrustee.co.in/assets/images/vasan paulraj.png",
    bio: "With over 3 decades of experience in Investment Banking, Mr. Vasan, a Chartered Accountant by qualification, specialises in raising capital for corporates. Having worked for 18 years in Axis Capital (erstwhile Enam Securities) he rose to become Managing Director (Head of Financial Sponsors & Special Situations Finance).",
    highlights: [
      "Chartered Accountant",
      "30+ years Investment Banking",
      "Ex-MD, Axis Capital",
      "Large IPO & PE deal expertise"
    ],
  },
  {
    id: "bhoomika-gupta",
    name: "Bhoomika Gupta",
    role: "Independent Director",
    category: "directors",
    image: "https://beacontrustee.co.in/assets/images/bhoomika.png",
    bio: "Mrs. Bhoomika Gupta has experience of 15 years in the field of accountancy and office administration. She serves as an Independent Director on the Boards of Airan Ltd (listed), QuadPro ITES Ltd (listed) and INDIFRA Ltd.",
    highlights: [
      "15 years accountancy experience",
      "Multiple board directorships",
      "Listed company governance",
      "Office administration expertise"
    ],
  },

  // Management Team
  {
    id: "anil-grover",
    name: "Anil Grover",
    role: "Chief Executive Officer",
    category: "management",
    image: "https://beacontrustee.co.in/assets/images/anilgrover.png",
    bio: "A finance professional with over 3 decades of experience in BFSI. He has worked with Indian Bank, ICICI Bank, Yes Bank handling senior assignments and in the last stint was COO at Axis Trustee Services Limited. Rich experience in Corporate banking, Credit Risk, Treasury, Retail Banking, Capital Markets.",
    highlights: [
      "30+ years BFSI experience",
      "Ex-COO, Axis Trustee Services",
      "Chartered Accountant",
      "SMP from IIM Kolkata"
    ],
  },
  {
    id: "srikanth-viswatmula",
    name: "Srikanth Viswatmula",
    role: "Executive Director",
    category: "management",
    image: "https://beacontrustee.co.in/assets/images/management_cropped/shrikant.png",
    bio: "A seasoned corporate banker having spent over 25 years in NBFCs, leading Pvt Sector Banks and MNC Banks in India. His corporate banking role required him to build and develop corporate and strategic relationships across diverse industries and business segments.",
    highlights: [
      "25+ years corporate banking",
      "ICICI Bank & Axis Bank alumnus",
      "MNC Banks leadership roles",
      "MBA from Bombay University"
    ],
  },
  {
    id: "sneha-patel",
    name: "Sneha Patel",
    role: "Chief Financial Officer",
    category: "management",
    image: "https://beacontrustee.co.in/assets/images/sneha-patel.jpg",
    bio: "Qualified Chartered Accountant from ICAI started her career with Dalpat Dholria & Co in 2013 and then joined Beacon Trusteeship in Finance & Accounts. She has excelled in her field with a proven record of 11+ years into Auditing, Taxation, Financial Reporting, Corporate Finance and Accounting.",
    highlights: [
      "Chartered Accountant (ICAI)",
      "11+ years finance experience",
      "Corporate Finance specialist",
      "Financial Reporting expert"
    ],
  },
  {
    id: "veena-nautiyal",
    name: "Veena Nautiyal",
    role: "Associate Director",
    category: "management",
    image: "https://beacontrustee.co.in/assets/images/veena.png",
    bio: "Ms. Veena Nautiyal has been active in the Financial Services space for over 22 years. She has been associated with HDFC Bank, Doha Bank, HSBC Bank, FirstSource Solutions & Loan Singh amongst others. She oversees the Debenture & Security Trustee team on an ongoing basis.",
    highlights: [
      "22+ years Financial Services",
      "HDFC Bank & HSBC alumnus",
      "MBA & Six Sigma Green Belt",
      "ISO Lead Auditor certified"
    ],
  },
  {
    id: "deepavalli-vankalu",
    name: "Deepavalli Vankalu",
    role: "Senior Vice President",
    category: "management",
    image: "https://beacontrustee.co.in/assets/images/deepavali.png",
    bio: "Responsible for the Business Development vertical across the company's service offerings and clients. Over 15 years in Financial Services, she has gained extensive experience in the services industry and is a customer and people-centric leader with an innovative approach & market familiarity.",
    highlights: [
      "15+ years Financial Services",
      "Business Development lead",
      "MBA qualification",
      "Customer-centric leadership"
    ],
  },
] as const;

export const bricknetFooterColumns = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Who We Are", href: "/who-we-are" },
      { label: "Our Team", href: "/team" },
      { label: "Services", href: "/#services" },
      { label: "Research", href: "/#research" },
      { label: "Press & Media", href: "/#media" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Disclosures", href: "/disclosure" },
      { label: "Investor", href: "/investor" },
      { label: "Investor Grievance", href: "/investor_grievance" },
      { label: "SCORES", href: "https://scores.sebi.gov.in/" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "IFSCA", href: "https://ifsca.gov.in/" },
      { label: "RBI", href: "https://rbi.org.in/" },
      { label: "SEBI", href: "https://www.sebi.gov.in/" },
      { label: "BSE", href: "https://www.bseindia.com/" },
      { label: "NSE", href: "https://www.nseindia.com/" },
    ],
  },
] as const;
