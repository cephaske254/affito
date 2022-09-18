import { SvgXml } from "react-native-svg";

export default function BookmarkIcon({
  width,
  height,
  strokeWidth,
  color,
}: {
  width?: number;
  strokeWidth?: number;
  color?: string;
  height?: number;
}) {
  return (
    <SvgXml
      xml={`<svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512">
      <path 
      d="M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z" 
      fill="none" stroke="${color ?? "currentColor"}" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      stroke-width="${strokeWidth ?? 35}"/></svg>`}
      height={height ?? 20}
      width={width ?? 20}
    />
  );
}
