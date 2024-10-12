"use client";
// Importações para o Chart
import React, { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Legend } from "recharts";
import { useOKR, Indicador } from "@/context/OKRContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function IndicadoresPage() {
  const {
    indicadores,
    adicionarIndicador,
    editarIndicador,
    importarIndicadores,
  } = useOKR();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [indicadorEmEdicao, setIndicadorEmEdicao] = useState<Indicador | null>(
    null
  );

  // Campos para adicionar/editar indicador
  const [nomeIndicador, setNomeIndicador] = useState("");
  const [pesoIndicador, setPesoIndicador] = useState<number>(1);
  const [penalidade, setPenalidade] = useState(false);
  const [indicadorPaiId, setIndicadorPaiId] = useState<number | undefined>(
    undefined
  );

  // Estado para indicador selecionado (para hierarquia)
  const [indicadorSelecionado, setIndicadorSelecionado] =
    useState<Indicador | null>(null);

  const openEditModal = (indicador: Indicador) => {
    setIndicadorEmEdicao(indicador);
    setNomeIndicador(indicador.nome);
    setPesoIndicador(indicador.peso);
    setPenalidade(indicador.penalidade);
    setIndicadorPaiId(indicador.indicadorPaiId);
    setShowEditModal(true);
    setShowAddModal(false);
  };

  const openAddModal = () => {
    // Resetar campos
    setIndicadorEmEdicao(null);
    setNomeIndicador("");
    setPesoIndicador(1);
    setPenalidade(false);
    setIndicadorPaiId(undefined);
    setShowAddModal(true);
    setShowEditModal(false);
  };

  const handleAdicionarIndicador = () => {
    if (nomeIndicador.trim() !== "") {
      const novoIndicador: Indicador = {
        id: Date.now(),
        nome: nomeIndicador,
        peso: pesoIndicador,
        penalidade,
        indicadorPaiId,
      };
      adicionarIndicador(novoIndicador);
      // Limpar os campos
      setNomeIndicador("");
      setPesoIndicador(1);
      setPenalidade(false);
      setIndicadorPaiId(undefined);
      setShowAddModal(false);
    }
  };

  const handleEditarIndicador = () => {
    if (indicadorEmEdicao) {
      const indicadorAtualizado: Indicador = {
        ...indicadorEmEdicao,
        nome: nomeIndicador,
        peso: pesoIndicador,
        penalidade,
        indicadorPaiId,
      };
      editarIndicador(indicadorAtualizado);
      // Limpar os campos
      setIndicadorEmEdicao(null);
      setNomeIndicador("");
      setPesoIndicador(1);
      setPenalidade(false);
      setIndicadorPaiId(undefined);
      setShowEditModal(false);
    }
  };

  // Função para importar indicadores a partir de um arquivo JSON
  const handleImportarIndicadores = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (Array.isArray(data)) {
            importarIndicadores(data);
          } else {
            alert("O arquivo JSON deve conter um array de indicadores.");
          }
        } catch (err) {
          alert("Erro ao ler o arquivo JSON.");
        }
      };
      reader.readAsText(file);
    }
  };

  // Preparar dados para o gráfico
  const chartData = indicadores.map((indicador) => ({
    nome: indicador.nome,
    Penalidade: indicador.penalidade ? indicador.peso : 0,
    "Não Penalidade": !indicador.penalidade ? indicador.peso : 0,
  }));

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
    <div className="p-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Indicadores</h1>
        <div>
          <input
            type="file"
            accept=".json"
            onChange={handleImportarIndicadores}
            className="hidden"
            id="importarIndicadoresInput"
          />
          <label
            htmlFor="importarIndicadoresInput"
            className="cursor-pointer mr-2"
          >
            <span className="bg-blue-500 text-white py-2 px-4 rounded">
              Importar Indicadores
            </span>
          </label>
          <Button onClick={openAddModal}>Adicionar Indicador</Button>
        </div>
      </div>

      {/* Gráfico e Tabela de Indicadores lado a lado */}
      <div className="flex space-x-6">
        {/* Tabela de Indicadores */}
        <div className="w-1/2">
          <h2 className="text-xl font-bold mb-4">Tabela de Indicadores</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Peso</TableHead>
                <TableHead>Penalidade</TableHead>
                <TableHead>Indicador Pai</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {indicadores.map((indicador) => {
                const indicadorPai = indicadores.find(
                  (ind) => ind.id === indicador.indicadorPaiId
                );
                return (
                  <TableRow key={indicador.id}>
                    <TableCell>{indicador.nome}</TableCell>
                    <TableCell>{indicador.peso}</TableCell>
                    <TableCell>
                      {indicador.penalidade ? "Sim" : "Não"}
                    </TableCell>
                    <TableCell>
                      {indicadorPai ? indicadorPai.nome : "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="secondary"
                        onClick={() => openEditModal(indicador)}
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Gráfico de Indicadores */}
        <div className="w-1/2">
          <h2 className="text-xl font-bold mb-4">Gráfico de Indicadores</h2>
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Penalidade" fill="#ff4d4f" />
            <Bar dataKey="Não Penalidade" fill="#52c41a" />
          </BarChart>
        </div>
      </div>

      {/* Modal para adicionar indicador */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Adicionar Indicador</h2>
            <div className="mb-4">
              <Label htmlFor="nomeIndicador">Nome do Indicador</Label>
              <Input
                id="nomeIndicador"
                value={nomeIndicador}
                onChange={(e) => setNomeIndicador(e.target.value)}
                placeholder="Digite o nome do indicador"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="pesoIndicador">Peso</Label>
              <Input
                id="pesoIndicador"
                type="number"
                value={pesoIndicador}
                onChange={(e) => setPesoIndicador(parseFloat(e.target.value))}
              />
            </div>
            <div className="mb-4 flex items-center">
              <Checkbox
                id="penalidadeCheckbox"
                checked={penalidade}
                onCheckedChange={() => setPenalidade(!penalidade)}
              />
              <Label htmlFor="penalidadeCheckbox" className="ml-2">
                Este indicador é uma penalidade?
              </Label>
            </div>
            <div className="mb-4">
              <Label htmlFor="indicadorPai">Indicador Pai</Label>
              <select
                id="indicadorPai"
                value={indicadorPaiId ?? ""}
                onChange={(e) =>
                  setIndicadorPaiId(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Nenhum</option>
                {indicadores.map((ind) => (
                  <option key={ind.id} value={ind.id}>
                    {ind.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end mt-6">
              <Button
                variant="secondary"
                onClick={() => setShowAddModal(false)}
                className="mr-2"
              >
                Cancelar
              </Button>
              <Button onClick={handleAdicionarIndicador}>Adicionar</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal para editar indicador */}
      {showEditModal && indicadorEmEdicao && (
        <Modal onClose={() => setShowEditModal(false)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Editar Indicador</h2>
            <div className="mb-4">
              <Label htmlFor="nomeIndicadorEdit">Nome do Indicador</Label>
              <Input
                id="nomeIndicadorEdit"
                value={nomeIndicador}
                onChange={(e) => setNomeIndicador(e.target.value)}
                placeholder="Digite o nome do indicador"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="pesoIndicadorEdit">Peso</Label>
              <Input
                id="pesoIndicadorEdit"
                type="number"
                value={pesoIndicador}
                onChange={(e) => setPesoIndicador(parseFloat(e.target.value))}
              />
            </div>
            <div className="mb-4 flex items-center">
              <Checkbox
                id="penalidadeCheckboxEdit"
                checked={penalidade}
                onCheckedChange={() => setPenalidade(!penalidade)}
              />
              <Label htmlFor="penalidadeCheckboxEdit" className="ml-2">
                Este indicador é uma penalidade?
              </Label>
            </div>
            <div className="mb-4">
              <Label htmlFor="indicadorPaiEdit">Indicador Pai</Label>
              <select
                id="indicadorPaiEdit"
                value={indicadorPaiId ?? ""}
                onChange={(e) =>
                  setIndicadorPaiId(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Nenhum</option>
                {indicadores
                  .filter((ind) => ind.id !== indicadorEmEdicao.id)
                  .map((ind) => (
                    <option key={ind.id} value={ind.id}>
                      {ind.nome}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex justify-end mt-6">
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
                className="mr-2"
              >
                Cancelar
              </Button>
              <Button onClick={handleEditarIndicador}>Salvar Alterações</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
