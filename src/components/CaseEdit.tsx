import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Breadcrumbs,
  Avatar,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  Home,
  PhotoCamera,
  Save,
  ArrowBack,
  KeyboardArrowRight,
  KeyboardArrowLeft,
} from '@mui/icons-material';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import CaseForm from './CaseForm';
import CaregiverInfo from './CaregiverInfo';
import FamilyTreeUpload from './FamilyTreeUpload';
import FamilyStatus from './FamilyStatus';
import FamilyEconomic from './FamilyEconomic';
import FamilyMental from './FamilyMental';
import SchoolPerformance from './SchoolPerformance';
import EmotionalAssessment from './EmotionalAssessment';
import FinalAssessment from './FinalAssessment';

const CaseEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    gender: '' as '' | 'male' | 'female',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    birthDate: '',
    idNumber: '',
    email: '',
    phone: '',
    address: {
      city: 'taipei' as 'taipei' | 'newTaipei' | 'other',
      district: '',
      otherCity: '',
      otherDistrict: '',
      detail: '',
    },
    status: '進行中',
    avatar: '',
    contactPerson: {
      name: '',
      relation: '',
      otherRelation: '',
      phone: '',
      phoneAreaCode: '',
      otherPhoneAreaCode: '',
      mobile: '',
    },
    contactPhone: '',
    contactRelation: '',
    schoolType: '' as '' | 'high' | 'elementary' | 'junior',
    school: '',
    schoolCity: 'taipei' as 'taipei' | 'newTaipei' | 'other',
    schoolDistrict: '',
    schoolGrade: '',
    schoolClass: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contact: {
      primary: {
        name: '',
        relation: '父親',
        phone: '',
      },
      secondary: {
        name: '',
        relation: '',
        phone: '',
      },
    },
    specialStatus: {
      none: false,
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
      other: '',
    },
    economicStatus: {
      monthlyIncome: '',
      hasDebt: false,
    },
    scores: {
      fq: 0,
      hq: 0,
      iq: 0,
      eq: 0,
    },
    familyTree: '',
    familyStatus: {
      members: 0,
      structure: '',
    },
    familyEconomic: {
      income: '',
      expenses: '',
      assets: '',
    },
    familyMental: {
      stressLevel: 0,
      support: '',
    },
    schoolPerformance: {
      academic: '',
      behavior: '',
    },
    emotionalAssessment: {
      score: 0,
      notes: '',
    },
    finalAssessment: {
      score: 0,
      recommendations: '',
    },
  });

  useEffect(() => {
    // 模擬加載個案數據
    const mockCaseData = {
      id: '1',
      name: '張小明',
      gender: 'male' as 'male',
      birthYear: '2010',
      birthMonth: '01',
      birthDay: '15',
      birthDate: '2010-01-15',
      idNumber: 'A123456789',
      email: 'test@example.com',
      phone: '0912345678',
      address: {
        city: 'taipei' as 'taipei',
        district: '中正區',
        otherCity: '',
        otherDistrict: '',
        detail: '重慶南路一段122號',
      },
      status: '進行中',
      avatar: '',
      contactPerson: {
        name: '張大明',
        relation: '父親',
        otherRelation: '',
        phone: '0223123456',
        phoneAreaCode: '02',
        otherPhoneAreaCode: '',
        mobile: '0912345678',
      },
      contactPhone: '0912345678',
      contactRelation: '父親',
      schoolType: 'elementary' as 'elementary',
      school: '台北市立中正國小',
      schoolCity: 'taipei' as 'taipei',
      schoolDistrict: '中正區',
      schoolGrade: '三年級',
      schoolClass: '甲班',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      contact: {
        primary: {
          name: '張大明',
          relation: '父親',
          phone: '0912345678',
        },
        secondary: {
          name: '李小花',
          relation: '母親',
          phone: '0923456789',
        },
      },
      specialStatus: {
        none: false,
        lowIncome: true,
        lowIncomeCardNumber: '123456789',
        middleLowIncome: false,
        nearPoverty: false,
        majorIllness: false,
        majorIllnessDescription: '',
        disability: false,
        icfCode: '',
        indigenous: false,
        indigenousType: '',
        other: '',
      },
      economicStatus: {
        monthlyIncome: '30000',
        hasDebt: false,
      },
      scores: {
        fq: 85,
        hq: 90,
        iq: 88,
        eq: 92,
      },
      familyTree: '',
      familyStatus: {
        members: 4,
        structure: '核心家庭',
      },
      familyEconomic: {
        income: '30000',
        expenses: '20000',
        assets: '500000',
      },
      familyMental: {
        stressLevel: 3,
        support: '良好',
      },
      schoolPerformance: {
        academic: '中等',
        behavior: '良好',
      },
      emotionalAssessment: {
        score: 85,
        notes: '情緒穩定，學習態度積極',
      },
      finalAssessment: {
        score: 88,
        recommendations: '建議持續追蹤學習狀況',
      },
    };
    setFormData(mockCaseData);
  }, [id]);

  const handleFormDataChange = (newData: any) => {
    setFormData(prev => ({
      ...prev,
      ...newData,
    }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const now = new Date().toISOString();
    const updatedData = {
      ...formData,
      updatedAt: now,
    };
    // 在這裡添加保存邏輯，例如 API 調用
    console.log('保存的數據:', updatedData);
    setFormData(updatedData); // 更新表單數據以顯示新的修改時間
    // 其他保存邏輯...
    // 保存成功後返回列表頁
    navigate('/cases');
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  const steps = [
    { label: '基本資料' },
    { label: '照顧者資訊' },
    { label: '家庭樹上傳' },
    { label: '家庭狀況' },
    { label: '家庭經濟' },
    { label: '家庭心理' },
    { label: '學校表現' },
    { label: '情緒評估' },
    { label: '最終評估' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
          首頁
        </RouterLink>
        <RouterLink to="/cases" style={{ textDecoration: 'none', color: 'inherit' }}>
          個案管理
        </RouterLink>
        <Typography color="text.primary">編輯個案</Typography>
      </Breadcrumbs>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <Box>
          <Typography variant="h5">
            編輯個案：{formData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            最後修改時間：{new Date(formData.updatedAt).toLocaleString('zh-TW')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/cases')}
          >
            返回
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
          >
            保存
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ 
          p: 3, 
          display: 'flex', 
          alignItems: 'center',
          gap: 3,
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={formData.avatar}
              sx={{ width: 100, height: 100 }}
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="avatar-upload"
              type="file"
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-upload">
              <IconButton
                component="span"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'background.paper',
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
          <Box>
            <Typography variant="h6">{formData.name}</Typography>
            <Typography color="text.secondary">
              ID: {id}
            </Typography>
          </Box>
        </Box>

        <Stepper activeStep={activeStep} orientation="vertical" sx={{ mt: 3 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel 
                onClick={() => setActiveStep(index)}
                sx={{
                  '& .MuiStepLabel-label': {
                    fontSize: '1.25rem',
                    fontWeight: 700,
                  },
                  cursor: 'pointer',
                }}
              >
                {step.label}
              </StepLabel>
              <StepContent>
                {getStepContent(index)}
                <Box sx={{ mb: 2, mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mb: 1 }}
                    startIcon={<KeyboardArrowLeft />}
                  >
                    上一步
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mb: 1 }}
                    endIcon={<KeyboardArrowRight />}
                  >
                    {index === steps.length - 1 ? '完成' : '下一步'}
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </Box>
  );
};

export default CaseEdit; 