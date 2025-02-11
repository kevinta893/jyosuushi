import { memoize } from "lodash";
import * as React from "react";

import { Counter, StudyPack } from "../../../interfaces";
import Localization from "../../../localization";
import { getDistinctCounters } from "../../../utils";

import CounterLink from "../CounterLink";

import "./CounterPreview.scss";

const getCountersForPacks = memoize(
  (packs: ReadonlyArray<StudyPack>) => getDistinctCounters(packs),
  (packs: ReadonlyArray<StudyPack>) =>
    JSON.stringify(packs.map(({ packId }) => packId))
);

interface ComponentProps {
  localization: Localization;
  packs: ReadonlyArray<StudyPack>;
}

export default class CounterPreview extends React.PureComponent<
  ComponentProps
> {
  public render() {
    const { localization, packs } = this.props;
    const counters = getCountersForPacks(packs);

    if (!counters.length) {
      return null;
    }

    return (
      <div className="CounterPreview">
        <h3>{localization.countersDisplayHeader(counters.length)}</h3>
        <div className="counters">{counters.map(this.renderCounter)}</div>
      </div>
    );
  }

  private renderCounter = (counter: Counter) => {
    return <CounterLink key={counter.counterId} counter={counter} />;
  };
}
