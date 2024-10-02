// import { useEffect, useState } from 'react';

// interface ISocialMedia {
//   cidade: string;
//   idade: number;
//   nome: string;
// }

// const RedeSocialComponent = () => {
//   const [redesSociais, setRedesSociais] = useState<ISocialMedia[]>([]);
//   const [selectedRede, setSelectedRede] = useState<ISocialMedia | null>(null);
//   const [nome, setNome] = useState('');
//   const [idade, setIdade] = useState('');
//   const [cidade, setCidade] = useState('');
//   const [message, setMessage] = useState('');

//   // Buscar todas as redes sociais
//   useEffect(() => {
//     const fetchRedesSociais = async () => {
//       try {
//         const response = await fetch('/api/socialMedia');
//         const result = await response.json();
//         setRedesSociais(result);
//       } catch (error) {
//         console.log('Erro ao buscar dados:', error);
//       }
//     };

//     fetchRedesSociais();
//   }, []);

//   // Criar nova rede social
//   const handleCreate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const redeSocial: ISocialMedia = { cidade, idade: parseInt(idade), nome };
    
//     try {
//       const response = await fetch('/api/socialMedia', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(redeSocial),
//       });

//       if (response.ok) {
//         setMessage('Rede social criada com sucesso!');
//         setRedesSociais([...redesSociais, redeSocial]);
//         setNome('');
//         setIdade('');
//         setCidade('');
//       } else {
//         throw new Error('Erro ao criar a rede social');
//       }
//     } catch (error) {
//       console.log('Erro ao criar a rede social:', error);
//       setMessage(error.message);
//     }
//   };

//   // Atualizar uma rede social
//   const handleUpdate = async (id: string) => {
//     const redeSocial: Partial<ISocialMedia> = { cidade, idade: parseInt(idade), nome };

//     try {
//       const response = await fetch(`/api/socialMedia`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id, ...redeSocial }),
//       });

//       if (response.ok) {
//         setMessage('Rede social atualizada com sucesso!');
//         setRedesSociais(prev => prev.map(r => (r.id === id ? { ...r, ...redeSocial } : r)));
//       } else {
//         throw new Error('Erro ao atualizar a rede social');
//       }
//     } catch (error) {
//       console.log('Erro ao atualizar a rede social:', error);
//       setMessage(error.message);
//     }
//   };

//   // Deletar uma rede social
//   const handleDelete = async (id: string) => {
//     try {
//       const response = await fetch(`/api/socialMedia`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id }),
//       });

//       if (response.ok) {
//         setMessage('Rede social deletada com sucesso!');
//         setRedesSociais(prev => prev.filter(r => r.id !== id));
//       } else {
//         throw new Error('Erro ao deletar a rede social');
//       }
//     } catch (error) {
//       console.log('Erro ao deletar a rede social:', error);
//       setMessage(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Gerenciar Redes Sociais</h1>
//       <form onSubmit={handleCreate}>
//         <input
//           type="text"
//           placeholder="Nome"
//           value={nome}
//           onChange={(e) => setNome(e.target.value)}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Idade"
//           value={idade}
//           onChange={(e) => setIdade(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Cidade"
//           value={cidade}
//           onChange={(e) => setCidade(e.target.value)}
//           required
//         />
//         <button type="submit">Criar Rede Social</button>
//       </form>

//       {message && <p>{message}</p>}

//       <h2>Lista de Redes Sociais</h2>
//       <ul>
//         {redesSociais.map((rede, index) => (
//           <li key={index}>
//             {rede.nome} - {rede.idade} anos - {rede.cidade}
//             <button onClick={() => setSelectedRede(rede)}>Editar</button>
//             <button onClick={() => handleDelete(rede.id)}>Deletar</button>
//           </li>
//         ))}
//       </ul>

//       {selectedRede && (
//         <div>
//           <h2>Editar Rede Social</h2>
//           <form onSubmit={(e) => { e.preventDefault(); handleUpdate(selectedRede.id); }}>
//             <input
//               type="text"
//               placeholder="Nome"
//               value={selectedRede.nome}
//               onChange={(e) => setNome(e.target.value)}
//               required
//             />
//             <input
//               type="number"
//               placeholder="Idade"
//               value={selectedRede.idade}
//               onChange={(e) => setIdade(e.target.value)}
//               required
//             />
//             <input
//               type="text"
//               placeholder="Cidade"
//               value={selectedRede.cidade}
//               onChange={(e) => setCidade(e.target.value)}
//               required
//             />
//             <button type="submit">Atualizar Rede Social</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RedeSocialComponent;
