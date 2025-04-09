import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Grid,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Box,
  SelectChangeEvent,
  Radio,
  RadioGroup,
  FormLabel,
  Fade,
  Grow,
  Zoom,
  Collapse,
  Avatar,
  IconButton,
  Input,
  FormHelperText,
  FormGroup,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ICase } from '../../types/case';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { zhTW } from 'date-fns/locale';
import { taipeiSchools, newTaipeiSchools, School } from '../../constants/schools';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[8],
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledSelect = styled(Select<string>)(({ theme }) => ({
  '& .MuiSelect-select': {
    padding: '16px 14px',
    minHeight: '1.4375em',
    fontSize: '1rem',
  },
  '& .MuiInputBase-root': {
    height: '56px',
  },
  '& .MuiPaper-root': {
    maxHeight: 300,
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  },
}));

// API 接口類型定義
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface CaseApiResponse extends ApiResponse<ICase> {}

// API 基礎設定
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

// API 請求函數
const fetchApi = async <T,>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return response.json();
};

// 地區對照表
type DistrictMapType = {
  taipei: string[];
  newTaipei: string[];
};

const districtMap: DistrictMapType = {
  taipei: [
    '中正區', '大同區', '中山區', '松山區', '大安區', '萬華區',
    '信義區', '士林區', '北投區', '內湖區', '南港區', '文山區'
  ],
  newTaipei: [
    '板橋區', '三重區', '中和區', '永和區', '新莊區', '新店區', '樹林區', '鶯歌區',
    '三峽區', '淡水區', '汐止區', '瑞芳區', '土城區', '蘆洲區', '五股區',
    '泰山區', '林口區', '深坑區', '石碇區', '坪林區', '三芝區', '石門區',
    '八里區', '平溪區', '雙溪區', '貢寮區', '金山區', '萬里區', '烏來區'
  ]
};

interface ICaseFormData {
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

interface CaseFormProps {
  formData: ICaseFormData;
  onFormDataChange: (newData: Partial<ICaseFormData>) => void;
}

const CaseForm: React.FC<CaseFormProps> = ({ formData, onFormDataChange }) => {
  const [customSchools, setCustomSchools] = useState<School[]>([]);
  const [newSchoolInput, setNewSchoolInput] = useState('');
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const fieldNames = name.split('.');
    
    if (fieldNames.length === 1) {
      onFormDataChange({
        [name]: type === 'checkbox' ? checked : value
      } as Partial<ICaseFormData>);
    } else if (fieldNames.length === 2) {
      const [parent, child] = fieldNames;
      const parentKey = parent as keyof ICaseFormData;
      onFormDataChange({
        [parentKey]: {
          ...(formData[parentKey] as Record<string, any>),
          [child]: type === 'checkbox' ? checked : value
        }
      });
    } else if (fieldNames.length === 3) {
      const [parent, child, grandChild] = fieldNames;
      const parentKey = parent as keyof ICaseFormData;
      onFormDataChange({
        [parentKey]: {
          ...(formData[parentKey] as Record<string, any>),
          [child]: {
            ...((formData[parentKey] as Record<string, any>)[child] as Record<string, any>),
            [grandChild]: type === 'checkbox' ? checked : value
          }
        }
      });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    const [mainKey, subKey] = name.split('.');

    if (subKey) {
      onFormDataChange({
        [mainKey]: {
          ...(formData[mainKey as keyof ICaseFormData] as Record<string, any>),
          [subKey]: value,
        },
      });
    } else {
      onFormDataChange({
        [name]: value,
      });
    }

    if (name === 'address.city') {
      if (value === 'taipei' || value === 'newTaipei') {
        onFormDataChange({
          address: {
            ...formData.address,
            district: districtMap[value as keyof typeof districtMap][0],
            otherCity: '',
            otherDistrict: ''
          }
        });
      } else {
        onFormDataChange({
          address: {
            ...formData.address,
            district: ''
          }
        });
      }
    } else if (name === 'schoolCity') {
      if (value === 'taipei' || value === 'newTaipei') {
        onFormDataChange({
          schoolDistrict: districtMap[value as keyof typeof districtMap][0]
        });
      } else {
        onFormDataChange({
          schoolDistrict: ''
        });
      }
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      onFormDataChange({
        birthDate: date.toISOString().split('T')[0]
      });
    }
  };

  // API 相關函數
  const createCase = async (caseData: ICaseFormData): Promise<CaseApiResponse> => {
    return fetchApi<CaseApiResponse>('/cases', {
      method: 'POST',
      body: JSON.stringify(caseData),
    });
  };

  const getCase = async (id: string): Promise<CaseApiResponse> => {
    return fetchApi<CaseApiResponse>(`/cases/${id}`);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // 基本資料驗證
    if (!formData.name || !formData.gender || !formData.birthDate) {
      alert('請填寫必填欄位：姓名、性別、出生日期');
      return;
    }

    try {
      const response = await createCase(formData);
      if (response.success) {
        // 成功提示
        alert('資料已成功儲存！');
        // 重置表單
        onFormDataChange({
          id: '',
          name: '',
          gender: 'male',
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
            relationship: 'father',
            otherRelation: '',
            phoneAreaCode: '',
            otherPhoneAreaCode: '',
            phone: '',
            mobile: '',
            email: '',
          },
          specialStatus: {
            isLowIncome: false,
            isSingleParent: false,
            isNewImmigrant: false,
            isIndigenous: false,
            isDisability: false,
            other: '',
          },
          economicStatus: {
            monthlyIncome: 0,
            hasDebt: false,
            debtAmount: 0,
            debtReason: '',
          },
          scores: {
            family: 0,
            school: 0,
            social: 0,
            total: 0,
          },
          familyStatus: {
            parents: {
              father: {
                name: '',
                age: 0,
                occupation: '',
                education: '',
                health: '',
              },
              mother: {
                name: '',
                age: 0,
                occupation: '',
                education: '',
                health: '',
              },
            },
            siblings: [],
            livingWith: '',
            familyTreeUrl: '',
          },
          schoolInfo: {
            name: '',
            grade: '',
            class: '',
            teacher: '',
            performance: {
              academic: '',
              behavior: '',
              attendance: '',
            },
          },
          mentalAssessment: {
            anxiety: 0,
            depression: 0,
            stress: 0,
            selfEsteem: 0,
            socialSupport: 0,
          },
          createdAt: '',
          updatedAt: '',
          status: 'active',
          schoolCity: 'taipei',
          schoolDistrict: '',
          schoolType: '',
          school: '',
          avatar: '',
        });
      } else {
        // 錯誤提示
        alert(`儲存失敗：${response.error || '未知錯誤'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('提交表單時發生錯誤，請稍後再試');
    }
  };

  // 載入現有資料（如果是編輯模式）
  useEffect(() => {
    const loadCaseData = async () => {
      const caseId = new URLSearchParams(window.location.search).get('id');
      if (caseId) {
        try {
          const response = await getCase(caseId);
          if (response.success && response.data) {
            const { createdBy, updatedBy, status, ...caseData } = response.data as ICase;
            const defaultFormData: ICaseFormData = {
              id: '',
              name: '',
              gender: 'male',
              birthDate: caseData.birthDate instanceof Date ? caseData.birthDate.toISOString().split('T')[0] : String(caseData.birthDate),
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
                name: caseData.contactPerson?.name || '',
                relationship: caseData.contactPerson?.relationship || 'father',
                otherRelation: caseData.contactPerson?.otherRelation || '',
                phoneAreaCode: caseData.contactPerson?.phoneAreaCode || '',
                otherPhoneAreaCode: caseData.contactPerson?.otherPhoneAreaCode || '',
                phone: caseData.contactPerson?.phone || '',
                mobile: caseData.contactPerson?.mobile || '',
                email: caseData.contactPerson?.email || '',
              },
              specialStatus: {
                isLowIncome: false,
                isSingleParent: false,
                isNewImmigrant: false,
                isIndigenous: false,
                isDisability: false,
                other: '',
              },
              economicStatus: {
                monthlyIncome: 0,
                hasDebt: false,
                debtAmount: 0,
                debtReason: '',
              },
              scores: {
                family: 0,
                school: 0,
                social: 0,
                total: 0,
              },
              familyStatus: {
                parents: {
                  father: {
                    name: '',
                    age: 0,
                    occupation: '',
                    education: '',
                    health: '',
                  },
                  mother: {
                    name: '',
                    age: 0,
                    occupation: '',
                    education: '',
                    health: '',
                  },
                },
                siblings: [],
                livingWith: '',
                familyTreeUrl: '',
              },
              schoolInfo: {
                name: '',
                grade: '',
                class: '',
                teacher: '',
                performance: {
                  academic: '',
                  behavior: '',
                  attendance: '',
                },
              },
              mentalAssessment: {
                anxiety: 0,
                depression: 0,
                stress: 0,
                selfEsteem: 0,
                socialSupport: 0,
              },
              createdAt: caseData.createdAt instanceof Date ? caseData.createdAt.toISOString() : String(caseData.createdAt),
              updatedAt: caseData.updatedAt instanceof Date ? caseData.updatedAt.toISOString() : String(caseData.updatedAt),
              status: 'active',
              schoolCity: 'taipei',
              schoolDistrict: '',
              schoolType: '',
              school: '',
              avatar: '',
            };

            const formattedData: ICaseFormData = {
              ...defaultFormData,
              ...caseData,
              birthDate: caseData.birthDate instanceof Date ? caseData.birthDate.toISOString().split('T')[0] : String(caseData.birthDate),
              createdAt: caseData.createdAt instanceof Date ? caseData.createdAt.toISOString() : String(caseData.createdAt),
              updatedAt: caseData.updatedAt instanceof Date ? caseData.updatedAt.toISOString() : String(caseData.updatedAt),
              specialStatus: {
                isLowIncome: false,
                isSingleParent: false,
                isNewImmigrant: false,
                isIndigenous: false,
                isDisability: false,
                other: '',
              },
              schoolCity: 'taipei',
              schoolDistrict: '',
              address: {
                city: 'taipei',
                district: '',
                otherCity: '',
                otherDistrict: '',
                detail: '',
              },
            };
            onFormDataChange(formattedData);
          }
        } catch (error) {
          console.error('Error loading case data:', error);
        }
      }
    };

    loadCaseData();
  }, []);

  // 處理新增學校
  const handleAddSchool = () => {
    if (newSchoolInput.trim() && formData.schoolType) {
      const newSchool: School = {
        id: `custom_${Date.now()}`,
        name: newSchoolInput.trim(),
        value: `custom_${Date.now()}`,
        label: newSchoolInput.trim(),
        type: formData.schoolType as 'elementary' | 'junior' | 'high',
        district: formData.schoolDistrict
      };
      setCustomSchools([...customSchools, newSchool]);
      setNewSchoolInput('');
    }
  };

  // 合併預設學校和自定義學校
  const getMergedSchools = () => {
    const defaultSchools = getFilteredSchools();
    return [...defaultSchools, ...customSchools];
  };

  // 學校選項
  const getSchoolOptions = () => {
    let filteredSchools = [...taipeiSchools, ...newTaipeiSchools];
    
    // 根據學校類型過濾
    if (formData.schoolType) {
      filteredSchools = filteredSchools.filter(school => school.type === formData.schoolType);
    }
    
    // 根據學校地區過濾
    if (formData.schoolDistrict) {
      filteredSchools = filteredSchools.filter(school => school.district === formData.schoolDistrict);
    }
    
    return filteredSchools;
  };

  // 根據選定的地區和學校類型過濾學校
  const getFilteredSchools = () => {
    const allSchools = getSchoolOptions();
    let filteredSchools = allSchools;
    
    // 根據學校類型過濾
    if (formData.schoolType) {
      filteredSchools = filteredSchools.filter(school => school.type === formData.schoolType);
    }
    
    // 根據地區過濾
    if (formData.address.district) {
      filteredSchools = filteredSchools.filter(school => school.district === formData.address.district);
    }
    
    return filteredSchools;
  };

  // 修改 Select 組件的 onChange 處理
  const handleSelectInputChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    handleInputChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        onFormDataChange({ avatar: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setPreviewImage('');
    onFormDataChange({ avatar: '' });
  };

  return (
    <Container maxWidth="lg">
      <Fade in={true} timeout={1000}>
        <Box>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mt: 3 }}>
              <Grow in={true} timeout={1000}>
                <Typography variant="h6" gutterBottom>
                  基本資訊
                </Typography>
              </Grow>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                      src={previewImage || formData.avatar}
                      variant="square"
                      sx={{ 
                        width: 200, 
                        height: 200,
                        borderRadius: 2,  // 添加輕微圓角
                        boxShadow: 3     // 添加陰影效果
                      }}
                    />
                    <Box>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="avatar-upload"
                        type="file"
                        onChange={handleImageUpload}
                      />
                      <label htmlFor="avatar-upload">
                        <IconButton
                          color="primary"
                          aria-label="上傳照片"
                          component="span"
                          sx={{ 
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.08)'
                            }
                          }}
                        >
                          <PhotoCamera />
                        </IconButton>
                      </label>
                      {(previewImage || formData.avatar) && (
                        <IconButton
                          color="error"
                          onClick={handleDeleteImage}
                          aria-label="刪除照片"
                          sx={{ 
                            ml: 1,
                            backgroundColor: 'rgba(211, 47, 47, 0.04)',
                            '&:hover': {
                              backgroundColor: 'rgba(211, 47, 47, 0.08)'
                            }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                        點擊相機圖示上傳大頭貼（建議尺寸：200x200像素）
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Collapse in={true} timeout={1000}>
                    <StyledTextField
                      fullWidth
                      required
                      label="姓名"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </Collapse>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Collapse in={true} timeout={1000}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhTW}>
                      <DatePicker
                        label="出生日期"
                        value={formData.birthDate ? new Date(formData.birthDate) : null}
                        onChange={handleDateChange}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                          },
                        }}
                        format="yyyy年MM月dd日"
                      />
                    </LocalizationProvider>
                  </Collapse>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Collapse in={true} timeout={1000}>
                    <TextField
                      fullWidth
                      required
                      label="身分證字號"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                    />
                  </Collapse>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend">性別</FormLabel>
                    <RadioGroup
                      row
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <FormControlLabel value="male" control={<Radio />} label="男" />
                      <FormControlLabel value="female" control={<Radio />} label="女" />
                      <FormControlLabel value="other" control={<Radio />} label="其他" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                
                
                {/* 居住地 */}
                <Grid item xs={12}>
                  <Collapse in={true} timeout={1000}>
                    <Typography variant="h6" gutterBottom>
                      居住地
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                          <InputLabel>居住縣市</InputLabel>
                          <Select
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleSelectChange}
                            label="居住縣市"
                          >
                            <MenuItem value="taipei">台北市</MenuItem>
                            <MenuItem value="newTaipei">新北市</MenuItem>
                            <MenuItem value="other">其他</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          {formData.address.city === 'other' ? (
                            <>
                              <TextField
                                size="medium"
                                label="縣市"
                                name="address.otherCity"
                                value={formData.address.otherCity || ''}
                                onChange={handleInputChange}
                                sx={{ width: '50%' }}
                              />
                              <TextField
                                size="medium"
                                label="地區"
                                name="address.otherDistrict"
                                value={formData.address.otherDistrict || ''}
                                onChange={handleInputChange}
                                sx={{ width: '50%' }}
                              />
                            </>
                          ) : (
                            <FormControl fullWidth size="medium">
                              <InputLabel>居住地區</InputLabel>
                              <StyledSelect
                                name="address.district"
                                value={formData.address.district}
                                onChange={handleSelectChange}
                                label="居住地區"
                              >
                                {(districtMap[formData.address.city] || []).map((district) => (
                                  <MenuItem key={district} value={district}>
                                    {district}
                                  </MenuItem>
                                ))}
                              </StyledSelect>
                            </FormControl>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="詳細居住地址"
                          name="address.detail"
                          value={formData.address.detail}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    </Grid>
                  </Collapse>
                </Grid>

                {/* 學校 */}
                <Grid item xs={12}>
                  <Collapse in={true} timeout={1000}>
                    <Typography variant="h6" gutterBottom>
                      學校
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {/* 學校類型選擇 */}
                      <FormControl sx={{ width: '15%' }}>
                        <InputLabel>學校類型</InputLabel>
                        <Select
                          name="schoolType"
                          value={formData.schoolType || ''}
                          onChange={handleSelectChange}
                          label="學校類型"
                        >
                          <MenuItem value="elementary">國小</MenuItem>
                          <MenuItem value="junior">國中</MenuItem>
                          <MenuItem value="high">高中</MenuItem>
                        </Select>
                      </FormControl>

                      {/* 學校地區選擇 */}
                      <FormControl fullWidth size="medium">
                        <InputLabel>學校地區</InputLabel>
                        <StyledSelect
                          name="schoolDistrict"
                          value={formData.schoolDistrict || ''}
                          onChange={handleSelectChange}
                          label="學校地區"
                        >
                          {(formData.schoolCity === 'taipei' || formData.schoolCity === 'newTaipei') && 
                            districtMap[formData.schoolCity].map((district: string) => (
                              <MenuItem key={district} value={district}>
                                {district}
                              </MenuItem>
                            ))
                          }
                        </StyledSelect>
                      </FormControl>

                      {/* 學校選擇 */}
                      {formData.schoolCity !== 'other' && formData.schoolType && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '50%' }}>
                          <FormControl fullWidth>
                            <InputLabel>學校名稱</InputLabel>
                            <Select
                              name="school"
                              value={formData.school}
                              onChange={handleSelectChange}
                              label="學校名稱"
                            >
                              {getMergedSchools().map((school) => (
                                <MenuItem key={school.value} value={school.value}>
                                  {school.label}
                                </MenuItem>
                              ))}
                              <MenuItem value="add">新增學校</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      )}

                      {/* 新增學校輸入框 */}
                      {formData.school === 'add' && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '50%' }}>
                          <TextField
                            size="medium"
                            label="請輸入學校名稱"
                            value={newSchoolInput}
                            onChange={(e) => setNewSchoolInput(e.target.value)}
                            fullWidth
                          />
                          <Button
                            variant="contained"
                            onClick={handleAddSchool}
                            disabled={!newSchoolInput.trim()}
                          >
                            新增
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Collapse>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Grow in={true} timeout={1000}>
                <Typography variant="h6" gutterBottom>
                  聯絡人
                </Typography>
              </Grow>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="聯絡人姓名"
                    name="contactPerson.name"
                    value={formData.contactPerson.name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>關係</InputLabel>
                    <StyledSelect
                      name="contactPerson.relationship"
                      value={formData.contactPerson.relationship}
                      onChange={handleSelectInputChange}
                      required
                    >
                      <MenuItem value="father">父親</MenuItem>
                      <MenuItem value="mother">母親</MenuItem>
                      <MenuItem value="guardian">監護人</MenuItem>
                      <MenuItem value="other">其他</MenuItem>
                    </StyledSelect>
                  </FormControl>
                </Grid>
                {formData.contactPerson.relationship === 'other' && (
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="其他關係"
                      name="contactPerson.otherRelation"
                      value={formData.contactPerson.otherRelation}
                      onChange={handleInputChange}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>電話區號</InputLabel>
                    <StyledSelect
                      name="contactPerson.phoneAreaCode"
                      value={formData.contactPerson.phoneAreaCode}
                      onChange={handleSelectInputChange}
                      required
                    >
                      <MenuItem value="02">02</MenuItem>
                      <MenuItem value="03">03</MenuItem>
                      <MenuItem value="other">其他</MenuItem>
                    </StyledSelect>
                  </FormControl>
                </Grid>
                {formData.contactPerson.phoneAreaCode === 'other' && (
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="其他區號"
                      name="contactPerson.otherPhoneAreaCode"
                      value={formData.contactPerson.otherPhoneAreaCode}
                      onChange={handleInputChange}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="電話號碼"
                    name="contactPerson.phone"
                    value={formData.contactPerson.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="手機號碼"
                    name="contactPerson.mobile"
                    value={formData.contactPerson.mobile}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="電子郵件"
                    name="contactPerson.email"
                    value={formData.contactPerson.email}
                    onChange={handleInputChange}
                    type="email"
                    required
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Grow in={true} timeout={1000}>
                <Typography variant="h6" gutterBottom>
                  家庭特殊身分
                </Typography>
              </Grow>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">特殊身分狀態</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.specialStatus.isLowIncome}
                            onChange={handleInputChange}
                            name="specialStatus.isLowIncome"
                          />
                        }
                        label="低收入戶"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.specialStatus.isSingleParent}
                            onChange={handleInputChange}
                            name="specialStatus.isSingleParent"
                          />
                        }
                        label="單親家庭"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.specialStatus.isNewImmigrant}
                            onChange={handleInputChange}
                            name="specialStatus.isNewImmigrant"
                          />
                        }
                        label="新住民"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.specialStatus.isIndigenous}
                            onChange={handleInputChange}
                            name="specialStatus.isIndigenous"
                          />
                        }
                        label="原住民"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.specialStatus.isDisability}
                            onChange={handleInputChange}
                            name="specialStatus.isDisability"
                          />
                        }
                        label="身心障礙"
                      />
                      <TextField
                        fullWidth
                        label="其他特殊狀況"
                        name="specialStatus.other"
                        value={formData.specialStatus.other}
                        onChange={handleInputChange}
                        margin="normal"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Zoom in={true} timeout={1000}>
                <StyledButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  儲存
                </StyledButton>
              </Zoom>
            </Box>
          </form>
        </Box>
      </Fade>
    </Container>
  );
};

export default CaseForm; 