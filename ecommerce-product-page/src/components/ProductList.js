import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ProductList = ({ products, setProducts }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedProducts = Array.from(products);
    const [removed] = reorderedProducts.splice(result.source.index, 1);
    reorderedProducts.splice(result.destination.index, 0, removed);

    setProducts(reorderedProducts);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="productList">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {products.map((product, index) => (
              <Draggable
                key={product.id}
                draggableId={product.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="product-item"
                  >
                    <input type="text" value={product.title} readOnly />
                    <button className="discount-btn">Add Discount</button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ProductList;
