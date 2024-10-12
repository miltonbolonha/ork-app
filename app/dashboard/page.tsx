"use client";
import { useState } from "react";

import { Indicador, Equipe, useOKR } from "@/context/OKRContext";
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
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar os elementos do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const {
    indicadores,
    equipes,
    calcularDesempenhoIndicador,
    adicionarIndicador,
  } = useOKR();

  const [nomeIndicador, setNomeIndicador] = useState("");
  const [prioridade, setPrioridade] = useState<number>(1);
  const [penalidade, setPenalidade] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nomeIndicador && prioridade) {
      const novoIndicador: Indicador = {
        id: Date.now(),
        nome: nomeIndicador,
        prioridade: prioridade,
        penalidade: penalidade,
      };
      adicionarIndicador(novoIndicador);
      setNomeIndicador("");
      setPrioridade(1);
      setPenalidade(false);
    }
  };

  // Preparar dados para o gráfico de indicadores
  const indicadoresNomes = indicadores.map(
    (indicador: Indicador) => indicador.nome
  );
  const indicadoresDesempenho = indicadores.map(
    (indicador: Indicador) => calcularDesempenhoIndicador(indicador.id) * 100
  );

  const data = {
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

  const options = {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Coluna da Esquerda: Formulário */}
      <div className="col-span-1">
        <h1 className="text-3xl font-bold mb-4">Dashboard - Sistema OKR</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome_indicador">Nome do Indicador</Label>
            <Input
              type="text"
              id="nome_indicador"
              value={nomeIndicador}
              onChange={(e) => setNomeIndicador(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="prioridade">Peso (Prioridade)</Label>
            <Select
              onValueChange={(value) => setPrioridade(parseInt(value))}
              value={prioridade.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o peso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Alta</SelectItem>
                <SelectItem value="2">Média</SelectItem>
                <SelectItem value="3">Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="penalidade"
              checked={penalidade}
              onCheckedChange={(checked) => setPenalidade(!!checked)}
            />
            <Label htmlFor="penalidade">Penalidade</Label>
          </div>
          <Button type="submit">Adicionar Indicador-Chave</Button>
        </form>

        {/* Lista de indicadores */}
        <h2 className="text-xl font-bold mt-8">Indicadores</h2>
        <ul className="mt-4 space-y-4">
          {indicadores.map((indicador) => (
            <li key={indicador.id} className="border p-4 rounded">
              <span className="text-lg font-bold">{indicador.nome}</span>
              <p>Prioridade: {indicador.prioridade}</p>
              <p>Penalidade: {indicador.penalidade ? "Sim" : "Não"}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Coluna da Direita: Gráfico e Tabela */}
      <div className="col-span-1">
        {/* Gráfico de Indicadores */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Gráfico de Desempenho</h2>
          <div className="w-full h-64">
            <Bar data={data} options={options} />
          </div>
        </section>

        {/* Tabela de Indicadores */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Indicadores-Chave</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Nome</th>
                <th className="py-2 px-4 border">Desempenho</th>
              </tr>
            </thead>
            <tbody>
              {indicadores.map((indicador: Indicador) => {
                const desempenho = calcularDesempenhoIndicador(indicador.id);
                return (
                  <tr key={indicador.id}>
                    <td className="py-2 px-4 border">{indicador.nome}</td>
                    <td className="py-2 px-4 border">
                      {(desempenho * 100).toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
