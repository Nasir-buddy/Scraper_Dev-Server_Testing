import React from "react";
interface ProductIconProps {
  color: string;
  className?: string; // Add this line to include className in the prop types
}
const ProductIcon = ({ color, className }: ProductIconProps) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.50021 6.5L10.5002 9.5M5.25021 8.75L8.25021 11.75M11.7188 4.7187H12.2813M11.7188 5.2812H12.2813M14.2502 1.25H9.48848C8.69249 1.25 7.92913 1.56634 7.36646 2.12938L1.80911 7.6904C1.22407 8.27583 1.22375 9.22449 1.8084 9.81031L7.1756 15.1883C7.7608 15.7746 8.71055 15.7756 9.29693 15.1904L14.8694 9.62905C15.4333 9.06626 15.7502 8.30229 15.7502 7.50559L15.7502 2.74999C15.7502 1.92157 15.0786 1.25 14.2502 1.25ZM12.7502 5C12.7502 5.41421 12.4144 5.75 12.0002 5.75C11.586 5.75 11.2502 5.41421 11.2502 5C11.2502 4.58579 11.586 4.25 12.0002 4.25C12.4144 4.25 12.7502 4.58579 12.7502 5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ProductIcon;
