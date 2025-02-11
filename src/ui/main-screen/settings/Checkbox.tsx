import classnames from "classnames";
import * as React from "react";

import CheckIcon from "../check.svg";
import CircleIcon from "../circle.svg";

import "./Checkbox.scss";

interface ComponentProps {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

export default class Checkbox extends React.PureComponent<ComponentProps> {
  public render() {
    const { checked, label } = this.props;
    return (
      <div
        className={classnames("Checkbox", checked && "checked")}
        onClick={this.onClick}
      >
        {checked ? (
          <CheckIcon className="icon" />
        ) : (
          <CircleIcon className="icon" />
        )}
        <div className="label">{label}</div>
      </div>
    );
  }

  private onClick = () => {
    const { checked, onChange } = this.props;
    onChange(!checked);
  };
}
