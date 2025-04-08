import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  IconButton,
  Paper,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';

interface FamilyTreeUploadProps {
  formData: any;
  onFormDataChange: (newData: any) => void;
}

const FamilyTreeUpload: React.FC<FamilyTreeUploadProps> = ({ formData, onFormDataChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 檢查文件類型
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        alert('請上傳 JPG、PNG 或 PDF 格式的文件');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(base64String);
        onFormDataChange({
          ...formData,
          familyTreeFile: {
            name: file.name,
            type: file.type,
            data: base64String,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setPreviewUrl('');
    onFormDataChange({
      ...formData,
      familyTreeFile: null,
    });
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFormDataChange({
      ...formData,
      familyTreeNotes: event.target.value,
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        家系圖 / 生態圖
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <input
            accept=".jpg,.jpeg,.png,.pdf"
            style={{ display: 'none' }}
            id="family-tree-upload"
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="family-tree-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
            >
              上傳家系圖/生態圖
            </Button>
          </label>
          <Typography variant="caption" display="block" gutterBottom>
            支援格式：JPG、PNG、PDF
          </Typography>
        </Grid>

        {previewUrl && (
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {formData.familyTreeFile?.type === 'application/pdf' ? (
                  <PictureAsPdfIcon sx={{ mr: 1 }} />
                ) : (
                  <ImageIcon sx={{ mr: 1 }} />
                )}
                <Typography>{formData.familyTreeFile?.name}</Typography>
              </Box>
              <IconButton onClick={handleDelete} color="error">
                <DeleteIcon />
              </IconButton>
            </Paper>
            {formData.familyTreeFile?.type.startsWith('image/') && (
              <Box sx={{ mb: 2, maxWidth: '100%', overflow: 'hidden' }}>
                <img
                  src={previewUrl}
                  alt="家系圖預覽"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Box>
            )}
          </Grid>
        )}

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="備註說明"
            name="familyTreeNotes"
            value={formData.familyTreeNotes || ''}
            onChange={handleNotesChange}
            placeholder="請輸入關於家系圖的補充說明..."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FamilyTreeUpload; 