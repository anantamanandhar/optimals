// ── 18 months: Jan 2024 – Jun 2025 ───────────────────────────────────────────
const det = (base, slope, amp, i) =>
  Math.max(0, Math.round(base + slope * i + amp * ((i % 3) - 1)));

const idx18 = Array.from({ length: 18 }, (_, i) => i);

export const AI_CHART_MONTHS = [
  "Jan '24", 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  "Jan '25", 'Feb', 'Mar', 'Apr', 'May', 'Jun',
];

export const AI_TABLE_MONTHS = [
  '2024-01','2024-02','2024-03','2024-04','2024-05','2024-06',
  '2024-07','2024-08','2024-09','2024-10','2024-11','2024-12',
  '2025-01','2025-02','2025-03','2025-04','2025-05','2025-06',
];

// ── YTD ───────────────────────────────────────────────────────────────────────
export const aiYtd = 10287941;

// ── Spend by Cloud (grouped bar: x = cloud, bars = subsidiaries) ──────────────
export const aiSpendByCloud = [
  { cloud: 'GCP',   YouTube: 3500000, DeepMind: 1800000, Verily: 900000, Other: 599092 },
  { cloud: 'Azure', YouTube: 800000,  DeepMind: 600000,  Verily: 0,      Other: 308021 },
  { cloud: 'AWS',   YouTube: 900000,  DeepMind: 500000,  Verily: 0,      Other: 383828 },
];
export const aiCloudTotals = { GCP: 6799092, Azure: 1708021, AWS: 1783828 };

// ── Monthly by AI Service (stacked bar) ───────────────────────────────────────
const sVertexAI  = idx18.map(i => det(120000, 15000, 10000, i));
const sDocAI     = idx18.map(i => det(28000,   3500,  2200, i));
const sVisionAI  = idx18.map(i => det(18000,   2500,  1600, i));
const sAzureOAI  = idx18.map(i => det(38000,   4200,  2800, i));
const sCognitive = idx18.map(i => det(9000,    1000,   700, i));
const sBedrock   = idx18.map(i => det(42000,   4800,  3600, i));
const sSageMaker = idx18.map(i => det(9000,     480,   900, i));

export const aiMonthlyByService = AI_CHART_MONTHS.map((month, i) => ({
  month,
  'Vertex AI':       sVertexAI[i],
  'Document AI':     sDocAI[i],
  'Vision AI':       sVisionAI[i],
  'Azure OpenAI':    sAzureOAI[i],
  'Azure Cognitive': sCognitive[i],
  'Bedrock Claude':  sBedrock[i],
  'SageMaker':       sSageMaker[i],
}));

// ── Monthly by Cloud (stacked bar) ────────────────────────────────────────────
export const aiMonthlyByCloud = AI_CHART_MONTHS.map((month, i) => ({
  month,
  GCP:   sVertexAI[i] + sDocAI[i] + sVisionAI[i],
  Azure: sAzureOAI[i] + sCognitive[i],
  AWS:   sBedrock[i]  + sSageMaker[i],
}));

// ── Top AI Services (vertical bar) ────────────────────────────────────────────
export const aiTopServices = [
  { name: 'GCP Vertex AI',            cost: 4500000 },
  { name: 'Azure OpenAI',             cost: 1350000 },
  { name: 'Amazon Bedrock (Claude)',   cost: 1200000 },
  { name: 'GCP Document AI',          cost:  800000 },
  { name: 'Azure Cognitive Services', cost:  620000 },
  { name: 'Amazon SageMaker',         cost:  500000 },
  { name: 'GCP Vision AI',            cost:  480000 },
  { name: 'Azure AI Speech',          cost:  320000 },
  { name: 'Amazon Rekognition',       cost:  270000 },
  { name: 'GCP NL API',               cost:  220000 },
  { name: 'GCP Translation API',      cost:  130000 },
  { name: 'Azure Form Recognizer',    cost:  118000 },
  { name: 'AWS Comprehend',           cost:   97000 },
  { name: 'GCP Video AI',             cost:   82000 },
  { name: 'Azure Text Analytics',     cost:   64000 },
];

// ── AI Model usage by Month (stacked bar) ─────────────────────────────────────
const mGemini  = idx18.map(i => det(88000, 11500, 7500, i));
const mGPT4o   = idx18.map(i => det(34000,  3900, 2400, i));
const mClaude  = idx18.map(i => det(39000,  4700, 3300, i));
const mHaiku   = idx18.map(i => det(11000,  1100,  850, i));
const mGPT4T   = idx18.map(i => det(7500,    380,  580, i));
const mOther   = idx18.map(i => det(4800,    280,  380, i));

export const aiUsageByMonth = AI_CHART_MONTHS.map((month, i) => ({
  month,
  'Gemini 1.5 Pro':    mGemini[i],
  'GPT-4o':            mGPT4o[i],
  'Claude 3.5 Sonnet': mClaude[i],
  'Claude 3 Haiku':    mHaiku[i],
  'GPT-4 Turbo':       mGPT4T[i],
  'Other':             mOther[i],
}));

// ── Model Distribution Pie ────────────────────────────────────────────────────
export const aiModelPie = [
  { name: 'Gemini 1.5 Pro',    value: 46.2, color: '#0D9488' },
  { name: 'Claude 3.5 Sonnet', value: 22.1, color: '#7C3AED' },
  { name: 'GPT-4o',            value: 18.4, color: '#2563EB' },
  { name: 'Claude 3 Haiku',    value:  6.8, color: '#A78BFA' },
  { name: 'GPT-4 Turbo',       value:  4.3, color: '#60A5FA' },
  { name: 'Other',             value:  2.2, color: '#94A3B8' },
];

// ── AI Adoption by Subsidiary (horizontal bar) ────────────────────────────────
export const aiBySubsidiary = [
  { name: 'YouTube',       cost: 4200000 },
  { name: 'DeepMind',      cost: 2900000 },
  { name: 'Waymo',         cost: 1100000 },
  { name: 'Verily',        cost:  900000 },
  { name: 'GV',            cost:  580000 },
  { name: 'X Development', cost:  340000 },
  { name: 'Google LLC',    cost:  180000 },
  { name: 'Calico',        cost:   87941 },
];

// ── Efficiency KPIs ───────────────────────────────────────────────────────────
export const aiEfficiencyKpi = {
  costPer1MTokens: '$3.24',
  totalApiCallsM:  847,
  momGrowthPct:    8.3,
  activeUsers:     12400,
};

// ── AI Use Cases ──────────────────────────────────────────────────────────────
export const aiUseCases = [
  { subsidiary: 'YouTube',       dept: 'Content',    useCase: 'Video recommendation AI',    model: 'Gemini 1.5 Pro',    monthlyCost: 320000, status: 'Production' },
  { subsidiary: 'YouTube',       dept: 'Trust',      useCase: 'Content moderation',         model: 'Claude 3 Haiku',    monthlyCost:  85000, status: 'Production' },
  { subsidiary: 'DeepMind',      dept: 'Research',   useCase: 'Protein structure LLM',      model: 'Vertex AI Custom',  monthlyCost: 210000, status: 'Research'   },
  { subsidiary: 'Waymo',         dept: 'Autonomy',   useCase: 'Scene understanding',        model: 'Vision AI',         monthlyCost: 180000, status: 'Production' },
  { subsidiary: 'Verily',        dept: 'Clinical',   useCase: 'Medical imaging analysis',   model: 'Claude 3.5 Sonnet', monthlyCost: 140000, status: 'Pilot'      },
  { subsidiary: 'GV',            dept: 'Portfolio',  useCase: 'Due diligence assistant',    model: 'GPT-4o',            monthlyCost:  62000, status: 'Production' },
  { subsidiary: 'X Development', dept: 'Robotics',   useCase: 'Robotics task planning',     model: 'Gemini 1.5 Pro',    monthlyCost:  48000, status: 'Research'   },
  { subsidiary: 'Google LLC',    dept: 'Enterprise', useCase: 'Internal code assistant',    model: 'GPT-4 Turbo',       monthlyCost:  35000, status: 'Production' },
  { subsidiary: 'Calico',        dept: 'Biology',    useCase: 'Drug discovery AI',          model: 'Claude 3.5 Sonnet', monthlyCost:  28000, status: 'Pilot'      },
  { subsidiary: 'Chronicle',     dept: 'Security',   useCase: 'Threat detection AI',        model: 'Azure OpenAI',      monthlyCost:  22000, status: 'Production' },
];

// ── Monthly Breakdown rows ─────────────────────────────────────────────────────
export const aiBreakdownRows = [
  { id: 1,  subsidiary: 'YouTube',       cloud: 'gcp',   service: 'vertex-ai-llm',       driver: 'LLM Inference',   months: idx18.map(i => det(52460, 3200, 2000, i)) },
  { id: 2,  subsidiary: 'YouTube',       cloud: 'azure', service: 'azure-openai',         driver: 'LLM Inference',   months: idx18.map(i => det(28135, 2181, 1956, i)) },
  { id: 3,  subsidiary: 'DeepMind',      cloud: 'gcp',   service: 'vertex-ai-research',   driver: 'LLM Training',    months: idx18.map(i => det(36590, 4219, 5600, i)) },
  { id: 4,  subsidiary: 'DeepMind',      cloud: 'aws',   service: 'bedrock-claude',        driver: 'Research AI',     months: idx18.map(i => det(18201, 1375, 3000, i)) },
  { id: 5,  subsidiary: 'Verily',        cloud: 'gcp',   service: 'vertex-ai-health',      driver: 'Healthcare AI',   months: idx18.map(i => i < 3 ? null : det(9073, 1219, 2600, i)) },
  { id: 6,  subsidiary: 'Waymo',         cloud: 'gcp',   service: 'vertex-ai-vision',      driver: 'Computer Vision', months: idx18.map(i => det(21011, 2049, 1610, i)) },
  { id: 7,  subsidiary: 'GV',            cloud: 'azure', service: 'azure-openai-gv',       driver: 'Portfolio AI',    months: idx18.map(i => det(5502, 629, 916, i)) },
  { id: 8,  subsidiary: 'X Development', cloud: 'gcp',   service: 'vertex-ai-robotics',    driver: 'Robotics AI',     months: idx18.map(i => det(4503, 382, 371, i)) },
  { id: 9,  subsidiary: 'Calico',        cloud: 'aws',   service: 'bedrock-life-sci',      driver: 'Life Sciences',   months: idx18.map(i => i < 5 ? null : det(4940, 693, 614, i)) },
  { id: 10, subsidiary: 'Chronicle',     cloud: 'azure', service: 'azure-openai-soc',      driver: 'Security AI',     months: idx18.map(i => det(2225, 153, 124, i)) },
  { id: 11, subsidiary: 'Google LLC',    cloud: 'gcp',   service: 'vertex-ai-enterprise',  driver: 'Enterprise AI',   months: idx18.map(i => det(8913, 890, 1200, i)) },
  { id: 12, subsidiary: 'Google LLC',    cloud: 'aws',   service: 'sagemaker-ml',          driver: 'ML Ops',          months: idx18.map(i => det(3820, 245, 380, i)) },
  { id: 13, subsidiary: 'Mandiant',      cloud: 'azure', service: 'azure-openai-threat',   driver: 'Threat Intel',    months: idx18.map(i => det(1850, 185, 150, i)) },
  { id: 14, subsidiary: 'Wing',          cloud: 'gcp',   service: 'vertex-ai-routing',     driver: 'Route Optim.',    months: idx18.map(i => det(694, 81, 61, i)) },
  { id: 15, subsidiary: 'Fitbit',        cloud: 'gcp',   service: 'vertex-health-metrics', driver: 'Health Metrics',  months: idx18.map(i => det(891, 73, 79, i)) },
  { id: 16, subsidiary: 'YouTube',       cloud: 'aws',   service: 'bedrock-content',       driver: 'Content AI',      months: idx18.map(i => det(4200, 320, 280, i)) },
];
