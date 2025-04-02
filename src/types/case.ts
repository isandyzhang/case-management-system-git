export interface ICase {
  id?: string;
  name: string;
  gender: 'male' | 'female';
  birthDate: Date | null;
  idNumber: string;
  address: string;
  phone: string;
  contactPerson: string;
  contactRelation: string;
  contactPhone: string;
  specialStatus: {
    none: boolean;
    lowIncome: boolean;
    middleLowIncome: boolean;
    nearPoverty: boolean;
    majorIllness: boolean;
  };
  icfCode: string;
  originalResidentStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICaseFormData extends Omit<ICase, 'id' | 'createdAt' | 'updatedAt'> {
  // 家庭狀況
  familyMembers: {
    father: boolean;
    mother: boolean;
    brothers: number;
    sisters: number;
    siblings: number;
    grandfather: boolean;
    grandmother: boolean;
    paternalGrandfather: boolean;
    paternalGrandmother: boolean;
    other: string;
  };
  
  // 評估資料
  assessmentData: {
    healthStatus: string;
    mentalStatus: string;
    socialSupport: string;
    economicStatus: string;
  };
  
  // 其他資訊
  additionalInfo: {
    notes: string;
    attachments: string[];
  };
}

export interface ICaseResponse {
  success: boolean;
  data?: ICase;
  error?: string;
} 