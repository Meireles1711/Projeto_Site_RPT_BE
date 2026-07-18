const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.post("/iot", async(req,res) => {
    const dado = req.body;
    console.log(`${dado.dispositivo} | ${dado.tipo} : ${dado.valor}${dado.unidade}`);
    try{
      const leitura = await prisma.leitura.create({
        data:{
            dispositivo: dado.dispositivo,
            tipo: dado.tipo,
            valor: String(dado.valor),
            unidade: dado.unidade,
            timestamp: new Date(dado.timestamp)
        }
      }); 
      res.json(leitura);  
    } catch(err) {
        console.log("Erro:", err.message);
        res.status(500).json({erro:"Erro ao salvar"});
    }
    

});

app.get("/iot", async (req, res) => {
  const { tipo, dispositivo, dataInicio, dataFim } = req.query;

  try {
    const filtros = {};

    // filtro por tipo de sensor
    if (tipo) {
      filtros.tipo = tipo;
    }

    // filtro por dispositivo
    if (dispositivo) {
      filtros.dispositivo = dispositivo;
    }

    // filtro por intervalo de data/hora
    if (dataInicio || dataFim) {
      filtros.timestamp = {};

      if (dataInicio) {
        filtros.timestamp.gte = new Date(dataInicio);
      }

      if (dataFim) {
        filtros.timestamp.lte = new Date(dataFim);
      }
    }

    const dados = await prisma.leitura.findMany({
      where: filtros,
      orderBy: { timestamp: "desc" }
    });

    res.json(dados);

  } catch (err) {
    console.log(err);
    res.status(500).json({ erro: "Erro ao buscar dados ggg" });
  }
});

app.listen(3000, () => {
    console.log("servidor na 3000");
});



// ATUALIZAR
app.put("/iot/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const atualizado = await prisma.leitura.update({
      where: { id: Number(id) },
      data: req.body
    });

    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar" });
  }
});

// EXCLUIR
app.delete("/iot/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.leitura.delete({
      where: { id: Number(id) }
    });

    res.json({ mensagem: "Deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao deletar" });
  }
});