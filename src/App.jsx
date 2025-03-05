import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {

  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApi = async () => {
    try{
      const response = await axios.get('http://localhost:8000/api/users')
      setUsers(response.data)
      setLoading(false);
    }
    catch(err){
      console.log(err)
      setError("Récuprétation des utilisateurs impossible");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApi()
  }, [])


  return (
    <>
      <h1>Liste d'utilisateurs</h1>

      {loading && <p>Chargement en cours...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && users && users.map(user => (
        <div 
          key={user.id} 
          style={{
            border: '1px solid red',
            borderRadius: '22px',
            padding: '10px',
            margin: '10px',
          }}
        >
          <h3 style={{ color: 'blue' }}>Nom : {user.firstName} {user.lastName}</h3>
          <h4>Téléphone : {user.telephone}</h4>
          <h4>Adresse : {user.address}</h4>
          <h4>Hobbies :</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {user.hobbies.map((hobby, index) => (
              <li key={index}>{hobby}</li>
            ))}
          </ul>
        </div>
      ))}

    </>
  )
}

export default App
