import { Trade, RepairItem, PlaybookRule } from './types';

export const MOCK_TRADES: Trade[] = [
  {
    id: 'T-1024',
    symbol: 'GBP/USD',
    side: 'Buy',
    size: '1.5 Lots',
    entryTime: '2023-10-27 08:15:00',
    exitTime: '2023-10-27 09:30:00',
    entryPrice: 1.2145,
    exitPrice: 1.2185,
    pnl: 600,
    status: 'closed',
    session: 'London',
    volatility: 'High',
    regime: 'Trend-Up',
    dealId: 'DID274550651',
    closingDealId: 'DID270849927',
    orderId: 'OID314899801',
    positionId: 'PID6b15f03b',
    commission: -10.50,
    swap: 0,
    channel: 'cTrader 2 iOS',
    score: {
      entryQuality: 88,
      riskReward: 75,
      timeAlpha: 92,
      capitalEfficiency: 60,
      technicalDelta: 85,
      total: 80
    }
  },
  {
    id: 'T-1025',
    symbol: 'EUR/JPY',
    side: 'Sell',
    size: '1.0 Lots',
    entryTime: '2023-10-27 10:00:00',
    exitTime: '2023-10-27 11:45:00',
    entryPrice: 158.40,
    exitPrice: 158.10,
    pnl: 220,
    status: 'closed',
    session: 'London',
    volatility: 'Medium',
    regime: 'Range',
    dealId: 'DID274550652',
    closingDealId: 'DID270849928',
    orderId: 'OID314899802',
    positionId: 'PID7c26g04c',
    commission: -7.00,
    swap: -1.25,
    channel: 'Desktop',
    score: {
      entryQuality: 65,
      riskReward: 80,
      timeAlpha: 70,
      capitalEfficiency: 90,
      technicalDelta: 75,
      total: 76
    }
  },
  {
    id: 'T-1026',
    symbol: 'XAU/USD',
    side: 'Buy',
    size: '0.5 Lots',
    entryTime: '2023-10-27 14:30:00',
    exitTime: '2023-10-27 15:00:00',
    entryPrice: 1980.50,
    exitPrice: 1975.00,
    pnl: -275,
    status: 'closed',
    session: 'New York',
    volatility: 'Extreme',
    regime: 'Choppy',
    dealId: 'DID274550653',
    closingDealId: 'DID270849929',
    orderId: 'OID314899803',
    positionId: 'PID8d37h05d',
    commission: -3.50,
    swap: 0,
    channel: 'Web',
    score: {
      entryQuality: 40,
      riskReward: 30,
      timeAlpha: 95,
      capitalEfficiency: 50,
      technicalDelta: 45,
      total: 52
    }
  },
  {
    id: 'T-1027',
    symbol: 'BTC/USD',
    side: 'Buy',
    size: '0.1 BTC',
    entryTime: '2023-10-28 02:00:00',
    exitTime: '2023-10-28 06:00:00',
    entryPrice: 34500,
    exitPrice: 35100,
    pnl: 60,
    status: 'closed',
    session: 'Tokyo',
    volatility: 'Low',
    regime: 'Trend-Up',
    dealId: 'DID274550654',
    closingDealId: 'DID270849930',
    orderId: 'OID314899804',
    positionId: 'PID9e48i06e',
    commission: -5.00,
    swap: -2.00,
    channel: 'API',
    score: {
      entryQuality: 95,
      riskReward: 90,
      timeAlpha: 85,
      capitalEfficiency: 80,
      technicalDelta: 90,
      total: 88
    }
  },
   {
    id: 'T-1028',
    symbol: 'NAS100',
    side: 'Sell',
    size: '2 Contracts',
    entryTime: '2023-10-28 15:30:00',
    exitTime: '2023-10-28 16:00:00',
    entryPrice: 14500,
    exitPrice: 14450,
    pnl: 100,
    status: 'closed',
    session: 'New York',
    volatility: 'High',
    regime: 'Trend-Down',
    dealId: 'DID274550655',
    closingDealId: 'DID270849931',
    orderId: 'OID314899805',
    positionId: 'PID0f59j07f',
    commission: -4.00,
    swap: 0,
    channel: 'Mobile',
    score: {
      entryQuality: 78,
      riskReward: 60,
      timeAlpha: 88,
      capitalEfficiency: 70,
      technicalDelta: 80,
      total: 75
    }
  }
];

export const MOCK_REPAIRS: RepairItem[] = [
  {
    id: 'R-001',
    issue: 'Unpaired Exit',
    tradeDetails: 'Sell 2.0 Lots EURUSD @ 1.0540 (No entry found)',
    suggestedFix: 'Link to open position #P-992 or mark as new entry.'
  },
  {
    id: 'R-002',
    issue: 'Missing Commission',
    tradeDetails: 'Buy 10 Lots XAUUSD',
    suggestedFix: 'Apply default broker rate ($7.00/lot).'
  },
  {
    id: 'R-003',
    issue: 'Timestamp Mismatch',
    tradeDetails: 'Close time is before Open time',
    suggestedFix: 'Swap timestamps or adjust timezone offset.'
  }
];

export const MOCK_PLAYBOOK: PlaybookRule[] = [
  {
    id: 'PB-1',
    title: 'Asian Range Breakout',
    condition: 'Tokyo Session + Low Volatility Consolidation',
    action: 'Wait for 15m candle close outside range before entry.',
    status: 'Pinned'
  },
  {
    id: 'PB-2',
    title: 'NFP Avoidance',
    condition: 'Time = First Friday of Month + 8:30AM EST',
    action: 'Close all scalping positions 15 mins prior.',
    status: 'Active'
  },
  {
    id: 'PB-3',
    title: 'Mean Reversion',
    condition: 'RSI > 80 + New York Afternoon',
    action: 'Look for shorts targeting VWAP.',
    status: 'Active'
  }
];