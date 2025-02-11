import classnames from "classnames";
import { clamp, memoize } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { COUNTERS_LOOKUP } from "../../../../../data/counters";
import { ITEMS_FROM_COUNTER } from "../../../../../data/items";
import { ConjugationCategory, Counter, Item } from "../../../../interfaces";
import Localization from "../../../../localization";
import { State } from "../../../../redux";
import { getLocalization } from "../../../../redux/selectors";
import { conjugateCounter, ConjugatedInfo } from "../../../../utils";

import BreadcrumbBar from "../BreadcrumbBar";

import "./ExploreCounterPage.scss";

const AMOUNTS_TO_DISPLAY = 17;
const MIN_USER_INPUT = 1;
const MAX_USER_INPUT = 999_999_999;

interface Irregular {
  conjugation: string;
  amount: number;
}

const getConjugations = memoize(
  (counter: Counter): ReadonlyArray<ReadonlyArray<ConjugatedInfo>> => {
    const results: Array<ReadonlyArray<ConjugatedInfo>> = [];
    for (let amount = 1; amount <= AMOUNTS_TO_DISPLAY; ++amount) {
      results[amount - 1] = conjugateCounter(amount, counter);
    }

    return results;
  },
  (counter: Counter) => counter.counterId
);

const countIrregulars = memoize(
  (conjugations: ReadonlyArray<ReadonlyArray<ConjugatedInfo>>) =>
    conjugations.reduce(
      (total: number, nested: ReadonlyArray<ConjugatedInfo>) => {
        return (
          total +
          nested.filter(
            ({ category }) => category === ConjugationCategory.Irregular
          ).length
        );
      },
      0
    )
);

function compareIrregulars(a: Irregular, b: Irregular): number {
  return a.amount - b.amount;
}

const getFurtherIrregulars = memoize(
  (counter: Counter): ReadonlyArray<Irregular> => {
    const results: Irregular[] = [];
    Object.keys(counter.irregulars).forEach(amountStr => {
      const amount = parseInt(amountStr, 10);
      if (amount <= AMOUNTS_TO_DISPLAY) {
        return;
      }

      // TODO: This won't group multiple irregulars of the same amount so
      // they'll appear on different lines.
      const conjugations = conjugateCounter(amount, counter);
      for (const conjugation of conjugations) {
        results.push({
          amount,
          conjugation: conjugation.kana
        });
      }
    });

    results.sort(compareIrregulars);
    return results;
  },
  (counter: Counter) => counter.counterId
);

function highlightIrregular(contents: string) {
  return (
    <span className="irregular" key={contents}>
      {contents}
    </span>
  );
}

interface ReduxProps {
  localization: Localization;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    localization: getLocalization(state)
  };
}

type ComponentProps = ReduxProps & RouteComponentProps<{ counterId: string }>;

interface ComponentState {
  currentUserInput: number;
}

class ExploreCounterPage extends React.PureComponent<
  ComponentProps,
  ComponentState
> {
  public state: ComponentState = {
    currentUserInput: AMOUNTS_TO_DISPLAY + 1
  };

  private get counter(): Counter | null {
    const {
      match: {
        params: { counterId }
      }
    } = this.props;
    return COUNTERS_LOOKUP[counterId] || null;
  }

  public render() {
    const {
      counter,
      props: { localization },
      state: { currentUserInput }
    } = this;
    if (!counter) {
      return <Redirect to="/explore" />;
    }

    const conjugations = getConjugations(counter);
    const furtherIrregulars = getFurtherIrregulars(counter);
    const items = ITEMS_FROM_COUNTER[counter.counterId];
    return (
      <div className="ExploreCounterPage">
        <BreadcrumbBar />
        <div className="contents">
          <h3>{localization.counterName(counter)}</h3>
          <div className="kanji">{counter.kanji}</div>
          <p className="examples-prefix">
            {localization.hereAreTheFirstXNumbers(AMOUNTS_TO_DISPLAY)}{" "}
            {this.renderIrregularsWarning(counter)}
          </p>
          <div className="examples-table">
            {conjugations.map(this.renderAmountTile)}
            <div className="etc">{localization.andSoForth}</div>
          </div>
          {!!furtherIrregulars.length && (
            <React.Fragment>
              <p className="further-irregulars">
                {localization.furtherIrregulars}
              </p>
              <div className="examples-table">
                {furtherIrregulars.map(this.renderFurtherIrregular)}
              </div>
            </React.Fragment>
          )}
          <p className="custom-input-prefix">
            {localization.customCounterAmountInputPrefix}
          </p>
          <div className="conjugated-user-input">
            {conjugateCounter(currentUserInput, counter).map(
              this.renderCurrentUserInputItem
            )}
          </div>
          <input
            type="number"
            className="current-user-input"
            min={MIN_USER_INPUT}
            max={MAX_USER_INPUT}
            value={currentUserInput}
            onChange={this.onUserInputChanged}
          />
          {items.length > 1 && ( // don't show list if only one item, will be rule
            <React.Fragment>
              <p className="items-prefix">
                {localization.counterItemsPrefix(items.length)}
              </p>
              <div className="items-list">{items.map(this.renderItem)}</div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }

  private renderIrregularsWarning(counter: Counter) {
    const {
      props: { localization }
    } = this;
    const conjugations = getConjugations(counter);
    const furtherIrregulars = getFurtherIrregulars(counter);
    const numIrregulars =
      countIrregulars(conjugations) + furtherIrregulars.length;
    if (!numIrregulars) {
      return localization.irregularsWarningNoIrregulars;
    }

    return localization.irregularsWarning(numIrregulars, highlightIrregular);
  }

  private renderAmountTile = (
    conjugations: ReadonlyArray<ConjugatedInfo>,
    index: number
  ) => {
    const amount = index + 1;
    return (
      <div className="conjugation-container" key={index}>
        <div className="amount">{amount}</div>
        <div className="conjugations">
          {conjugations.map(this.renderConjugation)}
        </div>
      </div>
    );
  };

  private renderConjugation = ({ category, kana }: ConjugatedInfo) => {
    return (
      <div
        key={kana}
        className={classnames(
          category === ConjugationCategory.Strange && "strange",
          category === ConjugationCategory.Irregular && "irregular"
        )}
      >
        {kana}
      </div>
    );
  };

  private renderFurtherIrregular = ({ amount, conjugation }: Irregular) => {
    return (
      <div className="conjugation-container" key={amount}>
        <div className="amount">{amount}</div>
        <div className="conjugations">
          <div className="irregular">{conjugation}</div>
        </div>
      </div>
    );
  };

  private renderItem = (item: Item) => {
    const { localization } = this.props;
    return <div key={item.itemId}>{localization.itemPlural(item)}</div>;
  };

  private renderCurrentUserInputItem = (
    { category, kana }: ConjugatedInfo,
    index: number
  ) => (
    <div
      key={index}
      className={classnames(
        category === ConjugationCategory.Irregular && "irregular",
        category === ConjugationCategory.Strange && "strange"
      )}
    >
      {kana}
    </div>
  );

  private onUserInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.valueAsNumber;

    if (
      isNaN(newValue) ||
      newValue < MIN_USER_INPUT ||
      newValue > MAX_USER_INPUT
    ) {
      return;
    }

    this.setState({
      currentUserInput: clamp(newValue, MIN_USER_INPUT, MAX_USER_INPUT)
    });
  };
}

export default connect(mapStateToProps)(ExploreCounterPage);
