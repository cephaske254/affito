import * as React from "react";
import { SvgProps, SvgXml } from "react-native-svg";
import { colors } from "../../theme/colors";

/* SVGR has dropped some elements not supported by react-native-svg: title */

export const LogoSvg = ({
  strokeWidth,
  color,
  height,
  width,
  ...props
}: SvgProps) => {
  const fill = colors.paper.light;
  return (
    <SvgXml
      xml={`<svg width="885" height="885" viewBox="0 0 885 885" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M660.123 435.246C660.123 555.436 562.69 652.869 442.5 652.869C322.31 652.869 224.877 555.436 224.877 435.246C224.877 315.056 322.31 217.623 442.5 217.623C562.69 217.623 660.123 315.056 660.123 435.246Z" fill="${fill}"/>
      <path d="M369.959 72.541C369.959 32.4777 402.437 0 442.5 0C482.563 0 515.041 32.4777 515.041 72.541V812.459C515.041 852.522 482.563 885 442.5 885C402.437 885 369.959 852.522 369.959 812.459V72.541Z" fill="${fill}"/>
      <path d="M652.806 129.605C681.135 101.276 727.066 101.276 755.395 129.605C783.724 157.934 783.724 203.865 755.395 232.194L232.194 755.395C203.865 783.724 157.934 783.724 129.605 755.395C101.276 727.066 101.276 681.135 129.605 652.806L652.806 129.605Z" fill="${fill}"/>
      <path d="M72.541 515.041C32.4777 515.041 0 482.563 0 442.5C0 402.437 32.4777 369.959 72.541 369.959H812.459C852.522 369.959 885 402.437 885 442.5C885 482.563 852.522 515.041 812.459 515.041H72.541Z" fill="${fill}"/>
      <path d="M129.605 232.194C101.276 203.865 101.276 157.934 129.605 129.605C157.934 101.276 203.865 101.276 232.194 129.605L755.395 652.806C783.724 681.135 783.724 727.066 755.395 755.395C727.066 783.724 681.135 783.724 652.806 755.395L129.605 232.194Z" fill="${fill}"/>
      </svg>`}
      height={height ?? 20}
      width={width ?? 20}
    />
  );
};