import React from 'react';

export interface Trade {
  id: string;
  symbol: string;
  side: 'Buy' | 'Sell';
  size: string;
  entryTime: string;
  exitTime: string;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  status: 'active' | 'closed' | 'error';
  
  // Detailed Execution Data (For Modal)
  dealId?: string;
  closingDealId?: string;
  orderId?: string;
  positionId?: string;
  commission?: number;
  swap?: number;
  channel?: string;
  
  // Enrichment Context (PDF Page 9)
  session?: 'London' | 'New York' | 'Tokyo' | 'Overlap';
  volatility?: 'Low' | 'Medium' | 'High' | 'Extreme';
  regime?: 'Trend-Up' | 'Trend-Down' | 'Range' | 'Choppy';
  
  // Scoring (PDF Page 11)
  score?: {
    entryQuality: number; // 0-100
    riskReward: number; // 0-100
    timeAlpha: number; // 0-100
    capitalEfficiency: number; // 0-100
    technicalDelta: number; // 0-100
    total: number; // 0-100
  };
}

export interface MetricCardProps {
  title: string;
  value: string;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
}

export interface Nudge {
  id: string;
  type: 'Pattern' | 'Behavioral' | 'Temporal';
  title: string;
  message: string;
  confidence: number; // 0-1
  isNew: boolean;
}

export interface PlaybookRule {
  id: string;
  title: string;
  condition: string;
  action: string;
  status: 'Active' | 'Pinned' | 'Deprecated';
}

export interface RepairItem {
  id: string;
  issue: string; // "Missing Fees", "Unpaired Exit"
  tradeDetails: string;
  suggestedFix: string;
}