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
import {ActionType, ScrollList} from '../../organisms';
import Branch from './Branch';

interface TreeViewProps {
  style?: any;
  styleFooter?: any;
  loadingList: boolean;
  data: any[];
  parentFieldName: string;
  /**
   * Function used to display what is inside a branch card.
   */
  renderBranch: (renderParams: any) => any;
  /**
   * Function used to display a leaf card.
   */
  renderLeaf: (renderParams: any) => any;
  /**
   * Function used to fetch elements at the root, those that have no parent.
   */
  fetchData: (fetchOptions?: any) => any[] | void;
  /**
   * Function used to fetch elements of a branch.
   */
  fetchBranchData: (idParent: number) => Promise<any>;
  /**
   * Function used to determine if an element is a branch or a leaf.
   */
  branchCondition: (item: any) => boolean;
  moreLoading: boolean;
  isListEnd: boolean;
  filter?: boolean;
  translator?: (translationKey: string) => string;
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
  disabledRefresh = false,
  actionList,
  verticalActions,
}: TreeViewProps) => {
  const [openBranches, setOpenBranches] = useState([]);

  const _renderItem = ({item, index}) => {
    return branchCondition(item) ? (
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
      disabledRefresh={disabledRefresh}
      actionList={actionList}
      verticalActions={verticalActions}
    />
  );
};

export default TreeView;
