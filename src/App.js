import { useState } from "react";
import { IoSearch } from "react-icons/io5";

import api from "./services/api";

import './styles.css'

function App() {

  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if (input === ''){
      alert("Preencha o CEP!");
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    }catch {
      alert ("Cep não encontrado");
      setInput('');
    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input 
          type="text"
          placeholder="Digite seu Cep"
          value={input}
          onChange = {(e) => setInput(e.target.value)}
          />
          <button 
            type="submit" 
            className="buttonSearch"
            onClick={handleSearch}>
              <IoSearch size={25} color="#fff" />
          </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>UF: {cep.uf}</span>
        </main>
      )}
      

    </div>

    
  );
}

export default App;
