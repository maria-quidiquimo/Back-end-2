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

// Exercício 5 - Encapsulamento (conta) Enunciado: Crie uma classe conta onde: - o saldo seja um atributo privado; - exista um método depositar (valor); - exista um método mostrarSaldo();

class Conta{
    #saldo
    constructor(){
        this.#saldo = 0
    }

    depositar(valor){
        if(valor < 0 ){
            console.log(`Valor inválido`)
        }else{
            this.#saldo += valor
        }
    }
    mostrarSaldo(){
        console.log(`Saldo: R$${this.#saldo.toFixed(2)}`)
    }
}

const conta1 = new Conta()
conta1.depositar(-10)
conta1.depositar(70)
conta1.mostrarSaldo();

// Exercício 6 - Encapsulamento (aluno) Enunciado: - a nota seja um atributo privado; - exista um método definirNota(nota); - exista um método mostrarNota()

class Aluno{
    #nota
    constructor(){
        this.#nota = 0
    }
    definirNota(nota){
        if(nota < 0 || nota > 10){
            console.log(`Nota Inválida!`)
        }else{
            this.#nota = nota
        }
    }
    mostrarNota(){
        console.log(`Nota: ${this.#nota}`)
    }
}

const aluno1 = new Aluno()
aluno1.definirNota(-1)
aluno1.definirNota(9.8)
aluno1.mostrarNota()