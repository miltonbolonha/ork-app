"use client";

import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Modal } from "@/components/ui/modal";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarMod";
import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, CardStackPlusIcon } from "@radix-ui/react-icons";

import {
  useOKR,
  Membro,
  Equipe,
  // Indicador,
  ValoresMembroIndicador,
} from "@/context/OKRContext";

export default function EquipesPage() {
  const [showModal, setShowModal] = useState(false);
  const [nomeEquipe, setNomeEquipe] = useState("");
  const [setorEquipe, setSetorEquipe] = useState("");
  const [tipoEquipe, setTipoEquipe] = useState<
    "Operacional" | "Gerencia" | "Executivo"
  >("Operacional");
  const [membrosSelecionados, setMembrosSelecionados] = useState<number[]>([]);
  const [indicadoresSelecionados, setIndicadoresSelecionados] = useState<
    number[]
  >([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [equipeEmEdicao, setEquipeEmEdicao] = useState<Equipe | null>(null);
  const {
    membros,
    indicadores,
    valoresMembroIndicador,
    adicionarMembro,
    setValoresMembroIndicador,
    equipes,
    adicionarEquipe,
    editarEquipe,
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
        membroId: selectedMembro.id,
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
  // Lista de setores existentes
  // const setores = Array.from(new Set(equipes.map((equipe) => equipe.setor)));

  const openEditModal = (equipe: Equipe) => {
    setEquipeEmEdicao(equipe);
    setNomeEquipe(equipe.nome);
    setSetorEquipe(equipe.setor);
    setTipoEquipe(equipe.tipo);
    setMembrosSelecionados(equipe.membrosIds);
    setIndicadoresSelecionados(equipe.indicadoresIds);
    setEditModalVisible(true);
  };

  const handleEditarEquipe = () => {
    if (equipeEmEdicao && nomeEquipe) {
      const equipeAtualizada: Equipe = {
        ...equipeEmEdicao,
        nome: nomeEquipe,
        setor: setorEquipe,
        tipo: tipoEquipe,
        membrosIds: membrosSelecionados,
        indicadoresIds: indicadoresSelecionados,
      };
      editarEquipe(equipeAtualizada);
      // Limpar campos e fechar modal
      setEquipeEmEdicao(null);
      setNomeEquipe("");
      setSetorEquipe("");
      setTipoEquipe("Operacional");
      setMembrosSelecionados([]);
      setIndicadoresSelecionados([]);
      setEditModalVisible(false);
    }
  };

  const handleAdicionarEquipe = () => {
    if (nomeEquipe && setorEquipe) {
      const novaEquipe: Equipe = {
        id: Date.now(),
        nome: nomeEquipe,
        setor: setorEquipe,
        tipo: tipoEquipe,
        membrosIds: membrosSelecionados,
        indicadoresIds: indicadoresSelecionados,
      };
      adicionarEquipe(novaEquipe);
      // Limpar os campos
      setNomeEquipe("");
      setSetorEquipe("");
      setTipoEquipe("Operacional");
      setMembrosSelecionados([]);
      setIndicadoresSelecionados([]);
      setShowModal(false);
    }
  };

  const toggleMembroSelection = (id: number) => {
    setMembrosSelecionados((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  const toggleIndicadorSelection = (id: number) => {
    setIndicadoresSelecionados((prev) =>
      prev.includes(id) ? prev.filter((iid) => iid !== id) : [...prev, id]
    );
  };

  // Agrupar equipes por setor
  const equipesPorSetor = equipes.reduce((acc, equipe) => {
    acc[equipe.setor] = acc[equipe.setor] || [];
    acc[equipe.setor].push(equipe);
    return acc;
  }, {} as { [key: string]: Equipe[] });

  return (
    <>
      <div className="p-6">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="flex justify-end mt-6 font-bold">Equipes</h2>
          <div className="flex justify-end mt-6 font-bold gap-1.5">
            <Button onClick={() => setShowModal(true)}>Adicionar Equipe</Button>
            <Button onClick={() => setShowAddMembroModal(true)}>
              Adicionar Membro
            </Button>
          </div>
        </div>

        {/* Lista de Equipes Agrupadas por Setor */}
        {Object.keys(equipesPorSetor).length === 0 ? (
          <p>Nenhuma equipe disponível.</p>
        ) : (
          Object.keys(equipesPorSetor).map((setor) => (
            <div key={setor} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{setor}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {equipesPorSetor[setor].map((equipe) => (
                  <Card key={equipe.id} className="p-4">
                    <CardTitle className="text-center">{equipe.nome}</CardTitle>
                    <p className="text-center text-sm text-gray-500">
                      Tipo: {equipe.tipo}
                    </p>
                    <Separator className="my-4" />

                    <CardContent className="grid gap-4">
                      <div className="flex items-center space-x-4 rounded-md border p-4">
                        <h3 className="font-medium">Membros:</h3>
                        {equipe.membrosIds.map((mid) => {
                          const membro = membros.find((m) => m.id === mid);
                          if (!membro) return null;
                          return (
                            <Avatar key={mid} className="border-2 border-white">
                              {membro.avatarUrl ? (
                                <AvatarImage
                                  src={membro.avatarUrl}
                                  alt={membro.nome}
                                />
                              ) : (
                                <AvatarFallback>
                                  {membro.nome.charAt(0)}
                                </AvatarFallback>
                              )}
                            </Avatar>
                          );
                        })}
                      </div>
                      <p className="font-medium">Indicadores:</p>
                      <div className="w-full">
                        {equipe.indicadoresIds.map((iid) => {
                          const indicador = indicadores.find(
                            (i) => i.id === iid
                          );
                          return indicador ? (
                            <Badge
                              key={iid}
                              variant="outline"
                              className="mr-2 h-5"
                            >
                              {indicador.nome}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => openEditModal(equipe)}
                        className="w-full"
                      >
                        <CheckIcon className="mr-2 h-4 w-4" /> Editar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}

        {/* Modal para adicionar equipe */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div className="p-6 max-h-screen overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Nova Equipe</h2>
              <div className="mb-4">
                <Label htmlFor="nomeEquipe">Nome da Equipe</Label>
                <Input
                  id="nomeEquipe"
                  value={nomeEquipe}
                  onChange={(e) => setNomeEquipe(e.target.value)}
                  placeholder="Digite o nome da equipe"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="setorEquipe">Setor</Label>
                <Input
                  id="setorEquipe"
                  value={setorEquipe}
                  onChange={(e) => setSetorEquipe(e.target.value)}
                  placeholder="Digite o setor da equipe"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="tipoEquipe">Tipo da Equipe</Label>
                <select
                  id="tipoEquipe"
                  value={tipoEquipe}
                  onChange={(e) =>
                    setTipoEquipe(
                      e.target.value as "Operacional" | "Gerencia" | "Executivo"
                    )
                  }
                  className="block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Operacional">Operacional</option>
                  <option value="Gerencia">Gerencia</option>
                  <option value="Executivo">Executivo</option>
                </select>
              </div>
              <div className="mb-4">
                <Label>Membros</Label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded">
                  {membros.map((membro) => (
                    <div key={membro.id} className="flex items-center">
                      <Checkbox
                        id={`membro-${membro.id}`}
                        checked={membrosSelecionados.includes(membro.id)}
                        onCheckedChange={() => toggleMembroSelection(membro.id)}
                      />
                      <Label htmlFor={`membro-${membro.id}`} className="ml-2">
                        {membro.nome}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <Label>Indicadores</Label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded">
                  {indicadores.map((indicador) => (
                    <div key={indicador.id} className="flex items-center">
                      <Checkbox
                        id={`indicador-${indicador.id}`}
                        checked={indicadoresSelecionados.includes(indicador.id)}
                        onCheckedChange={() =>
                          toggleIndicadorSelection(indicador.id)
                        }
                      />
                      <Label
                        htmlFor={`indicador-${indicador.id}`}
                        className="ml-2"
                      >
                        {indicador.nome}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowModal(false)}
                  className="mr-2"
                >
                  Cancelar
                </Button>
                <Button onClick={handleAdicionarEquipe}>Adicionar</Button>
              </div>
            </div>
          </Modal>
        )}

        {/* Modal para editar equipe */}
        {editModalVisible && (
          <Modal onClose={() => setEditModalVisible(false)}>
            <div className="p-6 max-h-screen overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Editar Equipe</h2>
              <div className="mb-4">
                <Label htmlFor="editNomeEquipe">Nome da Equipe</Label>
                <Input
                  id="editNomeEquipe"
                  value={nomeEquipe}
                  onChange={(e) => setNomeEquipe(e.target.value)}
                  placeholder="Digite o nome da equipe"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="editSetorEquipe">Setor</Label>
                <Input
                  id="editSetorEquipe"
                  value={setorEquipe}
                  onChange={(e) => setSetorEquipe(e.target.value)}
                  placeholder="Digite o setor da equipe"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="editTipoEquipe">Tipo da Equipe</Label>
                <select
                  id="editTipoEquipe"
                  value={tipoEquipe}
                  onChange={(e) =>
                    setTipoEquipe(
                      e.target.value as "Operacional" | "Gerencia" | "Executivo"
                    )
                  }
                  className="block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Operacional">Operacional</option>
                  <option value="Gerencia">Gerencia</option>
                  <option value="Executivo">Executivo</option>
                </select>
              </div>
              <div className="mb-4">
                <Label>Membros</Label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded">
                  {membros.map((membro) => (
                    <div key={membro.id} className="flex items-center">
                      <Checkbox
                        id={`edit-membro-${membro.id}`}
                        checked={membrosSelecionados.includes(membro.id)}
                        onCheckedChange={() => toggleMembroSelection(membro.id)}
                      />
                      <Label
                        htmlFor={`edit-membro-${membro.id}`}
                        className="ml-2"
                      >
                        {membro.nome}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <Label>Indicadores</Label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border rounded">
                  {indicadores.map((indicador) => (
                    <div key={indicador.id} className="flex items-center">
                      <Checkbox
                        id={`edit-indicador-${indicador.id}`}
                        checked={indicadoresSelecionados.includes(indicador.id)}
                        onCheckedChange={() =>
                          toggleIndicadorSelection(indicador.id)
                        }
                      />
                      <Label
                        htmlFor={`edit-indicador-${indicador.id}`}
                        className="ml-2"
                      >
                        {indicador.nome}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setEditModalVisible(false)}
                  className="mr-2"
                >
                  Cancelar
                </Button>
                <Button onClick={handleEditarEquipe}>Salvar Alterações</Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold">Membros</h3>
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
            {membros.map((membro) => {
              const metas = getMetasByMembro(membro.id);
              return (
                <React.Fragment key={membro.id}>
                  <TableRow>
                    <TableCell>{membro.nome}</TableCell>
                    <TableCell>
                      {metas.length > 0 ? (
                        metas.map((meta, index) => {
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
                  {metas.map((meta, index) => {
                    const indicador = indicadores.find(
                      (i) => i.id === meta.indicadorId
                    );
                    return (
                      <TableRow
                        key={`${membro.id}-${index}`}
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
                </React.Fragment>
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
                Adicionar Meta para {selectedMembro.nome}
              </h2>
              <div className="mb-4">
                <Label htmlFor="indicadorSelect">Indicador</Label>
                <select
                  id="indicadorSelect"
                  value={selectedIndicadorId ?? ""}
                  onChange={(e) =>
                    setSelectedIndicadorId(Number(e.target.value))
                  }
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
    </>
  );
}
