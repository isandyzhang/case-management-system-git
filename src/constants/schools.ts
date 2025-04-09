export interface School {
  id: string;
  name: string;
  district: string;
  type: 'elementary' | 'junior' | 'high';
  value: string;
  label: string;
}

export const taipeiSchools: School[] = [
  { id: '1', name: '台北市立中正國小', district: '中正區', type: 'elementary', value: 'taipei1', label: '台北市立中正國小' },
  { id: '2', name: '台北市立大安國小', district: '大安區', type: 'elementary', value: 'taipei2', label: '台北市立大安國小' },
  { id: '3', name: '台北市立信義國小', district: '信義區', type: 'elementary', value: 'taipei3', label: '台北市立信義國小' },
  { id: '4', name: '台北市立松山國小', district: '松山區', type: 'elementary', value: 'taipei4', label: '台北市立松山國小' },
  { id: '5', name: '台北市立中山國小', district: '中山區', type: 'elementary', value: 'taipei5', label: '台北市立中山國小' },
];

export const newTaipeiSchools: School[] = [
  { id: '6', name: '新北市立板橋國小', district: '板橋區', type: 'elementary', value: 'newtaipei1', label: '新北市立板橋國小' },
  { id: '7', name: '新北市立中和國小', district: '中和區', type: 'elementary', value: 'newtaipei2', label: '新北市立中和國小' },
  { id: '8', name: '新北市立永和國小', district: '永和區', type: 'elementary', value: 'newtaipei3', label: '新北市立永和國小' },
  { id: '9', name: '新北市立新莊國小', district: '新莊區', type: 'elementary', value: 'newtaipei4', label: '新北市立新莊國小' },
  { id: '10', name: '新北市立三重國小', district: '三重區', type: 'elementary', value: 'newtaipei5', label: '新北市立三重國小' },
]; 