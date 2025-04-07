export interface School {
  value: string;
  label: string;
  type: 'high' | 'junior' | 'elementary';
  district: string;
}

export const taipeiSchools: School[] = [
  // 高中
  { value: 'taipei1', label: '台北市立第一女子高級中學', type: 'high', district: '中正區' },
  { value: 'taipei2', label: '台北市立建國高級中學', type: 'high', district: '中正區' },
  { value: 'taipei3', label: '台北市立成功高級中學', type: 'high', district: '中正區' },
  { value: 'taipei4', label: '台北市立中山女子高級中學', type: 'high', district: '中山區' },
  { value: 'taipei5', label: '台北市立松山高級中學', type: 'high', district: '信義區' },
  { value: 'taipei6', label: '台北市立大同高級中學', type: 'high', district: '中山區' },
  { value: 'taipei7', label: '台北市立大安高級工業職業學校', type: 'high', district: '大安區' },
  { value: 'taipei8', label: '台北市立士林高級商業職業學校', type: 'high', district: '士林區' },
  { value: 'taipei9', label: '台北市立內湖高級工業職業學校', type: 'high', district: '內湖區' },
  { value: 'taipei10', label: '台北市立南港高級工業職業學校', type: 'high', district: '南港區' },
  // 國中
  { value: 'taipei11', label: '台北市立中正國民中學', type: 'junior', district: '中正區' },
  { value: 'taipei12', label: '台北市立金華國民中學', type: 'junior', district: '大安區' },
  { value: 'taipei13', label: '台北市立龍山國民中學', type: 'junior', district: '萬華區' },
  { value: 'taipei14', label: '台北市立民生國民中學', type: 'junior', district: '松山區' },
  { value: 'taipei15', label: '台北市立敦化國民中學', type: 'junior', district: '松山區' },
  // 國小
  { value: 'taipei16', label: '台北市立中正國民小學', type: 'elementary', district: '中正區' },
  { value: 'taipei17', label: '台北市立金華國民小學', type: 'elementary', district: '大安區' },
  { value: 'taipei18', label: '台北市立龍山國民小學', type: 'elementary', district: '萬華區' },
  { value: 'taipei19', label: '台北市立民生國民小學', type: 'elementary', district: '松山區' },
  { value: 'taipei20', label: '台北市立敦化國民小學', type: 'elementary', district: '松山區' }
];

export const newTaipeiSchools: School[] = [
  // 高中
  { value: 'newtaipei1', label: '新北市立板橋高級中學', type: 'high', district: '板橋區' },
  { value: 'newtaipei2', label: '新北市立三重高級中學', type: 'high', district: '三重區' },
  { value: 'newtaipei3', label: '新北市立新莊高級中學', type: 'high', district: '新莊區' },
  { value: 'newtaipei4', label: '新北市立中和高級中學', type: 'high', district: '中和區' },
  { value: 'newtaipei5', label: '新北市立永平高級中學', type: 'high', district: '永和區' },
  { value: 'newtaipei6', label: '新北市立新店高級中學', type: 'high', district: '新店區' },
  { value: 'newtaipei7', label: '新北市立樹林高級中學', type: 'high', district: '樹林區' },
  { value: 'newtaipei8', label: '新北市立明德高級中學', type: 'high', district: '三峽區' },
  { value: 'newtaipei9', label: '新北市立淡水高級商工職業學校', type: 'high', district: '淡水區' },
  { value: 'newtaipei10', label: '新北市立瑞芳高級工業職業學校', type: 'high', district: '瑞芳區' },
  // 國中
  { value: 'newtaipei11', label: '新北市立板橋國民中學', type: 'junior', district: '板橋區' },
  { value: 'newtaipei12', label: '新北市立三重國民中學', type: 'junior', district: '三重區' },
  { value: 'newtaipei13', label: '新北市立新莊國民中學', type: 'junior', district: '新莊區' },
  { value: 'newtaipei14', label: '新北市立中和國民中學', type: 'junior', district: '中和區' },
  { value: 'newtaipei15', label: '新北市立永和國民中學', type: 'junior', district: '永和區' },
  // 國小
  { value: 'newtaipei16', label: '新北市立板橋國民小學', type: 'elementary', district: '板橋區' },
  { value: 'newtaipei17', label: '新北市立三重國民小學', type: 'elementary', district: '三重區' },
  { value: 'newtaipei18', label: '新北市立新莊國民小學', type: 'elementary', district: '新莊區' },
  { value: 'newtaipei19', label: '新北市立中和國民小學', type: 'elementary', district: '中和區' },
  { value: 'newtaipei20', label: '新北市立永和國民小學', type: 'elementary', district: '永和區' }
]; 