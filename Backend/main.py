from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou ["http://localhost:3000"] se quiser limitar
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SimulacaoInput(BaseModel):
    valor_imovel: float = Field(..., gt=0)
    percentual_entrada: float = Field(..., ge=5, le=20)
    anos_contrato: int = Field(..., ge=1, le=5)

class SimulacaoOutput(BaseModel):
    valor_entrada: float
    valor_financiado: float
    total_a_guardar: float
    parcela_mensal: float

@app.post("/simulacao", response_model=SimulacaoOutput)
def simular(data: SimulacaoInput):
    valor_entrada = data.valor_imovel * (data.percentual_entrada / 100)
    valor_financiado = data.valor_imovel - valor_entrada
    total_a_guardar = data.valor_imovel * 0.15
    parcela_mensal = total_a_guardar / (data.anos_contrato * 12)

    return {
        "valor_entrada": round(valor_entrada, 2),
        "valor_financiado": round(valor_financiado, 2),
        "total_a_guardar": round(total_a_guardar, 2),
        "parcela_mensal": round(parcela_mensal, 2),
    }
