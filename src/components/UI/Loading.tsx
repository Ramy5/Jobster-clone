import React from "react";

interface Loading_TP {
  center: boolean;
}

const Loading: React.FC<Loading_TP> = ({ center }) => {
  return <div className={center ? "loading loading-center" : "loading"}></div>;
};

export default Loading;
