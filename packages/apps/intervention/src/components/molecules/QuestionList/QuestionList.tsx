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

import React from 'react';
import {useSelector} from '@axelor/aos-mobile-core';
import {Picker} from '@axelor/aos-mobile-ui';

interface QuestionListProps {
  defaultValue?: string;
  onChange?: (any: any) => void;
  readonly?: boolean;
  required?: boolean;
}

const QuestionListAux = ({
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: QuestionListProps) => {
  const {question} = useSelector((state: any) => state.intervention_question);

  return (
    <Picker
      defaultValue={defaultValue}
      listItems={question.answerValueList}
      labelField="name"
      valueField="id"
      emptyValue={false}
      onValueChange={onChange}
      required={required}
      readonly={readonly}
      isValueItem={true}
      isScrollViewContainer={true}
    />
  );
};

const QuestionList = ({
  defaultValue = null,
  onChange = () => {},
  readonly = false,
  required = false,
}: QuestionListProps) => {
  return (
    <QuestionListAux
      defaultValue={defaultValue}
      onChange={onChange}
      readonly={readonly}
      required={required}
    />
  );
};

export default QuestionList;
