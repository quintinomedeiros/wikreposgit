import { useState } from 'react';
import gitLogo from '../assets/github-mark.png';
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import { Container } from './styles';

function App() {

  // Armazenamento do input com nome de usuário
  const [currentRepo, setCurrentRepo] = useState('');

  // Array para guardar os repositórios encontrados
  const [repos, setRepos] = useState([]);

  // Buscar repositório e alimentar o Array
  const handleSearchRepo = async () => {
    try {
      // Fazendo a requisição para a API
      const { data } = await api.get(`repos/${currentRepo}`);
  
      if (data.id) {
        // Verificar se o repositório já existe
        const isExist = repos.find(repo => repo.id === data.id);
  
        if (!isExist) {
          // Se houver dado, pega-se o que já existe e concatena com o que foi retornado
          setRepos(prev => [...prev, data]);
          // Limpar o input de busca
          setCurrentRepo('');
        } else {
          alert('Repositório já listado!');
        }
      }
    } catch (error) {
      // Capturando o erro 404 e exibindo a mensagem de alerta
      if (error.response && error.response.status === 404) {
        alert('Repositório não encontrado!');
      } else {
        console.error("Erro ao buscar o repositório:", error);
        alert('Ocorreu um erro ao buscar o repositório. Tente novamente.');
      }
    }
  };

  const handleRemoveRepo = (id) => {
    // Remover o repositório com base no id
    setRepos(prevRepos => prevRepos.filter(repo => repo.id !== id));
  };

  return (
    <Container>
      <img src={gitLogo} alt="Git Logo" width={72} height={72}/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/> {/* Corrigido aqui */}
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo key={repo.id} handleRemoveRepo={handleRemoveRepo} repo={repo} />)} {/* Adicionada chave ao map */}
    </Container>
  );
}

export default App;
