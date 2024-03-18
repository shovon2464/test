import React from "react";

export default interface IRoute {
  path: string;
  name: string;
  component: React.FC;
  props?: any;
}
