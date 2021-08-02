import React, { useState, useEffect } from 'react';
var axios = require('axios');

export default function MembersList() {
    const token = localStorage.getItem('token');
    const [allMembers, setAllMembers] = useState([]);

    const handleDelete = (event) => {
        event.preventDefault();
    
        const id = event.target.id;
        
        var config = {
          method: 'delete',
          url: `http://localhost:8080/api/members/${id}`,
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };
    
        axios(config)
          .then(function (response) {
            const members = allMembers.filter((member) =>{
              return member.id !== parseInt(id)
            })
            setAllMembers(members);
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      useEffect(() => {
        const getMembers = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/members');
            setAllMembers(response.data.reverse());
          } catch (error) {
            console.error(error);
          }
        };
        getMembers();
      }, []);

    return (
    <div className="main-container">
      <h1 className="introduction-sentence">
        They are Into The Wild !
      </h1>
      {allMembers.map((member, index) => (
        <div className="object-container" method="POST" key={index}>
            <div className="object-name">{member.name}</div>
            <button
              className="delete-button"
              id={member.id}
              onClick={handleDelete}
              type="submit"
            >
              Supprimer
            </button>
        </div>
      ))}
    </div>
    )
}
