export interface ContentMetadata {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  summary: string;
  category: string;
  theme: 'economics' | 'climate' | 'security' | 'technology';
  region: string;
  type: 'Paper' | 'Brief' | 'Report';
  author: string;
  date: string;
  createdAt: string;
  dataSources: string[];
  methodology: string;
  tags: string[];
}

export const publications: ContentMetadata[] = [
  {
    id: "pub-001",
    title: "Structural Transformation of the Berbera Corridor",
    slug: "berbera-corridor",
    abstract: "An analysis of infrastructure development and its impact on regional trade dynamics in the Horn of Africa.",
    summary: "This report provides a comprehensive analysis of the DP World Berbera Port expansion. It evaluates the shift in regional trade dependencies, assessing how improved hinterland connectivity could reshape the Horn of Africa's economic landscape over the next decade.",
    category: "Development Economics",
    theme: "economics",
    region: "Somaliland / Ethiopia",
    type: "Report",
    author: "Dr. Ahmed Jama",
    date: "May 2026",
    createdAt: "2026-05-01",
    dataSources: ["DP World Statistics", "Somaliland Port Authority", "Customs Data"],
    methodology: "Econometric forecasting using time-series customs data and supply chain optimization models.",
    tags: ["Trade", "Infrastructure", "Geopolitics", "economics"]
  },
  {
    id: "pub-002",
    title: "Somaliland Economic Outlook: Q2 2026",
    slug: "economic-outlook-q2",
    abstract: "Quarterly review of inflation rates, currency stability, and livestock export performance.",
    summary: "The Q2 2026 outlook indicates a stabilization in the Somaliland Shilling following aggressive Central Bank interventions. However, vulnerability remains high due to delayed seasonal rains affecting livestock export volumes.",
    category: "Macroeconomics",
    theme: "economics",
    region: "Somaliland",
    type: "Brief",
    author: "Fardosa Ali",
    date: "April 2026",
    createdAt: "2026-04-15",
    dataSources: ["Central Bank of Somaliland", "Livestock Bureau"],
    methodology: "Macroeconomic trend analysis using aggregated central bank monetary indicators.",
    tags: ["Economy", "Inflation", "Livestock", "economics"]
  },
  {
    id: "pub-003",
    title: "Drought Resilience in Eastern Regions",
    slug: "drought-resilience",
    abstract: "Evidence-based strategies for improving water security and livestock preservation in drought-prone areas.",
    summary: "Analyzing the effectiveness of recent water-catchment projects in Togdheer and Sool. The paper suggests that predictive early-warning systems, coupled with strategic fodder banks, can reduce livestock mortality by up to 40% during severe droughts.",
    category: "Climate & Security",
    theme: "climate",
    region: "Eastern Somaliland",
    type: "Paper",
    author: "Saeed Hirsi",
    date: "March 2026",
    createdAt: "2026-03-20",
    dataSources: ["CHIRPS Satellite Data", "Ministry of Agriculture", "IPC Phase Classifications"],
    methodology: "Geospatial analysis combining CHIRPS precipitation data with localized household vulnerability surveys.",
    tags: ["Climate", "drought", "food-security", "Water Security"]
  },
  {
    id: "pub-004",
    title: "Digital Financial Inclusion in Rural Communities",
    slug: "digital-inclusion",
    abstract: "Assessing the penetration of mobile money services in nomadic populations and its social impact.",
    summary: "Mobile money adoption among nomadic populations has reached 85%. This paper explores how this digital infrastructure acts as a critical shock-absorber during crises, enabling rapid remittance flows and peer-to-peer support systems.",
    category: "Technology",
    theme: "technology",
    region: "Horn of Africa",
    type: "Paper",
    author: "Amal Warsame",
    date: "February 2026",
    createdAt: "2026-02-10",
    dataSources: ["Telecom Operators Survey", "World Bank Digital Report"],
    methodology: "Stratified random sampling of nomadic households combined with aggregated telecom transaction data.",
    tags: ["Fintech", "Inclusion", "Nomadic Studies"]
  }
];
