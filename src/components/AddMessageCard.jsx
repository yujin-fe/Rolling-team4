import "./MessageCard.scss";
import { Link } from "react-router-dom";

import Button from "../components/Button";
const AddMessageCard = () => {
  return (
    <div className="message-card add-message-card">
      <Link to="/post/:id/message">
        <Button variant="add" />
      </Link>
    </div>
  );
};
export default AddMessageCard;
