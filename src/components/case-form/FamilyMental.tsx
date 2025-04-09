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
  Grid,
} from '@mui/material';

interface FamilyMentalProps {
  formData: any;
  onFormDataChange: (newData: any) => void;
}

const FamilyMental: React.FC<FamilyMentalProps> = ({ formData, onFormDataChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onFormDataChange({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        家庭身心概況 (HQ)
      </Typography>
      <Grid container spacing={3}>
        {/* 主要照顧者的心理狀態 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">主要照顧者的心理狀態</FormLabel>
            <RadioGroup
              name="caregiverMentalState"
              value={formData.caregiverMentalState || ''}
              onChange={handleInputChange}
            >
              <FormControlLabel value="stable" control={<Radio />} label="穩定" />
              <FormControlLabel value="anxiety" control={<Radio />} label="有焦慮" />
              <FormControlLabel value="depression" control={<Radio />} label="抑鬱" />
              <FormControlLabel value="unstable" control={<Radio />} label="情緒不穩" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* 是否曾接受心理諮詢 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">是否曾接受心理諮詢</FormLabel>
            <RadioGroup
              name="hasCounseling"
              value={formData.hasCounseling || ''}
              onChange={handleInputChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="是" />
              <FormControlLabel value="no" control={<Radio />} label="否" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* 家庭成員身心障礙情形 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">家庭成員身心障礙情形</FormLabel>
            <RadioGroup
              name="familyDisability"
              value={formData.familyDisability || ''}
              onChange={handleInputChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="有" />
              <FormControlLabel value="no" control={<Radio />} label="無" />
              <FormControlLabel value="unknown" control={<Radio />} label="不確定" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* 家庭支持網絡 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">家庭支持網絡</FormLabel>
            <RadioGroup
              name="familySupport"
              value={formData.familySupport || ''}
              onChange={handleInputChange}
            >
              <FormControlLabel value="strong" control={<Radio />} label="有" />
              <FormControlLabel value="weak" control={<Radio />} label="少" />
              <FormControlLabel value="none" control={<Radio />} label="無" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* 主要照顧者壓力來源 */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="主要照顧者壓力來源"
            name="caregiverStressSources"
            value={formData.caregiverStressSources || ''}
            onChange={handleInputChange}
            placeholder="請描述主要照顧者的壓力來源..."
          />
        </Grid>

        {/* 需要心理支持服務嗎 */}
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">需要心理支持服務嗎</FormLabel>
            <RadioGroup
              name="needPsychologicalSupport"
              value={formData.needPsychologicalSupport || ''}
              onChange={handleInputChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="是" />
              <FormControlLabel value="no" control={<Radio />} label="否" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FamilyMental; 