import styled from "styled-components";
import brokeraid_logo from "../../icons/brokeraid_logo.png";

export const AuthImage = styled.img.attrs({
  src: `${brokeraid_logo}`,
  alt: "uw-img",
})`
  height: 50px;
  margin: 30px auto 30px auto;
  display: block;
`;
