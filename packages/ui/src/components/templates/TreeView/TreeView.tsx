/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2024 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {useState} from 'react';
import Branch from './Branch';
import {ActionType, ScrollList} from '../../organisms';

interface TreeViewProps {
  style?: any;
  styleFooter?: any;
  loadingList: boolean;
  data: any[];
  parentFieldName: string;
  renderBranch: (renderParams: any) => any;
  renderLeaf: (renderParams: any) => any;
  fetchData: (fetchOptions?: any) => any[] | void;
  fetchBranchData: (idParent: number) => Promise<any>;
  branchCondition: (item: any) => boolean;
  moreLoading: boolean;
  isListEnd: boolean;
  filter?: boolean;
  translator: (translationKey: string) => string;
  horizontal?: boolean;
  disabledRefresh?: boolean;
  actionList?: ActionType[];
  verticalActions?: boolean;
}

const TreeView = ({
  style,
  styleFooter,
  loadingList = false,
  data = [],
  parentFieldName,
  renderBranch,
  renderLeaf,
  fetchData = () => [],
  fetchBranchData,
  branchCondition,
  moreLoading = false,
  isListEnd = false,
  filter = false,
  translator,
  horizontal = false,
  disabledRefresh = false,
  actionList,
  verticalActions,
}: TreeViewProps) => {
  const [openBranches, setOpenBranches] = useState([]);

  const _renderItem = ({item, index}) => {
    return (
      <>
        {branchCondition(item) ? (
          <Branch
            branch={{item, index}}
            parentFieldName={parentFieldName}
            openBranches={openBranches}
            openBranchesLastIdx={0}
            setOpenBranches={setOpenBranches}
            renderBranch={renderBranch}
            renderLeaf={renderLeaf}
            fetchBranchData={fetchBranchData}
            branchCondition={branchCondition}
            translator={translator}
          />
        ) : (
          renderLeaf({item, index})
        )}
      </>
    );
  };

  return (
    <ScrollList
      style={style}
      styleFooter={styleFooter}
      loadingList={loadingList}
      data={data}
      renderItem={_renderItem}
      fetchData={fetchData}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      filter={filter}
      translator={translator}
      horizontal={horizontal}
      disabledRefresh={disabledRefresh}
      actionList={actionList}
      verticalActions={verticalActions}
    />
  );
};

export default TreeView;
