import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Autocomplete,
  Breadcrumbs,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Email as EmailIcon, Home } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import zhTW from 'date-fns/locale/zh-TW';
import { Link as RouterLink } from 'react-router-dom';

interface Activity {
  id: string;
  title: string;
  type: string;
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;
  eligibility: string[];
  maxParticipants: number;
  currentParticipants: number;
  status: 'active' | 'completed' | 'cancelled';
}

const ActivityManagement: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    type: '',
    startDate: new Date(),
    endDate: new Date(),
    location: '',
    description: '',
    eligibility: [] as string[],
    maxParticipants: 0,
  });

  const activityTypes = [
    '生活扶助金發放',
    '情緒體驗營',
    '親子工作坊',
    '課後輔導',
    '心理諮商',
    '家庭訪視',
  ];

  const eligibilityOptions = [
    '低收入戶',
    '中低收入戶',
    '身心障礙',
    '原住民',
    '單親家庭',
    '特殊境遇家庭',
  ];

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setSelectedActivity(null);
    setFormData({
      title: '',
      type: '',
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      description: '',
      eligibility: [],
      maxParticipants: 0,
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    const newActivity: Activity = {
      id: selectedActivity?.id || Date.now().toString(),
      ...formData,
      currentParticipants: 0,
      status: 'active',
    };

    if (selectedActivity) {
      setActivities(activities.map(activity => 
        activity.id === selectedActivity.id ? newActivity : activity
      ));
    } else {
      setActivities([...activities, newActivity]);
    }

    handleCloseDialog();
  };

  const handleOpenEmailDialog = (activity: Activity) => {
    setSelectedActivity(activity);
    setOpenEmailDialog(true);
  };

  const handleSendEmail = () => {
    // 這裡添加發送郵件的邏輯
    console.log('發送郵件給符合條件的個案:', selectedActivity);
    setOpenEmailDialog(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.primary',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            <Home sx={{ mr: 0.5, fontSize: 20 }} />
            首頁
          </Box>
          <Typography color="text.primary">活動管理</Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          新增活動
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>活動名稱</TableCell>
              <TableCell>類型</TableCell>
              <TableCell>日期</TableCell>
              <TableCell>地點</TableCell>
              <TableCell>參與人數</TableCell>
              <TableCell>狀態</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.title}</TableCell>
                <TableCell>{activity.type}</TableCell>
                <TableCell>
                  {activity.startDate.toLocaleDateString()} - {activity.endDate.toLocaleDateString()}
                </TableCell>
                <TableCell>{activity.location}</TableCell>
                <TableCell>
                  {activity.currentParticipants}/{activity.maxParticipants}
                </TableCell>
                <TableCell>
                  <Chip
                    label={activity.status === 'active' ? '進行中' : 
                           activity.status === 'completed' ? '已結束' : '已取消'}
                    color={activity.status === 'active' ? 'success' : 
                           activity.status === 'completed' ? 'default' : 'error'}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEmailDialog(activity)}>
                    <EmailIcon />
                  </IconButton>
                  <IconButton onClick={() => {
                    setSelectedActivity(activity);
                    setFormData({
                      title: activity.title,
                      type: activity.type,
                      startDate: activity.startDate,
                      endDate: activity.endDate,
                      location: activity.location,
                      description: activity.description,
                      eligibility: activity.eligibility,
                      maxParticipants: activity.maxParticipants,
                    });
                    setOpenDialog(true);
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => {
                    setActivities(activities.filter(a => a.id !== activity.id));
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 新增/編輯活動對話框 */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedActivity ? '編輯活動' : '新增活動'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="活動名稱"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>活動類型</InputLabel>
              <Select
                value={formData.type}
                label="活動類型"
                onChange={(e: SelectChangeEvent) => setFormData({ ...formData, type: e.target.value })}
              >
                {activityTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhTW}>
              <DatePicker
                label="開始日期"
                value={formData.startDate}
                onChange={(date) => date && setFormData({ ...formData, startDate: date })}
              />
              <DatePicker
                label="結束日期"
                value={formData.endDate}
                onChange={(date) => date && setFormData({ ...formData, endDate: date })}
              />
            </LocalizationProvider>
            <TextField
              label="地點"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              fullWidth
            />
            <TextField
              label="活動說明"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={4}
              fullWidth
            />
            <Autocomplete
              multiple
              options={eligibilityOptions}
              value={formData.eligibility}
              onChange={(_, newValue) => setFormData({ ...formData, eligibility: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="參與資格" />
              )}
            />
            <TextField
              label="最大參與人數"
              type="number"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedActivity ? '更新' : '創建'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 發送郵件對話框 */}
      <Dialog open={openEmailDialog} onClose={() => setOpenEmailDialog(false)}>
        <DialogTitle>發送活動通知</DialogTitle>
        <DialogContent>
          <Typography>
            確定要發送「{selectedActivity?.title}」活動通知給符合條件的個案嗎？
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            符合條件：{selectedActivity?.eligibility.join('、')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEmailDialog(false)}>取消</Button>
          <Button onClick={handleSendEmail} variant="contained" color="primary">
            發送
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActivityManagement; 