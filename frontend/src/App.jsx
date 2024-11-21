// // App.js (frontend)
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:8080');

// function App() {
//   const [name, setName] = useState('');
//   const [users, setUsers] = useState([]);

//   const createUser = async () => {
//     try {
//       await axios.post('http://localhost:8080/api/v1/users', { name });
//       setName('');
//     } catch (error) {
//       console.error('Error al crear el usuario:', error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/v1/users');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error al obtener los usuarios:', error);
//     }
//   };

//   // useEffect(() => {
//   //   fetchUsers();

//   //   socket.on('newUser', (user) => {
//   //     setUsers((prevUsers) => [...prevUsers, user]);
//   //   });

//   //   return () => {
//   //     socket.off('newUser',);
//   //   };
//   // }, []);
//   useEffect(() => {
//     fetchUsers();

//     socket.on('newUser', (user) => {
//       setUsers((prevUsers) => [...prevUsers, user]);
//     });

//     socket.on('deleteUser', (user) => {
//       setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
//       console.log(user)
//     });

//     console.log(socket)
//     return () => {
//       socket.off('newUser');
//       socket.off('deleteUser');
//     };

    
//   }, []);

//   return (
//     <div>
//       <h1>Gestión de Usuarios</h1>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Ingrese el nombre"
//       />
//       <button onClick={createUser}>Crear Usuario</button>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>{user.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

// App.js (frontend)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

function App() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  const createUser = async () => {
    try {
      await axios.post('http://localhost:8080/api/v1/users', { name });
      setName('');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete('http://localhost:8080/api/v1/users', { data: { id } });
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  useEffect(() => {
    fetchUsers();

    socket.on('newUser', (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    });

    socket.on('deleteUser', (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      
    });

    return () => {
      socket.off('newUser');
      socket.off('deleteUser');
    };
  }, []);

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ingrese el nombre"
      />
      <button onClick={createUser}>Crear Usuario</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => deleteUser(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


