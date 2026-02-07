import { WeeklyData, IntentData, PricingTier } from '../types';

export const WEEKLY_DATA: WeeklyData[] = [
    { name: 'Week 1', value: 84 },
    { name: 'Week 2', value: 112 },
    { name: 'Week 3', value: 98 },
    { name: 'Current', value: 156, isCurrent: true },
];

export const INTENT_DATA: IntentData[] = [
    { name: 'Positive Intent', value: 70, fill: '#00f0ff' }, // Neon Cyan
    { name: 'Info Seeking', value: 15, fill: '#7000ff' }, // Neon Purple
    { name: 'Unqualified', value: 15, fill: '#3f3f46' }, // Dark Gray
];

export const PRICING_TIERS: PricingTier[] = [
    {
        id: 'starter',
        name: 'Starter Build',
        price: 45000,
        features: [
            'Centralized n8n Brain Architecture',
            '3-Source Airtable Ingestion',
            'Real-time Slack/Discord Alerts',
            'Basic Lead Validation',
            'Manual Trigger Workflows'
        ]
    },
    {
        id: 'pro',
        name: 'Medium Pro Build',
        price: 550000,
        recommended: true,
        features: [
            'Everything in Starter',
            'BookedOS (Gemini Pro AI Sentiment)',
            'ClientFlow (Autonomous Onboarding)',
            'Full BI Command Center Suite',
            'CRM Bi-directional Sync',
            'Priority Support SLA'
        ]
    }
];

export const WEBHOOK_URL = "https://httpbin.org/post"; // Echo service for testing
