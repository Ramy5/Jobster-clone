"use client";

import { store } from "@/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

interface Props {
  children: ReactNode;
}

const GlobalLayout: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default GlobalLayout;
