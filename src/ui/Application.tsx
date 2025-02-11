import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from "react-router-dom";

import { State } from "../redux";
import { getIsQuizActive } from "../redux/selectors";

import Header from "./Header";
import MainScreen from "./main-screen/MainScreen";
import QuizPage from "./quiz-page";

import "./Application.scss";

const QUIZ_SCREEN_PATH = "/quiz";

interface ReduxProps {
  isQuizActive: boolean;
}

function mapStateToProps(state: State): ReduxProps {
  return {
    isQuizActive: getIsQuizActive(state)
  };
}

interface ComponentState {
  isModalOpen: boolean;
}

type ComponentProps = ReduxProps & RouteComponentProps;

class Application extends React.PureComponent<ComponentProps, ComponentState> {
  public state: ComponentState = {
    isModalOpen: false
  };

  public render() {
    const { isQuizActive } = this.props;

    return (
      <div className={classnames("Application", isQuizActive && "quiz-active")}>
        <Header
          isQuizActive={isQuizActive}
          onModalOpened={this.onHeaderModalOpened}
        />
        {this.renderNecessaryRedirect()}
        <Switch>
          <Route path={QUIZ_SCREEN_PATH} render={this.renderQuizPage} />
          <Route render={this.renderMainScreen} />
        </Switch>
      </div>
    );
  }

  private renderNecessaryRedirect = () => {
    const {
      location: { pathname },
      isQuizActive
    } = this.props;
    const isOnQuizScreen = pathname === QUIZ_SCREEN_PATH;
    if (isOnQuizScreen && !isQuizActive) {
      return <Redirect to="/" />;
    }

    if (!isOnQuizScreen && isQuizActive) {
      return <Redirect to={QUIZ_SCREEN_PATH} />;
    }
  };

  private renderMainScreen = () => {
    return <MainScreen />;
  };

  private renderQuizPage = () => {
    const { isModalOpen } = this.state;
    return <QuizPage enabled={!isModalOpen} />;
  };

  private onHeaderModalOpened = (isModalOpen: boolean) =>
    this.setState({ isModalOpen });
}

export default connect(mapStateToProps)(withRouter(Application));
