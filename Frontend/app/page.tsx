"use client";
import { useState } from "react";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";

const formatNumber = (value: string) => {
  const numeric = value.replace(/\D/g, "");
  const float = parseFloat(numeric) / 100;
  return isNaN(float)
    ? ""
    : float.toLocaleString("pt-BR", {
        style: "decimal",
        minimumFractionDigits: 2,
      });
};

const Home = () => {
  const [valorImovel, setValorImovel] = useState("");
  const [percentualEntrada, setPercentualEntrada] = useState("");
  const [anosContrato, setAnosContrato] = useState("");

  const [erros, setErros] = useState({
    percentual: "",
    anos: "",
  });

  const handleValorImovelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 20) {
      setValorImovel(formatNumber(value));
    }
  };

  const handlePercentualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const valor = parseInt(raw);

    if (raw.length > 2) return;

    if (raw === "" || (valor >= 0 && valor <= 99)) {
      setPercentualEntrada(raw);

      if (valor < 5 || valor > 20) {
        setErros((prev) => ({
          ...prev,
          percentual: "Informe um valor entre 5% e 20%",
        }));
      } else {
        setErros((prev) => ({ ...prev, percentual: "" }));
      }
    }
  };

  const handleAnosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const valor = parseInt(raw);

    if (raw.length > 1) return;

    if (raw === "" || (valor >= 0 && valor <= 9)) {
      setAnosContrato(raw);

      if (valor < 1 || valor > 5) {
        setErros((prev) => ({
          ...prev,
          anos: "Informe entre 1 e 5 anos",
        }));
      } else {
        setErros((prev) => ({ ...prev, anos: "" }));
      }
    }
  };

  const handleSimular = () => {
    if (
      erros.percentual ||
      erros.anos ||
      !valorImovel ||
      !percentualEntrada ||
      !anosContrato
    ) {
      alert("Preencha todos os campos corretamente antes de simular.");
      return;
    }

    console.log("Simulando com:");
    console.log("Valor do imóvel:", valorImovel);
    console.log("Entrada (%):", percentualEntrada);
    console.log("Duração (anos):", anosContrato);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="border p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Simulador de Imóvel</h1>

        {/* Valor do imóvel */}
        <div className="space-y-2">
          <label htmlFor="valorImovel" className="text-sm font-medium">
            Valor do imóvel
          </label>
          <Input
            id="valorImovel"
            inputMode="numeric"
            placeholder="Ex: 100.000,00"
            value={valorImovel}
            onChange={handleValorImovelChange}
          />
        </div>

        {/* Percentual de entrada */}
        <div className="space-y-2">
          <label htmlFor="percentualEntrada" className="text-sm font-medium">
            Percentual de entrada (%)
          </label>
          <Input
            id="percentualEntrada"
            inputMode="numeric"
            placeholder="Entre 5 e 20"
            value={percentualEntrada}
            onChange={handlePercentualChange}
          />
          {erros.percentual && (
            <p className="text-sm text-red-500">{erros.percentual}</p>
          )}
        </div>

        {/* Duração do contrato */}
        <div className="space-y-2">
          <label htmlFor="anosContrato" className="text-sm font-medium">
            Duração do contrato (anos)
          </label>
          <Input
            id="anosContrato"
            inputMode="numeric"
            placeholder="Entre 1 e 5"
            value={anosContrato}
            onChange={handleAnosChange}
          />
          {erros.anos && <p className="text-sm text-red-500">{erros.anos}</p>}
        </div>

        <Button className="w-full mt-4" onClick={handleSimular}>
          Simular
        </Button>
      </div>
    </div>
  );
};

export default Home;
