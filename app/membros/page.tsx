"use client";

import { useState } from "react";
import { useOKR } from "@/context/OKRContext";
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
import { Badge } from "@/components/ui/badge";

import { CardStackPlusIcon } from "@radix-ui/react-icons";

import {
  Membro,
  Indicador,
  ValoresMembroIndicador,
} from "@/context/OKRContext";

export default function MembrosPage() {
  const {
    membros,
    indicadores,
    valoresMembroIndicador,
    adicionarMembro,
    setValoresMembroIndicador,
  } = useOKR();

  const [showAddMembroModal, setShowAddMembroModal] = useState(false);
  const [novoMembroNome, setNovoMembroNome] = useState("");
  const [selectedMembro, setSelectedMembro] = useState<Membro | null>(null);
  const [showAddMetaModal, setShowAddMetaModal] = useState(false);
  const [selectedIndicadorId, setSelectedIndicadorId] = useState<number | null>(
    null
  );
  const [planejado, setPlanejado] = useState<number>(0);
  const [cumprido, setCumprido] = useState<number>(0);

  const handleAdicionarMembro = () => {
    if (novoMembroNome.trim() !== "") {
      const novoMembro: Membro = {
        id: Date.now(),
        nome: novoMembroNome,
        avatarUrl: null,
      };
      adicionarMembro(novoMembro);
      setNovoMembroNome("");
      setShowAddMembroModal(false);
    }
  };

  const handleAddMeta = () => {
    if (selectedMembro && selectedIndicadorId !== null) {
      const novaMeta: ValoresMembroIndicador = {
        membroId: selectedMembro?.id,
        indicadorId: selectedIndicadorId,
        planejado,
        cumprido,
      };
      setValoresMembroIndicador((prev) => [...prev, novaMeta]);
      // Reset fields
      setSelectedIndicadorId(null);
      setPlanejado(0);
      setCumprido(0);
      setShowAddMetaModal(false);
    }
  };

  // Function to get metas for a member
  const getMetasByMembro = (membroId: number) => {
    return valoresMembroIndicador.filter((meta) => meta.membroId === membroId);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Membros</h1>
        <Button onClick={() => setShowAddMembroModal(true)}>
          Adicionar Membro
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Metas</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {membros?.map((membro, im) => {
            const metas = getMetasByMembro(membro?.id);
            return (
              <>
                <TableRow key={membro?.id || im}>
                  <TableCell>{membro?.nome}</TableCell>
                  <TableCell>
                    {metas?.length > 0 ? (
                      metas?.map((meta, index) => {
                        const indicador = indicadores.find(
                          (i) => i.id === meta.indicadorId
                        );
                        return (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="mr-1"
                          >
                            {indicador?.nome}
                          </Badge>
                        );
                      })
                    ) : (
                      <span className="text-gray-500">Sem metas</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setSelectedMembro(membro);
                        setShowAddMetaModal(true);
                      }}
                    >
                      <CardStackPlusIcon className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
                {/* Additional rows for metas */}
                {metas?.map((meta, index) => {
                  const indicador = indicadores.find(
                    (i) => i.id === meta.indicadorId
                  );
                  return (
                    <TableRow
                      key={`${membro?.id}-${index}`}
                      className="bg-gray-50"
                    >
                      <TableCell className="pl-12">
                        <span className="text-sm text-gray-600">
                          Indicador: {indicador?.nome}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          Planejado: {meta.planejado}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          Cumprido: {meta.cumprido}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </>
            );
          })}
        </TableBody>
      </Table>

      {/* Modal para Adicionar Membro */}
      {showAddMembroModal && (
        <Modal onClose={() => setShowAddMembroModal(false)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Adicionar Membro</h2>
            <div className="mb-4">
              <Label htmlFor="nomeMembro">Nome do Membro</Label>
              <Input
                id="nomeMembro"
                value={novoMembroNome}
                onChange={(e) => setNovoMembroNome(e.target.value)}
                placeholder="Digite o nome do membro"
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button
                variant="secondary"
                onClick={() => setShowAddMembroModal(false)}
                className="mr-2"
              >
                Cancelar
              </Button>
              <Button onClick={handleAdicionarMembro}>Adicionar</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal para Adicionar Meta */}
      {showAddMetaModal && selectedMembro && (
        <Modal onClose={() => setShowAddMetaModal(false)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
              Adicionar Meta para {selectedMembro?.nome}
            </h2>
            <div className="mb-4">
              <Label htmlFor="indicadorSelect">Indicador</Label>
              <select
                id="indicadorSelect"
                value={selectedIndicadorId ?? ""}
                onChange={(e) => setSelectedIndicadorId(Number(e.target.value))}
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  Selecione um indicador
                </option>
                {indicadores.map((indicador) => (
                  <option key={indicador.id} value={indicador.id}>
                    {indicador.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <Label htmlFor="planejadoInput">Planejado</Label>
              <Input
                id="planejadoInput"
                type="number"
                value={planejado}
                onChange={(e) => setPlanejado(parseFloat(e.target.value))}
                placeholder="Valor planejado"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="cumpridoInput">Cumprido</Label>
              <Input
                id="cumpridoInput"
                type="number"
                value={cumprido}
                onChange={(e) => setCumprido(parseFloat(e.target.value))}
                placeholder="Valor cumprido"
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button
                variant="secondary"
                onClick={() => setShowAddMetaModal(false)}
                className="mr-2"
              >
                Cancelar
              </Button>
              <Button onClick={handleAddMeta}>Adicionar Meta</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
