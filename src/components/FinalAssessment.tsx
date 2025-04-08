import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { zhTW } from 'date-fns/locale';

interface FinalAssessmentProps {
  formData: any;
  onFormDataChange: (newData: any) => void;
}

const FinalAssessment: React.FC<FinalAssessmentProps> = ({ formData, onFormDataChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onFormDataChange({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    onFormDataChange({
      ...formData,
      completionTime: date?.toISOString(),
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        整體評估 (4Q) 與簽章
      </Typography>
      <Grid container spacing={3}>
        {/* 各項分數顯示 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              評估分數總覽
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="FQ（家庭經濟）分數"
                  name="fqScore"
                  type="number"
                  value={formData.fqScore || ''}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="HQ（身心狀況）分數"
                  name="hqScore"
                  type="number"
                  value={formData.hqScore || ''}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="IQ（在校表現）分數"
                  name="iqScore"
                  type="number"
                  value={formData.iqScore || ''}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="EQ（情緒問卷）分數"
                  name="eqScore"
                  type="number"
                  value={formData.eqScore || ''}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 0, max: 100 } }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* 總體評估 */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="總體評估"
            name="overallAssessment"
            value={formData.overallAssessment || ''}
            onChange={handleInputChange}
            placeholder="請輸入對個案的綜合評價..."
          />
        </Grid>

        {/* 簽名區域 */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="負責社工簽名"
            name="socialWorkerSignature"
            value={formData.socialWorkerSignature || ''}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="組長或督導簽名"
            name="supervisorSignature"
            value={formData.supervisorSignature || ''}
            onChange={handleInputChange}
          />
        </Grid>

        {/* 完成時間 */}
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhTW}>
            <DateTimePicker
              label="資料填寫完成時間"
              value={formData.completionTime ? new Date(formData.completionTime) : null}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinalAssessment; 