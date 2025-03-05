import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [telephone, setTelephone] = useState('')
  const [address, setAddress] = useState('')
  const [hobbies, setHobbies] = useState([])
  const [currentHobby, setCurrentHobby] = useState('')

  const fetchApi = async () => {
    try{
      const response = await axios.get('http://localhost:8000/api/users')
      setUsers(response.data)
      setLoading(false);
    }
    catch(err){
      console.log(err)
      setError("Récupération des utilisateurs impossible");
      setLoading(false);
    }
  }

  const handleNewUser = async (e) => {
    e.preventDefault()
    try {
      const newUser = await axios.post('http://localhost:8000/api/users', {firstName, lastName, telephone, address, hobbies})
      fetchApi()
    }
    catch(err){
      console.log(err)
    }
  }

  const handleAddHobby = () => {
    e.preventDefault()
    if(currentHobby.trim() !== '') {
      setHobbies([...hobbies, currentHobby.trim()])
      setCurrentHobby('')
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

      <form onSubmit={handleNewUser} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '20px auto' }}>
        <label htmlFor="">Prenom</label>
        <input type="text" onChange={(e) => setFirstName(e.target.value)}  />
        <label htmlFor="">Nom</label>
        <input type="text" onChange={(e) => setLastName(e.target.value)}  />
        <label htmlFor="">Télephone</label>
        <input type="number" onChange={(e) => setTelephone(e.target.value)}  />
        <label htmlFor="">Adresse</label>
        <input type="text" onChange={(e) => setAddress(e.target.value)}  />
        <label htmlFor="">Hobby</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            value={currentHobby} 
            onChange={(e) => setCurrentHobby(e.target.value)} 

          />
          <button 
            type="button" 
            onClick={handleAddHobby} 
            style={{ padding: '8px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Ajouter Hobby
          </button>
        </div>

        <div>
          {hobbies.length > 0 && (
            <p>Hobbies ajoutés : {hobbies.join(', ')}</p>
          )}
        </div>

        <input type="submit" value="Ajouter l'utilisateur" style={{ padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }} />
      </form>
    </>
  )
}

export default App
