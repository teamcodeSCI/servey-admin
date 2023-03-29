import React from 'react';
import CustomerList from '../pages/CustomerList';
import QuestionList from '../pages/QuestionList';
import Report from '../pages/Report';
export const URL = '/servey';

export const menu = [
  {
    name: 'Câu hỏi',
    path: `${URL}/`,
    component: <QuestionList />,
  },
  {
    name: 'Khách hàng khảo sát',
    path: `${URL}/customer`,
    component: <CustomerList />,
  },
  {
    name: 'Báo cáo',
    path: `${URL}/report`,
    component: <Report />,
  },
];
