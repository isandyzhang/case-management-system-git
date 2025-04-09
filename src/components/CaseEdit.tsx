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
  Padding,
} from '@mui/icons-material';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import CaseForm from './case-form/CaseForm';
import CaregiverInfo from './case-form/CaregiverInfo';
import FamilyTreeUpload from './case-form/FamilyTreeUpload';
import FamilyStatus from './case-form/FamilyStatus';
import FamilyEconomic from './case-form/FamilyEconomic';
import FamilyMental from './case-form/FamilyMental';
import SchoolPerformance from './case-form/SchoolPerformance';
import EmotionalAssessment from './case-form/EmotionalAssessment';
import FinalAssessment from './case-form/FinalAssessment';
import { ICaseFormData } from '../types/case';

const CaseEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<ICaseFormData>({
    id: '',
    name: '',
    gender: 'male',
    birthDate: '',
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
      relationship: 'father',
      otherRelation: '',
      phoneAreaCode: '',
      otherPhoneAreaCode: '',
      phone: '',
      mobile: '',
      email: ''
    },
    specialStatus: {
      isLowIncome: false,
      isSingleParent: false,
      isNewImmigrant: false,
      isIndigenous: false,
      isDisability: false,
      other: ''
    },
    economicStatus: {
      monthlyIncome: 0,
      hasDebt: false,
      debtAmount: 0,
      debtReason: ''
    },
    scores: {
      family: 0,
      school: 0,
      social: 0,
      total: 0
    },
    familyStatus: {
      parents: {
        father: {
          name: '',
          age: 0,
          occupation: '',
          education: '',
          health: ''
        },
        mother: {
          name: '',
          age: 0,
          occupation: '',
          education: '',
          health: ''
        }
      },
      siblings: [],
      livingWith: '',
      familyTreeUrl: ''
    },
    schoolInfo: {
      name: '',
      grade: '',
      class: '',
      teacher: '',
      performance: {
        academic: '',
        behavior: '',
        attendance: ''
      }
    },
    mentalAssessment: {
      anxiety: 0,
      depression: 0,
      stress: 0,
      selfEsteem: 0,
      socialSupport: 0
    },
    createdAt: '',
    updatedAt: '',
    status: 'active',
    schoolCity: 'taipei',
    schoolDistrict: '',
    schoolType: '',
    school: '',
    avatar: ''
  });

  useEffect(() => {
    if (id) {
      // 这里应该调用 API 获取个案数据
      // 暂时使用模拟数据
      const mockCaseData: ICaseFormData = {
        id: id,
        name: '張小明',
        gender: 'male',
        birthDate: '2010-05-15',
        birthYear: '2010',
        birthMonth: '05',
        birthDay: '15',
        idNumber: 'A123456789',
        email: 'example@example.com',
        phone: '0912345678',
        address: {
          city: 'taipei',
          district: '信義區',
          otherCity: '',
          otherDistrict: '',
          detail: '信義路五段7號'
        },
        contactPerson: {
          name: '張大明',
          relationship: 'father',
          otherRelation: '',
          phoneAreaCode: '02',
          otherPhoneAreaCode: '',
          phone: '23123456',
          mobile: '0912345678',
          email: 'father@example.com'
        },
        specialStatus: {
          isLowIncome: false,
          isSingleParent: false,
          isNewImmigrant: false,
          isIndigenous: false,
          isDisability: false,
          other: ''
        },
        economicStatus: {
          monthlyIncome: 50000,
          hasDebt: false,
          debtAmount: 0,
          debtReason: ''
        },
        scores: {
          family: 0,
          school: 0,
          social: 0,
          total: 0
        },
        familyStatus: {
          parents: {
            father: {
              name: '張大明',
              age: 45,
              occupation: '工程師',
              education: '大學',
              health: '良好'
            },
            mother: {
              name: '李小花',
              age: 42,
              occupation: '教師',
              education: '大學',
              health: '良好'
            }
          },
          siblings: [],
          livingWith: '父母',
          familyTreeUrl: ''
        },
        schoolInfo: {
          name: '台北市立中正國小',
          grade: '三',
          class: '甲',
          teacher: '王老師',
          performance: {
            academic: '良好',
            behavior: '良好',
            attendance: '正常'
          }
        },
        mentalAssessment: {
          anxiety: 0,
          depression: 0,
          stress: 0,
          selfEsteem: 0,
          socialSupport: 0
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active',
        schoolCity: 'taipei',
        schoolDistrict: '中正區',
        schoolType: 'elementary',
        school: '台北市立中正國小',
        avatar: ''
      };
      setFormData(mockCaseData);
    }
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
    navigate('/casesmanagement');
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
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.primary',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            <Home sx={{ mr: 0.5, fontSize: 20 }} />
            首頁
          </Box>
          <Box
            component={RouterLink}
            to="/casesmanagement"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.primary',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            個案管理
          </Box>
          <Typography color="text.primary" >編輯個案</Typography>
        </Breadcrumbs>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', p:1 }}>
              編輯個案：{formData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ p:1 }}>
              最後修改時間：{new Date(formData.updatedAt).toLocaleString('zh-TW')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate('/casesmanagement')}
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
      </Paper>

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