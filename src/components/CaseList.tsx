import React from 'react';
import { Box, Typography, Breadcrumbs, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const CaseList: React.FC = () => {
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
          <Typography color="text.primary">個案列表</Typography>
        </Breadcrumbs>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>個案編號</TableCell>
              <TableCell>姓名</TableCell>
              <TableCell>性別</TableCell>
              <TableCell>年齡</TableCell>
              <TableCell>狀態</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>001</TableCell>
              <TableCell>張三</TableCell>
              <TableCell>男</TableCell>
              <TableCell>12</TableCell>
              <TableCell>進行中</TableCell>
              <TableCell>
                <Button
                  component={RouterLink}
                  to="/case/edit/1"
                  variant="contained"
                  size="small"
                >
                  編輯
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CaseList;
 