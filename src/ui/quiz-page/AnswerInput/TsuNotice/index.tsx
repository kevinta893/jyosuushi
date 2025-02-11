import * as React from "react";
import { connect } from "react-redux";

import Localization from "../../../../localization";
import { State } from "../../../../redux";

import TsuWarningModel, { NUM_DEFAULT_WARNINGS } from "./model";

import "./index.scss";

interface ProvidedProps {
  localization: Localization;
}

interface ReduxProps {
  numQuestionsAsked: number;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    numQuestionsAsked: state.user.numQuestionsAsked
  };
}

type ComponentProps = ProvidedProps & ReduxProps;

class TsuNotice extends React.PureComponent<ComponentProps> {
  private readonly model: TsuWarningModel;

  public constructor(props: any) {
    super(props);
    this.model = TsuWarningModel.get();
  }

  public componentDidUpdate({
    numQuestionsAsked: prevNumQuestionsAsked
  }: ComponentProps) {
    const { numQuestionsAsked } = this.props;
    if (numQuestionsAsked > prevNumQuestionsAsked) {
      this.model.reduce();
      this.forceUpdate();
    }
  }

  public render() {
    if (this.model.numWarnings <= 0) {
      return null;
    }

    const { localization } = this.props;
    return (
      <div
        className="TsuNotice"
        style={{
          opacity: this.model.numWarnings / NUM_DEFAULT_WARNINGS
        }}
      >
        {localization.tsuNotice}
      </div>
    );
  }
}

export default connect(mapStateToProps)(TsuNotice);
