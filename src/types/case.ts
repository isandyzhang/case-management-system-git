export interface ICase extends ICaseFormData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  status: 'active' | 'inactive' | 'archived';
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  school: string;
  contactPerson: {
    name: string;
    phone: string;
    phoneAreaCode: string;
    otherPhoneAreaCode: string;
    mobile: string;
    relation: string;
    otherRelation: string;
  };
}

export interface ICaseFormData {
  name: string;
  gender: 'male' | 'female';
  birthDate: Date;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  idNumber: string;
  school: string;
  schoolType: 'elementary' | 'junior' | 'high' | '';
  address: {
    city: 'taipei' | 'newTaipei' | 'other';
    district: string;
    otherCity?: string;
    otherDistrict?: string;
    detail: string;
  };
  contactPerson: {
    name: string;
    phone: string;
    phoneAreaCode: string;
    otherPhoneAreaCode?: string;
    mobile: string;
    relation: string;
    otherRelation?: string;
  };
  phone: string;
  email: string;
  specialStatus: {
    none: boolean;
    lowIncome: boolean;
    lowIncomeCardNumber: string;
    middleLowIncome: boolean;
    nearPoverty: boolean;
    majorIllness: boolean;
    majorIllnessDescription: string;
    disability: boolean;
    icfCode: string;
    indigenous: boolean;
    indigenousType: string;
    other: string;
  };
  familyMembers: {
    father: boolean;
    fatherNationality?: string;
    fatherOtherNationality?: string;
    mother: boolean;
    motherNationality?: string;
    motherOtherNationality?: string;
    brothers: number;
    sisters: number;
    others: string;
  };
  familyStructure: {
    type: string;
    otherDescription: string;
  };
  residence: {
    type: string;
    otherDescription: string;
  };
  primaryCaregiver: {
    relationship: string;
    age: number;
    occupation: string;
    education: string;
  };
  caseSource: {
    source: string;
    referralSource: string;
    otherSource: string;
  };
  helpExperience: {
    hasExperience: boolean;
    description: string;
  };
  interview: {
    date: string;
    interviewer: string;
    content: string;
  };
  remarks: string;
}

export interface ICaseResponse {
  success: boolean;
  data?: ICase;
  error?: string;
} 