import { Pagination } from "react-bootstrap";

const CustomPagination = (props) => {
  const {active, total, pageHandleClick} = props
  let items = [];

  for (let number = 1; number <= total; number++) {
    items.push(
      <Pagination.Item 
        key={number} 
        active={number === active} 
        onClick={()=>pageHandleClick(number)}
        >
        {number}
      </Pagination.Item>,
    );
  }
  
  const pagination = (
    <Pagination className="justify-content-center">{items}</Pagination>
  );

  return pagination;
}

export default CustomPagination;
