import type { SVGProps } from "react";

const Spinner = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props}>
      <radialGradient
        id="a"
        cx={0.66}
        cy={0.313}
        fx={0.66}
        fy={0.313}
        gradientTransform="scale(1.5)"
      >
        <stop offset={0} stopColor="#1C1895" />
        <stop offset={0.3} stopColor="#1C1895" stopOpacity={0.9} />
        <stop offset={0.6} stopColor="#1C1895" stopOpacity={0.6} />
        <stop offset={0.8} stopColor="#1C1895" stopOpacity={0.3} />
        <stop offset={1} stopColor="#1C1895" stopOpacity={0} />
      </radialGradient>
      <circle
        cx={100}
        cy={100}
        r={70}
        fill="none"
        stroke="url(#a)"
        strokeDasharray="200 1000"
        strokeLinecap="round"
        strokeWidth={18}
        style={{ transformOrigin: "center" }}
      >
        <animateTransform
          attributeName="transform"
          calcMode="spline"
          dur={0.8}
          keySplines="0 0 1 1"
          keyTimes="0;1"
          repeatCount="indefinite"
          type="rotate"
          values="360;0"
        />
      </circle>
      <circle
        cx={100}
        cy={100}
        r={70}
        fill="none"
        stroke="#1C1895"
        strokeLinecap="round"
        strokeWidth={18}
        opacity={0.2}
        style={{ transformOrigin: "center" }}
      />
    </svg>
  );
};

export default Spinner;
