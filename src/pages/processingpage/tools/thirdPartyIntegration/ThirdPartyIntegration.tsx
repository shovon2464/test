import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { IThirdPartyConnection } from "../../../../action_creators/tools/third_party_connnection/third_party_connection";

export const ThirdPartyIntegrationCell: React.FC<IThirdPartyConnection> = (
  props
) => {
  return (
    <div className="auto-delete-container">
      <div className="auto-delete-parent">
        <Typography className="auto-delete-child-email">
          <div className="auto-delete-child-typography">
            Third Party Integration URL <br />
          </div>
          <div className="auto-delete-db">
            <span
              className="auto-delete-span"
              style={{ color: "#1a4d2e", fontWeight: "bold" }}>
              {props.url}
            </span>
          </div>
        </Typography>

        <Divider
          className="auto-delete-divider"
          orientation="vertical"
          variant="middle"></Divider>

        <Typography className="auto-delete-child-days">
          <div className="auto-delete-child-typography">
            UserName <br />
          </div>
          <div className="auto-delete-db">
            <span className="auto-delete-span" style={{ color: "#ff9f29" }}>
              {props.username}{" "}
            </span>
          </div>
        </Typography>

        <Divider
          className="auto-delete-divider"
          orientation="vertical"
          variant="fullWidth"
        />

        <Typography className="auto-delete-child-days">
          <div className="auto-delete-child-typography">
            Password <br />
          </div>
          <div className="auto-delete-db">
            <span className="auto-delete-span" style={{ color: "#853037" }}>
              {props.password}{" "}
            </span>
          </div>
        </Typography>

        <Divider
          className="auto-delete-divider"
          orientation="vertical"
          variant="fullWidth"
        />

        <Typography className="auto-delete-child-days">
          <div className="auto-delete-child-typography">
            Third Party Name <br />
          </div>
          <div className="auto-delete-db">
            <span className="auto-delete-span" style={{ color: "#853037" }}>
              {props.third_party_name}{" "}
            </span>
          </div>
        </Typography>
      </div>
    </div>
  );
};

export default ThirdPartyIntegrationCell;
