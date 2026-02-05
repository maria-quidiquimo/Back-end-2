import express from "express"

const app = express()

app.use(express.json())

const musicas = [
    {
        id:355,
        titulo: "Pretty When You Cry",
        artista: "Lana Del Rey",
        genero: "Alternativa/indie, Rock",
        ano_piblicacao: 2014
    }
]

function buscarMusica(id){
    return musicas.findIndex(m => {
        return m.id === Number(id)
    })
}

app.get("/", (req, res) => {
    res.status(200).send("CRUD músicas")
})

app.get("/musicas", (req, res) => {
    res.status(200).json(musicas)
})

app.get("/musicas/:id", (req, res) => {
    const index = buscarMusica(req.params.id)
    res.status(200).json(musicas[index])
})

app.post("/musicas", (req, res) => {
    musicas.push(req.body)
    res.status(200).json(musicas)
})

export default app