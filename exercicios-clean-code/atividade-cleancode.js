//Exercício 1 - Usuários

app.get('/usuarios', async (req, res) => {
    try{
    const usuarios = await queryAsync("SELECT * FROM usuario")
    res.status(200).json({
        sucesso: true,
        dados: usuarios,
        total: usuarios.length
    })
    } catch (erro){
        console.error('Erro ao listar usuários', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao listar usuários",
            erro: erro
        })
    }
})

app.get('/usuarios/:id', async (req, res) => {
    try{
        const {id} = req.params  
        const usuario = await queryAsync("SELECT * FROM usuario WHERE id = ?", [req.params.id])
        res.status(200).json({
            sucesso: true,
            id: id,
            dados: usuario[0]
        })
        
        if (usuario.length === 0) {
        return res.status(404).json({
            sucesso: false,
            mensagem: "Usuário não encontrado"
        })
    }
    
        if(!id || isNaN (id)){
            return res.status(404).json({
                sucesso: false,
                mensagem: "ID Usuário Inválido"
            })
        } 
    } catch(erro){
        console.error ("Erro ao procurar Usuário", erro)
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao procurar Usuário",
            erro: erro.message
        })
    }
})

//Exercício 2 - Pedidos

app.post('/pedidos', async (req, res) => {
    try{
    const { cliente, valor } = req.body // o front end que manda isso pra gente

    if (!cliente || !valor) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Cliente e Valor são obrigatórios"
        })
    }

    if (typeof valor != "number" || valor <= 0) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Valor deve ser um número positivo"
        })
    }

    const salvarNovoPedido = {
        cliente: cliente.trim(),
        valor
    }

    const resultadoDoSalvamentoDoPedido = await queryAsync("INSERT INTO pedido SET ?", [salvarNovoPedido])

    res.status(201).json({
        sucesso: true,
        mensagem: "Pedido salvo com sucesso",
        id: resultadoDoSalvamentoDoPedido.insertId
    })
    }catch (erro){
        console.error("Erro ao salvar o pedido", erro)
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao salvar o pedido",
            erro: erro.message
        })
    }
})

//Exercício 3 - Salas

app.put('/salas/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {nome_sala, quantidade_acentos} = req.body

        const verSeSalaExiste = await queryAsync("SELECT * FROM sala WHERE id = ?", [id])

        if (verSeSalaExiste.length === 0) {
        return res.status(404).json({
            sucesso: false,
            mensagem: "Sala não encontrada"
        })
        }

        const salaFoiAtualizada = {}

        if(nome_sala !== undefined) salaFoiAtualizada.nome_sala = nome_sala.trim()
        if(quantidade_acentos !== undefined){
            if(typeof quantidade_acentos !== 'number' || quantidade_acentos <= 0){
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Quantidade de acentos deve ser um número positivo"
                })
            } salaFoiAtualizada.quantidade_acentos = quantidade_acentos
        }

        await queryAsync("UPDATE sala SET ? WHERE id = ?", [salaFoiAtualizada, id])

        res.json({
            sucesso: true,
            mensagem: "Sala atualizada com sucesso"
        }) 
    } catch (erro) {
        console.error("Erro ao atualiza a sala", erro)
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao atualizar a sala",
            erro: erro.message
        })
        
    }
    
})

app.delete('/salas/:id', async (req, res) => {
    try {
        const {id} = req.params
        const{nome_sala, quantidade_acentos} = req.body

        if(!id || isNaN (id)){
            return res.status(404).json({
                sucesso: false,
                mensagem: "ID Sala Inválido"
            })
        } 

        const verSeSalaExiste = await queryAsync("SELECT * FROM sala WHERE id = ?", [id])

        if (verSeSalaExiste.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Sala não encontrada"
            })
        }

        await queryAsync("DELETE FROM sala WHERE id = ?", [id])

        res.status(200).json({
            sucesso: true,
            mensagem: "Sala excluída com sucesso"
        })
    } catch (erro) {
        console.error("Erro ao excluir a sala", erro)
        res.status(500).json({
            sucesso: false,
            mensagem:"Erro ao excluir a sala",
            erro: erro.message
        })
    }
    
})

// const validarDadosAtualizados = (dados, res) =>{
//   if(Object.keys(dados).length === 0){
//       return res.status(400).json({
//          sucesso: false,
//         mensagem: "nenhum dado enviado"
//      })
//   }
// }

//Exercício 1
// function mensagem(res, tipo) {
//     res.status(404).json({
//         sucesso: false,
//         mensagem: `${tipo} não encontrado(a).`
//     })
// }

// function validarExistencia(resultado, res, tipo) {
//     if (resultado.length === 0) {
//         mensagem(res, tipo)
//         return false
//     }
//     return true
// }

// app.get('/usuario', async (req, res) => {
//     try {
//         const listaUsuarios = await queryAsync("SELECT * FROM usuario")
//         res.status(200).json({
//             sucesso: true,
//             dados: listaUsuarios
//         })

//     } catch (erro) {
//         res.status(500).json({
//             sucesso: false,
//             mensagem: erro
//         })

//     }
// })

// app.get('/usuario/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const usuario = await queryAsync("SELECT * FROM usuario WHERE id = ?", [id])

//         if (!validarExistencia(usuario, res, "Usuário")) {
//             return
//         }

//         res.status(200).json({
//             sucesso: true,
//             dados: usuario[0]
//         })
//     } catch (erro) {
//         res.status(500).json({
//             sucesso: false,
//             mensagem: erro
//         })
//     }
// })

// //Exercício 2

// const validarDadosPedido = ({ cliente, valor }) => {
//     if (!cliente || valor === undefined) {
//         return "Cliente e valor são obrigatórios."
//     }

//     if (typeof valor !== 'number' || valor <= 0) {
//         return "Valor inválido"
//     }

//     return null
// }

// app.post('/pedidos', async (req, res) => {
//     try {
//         const erro = validarDadosPedido(req.body)

//         if (erro) {
//             return res.status(400).json({
//                 sucesso: false,
//                 mensagem: erro
//             })
//         }

//         await queryAsync("INSERT INTO pedido SET ?", [req.body])

//         res.status(201).json({
//             sucesso: true,
//             mensagem: "Pedido cadastrado."
//         })

//     } catch (erro) {
//         res.status(500).json({
//             sucesso: false,
//             mensagem: erro
//         })
//     }
// })

// //Exercício 3

// const validarDadosAtualizados = (dados, res) => {
//     if (Object.keys(dados).length === 0) {
//             res.status(400).json({
//             sucesso: false,
//             mensagem: "Nenhum dado enviado"
//         })
//         return false
//     }
//     return true
// }

// app.put('/salas/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const dados = req.body

//         const sala = await queryAsync("SELECT * FROM sala WHERE id = ?", [id])

//         if (!validarExistencia(sala, res, "Sala")) {
//             return
//         }

//         if(!validarDadosAtualizados(dados, res)){
//             return
//         }

//         await queryAsync("UPDATE sala SET ? WHERE id = ?", [dados, id])

//         res.status(200).json({
//             sucesso: true,
//             mensagem: "Sala atualizada"
//         })
//     } catch (erro) {
//         res.status(500).json({
//             sucesso: false,
//             mensagem: erro
//         })
//     }
// })

// app.delete('/salas/:id', async (req, res) => {
//     try {
//         const id = req.params

//         const sala = await queryAsync("SELECT * FROM sala WHERE id = ?", [id])

//         if (!validarExistencia(sala, res, "Sala")) {
//             return
//         }

//         await queryAsync("DELETE FROM sala WHERE id = ?", [id])

//         res.status(200).json({
//             sucesso: true,
//             mensagem: "Sala removida."
//         })
//     } catch (erro) {
//         res.status(500).json({
//             sucesso: false,
//             mensagem: erro
//         })
//     }
// })