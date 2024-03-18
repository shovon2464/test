import styled from "styled-components";
import welcome_image from "../../icons/welcome_image.png";

export const WelcomeImage = styled.img.attrs({
  src: `${welcome_image}`,
  alt: "BrokerAID welcome image",
})`
  display: block;
  width: 100%;
  padding: 5%;
  margin: auto;
`;