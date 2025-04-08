import React from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Checkbox,
  FormGroup,
  Paper,
  Grid,
} from '@mui/material';

interface CaregiverInfoProps {
  formData: any;
  onFormDataChange: (newData: any) => void;
}

const CaregiverInfo: React.FC<CaregiverInfoProps> = ({ formData, onFormDataChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    onFormDataChange({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleServiceItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const updatedServices = {
      ...formData.serviceItems,
      [name]: checked,
    };
    onFormDataChange({
      ...formData,
      serviceItems: updatedServices,
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        主要照顧者與服務資訊
      </Typography>
      <Grid container spacing={3}>
        {/* 個案來源 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">個案來源</FormLabel>
            <RadioGroup
              name="caseSource"
              value={formData.caseSource || ''}
              onChange={handleInputChange}
            >
              <FormControlLabel value="selfApply" control={<Radio />} label="自行申請" />
              <FormControlLabel value="referral" control={<Radio />} label="他人轉介" />
              <FormControlLabel value="institution" control={<Radio />} label="機構轉介" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* 求助經驗 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">是否曾尋求過其他協助？</FormLabel>
            <RadioGroup
              name="hasHelp"
              value={formData.hasHelp || ''}
              onChange={handleInputChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="是" />
              <FormControlLabel value="no" control={<Radio />} label="否" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* 初次會談紀錄 */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="初次會談紀錄"
            name="firstMeetingNote"
            value={formData.firstMeetingNote || ''}
            onChange={handleInputChange}
            placeholder="請輸入初次會談的內容描述..."
          />
        </Grid>

        {/* 提供服務項目 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">提供服務項目（可複選）</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.serviceItems?.supplies || false}
                    onChange={handleServiceItemChange}
                    name="supplies"
                  />
                }
                label="物資"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.serviceItems?.companionship || false}
                    onChange={handleServiceItemChange}
                    name="companionship"
                  />
                }
                label="陪伴"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.serviceItems?.counseling || false}
                    onChange={handleServiceItemChange}
                    name="counseling"
                  />
                }
                label="心理輔導"
              />
            </FormGroup>
          </FormControl>
          <TextField
            fullWidth
            label="其他服務項目"
            name="otherServiceItems"
            value={formData.otherServiceItems || ''}
            onChange={handleInputChange}
            placeholder="請補充其他服務項目..."
            sx={{ mt: 2 }}
          />
        </Grid>

        {/* 已提供的資源連結 */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="已提供的資源連結"
            name="providedResources"
            value={formData.providedResources || ''}
            onChange={handleInputChange}
            placeholder="請列舉已提供的資源連結..."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CaregiverInfo; 