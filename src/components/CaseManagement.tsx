import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  IconButton,
  InputAdornment,
  Collapse,
  Chip,
  Breadcrumbs,
  Link,
  Avatar,
} from '@mui/material';
import { 
  Search, 
  Edit, 
  KeyboardArrowDown, 
  KeyboardArrowUp,
  Home,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

// 修改模擬數據
const mockCases = [
  {
    id: 1,
    name: '張小明',
    birthDate: '2010-05-15',
    phone: '0912345678',
    address: '台北市信義區',
    status: '進行中',
    avatar: 'https://i.pravatar.cc/150?img=1',
    contact: {
      primary: {
        name: '張大明',
        relation: '父親',
        phone: '0933445566',
      },
      secondary: {
        name: '張小美',
        relation: '姊姊',
        phone: '0922334455',
      }
    },
    specialStatus: {
      lowIncome: true,
      disability: false,
      indigenous: true,
    },
    economicStatus: {
      monthlyIncome: '30000-40000',
      hasDebt: true,
    },
    scores: {
      fq: 85,
      hq: 75,
      iq: 90,
      eq: 82,
    },
  },
  {
    id: 2,
    name: '李小花',
    birthDate: '2012-08-20',
    phone: '0923456789',
    address: '新北市板橋區',
    status: '已完成',
    avatar: 'https://i.pravatar.cc/150?img=2',
    contact: {
      primary: {
        name: '李大華',
        relation: '母親',
        phone: '0955667788',
      },
      secondary: {
        name: '李小龍',
        relation: '弟弟',
        phone: '0977889900',
      }
    },
    specialStatus: {
      lowIncome: false,
      disability: true,
      indigenous: false,
    },
    economicStatus: {
      monthlyIncome: '20000-30000',
      hasDebt: false,
    },
    scores: {
      fq: 78,
      hq: 88,
      iq: 85,
      eq: 90,
    },
  },
];

// 更新 interface
interface CaseData {
  id: number;
  name: string;
  birthDate: string;
  phone: string;
  address: string;
  status: string;
  avatar: string;
  contact: {
    primary: {
      name: string;
      relation: string;
      phone: string;
    };
    secondary: {
      name: string;
      relation: string;
      phone: string;
    };
  };
  specialStatus: {
    lowIncome: boolean;
    disability: boolean;
    indigenous: boolean;
  };
  economicStatus: {
    monthlyIncome: string;
    hasDebt: boolean;
  };
  scores: {
    fq: number;
    hq: number;
    iq: number;
    eq: number;
  };
}

const CaseManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const navigate = useNavigate();

  // 處理搜索
  const handleSearch = () => {
    console.log('搜索條件:', searchType, searchTerm);
  };

  // 處理展開/收起
  const handleExpandRow = (id: number) => {
    setExpandedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  // 處理編輯
  const handleEdit = (id: number) => {
    navigate(`/cases/${id}`);
  };

  // 獲取狀態顏色
  const getStatusColor = (status: string) => {
    switch (status) {
      case '進行中':
        return 'primary';
      case '已完成':
        return 'success';
      default:
        return 'default';
    }
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
          <Typography color="text.primary">個案管理</Typography>
        </Breadcrumbs>
      </Box>

      {/* 搜索區域 */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="搜索類型"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              <option value="name">姓名</option>
              <option value="birthDate">生日</option>
              <option value="phone">電話</option>
              <option value="address">地址</option>
              <option value="status">狀態</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={7}>
            <TextField
              fullWidth
              label="搜索內容"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSearch}
            >
              搜索
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* 個案列表 */}
      <TableContainer component={Paper} sx={{ p: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>姓名</TableCell>
              <TableCell>生日</TableCell>
              <TableCell>電話</TableCell>
              <TableCell>地址</TableCell>
              <TableCell>狀態</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockCases.map((caseItem: CaseData) => (
              <React.Fragment key={caseItem.id}>
                <TableRow 
                  sx={{
                    backgroundColor: expandedRows.includes(caseItem.id) ? 'rgba(0, 0, 0, 0.04)' : 'inherit',
                    '&:hover': {
                      backgroundColor: expandedRows.includes(caseItem.id) ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <TableCell padding="checkbox">
                    <IconButton
                      size="small"
                      onClick={() => handleExpandRow(caseItem.id)}
                    >
                      {expandedRows.includes(caseItem.id) ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        src={caseItem.avatar} 
                        alt={caseItem.name}
                        sx={{ width: 40, height: 40 }}
                      />
                      {caseItem.name}
                    </Box>
                  </TableCell>
                  <TableCell>{caseItem.birthDate}</TableCell>
                  <TableCell>{caseItem.phone}</TableCell>
                  <TableCell>{caseItem.address}</TableCell>
                  <TableCell>
                    <Chip 
                      label={caseItem.status} 
                      color={getStatusColor(caseItem.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(caseItem.id)}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={expandedRows.includes(caseItem.id)} timeout="auto" unmountOnExit>
                      <Box sx={{ 
                        margin: 2,
                        backgroundColor: 'background.paper',
                        borderRadius: 1,
                        boxShadow: 1,
                        p: 2
                      }}>
                        <Grid container spacing={3}>
                          {/* 聯絡人資訊 */}
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                              主要聯絡人
                            </Typography>
                            <Box sx={{ 
                              backgroundColor: 'background.default',
                              p: 2,
                              borderRadius: 1
                            }}>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                姓名：{caseItem.contact.primary.name}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                關係：{caseItem.contact.primary.relation}
                              </Typography>
                              <Typography variant="body2">
                                電話：{caseItem.contact.primary.phone}
                              </Typography>
                            </Box>
                            <Typography variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold', mt: 2 }}>
                              次要聯絡人
                            </Typography>
                            <Box sx={{ 
                              backgroundColor: 'background.default',
                              p: 2,
                              borderRadius: 1
                            }}>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                姓名：{caseItem.contact.secondary.name}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                關係：{caseItem.contact.secondary.relation}
                              </Typography>
                              <Typography variant="body2">
                                電話：{caseItem.contact.secondary.phone}
                              </Typography>
                            </Box>
                          </Grid>

                          {/* 特殊狀況 */}
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                              特殊狀況
                            </Typography>
                            <Box sx={{ 
                              display: 'flex', 
                              gap: 1, 
                              flexWrap: 'wrap',
                              backgroundColor: 'background.default',
                              p: 2,
                              borderRadius: 1
                            }}>
                              {caseItem.specialStatus.lowIncome && (
                                <Chip label="低收入戶" size="small" color="warning" />
                              )}
                              {caseItem.specialStatus.disability && (
                                <Chip label="身心障礙" size="small" color="error" />
                              )}
                              {caseItem.specialStatus.indigenous && (
                                <Chip label="原住民" size="small" color="info" />
                              )}
                            </Box>
                            <Typography variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold', mt: 2 }}>
                              經濟狀況
                            </Typography>
                            <Box sx={{ 
                              backgroundColor: 'background.default',
                              p: 2,
                              borderRadius: 1
                            }}>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                月收入：{caseItem.economicStatus.monthlyIncome}
                              </Typography>
                              <Typography variant="body2">
                                負債情況：{caseItem.economicStatus.hasDebt ? '有' : '無'}
                              </Typography>
                            </Box>
                          </Grid>
                          
                          {/* 4Q評分 */}
                          <Grid item xs={12} md={4}>
                            <Typography variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                              4Q評分
                            </Typography>
                            <Box sx={{ 
                              display: 'flex', 
                              gap: 2, 
                              flexWrap: 'wrap',
                              backgroundColor: 'background.default',
                              p: 2,
                              borderRadius: 1
                            }}>
                              <Chip 
                                label={`FQ: ${caseItem.scores.fq}`} 
                                size="small" 
                                color={caseItem.scores.fq >= 85 ? 'success' : 'default'}
                              />
                              <Chip 
                                label={`HQ: ${caseItem.scores.hq}`} 
                                size="small"
                                color={caseItem.scores.hq >= 85 ? 'success' : 'default'}
                              />
                              <Chip 
                                label={`IQ: ${caseItem.scores.iq}`} 
                                size="small"
                                color={caseItem.scores.iq >= 85 ? 'success' : 'default'}
                              />
                              <Chip 
                                label={`EQ: ${caseItem.scores.eq}`} 
                                size="small"
                                color={caseItem.scores.eq >= 85 ? 'success' : 'default'}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CaseManagement; 