import React from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";
class ShoppingList extends React.Component {
  componentDidMount() {
    //this.props.getItems();
    console.log(this.props);
  }
  onDeleteClick = id => {
    this.props.deleteItem(id);
  };
  render() {
    const { items } = this.props;

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={1000} classNames="fade">
                <ListGroupItem>
                  <Button
                    style={{ marginRight: "1rem" }}
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, id)}
                  >
                    &times;
                  </Button>

                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
  //deleteItem :
};

const mapStateToProps = state => ({
  items: state.item.items
});
export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
