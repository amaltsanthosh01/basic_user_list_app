import { Table } from "react-bootstrap";

const CustomTable = (props) => {
  const {children} = props
  return(
    <Table striped bordered hover>
      {children}
    </Table>
  )
}

export default CustomTable;
