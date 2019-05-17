import {
  combineReducers,
  createStore,
  Dispatch as ReduxDispatch,
  Store as ReduxStore
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { State } from "./index";

import countersReducer from "./reducers/counters";
import enabledPacksReducer from "./reducers/enabledPacks";
import itemsReducer from "./reducers/items";
import questionsReducer from "./reducers/questions";
import quizStateReducer from "./reducers/quizState";
import scorecardReducer from "./reducers/scorecard";
import sessionReducer from "./reducers/session";
import settingsReducer from "./reducers/settings";
import userAnswersReducer from "./reducers/userAnswers";

type Action = any;

export type Store = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;

export function createReduxStore(): Store {
  return createStore<State, Action, any, any>(
    combineReducers<State>({
      counters: countersReducer,
      enabledPacks: enabledPacksReducer,
      items: itemsReducer,
      questions: questionsReducer,
      quizState: quizStateReducer,
      scorecard: scorecardReducer,
      session: sessionReducer,
      settings: settingsReducer,
      userAnswers: userAnswersReducer
    }),
    composeWithDevTools()
  );
}
