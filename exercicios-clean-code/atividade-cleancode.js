//Exercício 1 - Usuários

app.get('/usuarios', async (req, res) => {
    try{
    const usuarios = await queryAsync("SELECT * FROM usuario")
    res.json({
        sucesso: true,
        dados: usuarios,
        total: usuarios.length
    })
    } catch (erro){
        console.error('Erro ap listar usuários', erro)
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao listar usuários",
            erro: erro
        })
    }
})

app.get('/usuarios/:id', async (req, res) => {
    const {id} = req.params
    try{  
        const usuario = await queryAsync("SELECT * FROM usuario WHERE id = ?", [req.params.id])
        res.json({
            sucesso: true,
            id: id,
            dados: usuario
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
        res.json({
            sucesso: false,
            mensagem: "Erro ao procurar Usuário",
            erro: erro.message
        })
    }
})

//Exercício 2 - Pedidos

app.post('/pedidos', async (req, res) => {
    try{
    const { cliente, valor } = req.body

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