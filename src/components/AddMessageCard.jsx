import "./MessageCard.scss";
import { Link } from "react-router-dom";

import Button from "../components/Button";
const AddMessageCard = ({ recipientId }) => {
  return (
    <div className="message-card add-message-card">
      <Link to={`/post/${recipientId}/message`}>
        <Button variant="add" />
      </Link>
    </div>
  );
};
export default AddMessageCard;
