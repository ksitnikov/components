/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {BaseHarnessFilters, ComponentHarness, HarnessPredicate} from '../../component-harness';
import {TestElement} from '../../test-element';

export interface SubComponentHarnessFilters extends BaseHarnessFilters {
  title?: string | RegExp;
  itemCount?: number;
}

/** @dynamic */
export class SubComponentHarness extends ComponentHarness {
  static readonly hostSelector = 'test-sub';

  static with(options: SubComponentHarnessFilters = {}) {
    return new HarnessPredicate(SubComponentHarness, options)
        .addOption('title', options.title,
            async (harness, title) =>
                HarnessPredicate.stringMatches((await harness.title()).text(), title))
        .addOption('item count', options.itemCount,
            async (harness, count) => (await harness.getItems()).length === count);
  }

  readonly title = this.locatorFor('h2');
  readonly getItems = this.locatorForAll('li');
  readonly globalElement = this.documentRootLocatorFactory().locatorFor('#username');

  async getItem(index: number): Promise<TestElement> {
    const items = await this.getItems();
    return items[index];
  }
}
