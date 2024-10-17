"use client";

import { useOKR } from "@/context/OKRContext";
import { Indicador, Membro } from "@/context/OKRContext";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function RelatoriosPage() {
  const {
    indicadores,
    membros,
    valoresMembroIndicador,
    calcularDesempenhoTotal,
    calcularDesempenhoPonderadoIndicador,
    calcularDesempenhoIndicador,
    calcularDesempenhoMembroIndicador,
    calcularExcedentePerdaIndicador,
    podeVisualizarIndicador,
    membroAtual,
    regioesMetropolitanas,
    getCidadesByRegiaoMetropolitana,
    getZonasByCidade,
    getDistritosByZona,
    getAreasByDistrito,
    getEquipesByArea,
    equipes,
  } = useOKR();

  const [regiaoSelecionada, setRegiaoSelecionada] = useState<
    number | undefined
  >(undefined);
  const [cidadeSelecionada, setCidadeSelecionada] = useState<
    number | undefined
  >(undefined);
  const [zonaSelecionada, setZonaSelecionada] = useState<number | undefined>(
    undefined
  );
  const [distritoSelecionado, setDistritoSelecionado] = useState<
    number | undefined
  >(undefined);
  const [areaSelecionada, setAreaSelecionada] = useState<number | undefined>(
    undefined
  );
  const [equipeSelecionada, setEquipeSelecionada] = useState<
    number | undefined
  >(undefined);

  const desempenhoTotal = calcularDesempenhoTotal();

  // Filtrar indicadores que o membro atual pode visualizar
  const indicadoresVisiveis = indicadores.filter((indicador) =>
    podeVisualizarIndicador(membroAtual, indicador)
  );

  // Filtrar membros com base na equipe selecionada
  let membrosFiltrados = membros;
  if (equipeSelecionada !== undefined) {
    const equipe = equipes.find((e) => e.id === equipeSelecionada);
    if (equipe) {
      membrosFiltrados = membros.filter((membro) =>
        equipe.membrosIds.includes(membro.id)
      );
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Relatórios</h1>

      {/* Filtros Hierárquicos */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Região Metropolitana */}
        <div>
          <Select
            onValueChange={(value) => {
              setRegiaoSelecionada(parseInt(value));
              setCidadeSelecionada(undefined);
              setZonaSelecionada(undefined);
              setDistritoSelecionado(undefined);
              setAreaSelecionada(undefined);
              setEquipeSelecionada(undefined);
            }}
            value={regiaoSelecionada?.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="Região Metropolitana" />
            </SelectTrigger>
            <SelectContent>
              {regioesMetropolitanas.map((regiao) => (
                <SelectItem key={regiao.id} value={regiao.id.toString()}>
                  {regiao.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Cidade */}
        <div>
          <Select
            onValueChange={(value) => {
              setCidadeSelecionada(parseInt(value));
              setZonaSelecionada(undefined);
              setDistritoSelecionado(undefined);
              setAreaSelecionada(undefined);
              setEquipeSelecionada(undefined);
            }}
            value={cidadeSelecionada?.toString()}
            disabled={!regiaoSelecionada}
          >
            <SelectTrigger>
              <SelectValue placeholder="Cidade" />
            </SelectTrigger>
            <SelectContent>
              {regiaoSelecionada &&
                getCidadesByRegiaoMetropolitana(regiaoSelecionada).map(
                  (cidade) => (
                    <SelectItem key={cidade.id} value={cidade.id.toString()}>
                      {cidade.nome}
                    </SelectItem>
                  )
                )}
            </SelectContent>
          </Select>
        </div>
        {/* Zona */}
        <div>
          <Select
            onValueChange={(value) => {
              setZonaSelecionada(parseInt(value));
              setDistritoSelecionado(undefined);
              setAreaSelecionada(undefined);
              setEquipeSelecionada(undefined);
            }}
            value={zonaSelecionada?.toString()}
            disabled={!cidadeSelecionada}
          >
            <SelectTrigger>
              <SelectValue placeholder="Zona" />
            </SelectTrigger>
            <SelectContent>
              {cidadeSelecionada &&
                getZonasByCidade(cidadeSelecionada).map((zona) => (
                  <SelectItem key={zona.id} value={zona.id.toString()}>
                    {zona.nome}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        {/* Distrito */}
        <div>
          <Select
            onValueChange={(value) => {
              setDistritoSelecionado(parseInt(value));
              setAreaSelecionada(undefined);
              setEquipeSelecionada(undefined);
            }}
            value={distritoSelecionado?.toString()}
            disabled={!zonaSelecionada}
          >
            <SelectTrigger>
              <SelectValue placeholder="Distrito" />
            </SelectTrigger>
            <SelectContent>
              {zonaSelecionada &&
                getDistritosByZona(zonaSelecionada).map((distrito) => (
                  <SelectItem key={distrito.id} value={distrito.id.toString()}>
                    {distrito.nome}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        {/* Área */}
        <div>
          <Select
            onValueChange={(value) => {
              setAreaSelecionada(parseInt(value));
              setEquipeSelecionada(undefined);
            }}
            value={areaSelecionada?.toString()}
            disabled={!distritoSelecionado}
          >
            <SelectTrigger>
              <SelectValue placeholder="Área" />
            </SelectTrigger>
            <SelectContent>
              {distritoSelecionado &&
                getAreasByDistrito(distritoSelecionado).map((area) => (
                  <SelectItem key={area.id} value={area.id.toString()}>
                    {area.nome}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        {/* Equipe */}
        <div>
          <Select
            onValueChange={(value) => {
              setEquipeSelecionada(parseInt(value));
            }}
            value={equipeSelecionada?.toString()}
            disabled={!areaSelecionada}
          >
            <SelectTrigger>
              <SelectValue placeholder="Equipe" />
            </SelectTrigger>
            <SelectContent>
              {areaSelecionada &&
                getEquipesByArea(areaSelecionada).map((equipe) => (
                  <SelectItem key={equipe.id} value={equipe.id.toString()}>
                    {equipe.nome}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desempenho Total */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Desempenho Total</h2>
        <p className="text-xl">{(desempenhoTotal * 100).toFixed(2)}%</p>
        <Progress value={desempenhoTotal * 100} />
      </div>

      {/* Desempenho por Indicador */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Desempenho por Indicador</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Indicador</TableHead>
              <TableHead>Peso</TableHead>
              <TableHead>Peso Normalizado</TableHead>
              <TableHead>Penalidade</TableHead>
              <TableHead>Desempenho</TableHead>
              <TableHead>Desempenho Ponderado</TableHead>
              <TableHead>Excedente</TableHead>
              <TableHead>Perda</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {indicadoresVisiveis.map((indicador: Indicador) => {
              const desempenho = calcularDesempenhoIndicador(indicador.id);
              const desempenhoPonderado = calcularDesempenhoPonderadoIndicador(
                indicador.id
              );
              const { excedente, perda } = calcularExcedentePerdaIndicador(
                indicador.id
              );
              const pesoTotal = indicadoresVisiveis.reduce(
                (sum, ind) => sum + ind.peso,
                0
              );
              const pesoNormalizado = (indicador.peso / pesoTotal).toFixed(2);

              return (
                <TableRow key={indicador.id}>
                  <TableCell>{indicador.nome}</TableCell>
                  <TableCell>{indicador.peso}</TableCell>
                  <TableCell>{pesoNormalizado}</TableCell>
                  <TableCell>{indicador.penalidade ? "Sim" : "Não"}</TableCell>
                  <TableCell>
                    {(desempenho * 100).toFixed(2)}%
                    <Progress value={desempenho * 100} />
                  </TableCell>
                  <TableCell>
                    {(desempenhoPonderado * 100).toFixed(2)}%
                  </TableCell>
                  <TableCell>{excedente.toFixed(2)}</TableCell>
                  <TableCell>{perda.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Desempenho por Membro por Indicador */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Desempenho por Membro</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Membro</TableHead>
              {indicadoresVisiveis.map((indicador: Indicador) => (
                <TableHead key={indicador.id}>{indicador.nome}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {membrosFiltrados.map((membro: Membro) => (
              <TableRow key={membro.id}>
                <TableCell>{membro.nome}</TableCell>
                {indicadoresVisiveis.map((indicador: Indicador) => {
                  const valores = valoresMembroIndicador.find(
                    (v) =>
                      v.membroId === membro.id && v.indicadorId === indicador.id
                  );
                  const desempenhoMembro = calcularDesempenhoMembroIndicador(
                    membro.id,
                    indicador.id
                  );
                  return (
                    <TableCell key={indicador.id}>
                      {valores ? (
                        <div>
                          <div>
                            <strong>Planejado:</strong> {valores.planejado}
                          </div>
                          <div>
                            <strong>Cumprido:</strong> {valores.cumprido}
                          </div>
                          <div>
                            <strong>Desempenho:</strong>{" "}
                            {(desempenhoMembro * 100).toFixed(2)}%
                            <Progress value={desempenhoMembro * 100} />
                          </div>
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
