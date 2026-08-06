const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const baseDir = 'uploads';
        let subfolder = '';

        // Pega a extensão do arquivo e padroniza para minúsculo
        const tipoArquivo = path.extname(file.originalname).toLowerCase();

        // Lógica de subpastas por tipo de arquivo
        if (tipoArquivo === '.png') subfolder = 'PNG files';
        else if (tipoArquivo === '.pdf') subfolder = 'PDF files';
        else if (tipoArquivo === '.jpg') subfolder = 'JPG files';
        else subfolder = 'other files';

        // Define o caminho final. Como estamos em src/config, 
        // usamos '..' duas vezes para chegar na raiz do projeto
        const uploadDir = path.join(__dirname, '..', '..', baseDir, subfolder);

        // Cria a pasta de forma síncrona e recursiva
        fs.mkdirSync(uploadDir, { recursive: true });

        // Opcional: disponibiliza o caminho no objeto da requisição
        req.uploadDir = uploadDir;
        
        cb(null, uploadDir); // Retorna o diretório para o multer
    },
    filename: (req, file, cb) => {
        // Define o nome: tempoAtual-nomeOriginal.extensao
        const nomeArquivo = `${Date.now()}-${file.originalname}`;
        cb(null, nomeArquivo); // Retorna o nome do arquivo
    }
});

// Exporta a instância pronta para ser usada nas rotas
module.exports = multer({ storage });