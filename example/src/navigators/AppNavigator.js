import React from 'react';
import {Navigator} from '@aos-mobile/core';
import StockModule from '@/modules/stock';
import AuthModule from '@/modules/auth';

const modules = [StockModule, AuthModule];

const AppNavigator = () => <Navigator modules={modules} mainMenu="User" />;

export default AppNavigator;
