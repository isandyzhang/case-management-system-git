import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import CaseForm from './CaseForm';
import CaregiverInfo from './CaregiverInfo';
import FamilyTreeUpload from './FamilyTreeUpload';
import FamilyStatus from './FamilyStatus';
import FamilyEconomic from './FamilyEconomic';
import FamilyMental from './FamilyMental';
import SchoolPerformance from './SchoolPerformance';
import EmotionalAssessment from './EmotionalAssessment';
import FinalAssessment from './FinalAssessment';

// 步驟標題
const steps = [
  '認養人基本資料',
  '主要照顧者與服務資訊',
  '家系圖/生態圖',
  '家庭概況',
  '家庭經濟概況(FQ)',
  '家庭身心概況(HQ)',
  '個案在校成績(IQ)',
  '情緒統測表單(EQ)',
  '整體評估(4Q)與簽章'
];

interface FormData {
  // Step 1 的數據（從 CaseForm 繼承）
  name?: string;
  birthDate?: string;
  gender?: string;
  idNumber?: string;
  
  // Step 2 的數據
  caseSource: string;
  hasHelp: string;
  firstMeetingNote: string;
  serviceItems: {
    supplies: boolean;
    companionship: boolean;
    counseling: boolean;
  };
  otherServiceItems: string;
  providedResources: string;

  // Step 3 的數據
  familyTreeFile: {
    name: string;
    type: string;
    data: string;
  } | null;
  familyTreeNotes: string;

  // Step 4 的數據
  familyComposition: string;
  familyCompositionOther?: string;
  marriageStatus: string;
  livingEnvironment: string;
  parentChildInteraction: string;
  caregiverHealth: string;
  specialFamilyEvents: string;

  // Step 5 的數據
  incomeSources: {
    work: boolean;
    government: boolean;
  };
  otherIncomeSource: string;
  monthlyIncome: string;
  expenseItems: {
    rent: boolean;
    tuition: boolean;
    medical: boolean;
  };
  otherExpenseItems: string;
  hasDebt: string;
  subsidyTypes: {
    lowIncome: boolean;
    mediumLowIncome: boolean;
    governmentSubsidy: boolean;
    churchResource: boolean;
  };
  needMoreResources: string;
  resourcesNeeded?: string;

  // Step 6 的數據
  caregiverMentalState: string;
  hasCounseling: string;
  familyDisability: string;
  familySupport: string;
  caregiverStressSources: string;
  needPsychologicalSupport: string;

  // Step 7 的數據
  chineseScore: number;
  mathScore: number;
  englishScore: number;
  schoolPerformance: string;
  hasLearningDifficulty: string;
  learningDifficultyDescription?: string;
  needsTutoring: string;

  // Step 8 的數據
  eqAnswers: Record<string, number>;
  eqTotalScore?: number;

  // Step 9 的數據
  fqScore: string;
  hqScore: string;
  iqScore: string;
  eqScore: string;
  overallAssessment: string;
  socialWorkerSignature: string;
  supervisorSignature: string;
  completionTime?: string;
}

const StepperForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    // 初始化所有必要的字段
    caseSource: '',
    hasHelp: '',
    firstMeetingNote: '',
    serviceItems: {
      supplies: false,
      companionship: false,
      counseling: false,
    },
    otherServiceItems: '',
    providedResources: '',
    familyTreeFile: null,
    familyTreeNotes: '',
    familyComposition: '',
    marriageStatus: '',
    livingEnvironment: '',
    parentChildInteraction: '',
    caregiverHealth: '',
    specialFamilyEvents: '',
    incomeSources: {
      work: false,
      government: false,
    },
    otherIncomeSource: '',
    monthlyIncome: '',
    expenseItems: {
      rent: false,
      tuition: false,
      medical: false,
    },
    otherExpenseItems: '',
    hasDebt: '',
    subsidyTypes: {
      lowIncome: false,
      mediumLowIncome: false,
      governmentSubsidy: false,
      churchResource: false,
    },
    needMoreResources: '',
    caregiverMentalState: '',
    hasCounseling: '',
    familyDisability: '',
    familySupport: '',
    caregiverStressSources: '',
    needPsychologicalSupport: '',
    chineseScore: 0,
    mathScore: 0,
    englishScore: 0,
    schoolPerformance: '',
    hasLearningDifficulty: '',
    needsTutoring: '',
    eqAnswers: {},
    fqScore: '',
    hqScore: '',
    iqScore: '',
    eqScore: '',
    overallAssessment: '',
    socialWorkerSignature: '',
    supervisorSignature: '',
  });
  const [isDraft, setIsDraft] = useState(false);

  // 處理表單數據更新
  const handleFormDataChange = (newData: Partial<FormData>) => {
    setFormData(prevData => ({
      ...prevData,
      ...newData,
    }));
  };

  // 處理下一步
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // 處理上一步
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // 處理儲存草稿
  const handleSaveDraft = () => {
    setIsDraft(true);
    // TODO: 實現草稿儲存邏輯
    console.log('儲存草稿:', formData);
  };

  // 處理步驟點擊
  const handleStepClick = (step: number) => {
    if (step < activeStep) {
      setActiveStep(step);
    }
  };

  // 根據當前步驟渲染對應的表單內容
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <CaseForm />;
      case 1:
        return <CaregiverInfo formData={formData} onFormDataChange={handleFormDataChange} />;
      case 2:
        return <FamilyTreeUpload formData={formData} onFormDataChange={handleFormDataChange} />;
      case 3:
        return <FamilyStatus formData={formData} onFormDataChange={handleFormDataChange} />;
      case 4:
        return <FamilyEconomic formData={formData} onFormDataChange={handleFormDataChange} />;
      case 5:
        return <FamilyMental formData={formData} onFormDataChange={handleFormDataChange} />;
      case 6:
        return <SchoolPerformance formData={formData} onFormDataChange={handleFormDataChange} />;
      case 7:
        return <EmotionalAssessment formData={formData} onFormDataChange={handleFormDataChange} />;
      case 8:
        return <FinalAssessment formData={formData} onFormDataChange={handleFormDataChange} />;
      default:
        return '未知步驟';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} onClick={() => handleStepClick(index)} sx={{ cursor: 'pointer' }}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              上一步
            </Button>
            <Box>
              <Button
                variant="contained"
                onClick={handleSaveDraft}
                sx={{ mr: 1 }}
              >
                儲存草稿
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
              >
                下一步
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default StepperForm; 