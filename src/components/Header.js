import { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { UserTokenContext } from "../App";

const Header = (props) => {
  const {token} = useContext(UserTokenContext)
  
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.clear();
  };
  return(
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#dashboard">My React App</Navbar.Brand>
      { (token && token !== undefined) && 
        <Nav className="mr-auto">
          <Nav.Link href="/users">Users</Nav.Link>
        </Nav>
      }
      <Navbar.Collapse className="justify-content-end">
        { token && token !== undefined ? 
           (<Nav><Nav.Link href="/" onClick={logOut}>Logout</Nav.Link></Nav>)
          : ( 
              <>
                <Nav>
                  <Nav.Link href="/sign-up">Sign-Up</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="/sign-in">Sign-In</Nav.Link>
                </Nav>
              </>
            )
        }
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;
