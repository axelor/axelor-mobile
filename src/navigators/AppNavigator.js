import React from 'react';
import Navigator from './Navigator';
import StockModule from '@/modules/stock';
import AuthModule from '@/modules/auth';

const modules = [StockModule, AuthModule];

const AppNavigator = () => <Navigator modules={modules} mainMenu="User" />;

export default AppNavigator;
