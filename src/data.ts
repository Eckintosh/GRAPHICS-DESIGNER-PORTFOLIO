import type { Work } from "./types";

export const SEED_WORKS: Work[] = [
  {
    id: "w-001",
    title: "Nova Coffee Co. — Visual Identity",
    category: "Logo",
    image:
      "https://images.pexels.com/photos/7661185/pexels-photo-7661185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    client: "Nova Coffee Co.",
    year: "2025",
    description:
      "A minimalist wordmark paired with a custom monogram for a specialty coffee roaster. The mark balances craft and modernity.",
    tags: ["Wordmark", "Monogram", "Coffee"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "w-002",
    title: "Orbit Studios — Brand System",
    category: "Branding",
    image:
      "https://images.pexels.com/photos/8490097/pexels-photo-8490097.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    client: "Orbit Studios",
    year: "2025",
    description:
      "Complete brand identity system including stationery, business cards, and brand guidelines for a creative agency.",
    tags: ["Identity", "Stationery", "Guidelines"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: "w-003",
    title: "Verdant — Annual Report Brochure",
    category: "Brochure",
    image:
      "https://images.pexels.com/photos/36823601/pexels-photo-36823601.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    client: "Verdant Sustainability",
    year: "2024",
    description:
      "A 24-page annual report with custom infographics and editorial layout, printed on recycled paper.",
    tags: ["Editorial", "Infographic", "Print"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
  },
  {
    id: "w-004",
    title: "Loom Apparel — Packaging",
    category: "Packaging",
    image:
      "https://images.pexels.com/photos/9594420/pexels-photo-9594420.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    client: "Loom Apparel",
    year: "2024",
    description:
      "Sustainable unboxing experience for a slow-fashion label. Kraft boxes with blind emboss and soy-based ink.",
    tags: ["Sustainable", "Unboxing", "Print"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
  },
  {
    id: "w-005",
    title: "Finly — Instagram Campaign",
    category: "Social Media",
    image:
      "https://images.pexels.com/photos/15226555/pexels-photo-15226555.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    client: "Finly Fintech",
    year: "2025",
    description:
      "A 30-day content system of templates, motion stickers and carousel designs for a fintech app launch.",
    tags: ["Instagram", "Carousel", "Templates"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: "w-006",
    title: "Echo Festival — Event Poster",
    category: "Poster",
    image:
      "https://images.pexels.com/photos/33289718/pexels-photo-33289718.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    client: "Echo Music Festival",
    year: "2024",
    description:
      "A typographic poster series for a three-day indie music festival, screen-printed in a limited run of 200.",
    tags: ["Typography", "Screenprint", "Event"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 60,
  },
  {
    id: "w-007",
    title: "Atlas & Oak — Logomark",
    category: "Logo",
    image:
      "https://images.pexels.com/photos/7661590/pexels-photo-7661590.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    client: "Atlas & Oak",
    year: "2024",
    description:
      "Hand-drawn logomark for a heritage furniture workshop. Evokes craftsmanship and natural materials.",
    tags: ["Hand-drawn", "Heritage", "Furniture"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 45,
  },
  {
    id: "w-008",
    title: "Bloom Cosmetics — Packaging",
    category: "Packaging",
    image:
      "https://images.pexels.com/photos/17260157/pexels-photo-17260157.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    client: "Bloom Cosmetics",
    year: "2025",
    description:
      "Pastel-toned packaging system for a clean beauty line. Foil stamping and soft-touch lamination.",
    tags: ["Beauty", "Foil", "Premium"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 15,
  },
  {
    id: "w-009",
    title: "Harbor Hotel — Identity Suite",
    category: "Branding",
    image:
      "https://images.pexels.com/photos/5706015/pexels-photo-5706015.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    client: "Harbor Boutique Hotel",
    year: "2023",
    description:
      "Full identity for a coastal boutique hotel — from key cards and room directories to signage.",
    tags: ["Hospitality", "Signage", "Identity"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 120,
  },
  {
    id: "w-010",
    title: "Vintage Italy — Poster Series",
    category: "Poster",
    image:
      "https://images.pexels.com/photos/3091203/pexels-photo-3091203.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    client: "Personal Project",
    year: "2023",
    description:
      "A personal exploration of Italian travel posters from the 1960s, reimagined with a modern palette.",
    tags: ["Retro", "Travel", "Personal"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 200,
  },
  {
    id: "w-011",
    title: "Pulse Gym — Brochure",
    category: "Brochure",
    image:
      "https://images.pexels.com/photos/7859074/pexels-photo-7859074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    client: "Pulse Fitness",
    year: "2024",
    description:
      "Tri-fold membership brochure with bold type, energetic color blocks, and clear pricing tables.",
    tags: ["Fitness", "Tri-fold", "Print"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 75,
  },
  {
    id: "w-012",
    title: "Mint Tea — Social Kit",
    category: "Social Media",
    image:
      "https://images.pexels.com/photos/12223473/pexels-photo-12223473.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    client: "Mint Tea Co.",
    year: "2025",
    description:
      "Instagram grid plan, stories templates and highlight covers for a D2C tea brand.",
    tags: ["D2C", "Stories", "Grid"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
  },
];
