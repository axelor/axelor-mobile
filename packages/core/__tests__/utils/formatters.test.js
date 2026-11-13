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

import {formatRequestBody} from '../../src/utils/formatters';

describe('formatRequestBody', () => {
  it('keeps the plain values of a linked record', () => {
    const {formattedData} = formatRequestBody({
      pictureAnswer: {id: 812, fileName: 'photo.png', fileSize: 2048},
    });

    expect(formattedData.pictureAnswer).toEqual({
      id: 812,
      fileName: 'photo.png',
      fileSize: 2048,
    });
  });

  it('never sends the version of a linked record', () => {
    const {formattedData} = formatRequestBody({
      equipmentFamily: {id: 2, name: 'Stockage', version: 3, $version: 3},
    });

    expect(formattedData.equipmentFamily).toEqual({id: 2, name: 'Stockage'});
  });

  it('leaves out nested records and values set by the client', () => {
    const {formattedData} = formatRequestBody({
      partner: {
        id: 1,
        fullName: 'APOLLO',
        mainAddress: {id: 4, fullName: 'Paris'},
        emailAddressList: [{id: 5}],
        $attachments: 2,
        archived: null,
      },
    });

    expect(formattedData.partner).toEqual({id: 1, fullName: 'APOLLO'});
  });

  it('formats each linked record of a list the same way', () => {
    const {formattedData} = formatRequestBody({
      answerValueList: [
        {id: 7, name: 'Yes', version: 1},
        {id: 8, name: 'No', $version: 0},
      ],
      tags: ['urgent'],
    });

    expect(formattedData.answerValueList).toEqual([
      {id: 7, name: 'Yes'},
      {id: 8, name: 'No'},
    ]);
    expect(formattedData.tags).toEqual(['urgent']);
  });

  it('keeps only the id of a linked record not saved yet', () => {
    const {formattedData} = formatRequestBody({
      contract: {name: 'Draft'},
      parentEquipment: {id: null, name: 'Draft place'},
    });

    expect(formattedData.contract).toEqual({id: undefined});
    expect(formattedData.parentEquipment).toEqual({id: null});
  });

  it('keeps the name of a file picked offline next to its temporary id', () => {
    const {formattedData} = formatRequestBody({
      pictureAnswer: {id: -1000000000001, fileName: 'photo.png'},
    });

    expect(formattedData.pictureAnswer).toEqual({
      id: -1000000000001,
      fileName: 'photo.png',
    });
  });

  it('keeps an id given as text', () => {
    const {formattedData} = formatRequestBody({
      partner: {id: '18', fullName: 'APOLLO'},
    });

    expect(formattedData.partner).toEqual({id: '18', fullName: 'APOLLO'});
  });

  it('reduces an object that is not a record to an empty id', () => {
    const {formattedData} = formatRequestBody({
      plannedDate: new Date('2026-11-11T10:00:00Z'),
    });

    expect(formattedData.plannedDate).toEqual({id: undefined});
  });

  it('keeps plain values next to records in the same list', () => {
    const {formattedData} = formatRequestBody({
      mixedList: [{id: 7, name: 'Yes', version: 1}, 'text', 3],
    });

    expect(formattedData.mixedList).toEqual([{id: 7, name: 'Yes'}, 'text', 3]);
  });

  it('keeps the record fields and their matchers unchanged', () => {
    const {formattedData, matchers} = formatRequestBody(
      {id: 4, version: 1, name: 'Moniteurs', inService: true},
      'data',
    );

    expect(formattedData).toEqual({
      id: 4,
      version: 1,
      name: 'Moniteurs',
      inService: true,
    });
    expect(matchers).toEqual({
      'data.id': 'id',
      'data.version': 'version',
      'data.name': 'name',
      'data.inService': 'inService',
    });
  });
});
