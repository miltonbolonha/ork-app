"use client";
import { useState, useEffect } from "react";

import { Indicador, Equipe, Membro, useOKR } from "@/context/OKRContext";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// Import Chart components dynamically to prevent hydration errors
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});

const DonutChart = dynamic(() => import("@/components/DonutChart"), {
  ssr: false,
});

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components only on the client side
if (typeof window !== "undefined") {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
}

export default function DashboardPage() {
  const {
    indicadores,
    valoresMembroIndicador,
    calcularDesempenhoIndicador,
    calcularDesempenhoTotal,
    adicionarIndicador,
    membroAtual,
    podeVisualizarIndicador: podeVisualizarIndicadorFn,
  } = useOKR();

  const [nomeIndicador, setNomeIndicador] = useState("");
  const [peso, setPeso] = useState<number>(1);
  const [penalidade, setPenalidade] = useState<boolean>(false);
  const [importancia, setImportancia] = useState<number>(3); // Padrão operacional/tático
  const [desempenhoTotal, setDesempenhoTotal] = useState<number>(0);

  useEffect(() => {
    // Calculate desempenhoTotal only on client side to prevent hydration errors
    const total = calcularDesempenhoTotal() * 100; // Convert to percentage
    setDesempenhoTotal(total);
  }, [indicadores, valoresMembroIndicador]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nomeIndicador && peso && importancia) {
      const novoIndicador: Indicador = {
        id: Date.now(),
        nome: nomeIndicador,
        peso: peso,
        penalidade: penalidade,
        importancia: importancia,
      };
      adicionarIndicador(novoIndicador);
      setNomeIndicador("");
      setPeso(1);
      setPenalidade(false);
      setImportancia(3);
    }
  };

  // Filtrar indicadores que o membro atual pode visualizar
  const indicadoresVisiveis = indicadores.filter((indicador) =>
    podeVisualizarIndicadorFn(membroAtual, indicador)
  );

  // Preparar dados para o gráfico de indicadores
  const indicadoresNomes = indicadoresVisiveis.map(
    (indicador: Indicador) => indicador.nome
  );
  const indicadoresDesempenho = indicadoresVisiveis.map(
    (indicador: Indicador) =>
      (calcularDesempenhoIndicador(indicador.id) * 100).toFixed(2)
  );

  const dataBarChart = {
    labels: indicadoresNomes,
    datasets: [
      {
        label: "Desempenho (%)",
        data: indicadoresDesempenho,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const optionsBarChart = {
    responsive: true,
    maintainAspectRatio: false, // Mantém uma proporção para reduzir o gráfico
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Desempenho dos Indicadores-Chave",
      },
    },
  };

  // Opções de importância baseadas no membro atual
  const importanciaOptions = [];
  if (!membroAtual.equipeId) {
    // Membro não associado a equipe (estratégico)
    importanciaOptions.push({
      value: "1",
      label: "1 - Nível Estratégico",
    });
    importanciaOptions.push({
      value: "2",
      label: "2 - Nível Gerenciamento de Objetivos",
    });
  }
  // Todos os membros podem criar indicadores de nível operacional/tático
  importanciaOptions.push({
    value: "3",
    label: "3 - Nível Operacional/Tático",
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Coluna da Esquerda: Formulário */}
      <div className="col-span-1">
        <h1 className="text-3xl font-bold mb-4">Dashboard - Sistema OKR</h1>
        <p>Bem-vindo, {membroAtual.nome}!</p>

        {/* Tabela de Indicadores */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Indicadores-Chave</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Nome</th>
                <th className="py-2 px-4 border">Desempenho</th>
                <th className="py-2 px-4 border">Nível de Importância</th>
                <th className="py-2 px-4 border">Peso</th>
                <th className="py-2 px-4 border">Penalidade</th>
              </tr>
            </thead>
            <tbody>
              {indicadoresVisiveis.map((indicador: Indicador) => {
                const desempenho = calcularDesempenhoIndicador(indicador.id);
                return (
                  <tr key={indicador.id}>
                    <td className="py-2 px-4 border">{indicador.nome}</td>
                    <td className="py-2 px-4 border">
                      {(desempenho * 100).toFixed(2)}%
                    </td>
                    <td className="py-2 px-4 border">
                      {indicador.importancia}
                    </td>

                    <td className="py-2 px-4 border">{indicador.peso}</td>
                    <td className="py-2 px-4 border">
                      {indicador.penalidade ? "Sim" : "Não"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>

      {/* Coluna da Direita: Gráfico e Tabela */}
      <div className="col-span-1">
        {/* Gráfico de Donut */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Desempenho Total</h2>
          <DonutChart value={desempenhoTotal} />
        </section>

        {/* Gráfico de Indicadores */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Gráfico de Desempenho</h2>
          <div className="w-full h-64">
            <Bar data={dataBarChart} options={optionsBarChart} />
          </div>
        </section>
      </div>
    </div>
  );
}
