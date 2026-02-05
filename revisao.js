// Exercício 1 - Classe simples (pessoa) Enunciado: Crie uma classe chamada Pessoa que possua : - nome; - idade Crie um método apresentar() que exiba no console o nome e a idade da pessoa

class Pessoa{
    constructor(nome, idade){ // atributos
        this.nome = nome;
        this.idade = idade;
    }
    apresentar(){ // métodos
        console.log(`Nome: ${this.nome}; Idade: ${this.idade}.`)
    }
}

const pessoa1 = new Pessoa('Maria', 17) // objeto
pessoa1.apresentar()

const pessoa2 = new Pessoa('Bruna', 18)
pessoa2.apresentar()

// Exercício 2 - Classe simples (Produto) Enunciado: Crie uma classe Produto com: - nome; - Preço Crie um método mostrarPreco() que exiba o nome do produto e o seu preço

class Produto{
    constructor(nome, preco){
        this.nome = nome;
        this.preco = preco
    }
    mostrarPreco(){
        console.log(`Produto: ${this.nome}
Preço: R$ ${this.preco}`)
    }
}

const produto1 = new Produto("Sousplat", 14.50)
produto1.mostrarPreco()

const produto2 = new Produto("Bolsa", 60)

// Exercício 3 - Herença (Funcionário) Enunciado: Crie uma classe Funcionário com: - nome Crie uma classe Gerente que herda de Funcionários e possui setor Crie um método que exiba o nome e o setor do gerente

class Funcionario{
    constructor(nome){
        this.nome = nome;
    }
}

class Gerente extends Funcionario{
    constructor(nome, setor){
        super(nome);
        this.setor = setor
    }
    mostrarDados(){
        console.log(`Nome: ${this.nome};
Setor: ${this.setor}.`)
    }
}

const gerente1 = new Gerente("Elaine", "RH")
gerente1.mostrarDados()

// Exercício 4 - Herança (Veículos) Enunciado: Crie uma classe veículo com: - Marca Crie uma classe Carro com: - modelo Crie um método que exiba o marca e o modelo do carro.

class Veiculo{
    constructor(marca){
        this.marca = marca
    }
}

class Carro extends Veiculo{
    constructor(marca, modelo){
        super(marca);
        this.modelo = modelo
    }
    mostrarCarro(){
        console.log(`Marca: ${this.marca}; 
Modelo: ${this.modelo}.`)
    }
}

const carro1 = new Carro("BYD", "Dolphin Mini")
carro1.mostrarCarro()