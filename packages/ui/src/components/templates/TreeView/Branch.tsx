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

import React, {useCallback} from 'react';
import BranchCard from './BranchCard';
import SubBranchView from './SubBranchView';

interface BranchProps {
  branch: {item: any; index: number};
  parentFieldName: string;
  openBranches: any[];
  openBranchesLastIdx: number;
  setOpenBranches: (current: any) => void;
  renderBranch: (renderParams: any) => any;
  renderLeaf: (renderParams: any) => any;
  fetchBranchData: (idParent: number) => Promise<any>;
  branchCondition: (item: any) => boolean;
  translator?: (translationKey: string) => string;
}

const Branch = ({
  branch,
  parentFieldName,
  openBranches,
  openBranchesLastIdx,
  setOpenBranches,
  renderBranch,
  renderLeaf,
  fetchBranchData,
  branchCondition,
  translator,
}: BranchProps) => {
  const handleBranchPress = useCallback(
    item =>
      setOpenBranches(current => {
        const newBranch = {
          idParent: item[parentFieldName]?.id,
          idOpen: item.id,
        };
        const branchIndex = current.findIndex(
          _branch => _branch.idOpen === newBranch.idOpen,
        );

        if (branchIndex >= 0) {
          return current.slice(0, branchIndex);
        } else {
          const sameParentBranchIndex = current.findIndex(
            _branch => _branch.idParent === newBranch.idParent,
          );

          let _current = [...current];
          if (sameParentBranchIndex >= 0) {
            _current = _current.slice(0, sameParentBranchIndex);
          }

          return [..._current, newBranch];
        }
      }),
    [parentFieldName, setOpenBranches],
  );

  return (
    <>
      <BranchCard
        onPress={() => {
          handleBranchPress(branch.item);
        }}
        children={renderBranch(branch)}
        isOpen={
          !!openBranches.find(_branch => _branch.idOpen === branch.item.id)
        }
      />
      {openBranches.length > openBranchesLastIdx &&
        openBranches[openBranchesLastIdx].idOpen === branch.item.id && (
          <SubBranchView
            parentFieldName={parentFieldName}
            branchId={openBranches[openBranchesLastIdx].idOpen}
            openBranches={openBranches}
            openBranchesLastIdx={openBranchesLastIdx}
            setOpenBranches={setOpenBranches}
            renderBranch={renderBranch}
            renderLeaf={renderLeaf}
            fetchBranchData={fetchBranchData}
            branchCondition={branchCondition}
            translator={translator}
          />
        )}
    </>
  );
};

export default Branch;
