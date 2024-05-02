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

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Branch from './Branch';
import {Label} from '../../molecules';
import {useThemeColor} from '../../../theme';

interface SubBranchViewProps {
  parentFieldName: string;
  branchId: number;
  openBranches: any[];
  openBranchesLastIdx: number;
  setOpenBranches: (current: any) => void;
  renderBranch: (renderParams: any) => any;
  renderLeaf: (renderParams: any) => any;
  fetchBranchData: (idParent: number) => Promise<any>;
  branchCondition: (item: any) => boolean;
  translator: (translationKey: string) => string;
}

const SubBranchView = ({
  parentFieldName,
  branchId,
  openBranches,
  openBranchesLastIdx,
  setOpenBranches,
  renderBranch,
  renderLeaf,
  fetchBranchData,
  branchCondition,
  translator,
}: SubBranchViewProps) => {
  const Colors = useThemeColor();

  const [subBranchData, setSubBranchData] = useState([]);

  useEffect(() => {
    fetchBranchData(branchId).then(res => setSubBranchData(res.data.data));
  }, [branchId, fetchBranchData]);

  return (
    <>
      {subBranchData &&
        subBranchData.map((item, index) => {
          const _openBranchesLastIdx = openBranchesLastIdx + 1;

          return (
            <View style={styles.marginLeft} key={index}>
              {branchCondition(item) ? (
                <Branch
                  branch={{item, index}}
                  parentFieldName={parentFieldName}
                  openBranches={openBranches}
                  openBranchesLastIdx={_openBranchesLastIdx}
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
            </View>
          );
        })}
      {subBranchData && subBranchData.length === 0 && (
        <ActivityIndicator
          style={styles.subBranchInfo}
          size="large"
          color={Colors.inverseColor.background}
        />
      )}
      {!subBranchData && (
        <Label
          style={styles.subBranchInfo}
          message={translator('Base_NoData')}
          type="info"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  marginLeft: {
    marginLeft: 100,
  },
  subBranchInfo: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default SubBranchView;
