type BaseMaintenanceOption = {
  name: string;
  _id: string;
};

export type Office = BaseMaintenanceOption;

export type TechBucket = BaseMaintenanceOption;

export type Segment = {
  selectedTechBuckets: TechBucket[];
} & BaseMaintenanceOption;
