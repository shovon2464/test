import styled from "styled-components";
import welcome_image from "../../icons/about/welcome.webp";

export const AboutWelcomeImage = styled.img.attrs({
  src: `${welcome_image}`,
  alt: "BrokerAID welcome image in about page",
})`
  display: block;
  width: 100%;
  padding: 5%;
  margin: auto;
`;
