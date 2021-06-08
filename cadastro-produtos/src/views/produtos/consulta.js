import React from 'react'
import Card from '../../components/card' 
import ProdutosTable from './produtosTable'
import ProdutosService from '../../app/produtoService'
import { withRouter } from 'react-router-dom'



class ConsultaProdutos extends React.Component{

    state = {
        produtos :[]
    }

    constructor(){
        super()
        this.service = new ProdutosService();
    }

    componentDidMount(){
         const produtos = this.service.obterProdutos();
         this.setState({produtos})
    }

    preparaeditar = (sku) => {
        console.log('sku para editar:',sku)
        this.props.history.push(`/cadastro-produtos/${sku}`)
    } 

    deletar = (sku) => {
         const produtos = this.service.deletar(sku)
         this.setState({produtos})
    }
    

    render(){
        return (
            <Card header="Consulta Produtos">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>SKU</th>
                                    <th>preco</th>
                                    <th>Fornecedor</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.produtos.map( (produto,index) => {
                                    return(
                                        <tr key={index}>
                                            <th>{produto.nome}</th>
                                            <th>{produto.sku}</th>
                                            <th>{produto.preco}</th>
                                            <th>{produto.fornecedor}</th>
                                            <th>
                                                <button onClick={() => this.preparaeditar(produto.sku)} className="btn btn-primary">Editar</button>
                                                <button onClick={() => this.deletar(produto.sku)} className="btn btn-danger">Excluir</button>
                                            </th>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    
             </Card>
        )


    }
}

export default withRouter(ConsultaProdutos)

