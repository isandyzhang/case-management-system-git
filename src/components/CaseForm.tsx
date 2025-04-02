import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Button,
  Container,
  MenuItem,
  Select,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Snackbar,
  Grid,
  Checkbox,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { caseApi } from '../services/api';
import { ICaseFormData } from '../types/case';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { zhTW } from 'date-fns/locale';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
}));

const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const steps = ['認養童基本資料', '家庭特殊身分', '家庭成員', '家庭結構', '居住地', '主要照顧者'];

const initialFormData: ICaseFormData = {
  name: '',
  gender: 'female' as const,
  birthDate: null,
  idNumber: '',
  address: '',
  phone: '',
  contactPerson: '',
  contactRelation: '',
  contactPhone: '',
  specialStatus: {
    none: false,
    lowIncome: false,
    middleLowIncome: false,
    nearPoverty: false,
    majorIllness: false,
  },
  icfCode: '',
  originalResidentStatus: '',
  familyMembers: {
    father: false,
    mother: false,
    brothers: 0,
    sisters: 0,
    siblings: 0,
    grandfather: false,
    grandmother: false,
    paternalGrandfather: false,
    paternalGrandmother: false,
    other: '',
  },
  assessmentData: {
    healthStatus: '',
    mentalStatus: '',
    socialSupport: '',
    economicStatus: '',
  },
  additionalInfo: {
    notes: '',
    attachments: [],
  },
};

const CaseForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const [formData, setFormData] = useState<ICaseFormData>(initialFormData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: any } }) => {
    const { name, value } = event.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof ICaseFormData] as Record<string, any>),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await caseApi.create(formData);
      setSnackbar({
        open: true,
        message: '個案資料已成功儲存！',
        severity: 'success',
      });
      // 可以在這裡添加重置表單或跳轉到其他頁面的邏輯
    } catch (error) {
      setSnackbar({
        open: true,
        message: '儲存失敗，請稍後再試',
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderBasicInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="姓名"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required>
          <FormLabel>性別</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <FormControlLabel value="female" control={<Radio />} label="女" />
            <FormControlLabel value="male" control={<Radio />} label="男" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhTW}>
          <DatePicker
            label="出生日期"
            value={formData.birthDate}
            onChange={(date) => {
              setFormData(prev => ({
                ...prev,
                birthDate: date
              }));
            }}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="身分證字號"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="地址"
          name="address"
          value={formData.address}
          onChange={handleChange}
          multiline
          rows={2}
        />
      </Grid>
    </Grid>
  );

  const renderSpecialStatus = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          家庭特殊身分
        </Typography>
        <FormControl component="fieldset">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.specialStatus.none}
                    onChange={(e) => handleChange({ target: { name: 'specialStatus.none', value: e.target.checked } })}
                  />
                }
                label="無"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.specialStatus.lowIncome}
                    onChange={(e) => handleChange({ target: { name: 'specialStatus.lowIncome', value: e.target.checked } })}
                  />
                }
                label="低收入戶"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.specialStatus.middleLowIncome}
                    onChange={(e) => handleChange({ target: { name: 'specialStatus.middleLowIncome', value: e.target.checked } })}
                  />
                }
                label="中低收入戶"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.specialStatus.nearPoverty}
                    onChange={(e) => handleChange({ target: { name: 'specialStatus.nearPoverty', value: e.target.checked } })}
                  />
                }
                label="近貧"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.specialStatus.majorIllness}
                    onChange={(e) => handleChange({ target: { name: 'specialStatus.majorIllness', value: e.target.checked } })}
                  />
                }
                label="重大傷病"
              />
            </Grid>
          </Grid>
        </FormControl>    
      </Grid>
    </Grid>
  );

  const renderFamilyMembers = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          家中成員
        </Typography>
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">直系親屬</FormLabel>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.familyMembers.father}
                    onChange={(e) => handleChange({ target: { name: 'familyMembers.father', value: e.target.checked } })}
                  />
                }
                label="父"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.familyMembers.mother}
                    onChange={(e) => handleChange({ target: { name: 'familyMembers.mother', value: e.target.checked } })}
                  />
                }
                label="母"
              />
            </Grid>
          </Grid>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl component="fieldset">
          <FormLabel component="legend">祖父母</FormLabel>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.familyMembers.grandfather}
                    onChange={(e) => handleChange({ target: { name: 'familyMembers.grandfather', value: e.target.checked } })}
                  />
                }
                label="祖父"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.familyMembers.grandmother}
                    onChange={(e) => handleChange({ target: { name: 'familyMembers.grandmother', value: e.target.checked } })}
                  />
                }
                label="祖母"
              />
            </Grid>
          </Grid>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <FormLabel>兄弟姊妹</FormLabel>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="兄弟人數"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                value={formData.familyMembers.brothers}
                onChange={(e) => handleChange({ target: { name: 'familyMembers.brothers', value: parseInt(e.target.value) || 0 } })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="姊妹人數"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                value={formData.familyMembers.sisters}
                onChange={(e) => handleChange({ target: { name: 'familyMembers.sisters', value: parseInt(e.target.value) || 0 } })}
              />
            </Grid>
          </Grid>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="其他家庭成員"
          placeholder="請說明其他同住家庭成員"
          value={formData.familyMembers.other}
          onChange={(e) => handleChange({ target: { name: 'familyMembers.other', value: e.target.value } })}
          multiline
          rows={2}
        />
      </Grid>
    </Grid>
  );

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderBasicInfo();
      case 1:
        return renderSpecialStatus();
      case 2:
        return renderFamilyMembers();
      case 3:
        return <Typography>家庭結構（待實作）</Typography>;
      case 4:
        return <Typography>居住地（待實作）</Typography>;
      case 5:
        return <Typography>主要照顧者（待實作）</Typography>;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <StyledPaper elevation={3}>
        <Typography variant="h5" sx={{ mb: 4, color: '#2E7D32', fontWeight: 'bold' }}>
          新增個案資料
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ mb: 4 }} />

        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0 || isSubmitting}
            sx={{ color: '#4CAF50', borderColor: '#4CAF50' }}
          >
            上一步
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting}
              sx={{ 
                bgcolor: '#4CAF50',
                '&:hover': {
                  bgcolor: '#45a049',
                }
              }}
            >
              {isSubmitting ? '儲存中...' : '提交'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isSubmitting}
              sx={{ 
                bgcolor: '#4CAF50',
                '&:hover': {
                  bgcolor: '#45a049',
                }
              }}
            >
              下一步
            </Button>
          )}
        </Box>
      </StyledPaper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CaseForm; 