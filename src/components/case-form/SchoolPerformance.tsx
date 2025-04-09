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
  Slider,
} from '@mui/material';

interface SchoolPerformanceProps {
  formData: any;
  onFormDataChange: (newData: any) => void;
}

const SchoolPerformance: React.FC<SchoolPerformanceProps> = ({ formData, onFormDataChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onFormDataChange({
      ...formData,
      [name]: value,
    });
  };

  const handleSliderChange = (name: string) => (event: Event, newValue: number | number[]) => {
    onFormDataChange({
      ...formData,
      [name]: newValue,
    });
  };

  const marks = [
    { value: 0, label: '0' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 75, label: '75' },
    { value: 100, label: '100' },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        個案在校成績 (IQ)
      </Typography>
      <Grid container spacing={3}>
        {/* 國語成績 */}
        <Grid item xs={12}>
          <Typography gutterBottom>國語成績</Typography>
          <Slider
            value={formData.chineseScore || 0}
            onChange={handleSliderChange('chineseScore')}
            aria-labelledby="chinese-score-slider"
            valueLabelDisplay="auto"
            marks={marks}
            min={0}
            max={100}
          />
        </Grid>

        {/* 數學成績 */}
        <Grid item xs={12}>
          <Typography gutterBottom>數學成績</Typography>
          <Slider
            value={formData.mathScore || 0}
            onChange={handleSliderChange('mathScore')}
            aria-labelledby="math-score-slider"
            valueLabelDisplay="auto"
            marks={marks}
            min={0}
            max={100}
          />
        </Grid>

        {/* 英語成績 */}
        <Grid item xs={12}>
          <Typography gutterBottom>英語成績</Typography>
          <Slider
            value={formData.englishScore || 0}
            onChange={handleSliderChange('englishScore')}
            aria-labelledby="english-score-slider"
            valueLabelDisplay="auto"
            marks={marks}
            min={0}
            max={100}
          />
        </Grid>

        {/* 學校表現 */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="學校表現"
            name="schoolPerformance"
            value={formData.schoolPerformance || ''}
            onChange={handleInputChange}
            placeholder="請描述品行、出缺勤情況等..."
          />
        </Grid>

        {/* 是否有學習困難 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">是否有學習困難</FormLabel>
            <RadioGroup
              name="hasLearningDifficulty"
              value={formData.hasLearningDifficulty || ''}
              onChange={handleInputChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="是" />
              <FormControlLabel value="no" control={<Radio />} label="否" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* 需要補救教學或課後輔導嗎 */}
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">需要補救教學或課後輔導嗎</FormLabel>
            <RadioGroup
              name="needsTutoring"
              value={formData.needsTutoring || ''}
              onChange={handleInputChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="是" />
              <FormControlLabel value="no" control={<Radio />} label="否" />
            </RadioGroup>
          </FormControl>
        </Grid>

        {formData.hasLearningDifficulty === 'yes' && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="學習困難描述"
              name="learningDifficultyDescription"
              value={formData.learningDifficultyDescription || ''}
              onChange={handleInputChange}
              placeholder="請描述學習困難的具體情況..."
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SchoolPerformance; 