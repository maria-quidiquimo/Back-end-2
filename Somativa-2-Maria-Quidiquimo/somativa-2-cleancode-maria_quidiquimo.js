// =============================================================================
// ROTA DE AGENDAMENTOS
// =============================================================================

app.put('reserva/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {sala, data_reserva} = req.body
        
        const reservaExiste = await queryAsync("SELECT * FROM reservas WHERE id = ?", [id])
        
        if(reservaExiste.length === 0){
            return res.status(404).json({
                sucesso: false,
                mensagem: "Erro ao criar sua reserva! Tente novamente."
            })
        }

        if(sala != "Number" || sala <= 0){
            res.status(400).json({
                sucesso: false,
                mensagem: "A Sala para sua reserva deve ser algum número positivo."
            })
        }

        const reservaFoiAtualizada = {}

        if (data_reserva <= "Date") {
            if(typeof data_reserva != "Date" || data_reserva <= "Date"){
                res.status(400).json({
                    sucesso: false,
                    mensagem: "A data da reserva seve ser depois de hoje, e deve ser uma data válida."
                })
            } reservaFoiAtualizada.data_reserva = data_reserva
        }


        if (sala !== undefined) reservaFoiAtualizada.sala = sala.trim()

        
        await queryAsync("UPDATE reservas SET ? WHERE id = ?", [reservaFoiAtualizada, id])    
            res.status(200).json({
                sucesso: true,
                mensagem: "Sua reserva foi atualizada com sucesso."
            })
            
        } catch (erro) {
            if(reservaExiste.length === 0){
                res.status(404).json({
                    sucesso: false,
                    mensagem: "Reserva não foi feita. Tente novamente mais tarde."
                })
            }
        }
})

// NOTA: Falta fazer o filtro de busca por data aqui ??