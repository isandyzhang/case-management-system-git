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
  Checkbox,
  FormGroup,
} from '@mui/material';

interface FamilyEconomicProps {
  formData: any;
  onFormDataChange: (newData: any) => void;
}

const FamilyEconomic: React.FC<FamilyEconomicProps> = ({ formData, onFormDataChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      onFormDataChange({
        ...formData,
        [name]: checked,
      });
    } else {
      onFormDataChange({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleIncomeSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    onFormDataChange({
      ...formData,
      incomeSources: {
        ...formData.incomeSources,
        [name]: checked,
      },
    });
  };

  const handleExpenseItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    onFormDataChange({
      ...formData,
      expenseItems: {
        ...formData.expenseItems,
        [name]: checked,
      },
    });
  };

  const handleSubsidyTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    onFormDataChange({
      ...formData,
      subsidyTypes: {
        ...formData.subsidyTypes,
        [name]: checked,
      },
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        家庭經濟概況 (FQ)
      </Typography>
      <Grid container spacing={3}>
        {/* 家庭收入來源 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">家庭收入來源（可複選）</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.incomeSources?.work || false}
                    onChange={handleIncomeSourceChange}
                    name="work"
                  />
                }
                label="工作收入"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.incomeSources?.government || false}
                    onChange={handleIncomeSourceChange}
                    name="government"
                  />
                }
                label="政府補助"
              />
            </FormGroup>
          </FormControl>
          <TextField
            fullWidth
            size="small"
            name="otherIncomeSource"
            label="其他收入來源"
            value={formData.otherIncomeSource || ''}
            onChange={handleInputChange}
            sx={{ mt: 1 }}
          />
        </Grid>

        {/* 月收入總額 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">月收入總額</FormLabel>
            <RadioGroup
              name="monthlyIncome"
              value={formData.monthlyIncome || ''}
              onChange={handleInputChange}
            >
              <FormControlLabel value="0-20000" control={<Radio />} label="0 ~ 20,000" />
              <FormControlLabel value="20000-40000" control={<Radio />} label="20,000 ~ 40,000" />
              <FormControlLabel value="40000-60000" control={<Radio />} label="40,000 ~ 60,000" />
              <FormControlLabel value="60000+" control={<Radio />} label="60,000 以上" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* 主要支出項目 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">主要支出項目（可複選）</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.expenseItems?.rent || false}
                    onChange={handleExpenseItemChange}
                    name="rent"
                  />
                }
                label="房租"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.expenseItems?.tuition || false}
                    onChange={handleExpenseItemChange}
                    name="tuition"
                  />
                }
                label="學費"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.expenseItems?.medical || false}
                    onChange={handleExpenseItemChange}
                    name="medical"
                  />
                }
                label="醫療費"
              />
            </FormGroup>
          </FormControl>
          <TextField
            fullWidth
            size="small"
            name="otherExpenseItems"
            label="其他支出項目"
            value={formData.otherExpenseItems || ''}
            onChange={handleInputChange}
            sx={{ mt: 1 }}
          />
        </Grid>

        {/* 是否有債務/貸款 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">是否有債務/貸款</FormLabel>
            <RadioGroup
              name="hasDebt"
              value={formData.hasDebt || ''}
              onChange={handleInputChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="是" />
              <FormControlLabel value="no" control={<Radio />} label="否" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* 是否領取補助 */}
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">是否領取補助（可複選）</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.subsidyTypes?.lowIncome || false}
                    onChange={handleSubsidyTypeChange}
                    name="lowIncome"
                  />
                }
                label="低收入戶"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.subsidyTypes?.mediumLowIncome || false}
                    onChange={handleSubsidyTypeChange}
                    name="mediumLowIncome"
                  />
                }
                label="中低收入戶"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.subsidyTypes?.governmentSubsidy || false}
                    onChange={handleSubsidyTypeChange}
                    name="governmentSubsidy"
                  />
                }
                label="政府補助"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.subsidyTypes?.churchResource || false}
                    onChange={handleSubsidyTypeChange}
                    name="churchResource"
                  />
                }
                label="教會資源"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        {/* 是否需要更多資源協助 */}
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">是否需要更多資源協助</FormLabel>
            <RadioGroup
              name="needMoreResources"
              value={formData.needMoreResources || ''}
              onChange={handleInputChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="是" />
              <FormControlLabel value="no" control={<Radio />} label="否" />
            </RadioGroup>
          </FormControl>
          {formData.needMoreResources === 'yes' && (
            <TextField
              fullWidth
              multiline
              rows={3}
              name="resourcesNeeded"
              label="請說明需要的資源"
              value={formData.resourcesNeeded || ''}
              onChange={handleInputChange}
              sx={{ mt: 2 }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FamilyEconomic; 