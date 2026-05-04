export interface Publication {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  author: string;
  link: string;
  type: "Brief" | "Paper" | "Report";
}

export const publications: Publication[] = [
  {
    id: "1",
    title: "Structural Transformation of the Berbera Corridor",
    summary: "An analysis of infrastructure development and its impact on regional trade dynamics in the Horn of Africa.",
    category: "Development Economics",
    date: "May 2026",
    author: "Dr. Ahmed Jama",
    link: "/publications/berbera-corridor",
    type: "Report"
  },
  {
    id: "2",
    title: "Somaliland Economic Outlook: Q2 2026",
    summary: "Quarterly review of inflation rates, currency stability, and livestock export performance.",
    category: "Macroeconomics",
    date: "April 2026",
    author: "Fardosa Ali",
    link: "/publications/economic-outlook-q2",
    type: "Brief"
  },
  {
    id: "3",
    title: "Drought Resilience in Eastern Regions",
    summary: "Evidence-based strategies for improving water security and livestock preservation in drought-prone areas.",
    category: "Climate & Security",
    date: "March 2026",
    author: "Saeed Hirsi",
    link: "/publications/drought-resilience",
    type: "Paper"
  },
  {
    id: "4",
    title: "Digital Financial Inclusion in Rural Communities",
    summary: "Assessing the penetration of mobile money services in nomadic populations and its social impact.",
    category: "Technology",
    date: "February 2026",
    author: "Amal Warsame",
    link: "/publications/digital-inclusion",
    type: "Paper"
  }
];
