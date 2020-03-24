import React, { useState, useEffect } from 'react';

import api from './services/api';

import './Global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevItem from './components/DevItem/index';
import DevForm from './components/DevForm/index';


//Conceitos importantes;
//Componentes: Função que retorna HTML, CSS, ou mesmo JS
//Estado: Uma informação mantida pelo componente (Lembrar - Imutabilidade)
//Propriedade: Informações que o componente PAI passa para o componente FILHO

function App() {
  const [devs, setDevs] = useState([]);




  useEffect(() => {
    async function loadDevs() {
      const res = await api.get('/devs');
      setDevs(res.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const res = await api.post('/devs', data);

    setDevs([...devs, res.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>

    </div>
  );
}

export default App;
