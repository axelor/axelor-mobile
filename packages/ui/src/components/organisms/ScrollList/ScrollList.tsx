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

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {Color} from '../../../theme';
import {Text} from '../../atoms';
import {CircleButton} from '../../molecules';
import TopActions from './TopActions';
import {useConfig} from '../../../config/ConfigContext';

const DISPLAY_LOADING_DELAY_MILLISECONDS = 1500;
const BUTTON_SIZE = 40;
const SCREEN_WIDTH_50_PERCENT = Dimensions.get('window').width * 0.5;
const SCREEN_HEIGHT_50_PERCENT = Dimensions.get('window').height * 0.5;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export interface Action {
  iconName: string;
  title: string;
  color?: Color;
  onPress: () => void;
}

interface ScrollListProps {
  style?: any;
  styleFooter?: any;
  loadingList: boolean;
  data: any[];
  renderItem: (item: any) => any;
  fetchData: (fetchOptions?: any) => any[] | void;
  moreLoading: boolean;
  isListEnd: boolean;
  filter?: boolean;
  translator?: (translationKey: string) => string;
  horizontal?: boolean;
  disabledRefresh?: boolean;
  actionList?: Action[];
  verticalActions?: boolean;
  onViewableItemsChanged?: (viewableItems: any) => void;
}

const ScrollList = ({
  style,
  styleFooter,
  loadingList = false,
  data = [],
  renderItem,
  fetchData = () => [],
  moreLoading = false,
  isListEnd = false,
  filter = false,
  translator,
  horizontal = false,
  disabledRefresh = false,
  actionList,
  verticalActions = true,
  onViewableItemsChanged,
}: ScrollListProps) => {
  const {isScrollEnabled} = useConfig();

  const [, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const updateData = useCallback(() => {
    setPage(0);
    fetchData(0);
  }, [fetchData]);

  const initialize = useCallback(() => {
    updateData();
  }, [updateData]);

  const handleMoreData = useCallback(() => {
    if (!isListEnd && !moreLoading && !filter) {
      setPage(_currentPage => {
        const newPage = _currentPage + 1;
        fetchData(newPage);

        return newPage;
      });
    }
  }, [fetchData, filter, isListEnd, moreLoading]);

  const onEndReached = useCallback(() => {
    handleMoreData();
  }, [handleMoreData]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (Array.isArray(data) && data?.length === 0) {
      handleMoreData();
    }
  }, [data, handleMoreData]);

  useEffect(() => {
    if (loadingList && !moreLoading) {
      setPage(_currentPage => {
        if (_currentPage > 0) {
          return 0;
        }

        return _currentPage;
      });
    }
  }, [loadingList, moreLoading]);

  const renderActions = useCallback(() => {
    if (Array.isArray(actionList) && actionList.length > 0) {
      return (
        <TopActions actionList={actionList} verticalActions={verticalActions} />
      );
    }

    return null;
  }, [actionList, verticalActions]);

  const _renderItem = useCallback(
    ({item, index}) => {
      return (
        <>
          {index === 0 && renderActions()}
          {renderItem({item, index})}
        </>
      );
    },
    [renderActions, renderItem],
  );

  const flatList = useRef<FlatList>(null);

  const moveToTop = () => {
    flatList.current.scrollToIndex({index: 0, animated: true});
  };

  const translateY = new Animated.Value(0);

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: translateY}}}],
    {useNativeDriver: true},
  );

  const interpolation = translateY.interpolate({
    inputRange: [SCREEN_HEIGHT_50_PERCENT, SCREEN_HEIGHT_50_PERCENT + 180],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const animatedButtonStyle = {
    opacity: interpolation,
    transform: [
      {
        scale: interpolation,
      },
    ],
  };

  useEffect(() => {
    let loadingTimer;

    if (loadingList) {
      loadingTimer = setTimeout(() => {
        setIsLoading(true);
      }, DISPLAY_LOADING_DELAY_MILLISECONDS);
    } else {
      setIsLoading(false);
      clearTimeout(loadingTimer);
    }

    return () => {
      clearTimeout(loadingTimer);
    };
  }, [loadingList]);

  const renderFooter = useCallback(() => {
    return (
      <View style={[styles.footerText, styleFooter]}>
        {moreLoading && <ActivityIndicator size="large" color="black" />}
        {isListEnd && (
          <Text>
            {data == null || data?.length === 0
              ? translator != null
                ? translator('Base_NoData')
                : 'No data.'
              : translator != null
                ? translator('Base_NoMoreItems')
                : 'No more items.'}
          </Text>
        )}
      </View>
    );
  }, [data, isListEnd, moreLoading, styleFooter, translator]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container} testID="scrollListContainer">
      <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
        <CircleButton
          square={false}
          iconName="arrow-up"
          size={BUTTON_SIZE}
          onPress={moveToTop}
        />
      </Animated.View>
      {!Array.isArray(data) || data.length === 0 ? renderActions() : null}
      <AnimatedFlatList
        testID="scrollListAnimatedList"
        ref={flatList}
        style={[styles.scrollView, style]}
        data={data}
        onRefresh={disabledRefresh ? null : updateData}
        refreshing={false}
        horizontal={horizontal}
        onEndReached={onEndReached}
        ListFooterComponent={renderFooter}
        renderItem={_renderItem}
        onScroll={handleScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 1,
        }}
        scrollEnabled={isScrollEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 8,
    left: SCREEN_WIDTH_50_PERCENT - BUTTON_SIZE / 2,
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
  },
  footerText: {
    alignSelf: 'center',
    marginBottom: 7,
  },
  scrollView: {
    paddingTop: 7,
  },
});

export default ScrollList;
