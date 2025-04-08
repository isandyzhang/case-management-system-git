import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Container,
  Breadcrumbs,
  Link,
  InputBase,
  IconButton,
  Avatar,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  Home,
  Search,
  Notifications,
  Settings,
  Language,
} from '@mui/icons-material';

// 定義數據類型
interface SchoolData {
  name: string;
  count: number;
  percentage: string;
  trend: string;
}

// 學校分佈數據
const schoolData: SchoolData[] = [
  {
    name: '台北市立第一國民小學',
    count: 125,
    percentage: '25%',
    trend: '+4.5%',
  },
  {
    name: '台北市立第二國民小學',
    count: 98,
    percentage: '19.6%',
    trend: '+2.1%',
  },
  {
    name: '台北市立第三國民小學',
    count: 156,
    percentage: '31.2%',
    trend: '+5.8%',
  },
  {
    name: '台北市立第四國民小學',
    count: 121,
    percentage: '24.2%',
    trend: '+3.2%',
  },
];

// 年齡分佈數據
const ageDistribution = [
  { name: '6-8歲', value: 120 },
  { name: '9-11歲', value: 180 },
  { name: '12-14歲', value: 150 },
  { name: '15-17歲', value: 90 },
  { name: '18歲以上', value: 60 },
];

// 4Q統計數據
const quarterlyStats = [
  { name: 'Q1', value: 85 },
  { name: 'Q2', value: 120 },
  { name: 'Q3', value: 95 },
  { name: 'Q4', value: 150 },
];

// 性別分佈數據
const genderDistribution = [
  { name: '男性', value: 280 },
  { name: '女性', value: 320 },
];

// 特殊身份分類數據
const specialStatus = [
  { name: '低收入戶', value: 85 },
  { name: '身心障礙', value: 45 },
  { name: '原住民', value: 30 },
  { name: '新住民', value: 40 },
  { name: '一般生', value: 400 },
];

// 平均收入分佈
const incomeDistribution = [
  { name: '3萬以下', value: 120 },
  { name: '3-5萬', value: 180 },
  { name: '5-7萬', value: 150 },
  { name: '7-10萬', value: 90 },
  { name: '10萬以上', value: 60 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ px: 2 }}>
      {/* 頂部導航區域 */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/"
            >
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              儀表板
            </Link>
            <Typography color="text.primary">數據分析</Typography>
          </Breadcrumbs>
          <Typography variant="h5" sx={{ mt: 1 }}>
            數據分析
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Paper
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
              borderRadius: '12px',
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search here"
            />
            <IconButton type="button" sx={{ p: '10px' }}>
              <Search />
            </IconButton>
          </Paper>
          <IconButton>
            <Settings />
          </IconButton>
          <IconButton>
            <Notifications />
          </IconButton>
          <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
        </Box>
      </Box>

      {/* 學校分佈數據卡片 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#4caf50', mr: 2 }}>
            <Language />
          </Avatar>
          <Typography variant="h6">學校分佈統計</Typography>
        </Box>
        <Box sx={{ overflowX: 'auto' }}>
          <Box sx={{ minWidth: 800 }}>
            {schoolData.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 2,
                  borderBottom: index < schoolData.length - 1 ? '1px solid #eee' : 'none',
                }}
              >
                <Box sx={{ width: '40%' }}>
                  <Typography>{item.name}</Typography>
                </Box>
                <Box sx={{ width: '20%' }}>
                  <Typography>{item.count}人</Typography>
                </Box>
                <Box sx={{ width: '20%' }}>
                  <Typography>{item.percentage}</Typography>
                </Box>
                <Box sx={{ width: '20%', color: item.trend.includes('+') ? '#4caf50' : '#f44336' }}>
                  <Typography>{item.trend}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>

      {/* 圖表區域 */}
      <Grid container spacing={3}>
        {/* 年齡分佈 */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              年齡分佈
            </Typography>
            <Box sx={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageDistribution}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1976d2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* 4Q統計 */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              季度統計
            </Typography>
            <Box sx={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={quarterlyStats}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4caf50" 
                    strokeWidth={2}
                    dot={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* 性別分佈 */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              性別分佈
            </Typography>
            <Box sx={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {genderDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* 特殊身份分類 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              特殊身份分類
            </Typography>
            <Box sx={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={specialStatus}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                    {specialStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* 平均收入分佈 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              平均收入分佈
            </Typography>
            <Box sx={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeDistribution}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4caf50" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 