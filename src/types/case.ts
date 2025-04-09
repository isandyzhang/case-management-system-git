export interface ICase {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  birthDate: string | Date;
  contactPerson: {
    name: string;
    relationship: string;
    otherRelation?: string;
    phoneAreaCode: string;
    otherPhoneAreaCode?: string;
    phone: string;
    mobile: string;
    email: string;
  };
  specialStatus: {
    isLowIncome: boolean;
    isSingleParent: boolean;
    isNewImmigrant: boolean;
    isIndigenous: boolean;
    isDisability: boolean;
    other: string;
  };
  economicStatus: {
    monthlyIncome: number;
    hasDebt: boolean;
    debtAmount: number;
    debtReason: string;
  };
  scores: {
    family: number;
    school: number;
    social: number;
    total: number;
  };
  familyStatus: {
    parents: {
      father: {
        name: string;
        age: number;
        occupation: string;
        education: string;
        health: string;
      };
      mother: {
        name: string;
        age: number;
        occupation: string;
        education: string;
        health: string;
      };
    };
    siblings: Array<{
      name: string;
      age: number;
      relationship: string;
      school: string;
    }>;
    livingWith: string;
    familyTreeUrl: string;
  };
  schoolInfo: {
    name: string;
    grade: string;
    class: string;
    teacher: string;
    performance: {
      academic: string;
      behavior: string;
      attendance: string;
    };
  };
  mentalAssessment: {
    anxiety: number;
    depression: number;
    stress: number;
    selfEsteem: number;
    socialSupport: number;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
  createdBy: string;
  updatedBy: string;
  status: 'active' | 'inactive' | 'archived';
}

export interface ICaseFormData {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  birthDate: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  idNumber: string;
  phone: string;
  email: string;
  address: {
    city: 'taipei' | 'newTaipei' | 'other';
    district: string;
    otherCity?: string;
    otherDistrict?: string;
    detail: string;
  };
  contactPerson: {
    name: string;
    relationship: string;
    otherRelation?: string;
    phoneAreaCode: string;
    otherPhoneAreaCode?: string;
    phone: string;
    mobile: string;
    email: string;
  };
  specialStatus: {
    isLowIncome: boolean;
    isSingleParent: boolean;
    isNewImmigrant: boolean;
    isIndigenous: boolean;
    isDisability: boolean;
    other: string;
  };
  economicStatus: {
    monthlyIncome: number;
    hasDebt: boolean;
    debtAmount: number;
    debtReason: string;
  };
  scores: {
    family: number;
    school: number;
    social: number;
    total: number;
  };
  familyStatus: {
    parents: {
      father: {
        name: string;
        age: number;
        occupation: string;
        education: string;
        health: string;
      };
      mother: {
        name: string;
        age: number;
        occupation: string;
        education: string;
        health: string;
      };
    };
    siblings: Array<{
      name: string;
      age: number;
      relationship: string;
      school: string;
    }>;
    livingWith: string;
    familyTreeUrl: string;
  };
  schoolInfo: {
    name: string;
    grade: string;
    class: string;
    teacher: string;
    performance: {
      academic: string;
      behavior: string;
      attendance: string;
    };
  };
  mentalAssessment: {
    anxiety: number;
    depression: number;
    stress: number;
    selfEsteem: number;
    socialSupport: number;
  };
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'archived';
  schoolCity: 'taipei' | 'newTaipei' | 'other';
  schoolDistrict: string;
  schoolType: 'elementary' | 'junior' | 'high' | '';
  school: string;
  avatar?: string;
}

export interface ICaseResponse {
  success: boolean;
  data?: ICase;
  error?: string;
} 