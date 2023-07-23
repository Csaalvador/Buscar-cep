import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import api from './source/api';
import "./style.css";

function App() {
  const [input, setInput] = useState("");
  const [cepData, setCepData] = useState(null);

  async function search() {
    if (input === '') {
      alert('Preencha algum cep');
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCepData(response.data);
    } catch (error) {
      alert('Ops, tente mais tarde.');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="container-input">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="btn-search" onClick={search}>
          <FiSearch size={25} color="#000" />
        </button>
      </div>

      <main className="main">
        {cepData && (
          <>
            <h2 className="cep">CEP: {cepData.cep}</h2>
            <span>Rua: {cepData.logradouro}</span>
            <span>{cepData.bairro}</span>
            <span>{cepData.localidade} - {cepData.uf}</span>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
