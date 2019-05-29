import * as React from "react";
import * as ReactDOM from "react-dom";
import Modal from "react-modal";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import QuizManager from "./QuizManager";
import { createRedux } from "./redux/store";

import "meyer-reset-scss/reset.scss";

const redux = createRedux();
const quizManager = new QuizManager(redux.store);

Modal.setAppElement(document.getElementById("root")!);

ReactDOM.render(
  <Provider store={redux.store}>
    <PersistGate loading={null} persistor={redux.persistor}>
      <App quizManager={quizManager} />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
