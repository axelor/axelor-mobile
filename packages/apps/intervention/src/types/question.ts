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

import {getTypes} from '@axelor/aos-mobile-core';

class Question {
  static getStatus = (question: any, conditionalQuestion?: any): number => {
    const InterventionQuestion = getTypes().InterventionQuestion;

    if (question?.isAnswered) {
      return InterventionQuestion?.statusSelect.Answered;
    } else if (
      question?.isConditional &&
      !question.conditionalAnswerValueSet.some(
        answer => answer.id === conditionalQuestion?.listAnswer?.id,
      )
    ) {
      return InterventionQuestion?.statusSelect.Hidden;
    } else if (question?.isConditional && !question?.isRequired) {
      return InterventionQuestion?.statusSelect.Conditional;
    } else if (question?.isRequired) {
      return InterventionQuestion?.statusSelect.Required;
    } else if (question?.indicationText) {
      return InterventionQuestion?.statusSelect.Info;
    } else {
      return InterventionQuestion?.statusSelect.Default;
    }
  };
}
export default Question;
