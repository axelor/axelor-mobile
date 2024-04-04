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

  static answerType = {
    AdvancedMonitoring: 'advancedMonitoring',
    CheckBox: 'checkbox',
    Date: 'date',
    Indication: 'indication',
    Measure: 'measure',
    Picture: 'picture',
    Signature: 'signature',
    Text: 'text',
    ValueList: 'list',
  };

  static advancedMonitoring = {
    Home: 'home',
    Office: 'office',
    PrveiousIntervention: 'previous',
    NextIntervention: 'next',
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

  static getAdvancedMonitoringAnswers = (I18n: {
    t: (key: string) => string;
  }): {id: string; title: string}[] => {
    return Object.entries(this.advancedMonitoring).map(([, value]) => ({
      id: value,
      title: this.getAdvencedMonitoringAnswer(value, I18n),
    }));
  };

  static getAdvencedMonitoringAnswer = (
    answerType: string,
    I18n: {t: (key: string) => string},
  ): string => {
    switch (answerType) {
      case this.advancedMonitoring.Home:
        return I18n.t('Intervention_AdvancedMonitoringAnswerHome');
      case this.advancedMonitoring.Office:
        return I18n.t('Intervention_AdvancedMonitoringAnswerOffice');
      case this.advancedMonitoring.PrveiousIntervention:
        return I18n.t(
          'Intervention_AdvancedMonitoringAnswerPreviousIntervention',
        );
      case this.advancedMonitoring.NextIntervention:
        return I18n.t('Intervention_AdvancedMonitoringAnswerNextIntervention');
      default:
        console.warn(
          `Type provided with value ${answerType} is not supported by advanced monitoring answer.`,
        );
        return null;
    }
  };
}
export default Question;
