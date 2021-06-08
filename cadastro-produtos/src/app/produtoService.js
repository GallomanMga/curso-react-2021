

const PRODUTOS = '_PRODUTOS'; 
//serve para dizer o nome da variavel que vai armazenar o array de produtos

export function ErroValidacao(errors){
    this.errors = errors;
}

export default class ProdutosService {


    validar = (produto) => {
        const errors = []

        if(!produto.nome){
            errors.push('Campo Nome é obrigatório')
        }

        if(!produto.sku){
            errors.push('Campo Sku é obrigatório')
        }

        if(!produto.preco || produto.preco <= 0){
            errors.push('Campo Preço deve ter valor maior que zero')
        }

        if(!produto.fornecedor){
            errors.push('Campo Fornecedor é obrigatório')
        }


        if(errors.length > 0){
             throw new ErroValidacao(errors)
        }
        
    }

    obterProdutos = () => {
        const produtos = localStorage.getItem(PRODUTOS)
        if(!produtos){
            return[];
        }
        return JSON.parse(produtos)
    }


    obterindex = (sku) => {
        let index = null;
        this.obterProdutos().forEach((produto, i) => {
            if(produto.sku === sku){
                index = i;
            }
        })
        return index;
    }


    deletar = (sku) => {
        const index = this.obterindex(sku)
        if(index !== null){
            const produtos = this.obterProdutos()
            produtos.splice(index, 1)
            localStorage.setItem(PRODUTOS,JSON.stringify(produtos))
            return produtos
        }
    }


    salvar = (produto) => {
            this.validar(produto)

            let produtos = localStorage.getItem(PRODUTOS) //foi usado o let para alterar a valor da variavel
            
            if(!produtos){
                produtos = []
            }else{
                produtos = JSON.parse(produtos) //recebe a string e transforma em array 
            }

            const index = this.obterindex(produto.sku)
            if(index === null){
                produtos.push(produto); 
            }else{
                produtos[index] = produto;
            }

            

            localStorage.setItem(PRODUTOS, JSON.stringify(produtos) ) //transforma array em string novamente
    }

}