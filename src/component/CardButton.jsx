import styled from "@emotion/styled";

const CardButton = styled("button")(({ theme }) => ({
  flex: 1,
  marginLeft: "10px",
  border: "1.3px solid black",
  fontWeight: "bold",
  backgroundColor: "rgba(0,0,0,0)",
  fontSize: "16px",
  padding: "1%",
  cursor: "pointer",
  boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.5)",
  borderRadius: "5px",
}));

export default CardButton;
