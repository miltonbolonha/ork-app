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
  } = useOKR();

  const desempenhoTotal = calcularDesempenhoTotal();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Relatórios</h1>

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
            {indicadores.map((indicador: Indicador) => {
              const desempenho = calcularDesempenhoIndicador(indicador.id);
              const desempenhoPonderado = calcularDesempenhoPonderadoIndicador(
                indicador.id
              );
              const { excedente, perda } = calcularExcedentePerdaIndicador(
                indicador.id
              );
              const pesoTotal = indicadores.reduce(
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
              {indicadores.map((indicador: Indicador) => (
                <TableHead key={indicador.id}>{indicador.nome}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {membros.map((membro: Membro) => (
              <TableRow key={membro.id}>
                <TableCell>{membro.nome}</TableCell>
                {indicadores.map((indicador: Indicador) => {
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

      {/* Opcionalmente, exibir hierarquia de indicadores se aplicável */}
    </div>
  );
}
