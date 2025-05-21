import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="border p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Simulador de Imóvel</h1>

        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="valorImovel" className="text-sm font-medium">
              Valor do imóvel
            </label>
            <Input id="valorImovel" type="number" placeholder="Ex: 400000" />
          </div>

          <div className="space-y-2">
            <label htmlFor="percentualEntrada" className="text-sm font-medium">
              Percentual de entrada (%)
            </label>
            <Input id="percentualEntrada" type="number" placeholder="Ex: 10" />
          </div>

          <div className="space-y-2">
            <label htmlFor="anosContrato" className="text-sm font-medium">
              Duração do contrato (anos)
            </label>
            <Input id="anosContrato" type="number" placeholder="Ex: 3" />
          </div>

          <Button type="submit" className="w-full">
            Simular
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Home;
