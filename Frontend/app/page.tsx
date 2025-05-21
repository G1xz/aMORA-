"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import { Label } from "./_components/ui/label";
import Image from "next/image";
import { Loader2 } from "lucide-react";

type SimulationResult = {
  valor_entrada: number;
  valor_financiado: number;
  total_a_guardar: number;
  parcela_mensal: number;
};

type FormErrors = {
  percentual?: string;
  anos?: string;
};

const formatNumber = (value: string) => {
  const numeric = value.replace(/\D/g, "");
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export default function Home() {
  const [formData, setFormData] = useState({
    valorImovel: "",
    percentualEntrada: "",
    anosContrato: "",
  });

  const [resultado, setResultado] = useState<SimulationResult | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const newErrors: FormErrors = {};
      const percentual = parseInt(formData.percentualEntrada);
      const anos = parseInt(formData.anosContrato);

      if (formData.percentualEntrada && (percentual < 5 || percentual > 20)) {
        newErrors.percentual = "Informe um valor entre 5% e 20%";
      }

      if (formData.anosContrato && (anos < 1 || anos > 5)) {
        newErrors.anos = "Informe entre 1 e 5 anos";
      }

      setErrors(newErrors);
      setIsFormValid(
        formData.valorImovel !== "" &&
          formData.percentualEntrada !== "" &&
          formData.anosContrato !== "" &&
          Object.keys(newErrors).length === 0
      );
    };

    validateForm();
  }, [formData]);

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      if (field === "valorImovel") {
        value = formatNumber(value);
      } else if (field === "percentualEntrada" || field === "anosContrato") {
        value = value
          .replace(/\D/g, "")
          .slice(0, field === "percentualEntrada" ? 2 : 1);
      }

      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSimulate = async () => {
    if (!isFormValid) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/simulacao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          valor_imovel: parseFloat(formData.valorImovel.replace(/\./g, "")),
          percentual_entrada: parseInt(formData.percentualEntrada),
          anos_contrato: parseInt(formData.anosContrato),
        }),
      });

      if (!response.ok) throw new Error("Erro na simulação");

      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error("Simulation error:", error);
      alert("Ocorreu um erro ao simular. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      valorImovel: "",
      percentualEntrada: "",
      anosContrato: "",
    });
    setResultado(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 py-3 px-4 sm:py-4 sm:px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.jpg"
              alt="logo"
              height={40}
              width={40}
              className="h-8 w-8 sm:h-10 sm:w-10"
            />
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <h1 className="text-xl sm:text-2xl font-bold text-aMORAPink">
                aMORA
              </h1>
              <span className="text-xs sm:text-base text-gray-300">
                Simulador Financeiro
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md mx-2 sm:mx-auto">
          <AnimatePresence mode="wait">
            {!resultado ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-700">
                  <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-white">
                    Simulador de Financiamento
                  </h1>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <Label
                        htmlFor="valorImovel"
                        className="text-gray-300 text-sm sm:text-base"
                      >
                        Valor do imóvel (R$)
                      </Label>
                      <Input
                        id="valorImovel"
                        inputMode="numeric"
                        placeholder="Valor do imóvel"
                        value={formData.valorImovel}
                        onChange={handleChange("valorImovel")}
                        disabled={isLoading}
                        className="mt-1 bg-gray-700 border-gray-600 text-white h-10 sm:h-11 text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="percentualEntrada"
                        className="text-gray-300 text-sm sm:text-base"
                      >
                        Percentual de entrada (%)
                      </Label>
                      <Input
                        id="percentualEntrada"
                        inputMode="numeric"
                        placeholder="Entre 5% e 20%"
                        value={formData.percentualEntrada}
                        onChange={handleChange("percentualEntrada")}
                        disabled={isLoading}
                        className="mt-1 bg-gray-700 border-gray-600 text-white h-10 sm:h-11 text-sm sm:text-base"
                      />
                      {errors.percentual && (
                        <p className="text-xs sm:text-sm text-red-400 mt-1">
                          {errors.percentual}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="anosContrato"
                        className="text-gray-300 text-sm sm:text-base"
                      >
                        Prazo do financiamento (anos)
                      </Label>
                      <Input
                        id="anosContrato"
                        inputMode="numeric"
                        placeholder="Até 5 anos"
                        value={formData.anosContrato}
                        onChange={handleChange("anosContrato")}
                        disabled={isLoading}
                        className="mt-1 bg-gray-700 border-gray-600 text-white h-10 sm:h-11 text-sm sm:text-base"
                      />
                      {errors.anos && (
                        <p className="text-xs sm:text-sm text-red-400 mt-1">
                          {errors.anos}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    className={`w-full mt-4 sm:mt-6 h-10 sm:h-11 bg-aMORAPink hover:bg-aMORAPink/90 text-white text-sm sm:text-base ${
                      !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleSimulate}
                    disabled={!isFormValid || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Calculando...
                      </>
                    ) : (
                      "Simular Financiamento"
                    )}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-700">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center text-white">
                    Resultado da Simulação
                  </h2>

                  <div className="space-y-3 sm:space-y-4">
                    <ResultItem
                      icon="💰"
                      label="Valor de entrada"
                      value={resultado.valor_entrada}
                    />
                    <ResultItem
                      icon="🏦"
                      label="Valor financiado"
                      value={resultado.valor_financiado}
                    />
                    <ResultItem
                      icon="📈"
                      label="Total a pagar"
                      value={resultado.total_a_guardar}
                    />
                    <ResultItem
                      icon="📅"
                      label="Parcela mensal"
                      value={resultado.parcela_mensal}
                    />
                  </div>

                  <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2 sm:gap-3">
                    <Button
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-gray-700 py-2 sm:py-2 text-sm sm:text-base"
                      onClick={handleReset}
                    >
                      Nova Simulação
                    </Button>
                    <Button
                      className={`bg-aMORAPink hover:bg-aMORAPink/90 text-black py-2 sm:py-2 text-sm sm:text-base`}
                      onClick={() => window.print()}
                    >
                      Imprimir Resultado
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

const ResultItem = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: number;
}) => (
  <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-700 rounded-lg">
    <div className="flex items-center">
      <span className="text-lg sm:text-xl mr-2 sm:mr-3">{icon}</span>
      <span className="font-medium text-gray-300 text-sm sm:text-base">
        {label}
      </span>
    </div>
    <span className="font-semibold text-white text-sm sm:text-base">
      {value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}
    </span>
  </div>
);
