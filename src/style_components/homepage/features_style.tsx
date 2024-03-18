import styled from "styled-components";
import TaskTracking_icon from "../../icons/TaskTracking_icon.png";
import Communication_icon from "../../icons/Communication_icon.png";
import QualityControl_icon from "../../icons/QualityControl_icon.png";
import Convenience_icon from "../../icons/Convenience_icon.png"



export const FeaturesContent = styled.div`
`;
export const FeaturesContainer = styled.div`
`;
export const FeatureCard = styled.div`
    background-color: #f7f7f7;
    margin: 20px 10px;
    border: 2px solid #f7f7f7;
    border-radius: 1rem;
`;

export const CardHeader = styled.div`
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
`;

export const CardContent = styled.div`
    font-size: 0.8rem;
    padding-left: 1rem;
    padding-right: 1rem;
`;

export const TaskIcon = styled.img.attrs({
    src: `${TaskTracking_icon}`,
    alt: "Task tracking icon",
  })`
    display: block;
    width: 20%;
    text-align: center;
    margin: 20px auto 10px auto;
  `;

export const CommunicationIcon = styled.img.attrs({
    src: `${Communication_icon}`,
    alt: "Communication Improvment icon",
  })`
    display: block;
    width: 20%;
    text-align: center;
    margin: 20px auto 10px auto;
  `;

export const QualityControlIcon = styled.img.attrs({
    src: `${QualityControl_icon}`,
    alt: "Quality Control icon",
  })`
    display: block;
    width: 20%;
    text-align: center;
    margin: 20px auto 10px auto;
  `;

export const ConvenienceIcon = styled.img.attrs({
    src: `${Convenience_icon}`,
    alt: "Convenience icon",
  })`
    display: block;
    width: 20%;
    text-align: center;
    margin: 20px auto 10px auto;
  `;


