export interface bomData {
  sectionIndex: number;
  bomName: string;
  materialRef: string;
  materialName: string;
  materialType: string;
  matcate: string;
  construction: string;
  purchaseConversion: string;
  supplier: string;
  technologyUOM: string;
  perchaseUOM: string;
  seriation: string;
  partNo: string;
  partName: string;
  sspUsage: string;
  customer: string;
  supplyMode: string;
  Remark: string;
  matchColor: boolean;
  color: string;
  matchSize: boolean;
  specAdjustment: string;
  ssp: string;
  MatchCountry: boolean;
  partid: string;
  UsagePercent: string;
  UsageConfirm: boolean;
  MatchUsage: boolean;
}

export interface matchData extends bomData {
  Artcle: string[];
}

export interface sysnData extends bomData {
  enter: number;
}
