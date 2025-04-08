import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  Stack,
  Collapse,
  Fade,
  IconButton,
  styled,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
  // CaseForm 的數據
  id: string;
  name: string;
  gender: 'male' | 'female' | '';
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
    otherCity: string;
    otherDistrict: string;
    detail: string;
  };
  contactPerson: {
    name: string;
    relation: string;
    otherRelation: string;
    phone: string;
    phoneAreaCode: string;
    otherPhoneAreaCode: string;
    mobile: string;
  };
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
  schoolType: 'elementary' | 'junior' | 'high' | '';
  school: string;
  schoolCity: 'taipei' | 'newTaipei' | 'other';
  schoolDistrict: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  
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

// 自定義按鈕樣式
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  padding: '12px 24px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  minWidth: '240px',
  height: '56px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: '#fff',
  color: theme.palette.text.primary,
  border: '1px solid #e0e0e0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  '&:hover': {
    backgroundColor: '#f5f5f5',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  '&.active': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    borderColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '& .step-number': {
      backgroundColor: '#fff',
      color: theme.palette.primary.main,
    },
    '& .arrow-icon': {
      color: '#fff',
    },
  },
}));

// 編號圓圈樣式
const StepNumber = styled('span')(({ theme }) => ({
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  flexShrink: 0,
}));

// 導航按鈕樣式
const NavButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  width: '40px',
  height: '40px',
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
  zIndex: 1,
}));

const StepperForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const stepperRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    // CaseForm 初始值
    id: '',
    name: '',
    gender: '',
    birthDate: new Date().toISOString().split('T')[0],
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    idNumber: '',
    phone: '',
    email: '',
    address: {
      city: 'taipei',
      district: '',
      otherCity: '',
      otherDistrict: '',
      detail: ''
    },
    contactPerson: {
      name: '',
      relation: 'father',
      otherRelation: '',
      phone: '',
      phoneAreaCode: '02',
      otherPhoneAreaCode: '',
      mobile: ''
    },
    specialStatus: {
      none: true,
      lowIncome: false,
      lowIncomeCardNumber: '',
      middleLowIncome: false,
      nearPoverty: false,
      majorIllness: false,
      majorIllnessDescription: '',
      disability: false,
      icfCode: '',
      indigenous: false,
      indigenousType: '',
      other: ''
    },
    schoolType: '',
    school: '',
    schoolCity: 'taipei',
    schoolDistrict: '',
    createdAt: '',
    updatedAt: '',
    avatar: '',

    // 其他步驟的初始值
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showNavButtons, setShowNavButtons] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  // 監聽 activeStep 變化，自動滾動到當前步驟
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const buttons = container.children;
      if (buttons[activeStep]) {
        const buttonElement = buttons[activeStep] as HTMLElement;
        const containerWidth = container.clientWidth;
        const buttonWidth = buttonElement.offsetWidth;
        const scrollLeft = buttonElement.offsetLeft;
        
        // 計算目標滾動位置，使當前按鈕居中
        const targetScroll = scrollLeft - (containerWidth / 2) + (buttonWidth / 2);
        
        // 平滑滾動到目標位置
        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
        
        // 更新滾動位置狀態
        setScrollPosition(targetScroll);
      }
    }
  }, [activeStep]);

  // 修改 handleStepClick 函數
  const handleStepClick = (step: number) => {
    if (step <= activeStep + 1) { // 只允許點擊當前步驟和下一步
      setActiveStep(step);
    }
  };

  // 檢查是否需要顯示導航按鈕
  const checkScrollNavigation = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowNavButtons(scrollWidth > clientWidth);
    }
  };

  // 監聽容器大小變化
  useEffect(() => {
    const resizeObserver = new ResizeObserver(checkScrollNavigation);
    if (scrollContainerRef.current) {
      resizeObserver.observe(scrollContainerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  // 處理滾動
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const buttonWidth = 240; // 按鈕寬度
      const gap = 24; // 按鈕間距
      const visibleWidth = container.clientWidth;
      const totalWidth = container.scrollWidth;
      const currentScroll = container.scrollLeft;
      
      // 計算每次滾動應該顯示的按鈕數量
      const buttonsPerView = Math.floor(visibleWidth / (buttonWidth + gap));
      const scrollAmount = (buttonWidth + gap) * buttonsPerView;

      let newPosition;
      if (direction === 'left') {
        // 向左滾動時，確保至少顯示一個前面的按鈕
        newPosition = Math.max(0, currentScroll - scrollAmount + (buttonWidth + gap));
      } else {
        // 向右滾動時，確保至少顯示一個當前可見的按鈕
        newPosition = Math.min(
          totalWidth - visibleWidth,
          currentScroll + scrollAmount - (buttonWidth + gap)
        );
      }
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  // 監聽滾動位置並自動調整顯示
  const handleScrollEvent = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentScroll = container.scrollLeft;
      setScrollPosition(currentScroll);

      // 當滾動到接近邊緣時自動調整位置
      const isNearStart = currentScroll < 10;
      const isNearEnd = (container.scrollWidth - (currentScroll + container.clientWidth)) < 10;

      if (isNearStart || isNearEnd) {
        container.style.scrollBehavior = 'smooth';
      }
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScrollEvent);
      return () => scrollContainer.removeEventListener('scroll', handleScrollEvent);
    }
  }, []);

  // 根據當前步驟渲染對應的表單內容
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <CaseForm formData={formData} onFormDataChange={handleFormDataChange} />;
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
      <Box sx={{ 
        maxWidth: '100%', 
        position: 'relative',
        px: 6,
        py: 2,
      }}>
        {/* 左導航按鈕 */}
        {showNavButtons && scrollPosition > 0 && (
          <NavButton
            onClick={() => handleScroll('left')}
            sx={{ 
              left: 8,
              transition: 'all 0.3s ease',
              opacity: scrollPosition > 0 ? 1 : 0,
              '&:hover': {
                backgroundColor: theme => theme.palette.primary.light,
                color: 'white',
              },
            }}
          >
            <NavigateBeforeIcon fontSize="medium" />
          </NavButton>
        )}

        {/* 主要選單容器 */}
        <Stack 
          direction="row" 
          spacing={3} 
          ref={scrollContainerRef}
          sx={{ 
            overflowX: 'auto',
            overflowY: 'hidden',
            pb: 1,
            pt: 1,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '& > *': {
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            },
            scrollBehavior: 'smooth',
            scrollPadding: '0 24px',
          }}
        >
          {steps.map((label, index) => (
            <StyledButton
              key={label}
              className={activeStep === index ? 'active' : ''}
              onClick={() => handleStepClick(index)}
              disabled={index > activeStep + 1} // 禁用未來的步驟
              sx={{
                opacity: index <= activeStep + 1 ? 1 : 0.5, // 未來步驟顯示半透明
                transform: 'none',
                minWidth: '240px',
                flex: '0 0 auto',
                // 添加完成步驟的樣式
                ...(index < activeStep && {
                  backgroundColor: theme => theme.palette.success.light,
                  color: theme => theme.palette.success.contrastText,
                  '& .step-number': {
                    backgroundColor: theme => theme.palette.success.main,
                    color: '#fff',
                  },
                  '& .arrow-icon': {
                    color: theme => theme.palette.success.contrastText,
                  },
                }),
                // 添加下一步的提示樣式
                ...(index === activeStep + 1 && {
                  borderStyle: 'dashed',
                  borderWidth: '1.5px',
                  borderColor: theme => theme.palette.primary.main,
                }),
              }}
            >
              <StepNumber className="step-number">
                {index + 1}
              </StepNumber>
              {label}
              {index < steps.length - 1 && (
                <ArrowForwardIcon 
                  className="arrow-icon"
                  sx={{ 
                    ml: 'auto',
                    color: 'action.disabled',
                    fontSize: '1.2rem',
                  }} 
                />
              )}
            </StyledButton>
          ))}
        </Stack>

        {/* 右導航按鈕 */}
        {showNavButtons && scrollContainerRef.current && 
         scrollPosition < (scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10) && (
          <NavButton
            onClick={() => handleScroll('right')}
            sx={{ 
              right: 8,
              transition: 'all 0.3s ease',
              opacity: scrollContainerRef.current && 
                      (scrollContainerRef.current.scrollWidth - 
                       scrollContainerRef.current.clientWidth - 
                       scrollPosition) > 10 ? 1 : 0,
              '&:hover': {
                backgroundColor: theme => theme.palette.primary.light,
                color: 'white',
              },
            }}
          >
            <NavigateNextIcon fontSize="medium" />
          </NavButton>
        )}
      </Box>

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