import type React from 'react';

export type ViewId = 
  | 'dashboard'
  | 'scanner'
  | 'positions'
  | 'ledger'
  | 'analytics'
  | 'replay'
  | 'status'
  | 'settings';

export interface NavItem {
  id: ViewId;
  label: string;
  icon: React.ElementType;
}
