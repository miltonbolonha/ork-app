"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOKR } from "@/context/OKRContext";
import { Indicador } from "@/context/OKRContext";
import IndicadorModal from "@/components/IndicadorModal";

// Importações para o Chart
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

export default function IndicadoresPage() {
  const { indicadores, adicionarIndicador, importarIndicadores } = useOKR();
  const [nomeIndicador, setNomeIndicador] = useState("");
  const [peso, setPeso] = useState<number>(1);
  const [penalidade, setPenalidade] = useState(false);
  const [indicadorPaiId, setIndicadorPaiId] = useState<number | null>(null);
  const [indicadorSelecionado, setIndicadorSelecionado] =
    useState<Indicador | null>(null);

  // Estado para mensagens de alerta
  const [alerta, setAlerta] = useState<{
    titulo: string;
    descricao: string;
  } | null>(null);

  // Dados para o Chart
  const chartData = indicadores.map((indicador) => ({
    nome: indicador.nome,
    peso: indicador.peso,
    penalidade: indicador.penalidade ? indicador.peso : 0,
    naoPenalidade: !indicador.penalidade ? indicador.peso : 0,
  }));

  const chartConfig = {
    penalidade: {
      label: "Penalidade",
      color: "#dc2626", // Cor vermelha
    },
    naoPenalidade: {
      label: "Não Penalidade",
      color: "#2563eb", // Cor azul
    },
  } satisfies ChartConfig;

  const handleAdicionarIndicador = () => {
    if (nomeIndicador.trim() !== "" && peso > 0) {
      const novoIndicador: Indicador = {
        id: Date.now(),
        nome: nomeIndicador.trim(),
        peso: peso,
        penalidade: penalidade,
        indicadorPaiId: indicadorPaiId || undefined,
        indicadoresFilhosIds: [],
      };
      adicionarIndicador(novoIndicador);
      // Limpar os campos
      setNomeIndicador("");
      setPeso(1);
      setPenalidade(false);
      setIndicadorPaiId(null);
      setAlerta({
        titulo: "Sucesso!",
        descricao: "Indicador adicionado com sucesso.",
      });
    } else {
      setAlerta({
        titulo: "Erro",
        descricao:
          "Por favor, preencha corretamente o nome e o peso do indicador.",
      });
    }
  };

  const handleImportarIndicadores = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        if (e.target && e.target.result) {
          try {
            const json = JSON.parse(e.target.result as string);

            // Converter os dados importados para o formato de Indicador
            const indicadoresImportados: Indicador[] = json.map(
              (item: any) => ({
                id: item.id,
                nome: item.nome,
                peso: item.peso,
                penalidade: item.penalidade,
                indicadorPaiId: item.indicadorPaiId || undefined,
                indicadoresFilhosIds: item.indicadoresFilhosIds || [],
              })
            );

            importarIndicadores(indicadoresImportados);
            setAlerta({
              titulo: "Sucesso!",
              descricao: "Indicadores importados com sucesso.",
            });
          } catch (err) {
            console.error("Erro ao importar JSON:", err);
            setAlerta({
              titulo: "Erro",
              descricao:
                "Erro ao importar o arquivo JSON. Verifique o formato e tente novamente.",
            });
          }
        }
      };
    }
  };

  // Função para renderizar indicadores em formato hierárquico
  const renderizarIndicadores = (
    indicadores: Indicador[],
    indicadorPaiId?: number,
    nivel = 0
  ) => {
    return indicadores
      .filter((indicador) => indicador.indicadorPaiId === indicadorPaiId)
      .map((indicador) => (
        <React.Fragment key={indicador.id}>
          <TableRow
            className="cursor-pointer hover:bg-gray-100"
            onClick={() => setIndicadorSelecionado(indicador)}
          >
            <TableCell className="w-1/2">
              <div style={{ marginLeft: nivel * 20 }}>{indicador.nome}</div>
            </TableCell>
            <TableCell className="w-1/4">{indicador.peso}</TableCell>
            <TableCell className="w-1/4">
              {indicador.penalidade ? "Sim" : "Não"}
            </TableCell>
          </TableRow>
          {renderizarIndicadores(indicadores, indicador.id, nivel + 1)}
        </React.Fragment>
      ));
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Coluna Esquerda (Menor) */}
      <div className="w-full lg:w-1/3 lg:pr-4">
        <h1 className="text-2xl font-bold mb-4">Indicadores-Chave</h1>

        {alerta && (
          <Alert className="mb-4">
            <AlertTitle>{alerta.titulo}</AlertTitle>
            <AlertDescription>{alerta.descricao}</AlertDescription>
          </Alert>
        )}

        {/* Formulário de Adição de Indicadores */}
        <div className="mb-6">
          <Label htmlFor="nomeIndicador">Nome do Indicador</Label>
          <Input
            id="nomeIndicador"
            value={nomeIndicador}
            onChange={(e) => setNomeIndicador(e.target.value)}
            placeholder="Digite o nome do indicador"
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="peso">Peso (Importância)</Label>
          <Input
            id="peso"
            type="number"
            min="0"
            step="any"
            value={peso}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value) && value >= 0) {
                setPeso(value);
              } else {
                setPeso(0);
              }
            }}
            placeholder="Digite o peso do indicador"
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="indicadorPai">Indicador Pai</Label>
          <Select
            onValueChange={(value) =>
              setIndicadorPaiId(value !== "none" ? parseInt(value) : null)
            }
            value={indicadorPaiId !== null ? indicadorPaiId.toString() : "none"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um indicador pai (opcional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Nenhum</SelectItem>
              {indicadores.map((indicador) => (
                <SelectItem key={indicador.id} value={indicador.id.toString()}>
                  {indicador.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center mb-6">
          <Checkbox
            id="penalidade"
            checked={penalidade}
            onCheckedChange={(value) => setPenalidade(!!value)}
          />
          <Label htmlFor="penalidade" className="ml-2">
            É uma penalidade?
          </Label>
        </div>
        <div className="flex space-x-4">
          <Button onClick={handleAdicionarIndicador}>
            Adicionar Indicador
          </Button>
          <Label htmlFor="importarIndicadores" className="cursor-pointer">
            <span className="bg-blue-500 text-white py-2 px-4 rounded">
              Importar Indicadores
            </span>
            <input
              id="importarIndicadores"
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImportarIndicadores}
            />
          </Label>
        </div>
      </div>

      {/* Coluna Direita (Maior) */}
      <div className="flex-1 mt-8 lg:mt-0">
        {/* Gráfico de Indicadores */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Gráfico de Indicadores</h2>
          <ChartContainer config={chartConfig} className="w-full h-64">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="nome"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="penalidade"
                fill="var(--color-penalidade)"
                radius={4}
              />
              <Bar
                dataKey="naoPenalidade"
                fill="var(--color-naoPenalidade)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </div>

        {/* Lista de Indicadores */}
        <div>
          <h2 className="text-xl font-bold mb-4">Lista de Indicadores</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Nome</TableHead>
                <TableHead className="w-1/4">Peso</TableHead>
                <TableHead className="w-1/4">Penalidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{renderizarIndicadores(indicadores)}</TableBody>
          </Table>
        </div>
      </div>

      {indicadorSelecionado && (
        <IndicadorModal
          indicador={indicadorSelecionado}
          onClose={() => setIndicadorSelecionado(null)}
        />
      )}
    </div>
  );
}
