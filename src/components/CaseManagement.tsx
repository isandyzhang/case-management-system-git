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
} from '@mui/material';
import { Search, Edit, Delete } from '@mui/icons-material';

// 模擬數據 - 實際使用時應該從 API 獲取
const mockCases = [
  {
    id: 1,
    name: '張小明',
    birthDate: '2010-05-15',
    phone: '0912345678',
    address: '台北市信義區',
    status: '進行中',
  },
  {
    id: 2,
    name: '李小花',
    birthDate: '2012-08-20',
    phone: '0923456789',
    address: '新北市板橋區',
    status: '已完成',
  },
  // 更多模擬數據...
];

const CaseManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name'); // 預設按姓名搜索

  // 處理搜索
  const handleSearch = () => {
    // TODO: 實現搜索邏輯
    console.log('搜索條件:', searchType, searchTerm);
  };

  // 處理編輯
  const handleEdit = (id: number) => {
    // TODO: 實現編輯邏輯
    console.log('編輯個案:', id);
  };

  // 處理刪除
  const handleDelete = (id: number) => {
    // TODO: 實現刪除邏輯
    console.log('刪除個案:', id);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        個案管理
      </Typography>

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>姓名</TableCell>
              <TableCell>生日</TableCell>
              <TableCell>電話</TableCell>
              <TableCell>地址</TableCell>
              <TableCell>狀態</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockCases.map((caseItem) => (
              <TableRow key={caseItem.id}>
                <TableCell>{caseItem.name}</TableCell>
                <TableCell>{caseItem.birthDate}</TableCell>
                <TableCell>{caseItem.phone}</TableCell>
                <TableCell>{caseItem.address}</TableCell>
                <TableCell>{caseItem.status}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(caseItem.id)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(caseItem.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CaseManagement; 