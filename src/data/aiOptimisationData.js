// ── KPI Summary ───────────────────────────────────────────────────────────────
export const aiOptKpi = {
  potentialAnnualSavings: 3531600,
  opportunitiesFound:     20,
  quickWins:              12,  // Low-effort opportunities
  implementationCost:     285000,
  estimatedRoi:           1139, // %
};

// ── Savings by Category ───────────────────────────────────────────────────────
export const savingsByCategory = [
  { category: 'Model Right-sizing', savings: 1011600, color: '#1E3A5F' },
  { category: 'Batch Processing',   savings:  756000, color: '#2563EB' },
  { category: 'Response Caching',   savings:  518400, color: '#0D9488' },
  { category: 'Idle Services',      savings:  492000, color: '#DC2626' },
  { category: 'Token Optimization', savings:  321600, color: '#F59E0B' },
  { category: 'Reserved Capacity',  savings:  232800, color: '#7C3AED' },
  { category: 'Cross-subsidiary',   savings:  199200, color: '#EC4899' },
];

// ── Optimization Opportunities (20 rows) ──────────────────────────────────────
export const optimizationOpps = [
  { id: 1,  priority: 'High',   category: 'Model Right-sizing', desc: 'Replace Claude 3.5 Sonnet with Claude 3 Haiku for batch classification tasks',      subsidiary: 'YouTube',       monthlySavings: 45000, annualSavings: 540000, effort: 'Low',    status: 'Open',        complexity: 'Low' },
  { id: 2,  priority: 'High',   category: 'Batch Processing',   desc: 'Convert real-time recommendation engine inference to async batch processing',       subsidiary: 'YouTube',       monthlySavings: 38500, annualSavings: 462000, effort: 'Medium', status: 'In Progress', complexity: 'Medium' },
  { id: 3,  priority: 'High',   category: 'Response Caching',   desc: 'Implement semantic caching layer for repeated DeepMind research LLM queries',      subsidiary: 'DeepMind',      monthlySavings: 32000, annualSavings: 384000, effort: 'Low',    status: 'Open',        complexity: 'Low' },
  { id: 4,  priority: 'High',   category: 'Idle Services',      desc: 'Decommission 3 idle Vertex AI prediction endpoints in production namespace',        subsidiary: 'Verily',        monthlySavings: 28000, annualSavings: 336000, effort: 'Low',    status: 'Open',        complexity: 'Low' },
  { id: 5,  priority: 'High',   category: 'Model Right-sizing', desc: 'Swap Gemini 1.5 Pro → Gemini 1.5 Flash for route summary text generation',         subsidiary: 'Waymo',         monthlySavings: 22500, annualSavings: 270000, effort: 'Low',    status: 'Open',        complexity: 'Low' },
  { id: 6,  priority: 'Medium', category: 'Batch Processing',   desc: 'Run portfolio due-diligence analysis as overnight batch job instead of real-time',  subsidiary: 'GV',            monthlySavings: 18000, annualSavings: 216000, effort: 'Medium', status: 'Open',        complexity: 'Medium' },
  { id: 7,  priority: 'Medium', category: 'Token Optimization', desc: 'Reduce average prompt length by 40% for Chronicle security threat scanning calls',  subsidiary: 'Chronicle',     monthlySavings: 15500, annualSavings: 186000, effort: 'Medium', status: 'In Progress', complexity: 'Low' },
  { id: 8,  priority: 'Medium', category: 'Reserved Capacity',  desc: 'Switch to Azure OpenAI PTU provisioned throughput (12-month commitment)',           subsidiary: 'Multiple',      monthlySavings: 14200, annualSavings: 170400, effort: 'Low',    status: 'Open',        complexity: 'Low' },
  { id: 9,  priority: 'Medium', category: 'Cross-subsidiary',   desc: 'Consolidate YouTube and DeepMind Vertex AI org billing under single commitment',    subsidiary: 'Multiple',      monthlySavings: 12800, annualSavings: 153600, effort: 'High',   status: 'Open',        complexity: 'High' },
  { id: 10, priority: 'Medium', category: 'Model Right-sizing', desc: 'Downgrade GPT-4 Turbo → GPT-4o mini for all non-critical summarization workloads',  subsidiary: 'X Development', monthlySavings: 11000, annualSavings: 132000, effort: 'Low',    status: 'Open',        complexity: 'Low' },
  { id: 11, priority: 'Medium', category: 'Idle Services',      desc: 'Remove inactive Fitbit health metrics AI inference endpoint running 24/7',          subsidiary: 'Fitbit',        monthlySavings:  9800, annualSavings: 117600, effort: 'Low',    status: 'Open',        complexity: 'Low' },
  { id: 12, priority: 'Medium', category: 'Response Caching',   desc: 'Enable Amazon Bedrock prompt caching for Calico life-sciences query patterns',      subsidiary: 'Calico',        monthlySavings:  8400, annualSavings: 100800, effort: 'Low',    status: 'Open',        complexity: 'Low' },
  { id: 13, priority: 'Medium', category: 'Token Optimization', desc: 'Dynamic context window truncation for Wing routing-optimisation prompt templates',  subsidiary: 'Wing',          monthlySavings:  7200, annualSavings:  86400, effort: 'Medium', status: 'Open',        complexity: 'Medium' },
  { id: 14, priority: 'Low',    category: 'Batch Processing',   desc: 'Aggregate hourly threat-intel queries into single nightly batch API call',          subsidiary: 'Mandiant',      monthlySavings:  6500, annualSavings:  78000, effort: 'Medium', status: 'Open',        complexity: 'Low' },
  { id: 15, priority: 'Low',    category: 'Model Right-sizing', desc: 'Downgrade Document AI processing tier for non-priority file classification',        subsidiary: 'Google LLC',    monthlySavings:  5800, annualSavings:  69600, effort: 'Low',    status: 'Deferred',    complexity: 'Low' },
  { id: 16, priority: 'Low',    category: 'Reserved Capacity',  desc: 'Purchase GCP committed use discounts for Vision AI steady-state workloads',         subsidiary: 'Verily',        monthlySavings:  5200, annualSavings:  62400, effort: 'Low',    status: 'Open',        complexity: 'Low' },
  { id: 17, priority: 'Low',    category: 'Token Optimization', desc: 'Integrate LLMLingua prompt compression for Looker BI natural-language queries',     subsidiary: 'Looker',        monthlySavings:  4100, annualSavings:  49200, effort: 'Medium', status: 'Open',        complexity: 'Medium' },
  { id: 18, priority: 'Low',    category: 'Cross-subsidiary',   desc: 'Shared Adobe AI API gateway to consolidate per-call overhead across subsidiaries',  subsidiary: 'Multiple',      monthlySavings:  3800, annualSavings:  45600, effort: 'High',   status: 'Deferred',    complexity: 'High' },
  { id: 19, priority: 'Low',    category: 'Idle Services',      desc: 'Archive outdated Waymo simulation model versions consuming active storage costs',   subsidiary: 'Waymo',         monthlySavings:  3200, annualSavings:  38400, effort: 'Low',    status: 'Open',        complexity: 'Low' },
  { id: 20, priority: 'Low',    category: 'Response Caching',   desc: 'Add CDN-layer caching for AppSheet AI automation API repetitive response patterns', subsidiary: 'AppSheet',      monthlySavings:  2800, annualSavings:  33600, effort: 'Low',    status: 'Open',        complexity: 'Low' },
];

// Scatter data (x = effort numeric, y = monthly savings)
const EFFORT_NUM = { Low: 1, Medium: 2, High: 3 };
const PRIORITY_COLOR = { High: '#DC2626', Medium: '#F59E0B', Low: '#6B7280' };
export const effortImpactHigh   = optimizationOpps.filter(o => o.priority === 'High').map(o => ({ x: EFFORT_NUM[o.effort], y: o.monthlySavings, id: o.id, name: o.desc }));
export const effortImpactMedium = optimizationOpps.filter(o => o.priority === 'Medium').map(o => ({ x: EFFORT_NUM[o.effort], y: o.monthlySavings, id: o.id, name: o.desc }));
export const effortImpactLow    = optimizationOpps.filter(o => o.priority === 'Low').map(o => ({ x: EFFORT_NUM[o.effort], y: o.monthlySavings, id: o.id, name: o.desc }));

// ── Model Right-sizing ────────────────────────────────────────────────────────
export const modelRightSizing = [
  { id: 1, current: 'Claude 3.5 Sonnet', recommended: 'Claude 3 Haiku',   useCase: 'Batch classification',   subsidiary: 'YouTube',       currentCost: 95000, recommendedCost: 12000, savings: 83000 },
  { id: 2, current: 'Gemini 1.5 Pro',    recommended: 'Gemini 1.5 Flash', useCase: 'Route summary gen.',     subsidiary: 'Waymo',         currentCost: 45000, recommendedCost:  4500, savings: 40500 },
  { id: 3, current: 'GPT-4 Turbo',       recommended: 'GPT-4o mini',      useCase: 'Text summarization',     subsidiary: 'X Development', currentCost: 28000, recommendedCost:  2800, savings: 25200 },
  { id: 4, current: 'Vertex AI Pro',     recommended: 'Vertex AI Micro',  useCase: 'Document classification',subsidiary: 'Google LLC',    currentCost: 22000, recommendedCost:  4400, savings: 17600 },
  { id: 5, current: 'GPT-4o',            recommended: 'Claude 3 Haiku',   useCase: 'FAQ & intent detection', subsidiary: 'GV',            currentCost: 18000, recommendedCost:  3600, savings: 14400 },
  { id: 6, current: 'Claude 3.5 Sonnet', recommended: 'Claude 3 Haiku',   useCase: 'Drug screening triage',  subsidiary: 'Calico',        currentCost: 12000, recommendedCost:  1800, savings: 10200 },
];

// ── Idle / Underutilized Services ─────────────────────────────────────────────
export const idleServices = [
  { id: 1, service: 'vertex-endpoint-verily-0x4f',  subsidiary: 'Verily',        utilization:  3, monthlyCost: 12400, wastage: 12028, lastActive: '45 days ago', action: 'Decommission'  },
  { id: 2, service: 'bedrock-fitbit-health-metrics', subsidiary: 'Fitbit',        utilization:  8, monthlyCost:  9800, wastage:  9016, lastActive: '31 days ago', action: 'Decommission'  },
  { id: 3, service: 'azure-openai-xdev-legacy',      subsidiary: 'X Development', utilization: 12, monthlyCost:  7200, wastage:  6336, lastActive: '22 days ago', action: 'Downscale'     },
  { id: 4, service: 'vertex-vision-waymo-test',      subsidiary: 'Waymo',         utilization:  5, monthlyCost:  5800, wastage:  5510, lastActive: '67 days ago', action: 'Decommission'  },
  { id: 5, service: 'sagemaker-notebook-gllc-1',     subsidiary: 'Google LLC',    utilization:  2, monthlyCost:  4200, wastage:  4116, lastActive: '18 days ago', action: 'Stop Instance' },
  { id: 6, service: 'vertex-ai-appsheet-qa',         subsidiary: 'AppSheet',      utilization: 15, monthlyCost:  3600, wastage:  3060, lastActive: '12 days ago', action: 'Downscale'     },
];

// ── Monthly Waste Trend (12 months) ───────────────────────────────────────────
export const monthlyWasteTrend = [
  { month: 'Jan',  identified: 180000, avoided:      0 },
  { month: 'Feb',  identified: 195000, avoided:      0 },
  { month: 'Mar',  identified: 220000, avoided:  12000 },
  { month: 'Apr',  identified: 248000, avoided:  18000 },
  { month: 'May',  identified: 267000, avoided:  35000 },
  { month: 'Jun',  identified: 290000, avoided:  52000 },
  { month: 'Jul',  identified: 294000, avoided:  68000 },
  { month: 'Aug',  identified: 294000, avoided:  85000 },
  { month: 'Sep',  identified: 294000, avoided: 105000 },
  { month: 'Oct',  identified: 294000, avoided: 128000 },
  { month: 'Nov',  identified: 294000, avoided: 155000 },
  { month: 'Dec',  identified: 294000, avoided: 182000 },
];

// ── Implementation Roadmap (quarter buckets) ──────────────────────────────────
export const roadmapQuarters = [
  { quarter: 'Q1 2025', items: 7, cumulativeSavings:  294000, effort: 105000, roi: 180 },
  { quarter: 'Q2 2025', items: 6, cumulativeSavings:  840000, effort:  68000, roi: 660 },
  { quarter: 'Q3 2025', items: 4, cumulativeSavings: 1480000, effort:  72000, roi: 937 },
  { quarter: 'Q4 2025', items: 3, cumulativeSavings: 2210000, effort:  40000, roi: 961 },
];
