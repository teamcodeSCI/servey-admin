import React from 'react';
import CustomerList from '../pages/CustomerList';
import QuestionList from '../pages/QuestionList';
import Report from '../pages/Report';

export const menu = [
  {
    name: 'Câu hỏi',
    path: '',
    component: <QuestionList />,
  },
  {
    name: 'Khách hàng khảo sát',
    path: '/customer',
    component: <CustomerList />,
  },
  {
    name: 'Báo cáo',
    path: '/report',
    component: <Report />,
  },
];
