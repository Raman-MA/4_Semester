export const Clearance = {
  Safe: 'Safe',
  Conditional: 'Conditional',
  Unsafe: 'Unsafe',
} as const;

export type Clearance = (typeof Clearance)[keyof typeof Clearance];


export const Role = {
  Radiographer: 'Radiographer',
  Administrator: 'Administrator',
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const Status = {
  inProgress: 'In Progress',
  completed: 'Completed',
  Cancelled: 'Cancelled',
  Noshow: 'No-show'
  
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export const Protocol = {
  CerebrumStd: 'Cerebrum Standard',
  CerebrumContrast: 'Cerebrum Contrast',
  Ds: 'DS',
  DsContrast: 'DS Contrast',
  DsTreatment: 'DS Treatment'
} as const;

export type Protocol = (typeof Protocol)[keyof typeof Protocol];