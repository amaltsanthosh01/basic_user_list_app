import React, { useState, useEffect } from 'react';
import requireAuthentication from './Authenticate';
import axios from 'axios';
import { Button, Table, Spinner } from 'react-bootstrap';
import CustomPagination from './CustomPagination';

function User(){
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://reqres.in/api/users?page=${page}`).then(
      (response) => {
        if (response.status === 200) {
          setUsers(response.data.data);
          setPage(response.data.page);
          setTotalPage(response.data.total_pages);
          setIsLoading(false);
        } else {
          alert('An error occurred. Please try again later.');
        }

      },

      (err) => {
        alert('Could not establish connection',err.message);
      }

    )
  }, []);

  const pageHandleClick = (page) => {
    setIsLoading(true);
    setPage(page);
    axios.get(`https://reqres.in/api/users?page=${page}`).then(
      (response) => {
        if (response.status === 200) {
          setUsers(response.data.data);
          setPage(response.data.page);
          setTotalPage(response.data.total_pages);
          setIsLoading(false);
        } else {
          alert('An error occurred. Please try again later.');
        }

      },

      (err) => {
        alert('Could not establish connection',err.message);
      }

    )
  }

  const deleteHandler = (id) => {
    axios.delete('https://reqres.in/api/users/' + id).then(res => {
      const del = users.filter(user => id !== user.id);
      setUsers(del);
    })
    .catch(err => {
      alert(err);
      console.log(err)
    })
  }

  if (isLoading)
  {
    return(<Spinner 
      animation="border" 
      variant="secondary" 
      className="d-flex justify-content-center" />)
  }
  else{
  return(
    <>
    <h1>Users</h1>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Avatar</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {users.map(user => 
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>{user.email}</td>
          <td><img src={user.avatar}/></td>
          <td><Button variant='danger' onClick={() => deleteHandler(user.id)}>Delete</Button></td>
        </tr>
      )}
      </tbody>
    </Table>
    <CustomPagination active={page} total={totalPage} pageHandleClick={pageHandleClick} />
    </>
  )
  }
}

export default requireAuthentication(User);