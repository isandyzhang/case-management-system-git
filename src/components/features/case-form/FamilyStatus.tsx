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

interface FamilyStatusProps {
  formData: any;
  onFormDataChange: (newData: any) => void;
}

const FamilyStatus: React.FC<FamilyStatusProps> = ({ formData, onFormDataChange }) => {
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
        家庭概況
      </Typography>
      <Grid container spacing={3}>
        {/* 家庭組成 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">家庭組成</FormLabel>
            <RadioGroup
              name="familyComposition"
              value={formData.familyComposition || ''}
              onChange={handleInputChange}
            >
              <FormControlLabel value="singleParent" control={<Radio />} label="單親" />
              <FormControlLabel value="bothParents" control={<Radio />} label="雙親" />
              <FormControlLabel value="grandparents" control={<Radio />} label="隔代教養" />
              <FormControlLabel value="other" control={<Radio />} label="其他" />
            </RadioGroup>
          </FormControl>
          {formData.familyComposition === 'other' && (
            <TextField
              fullWidth
              size="small"
              name="familyCompositionOther"
              label="請說明其他情況"
              value={formData.familyCompositionOther || ''}
              onChange={handleInputChange}
              sx={{ mt: 1 }}
            />
          )}
        </Grid>

        {/* 家庭婚姻狀況 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">家庭婚姻狀況</FormLabel>
            <RadioGroup
              name="marriageStatus"
              value={formData.marriageStatus || ''}
              onChange={handleInputChange}
            >
              <FormControlLabel value="stable" control={<Radio />} label="穩定" />
              <FormControlLabel value="separated" control={<Radio />} label="分居" />
              <FormControlLabel value="divorced" control={<Radio />} label="離異" />
              <FormControlLabel value="remarried" control={<Radio />} label="再婚" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* 居住環境 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">居住環境</FormLabel>
            <RadioGroup
              name="livingEnvironment"
              value={formData.livingEnvironment || ''}
              onChange={handleInputChange}
            >
              <FormControlLabel value="owned" control={<Radio />} label="自有" />
              <FormControlLabel value="rented" control={<Radio />} label="租屋" />
              <FormControlLabel value="relative" control={<Radio />} label="親友提供" />
              <FormControlLabel value="government" control={<Radio />} label="政府提供" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* 照顧者健康狀況 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">照顧者健康狀況</FormLabel>
            <RadioGroup
              name="caregiverHealth"
              value={formData.caregiverHealth || ''}
              onChange={handleInputChange}
            >
              <FormControlLabel value="good" control={<Radio />} label="良好" />
              <FormControlLabel value="chronic" control={<Radio />} label="慢性病" />
              <FormControlLabel value="needCare" control={<Radio />} label="需長期照護" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* 親子互動描述 */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="親子互動描述"
            name="parentChildInteraction"
            value={formData.parentChildInteraction || ''}
            onChange={handleInputChange}
            placeholder="請描述親子之間的互動情況..."
          />
        </Grid>

        {/* 特殊家庭事件 */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="特殊家庭事件"
            name="specialFamilyEvents"
            value={formData.specialFamilyEvents || ''}
            onChange={handleInputChange}
            placeholder="如重大疾病、失業、家暴等，請簡述..."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FamilyStatus; 