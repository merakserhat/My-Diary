import { useHistory } from "react-router";
import Card from "../../UI/Card";
import ListDateItem from "./ListDateItem";
import "./ListItem.css";

const ListItem = (props) => {
  const history = useHistory();
  const itemClickHandler = () => {
    history.push({
      pathname: "/diary/read",
      search: `?_id=${props.id}`,
    });
  };
  return (
    <Card className="list-item" onClick={itemClickHandler}>
      <div className="list-item__title">
        <h3>{props.title}</h3>
      </div>
      <ListDateItem date={props.date} />
    </Card>
  );
};

export default ListItem;
