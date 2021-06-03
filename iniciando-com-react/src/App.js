import React from 'react';

class App extends React.Component{
  
  state = {
    nome :''
  }
  
  modificarNome = (event) => {
     this.setState({
       nome: event.target.value
     })
  }

  criaComboBox = () => {
    const opcoes = ["Dunha","Arnica","Maria"]
    const comboBoxOpcoes = opcoes.map(opcao => <option>{opcao}</option>)
    
    return (
        <select>
          {comboBoxOpcoes}
        </select>
    )
  }



  render(){
    return(
      <>
      <input className="text-centralizado" type="text" values={this.state.nome} onChange={this.modificarNome } />
      <h1>Hello {this.state.nome} </h1>
      { this.criaComboBox()}

      </>
    )
  }
}

export default App;