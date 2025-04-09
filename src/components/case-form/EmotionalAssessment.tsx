import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from '@mui/material';

interface EmotionalAssessmentProps {
  formData: any;
  onFormDataChange: (newData: any) => void;
}

const questions = [
  {
    id: 'eq1',
    text: '在過去一週，我經常感到焦慮。',
  },
  {
    id: 'eq2',
    text: '我能夠有效處理壓力。',
  },
  {
    id: 'eq3',
    text: '我覺得自己能與他人建立良好的情感聯繫。',
  },
  {
    id: 'eq4',
    text: '當我情緒低落時，我能夠自我安慰。',
  },
  {
    id: 'eq5',
    text: '我常常能夠控制自己的情緒。',
  },
];

const EmotionalAssessment: React.FC<EmotionalAssessmentProps> = ({ formData, onFormDataChange }) => {
  const handleAnswerChange = (questionId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = {
      ...formData.eqAnswers,
      [questionId]: parseInt(event.target.value),
    };
    
    onFormDataChange({
      ...formData,
      eqAnswers: newAnswers,
    });
  };

  // 計算總分
  useEffect(() => {
    if (formData.eqAnswers) {
const totalScore = Object.values(formData.eqAnswers)
        .map(value => Number(value))
        .reduce((acc, curr) => acc + curr, 0);      onFormDataChange({
        ...formData,
        eqTotalScore: totalScore,
      });
    }
  }, [formData.eqAnswers]);

  const getScoreInterpretation = (score: number) => {
    if (score <= 10) return '情緒穩定';
    if (score <= 15) return '有待關注';
    return '需要進一步心理諮詢';
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        情緒統測表單 (EQ)
      </Typography>
      <Grid container spacing={3}>
        {questions.map((question) => (
          <Grid item xs={12} key={question.id}>
            <FormControl component="fieldset">
              <FormLabel component="legend">{question.text}</FormLabel>
              <RadioGroup
                row
                name={question.id}
                value={formData.eqAnswers?.[question.id] || ''}
                onChange={handleAnswerChange(question.id)}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={value.toString()}
                  />
                ))}
              </RadioGroup>
              <Typography variant="caption" color="textSecondary">
                1: 不同意 → 5: 非常同意
              </Typography>
            </FormControl>
          </Grid>
        ))}

        {/* 總分顯示 */}
        {formData.eqTotalScore !== undefined && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="h6" gutterBottom>
                測評結果
              </Typography>
              <Typography>
                總分：{formData.eqTotalScore}
              </Typography>
              <Typography>
                解釋：{getScoreInterpretation(formData.eqTotalScore)}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                分數說明：
                <br />
                5~10分：情緒穩定
                <br />
                11~15分：有待關注
                <br />
                16分以上：需要進一步心理諮詢
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default EmotionalAssessment; 