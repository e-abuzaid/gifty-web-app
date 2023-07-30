import React from "react";
import { Oval } from "react-loader-spinner";

type Props = {
  color?: string;
  secondaryColor?: string;
  height?: number;
  width?: number;
};

const Loader = ({ color, secondaryColor, height, width }: Props) => {
  return (
    <Oval
      height={height ? height : 20}
      width={width ? width : 20}
      color={color ? color : "#22004b"}
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor={secondaryColor ? secondaryColor : "#34115c"}
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default Loader;
