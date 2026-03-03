/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
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

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../theme';
import {Label} from '../../molecules';
import {ActionCardType} from '../../organisms';
import BranchCard from './BranchCard';

interface SubBranchViewProps {
  parentFieldName: string;
  branchId: number;
  openBranches: any[];
  openBranchesLastIdx: number;
  setOpenBranches: (current: any) => void;
  branchCardInfoButtonIndication: string;
  renderBranch: (renderParams: any) => any;
  getBranchActions?: (renderParams: any) => ActionCardType[];
  renderLeaf: (renderParams: any) => any;
  fetchBranchData: (idParent: number) => Promise<any>;
  branchCondition: (item: any) => boolean;
  onBranchFilterPress: (branch: any) => void;
  translator: (translationKey: string) => string;
}

const SubBranchView = ({
  parentFieldName,
  branchId,
  openBranches,
  openBranchesLastIdx,
  setOpenBranches,
  branchCardInfoButtonIndication,
  renderBranch,
  getBranchActions,
  renderLeaf,
  fetchBranchData,
  branchCondition,
  onBranchFilterPress,
  translator,
}: SubBranchViewProps) => {
  const Colors = useThemeColor();

  const [subBranchData, setSubBranchData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    fetchBranchData(branchId)
      .then(res => isMounted && setSubBranchData(res?.data?.data))
      .catch(() => setSubBranchData([]));

    return () => {
      isMounted = false;
    };
  }, [branchId, fetchBranchData]);

  if (!Array.isArray(subBranchData)) {
    return (
      <Label
        style={styles.subBranchInfo}
        message={translator != null ? translator('Base_NoData') : 'No data.'}
        type="info"
      />
    );
  }

  if (subBranchData.length === 0) {
    return (
      <ActivityIndicator
        style={styles.subBranchInfo}
        size="large"
        color={Colors.inverseColor.background}
      />
    );
  }

  return subBranchData.map((item, index) => {
    const _openBranchesLastIdx = openBranchesLastIdx + 1;

    return (
      <View style={openBranchesLastIdx < 3 && styles.marginLeft} key={index}>
        {branchCondition(item) ? (
          <Branch
            branch={{item, index}}
            parentFieldName={parentFieldName}
            openBranches={openBranches}
            openBranchesLastIdx={_openBranchesLastIdx}
            setOpenBranches={setOpenBranches}
            renderBranch={renderBranch}
            branchCardInfoButtonIndication={branchCardInfoButtonIndication}
            getBranchActions={getBranchActions}
            renderLeaf={renderLeaf}
            fetchBranchData={fetchBranchData}
            branchCondition={branchCondition}
            onBranchFilterPress={onBranchFilterPress}
            translator={translator}
          />
        ) : (
          renderLeaf({item, index})
        )}
      </View>
    );
  });
};

interface BranchProps {
  branch: {item: any; index: number};
  parentFieldName: string;
  openBranches: any[];
  openBranchesLastIdx: number;
  setOpenBranches: (current: any) => void;
  branchCardInfoButtonIndication: string;
  renderBranch: (renderParams: any) => any;
  getBranchActions?: (renderParams: any) => ActionCardType[];
  renderLeaf: (renderParams: any) => any;
  fetchBranchData: (idParent: number) => Promise<any>;
  branchCondition: (item: any) => boolean;
  onBranchFilterPress: (branch: any) => void;
  isBranchFilterVisible?: boolean;
  translator: (translationKey: string) => string;
}

const Branch = ({
  branch,
  parentFieldName,
  openBranches,
  openBranchesLastIdx,
  setOpenBranches,
  branchCardInfoButtonIndication,
  renderBranch,
  getBranchActions,
  renderLeaf,
  fetchBranchData,
  branchCondition,
  onBranchFilterPress,
  isBranchFilterVisible,
  translator,
}: BranchProps) => {
  const handleBranchPress = useCallback(() => {
    const {item} = branch;

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
    });
  }, [branch, parentFieldName, setOpenBranches]);

  const isBranchOpen = useMemo(
    () =>
      openBranches.length > openBranchesLastIdx &&
      openBranches[openBranchesLastIdx].idOpen === branch.item.id,
    [branch.item.id, openBranches, openBranchesLastIdx],
  );

  return (
    <>
      <BranchCard
        onPress={handleBranchPress}
        children={renderBranch(branch)}
        isOpen={isBranchOpen}
        parent={branch.item}
        onFilterPress={onBranchFilterPress}
        isBranchFilterVisible={isBranchFilterVisible}
        infoButtonIndication={branchCardInfoButtonIndication}
        actionList={getBranchActions?.(branch)}
        translator={translator}
      />
      {isBranchOpen && (
        <SubBranchView
          parentFieldName={parentFieldName}
          branchId={openBranches[openBranchesLastIdx].idOpen}
          openBranches={openBranches}
          openBranchesLastIdx={openBranchesLastIdx}
          setOpenBranches={setOpenBranches}
          renderBranch={renderBranch}
          branchCardInfoButtonIndication={branchCardInfoButtonIndication}
          getBranchActions={getBranchActions}
          renderLeaf={renderLeaf}
          fetchBranchData={fetchBranchData}
          branchCondition={branchCondition}
          onBranchFilterPress={onBranchFilterPress}
          translator={translator}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  marginLeft: {
    marginLeft: 15,
  },
  subBranchInfo: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default Branch;
