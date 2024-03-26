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

import {Color, ThemeColors} from '@axelor/aos-mobile-ui';

class Question {
  static status = {
    Answered: 1,
    Required: 2,
    Info: 3,
    Conditional: 4,
    Default: 5,
    Hidden: 6,
  };

  static getStatus = (question: any, conditionalQuestion?: any): number => {
    if (question?.isAnswered) {
      return this.status.Answered;
    } else if (
      question?.isConditional &&
      !question.conditionalAnswerValueSet.some(
        answer => answer.id === conditionalQuestion?.listAnswer?.id,
      )
    ) {
      return this.status.Hidden;
    } else if (question?.isConditional && !question?.isRequired) {
      return this.status.Conditional;
    } else if (question?.isRequired) {
      return this.status.Required;
    } else if (question?.indicationText) {
      return this.status.Info;
    } else {
      return this.status.Default;
    }
  };

  static getStatusColor = (status: number, Colors: ThemeColors): Color => {
    switch (status) {
      case this.status.Answered:
        return Colors.successColor;
      case this.status.Required:
        return Colors.importantColor;
      case this.status.Info:
        return Colors.infoColor;
      case this.status.Conditional:
        return Colors.plannedColor;
      case this.status.Default:
        return Colors.secondaryColor;
      case this.status.Hidden:
        return null;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by InterventionQuestion.`,
        );
        return null;
    }
  };
}
export default Question;
