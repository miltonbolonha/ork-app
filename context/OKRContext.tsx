"use client";

import { createContext, useState, useContext, ReactNode, useMemo } from "react";

// Interfaces
export interface Indicador {
  id: number;
  nome: string;
  peso: number; // Peso w_k personalizado
  penalidade: boolean; // p_k: true ou false
  indicadorPaiId?: number; // ID do indicador pai, se houver
  indicadoresFilhosIds?: number[]; // IDs dos indicadores filhos, se houver
}

export interface Membro {
  avatarUrl: any;
  id: number;
  nome: string;
}

export interface ValoresMembroIndicador {
  membroId: number;
  indicadorId: number;
  planejado: number; // P_{m,k}
  cumprido: number; // C_{m,k}
}

export interface Equipe {
  id: number;
  nome: string;
  membrosIds: number[];
  indicadoresIds: number[];
  setor: string; // Novo campo setor
}

interface DadosOKR {
  adicionarEquipe: (equipe: Equipe) => void;
  editarEquipe: (equipeAtualizada: Equipe) => void;
  indicadores: Indicador[];
  membros: Membro[];
  equipes: Equipe[];
  valoresMembroIndicador: ValoresMembroIndicador[];
  adicionarIndicador: (indicador: Indicador) => void;
  editarIndicador: (indicadorAtualizado: Indicador) => void; // Adicionado
  adicionarMembro: (membro: Membro) => void;
  setValoresMembroIndicador: React.Dispatch<
    React.SetStateAction<ValoresMembroIndicador[]>
  >;
  calcularDesempenhoMembroIndicador: (
    membroId: number,
    indicadorId: number
  ) => number;
  calcularDesempenhoIndicador: (indicadorId: number) => number;
  calcularDesempenhoPonderadoIndicador: (indicadorId: number) => number;
  calcularDesempenhoTotal: () => number;
  calcularExcedentePerdaIndicador: (indicadorId: number) => {
    excedente: number;
    perda: number;
  };
  importarIndicadores: (indicadoresImportados: Indicador[]) => void;
}

const OKRContext = createContext<DadosOKR | undefined>(undefined);

export function OKRProvider({ children }: { children: ReactNode }) {
  const [indicadores, setIndicadores] = useState<Indicador[]>([]);

  const [membros, setMembros] = useState<Membro[]>([
    {
      id: 1,
      nome: "João",
      avatarUrl: undefined,
    },
    {
      id: 2,
      nome: "Maria",
      avatarUrl: undefined,
    },
  ]);

  const [equipes, setEquipes] = useState<Equipe[]>([]);

  const [valoresMembroIndicador, setValoresMembroIndicador] = useState<
    ValoresMembroIndicador[]
  >([]);

  const editarEquipe = (equipeAtualizada: Equipe) => {
    setEquipes((prevEquipes) =>
      prevEquipes.map((equipe) =>
        equipe.id === equipeAtualizada.id ? equipeAtualizada : equipe
      )
    );
  };

  const editarIndicador = (indicadorAtualizado: Indicador) => {
    setIndicadores((prevIndicadores) =>
      prevIndicadores.map((indicador) =>
        indicador.id === indicadorAtualizado.id
          ? indicadorAtualizado
          : indicador
      )
    );
  };

  // Normalização dos pesos usando useMemo
  const totalPeso = useMemo(() => {
    return indicadores.reduce((sum, indicador) => sum + indicador.peso, 0);
  }, [indicadores]);

  // Função para normalizar o peso de um indicador
  const pesoNormalizado = (indicadorId: number): number => {
    const indicador = indicadores.find((i) => i.id === indicadorId);
    if (!indicador || totalPeso === 0) return 0;
    return indicador.peso / totalPeso;
  };

  // Funções para manipular os dados
  const adicionarIndicador = (indicador: Indicador) => {
    setIndicadores((prevIndicadores) => {
      // Se o indicador tem um pai, atualizamos o indicador pai para incluir este indicador como filho
      let indicadoresAtualizados = [...prevIndicadores];
      if (indicador.indicadorPaiId) {
        indicadoresAtualizados = indicadoresAtualizados.map((ind) => {
          if (ind.id === indicador.indicadorPaiId) {
            return {
              ...ind,
              indicadoresFilhosIds: ind.indicadoresFilhosIds
                ? [...ind.indicadoresFilhosIds, indicador.id]
                : [indicador.id],
            };
          }
          return ind;
        });
      }
      // Adicionamos o novo indicador à lista
      return [...indicadoresAtualizados, indicador];
    });
  };

  // Função para importar indicadores a partir de um JSON
  const importarIndicadores = (indicadoresImportados: Indicador[]) => {
    // Atualizar o estado adicionando os novos indicadores importados
    setIndicadores((prevIndicadores) => {
      const novosIndicadores = indicadoresImportados.map((indicador) => ({
        ...indicador,
        indicadoresFilhosIds: [],
      }));
      return [...prevIndicadores, ...novosIndicadores];
    });
  };

  // Função para adicionar equipe
  const adicionarEquipe = (equipe: Equipe) => {
    setEquipes([...equipes, equipe]);
  };

  // Função para adicionar membro (se ainda não tiver)
  const adicionarMembro = (membro: Membro) => {
    setMembros([...membros, membro]);
  };

  // Funções de cálculo
  function calcularDesempenhoMembroIndicador(
    membroId: number,
    indicadorId: number
  ): number {
    const valores = valoresMembroIndicador.find(
      (v) => v.membroId === membroId && v.indicadorId === indicadorId
    );
    if (!valores || valores.planejado === 0) return 0;
    return valores.cumprido / valores.planejado;
  }

  function calcularDesempenhoIndicador(indicadorId: number): number {
    const valoresIndicador = valoresMembroIndicador.filter(
      (v) => v.indicadorId === indicadorId
    );
    const somaCumprido = valoresIndicador.reduce(
      (acc, v) => acc + v.cumprido,
      0
    );
    const somaPlanejado = valoresIndicador.reduce(
      (acc, v) => acc + v.planejado,
      0
    );
    if (somaPlanejado === 0) return 0;
    return somaCumprido / somaPlanejado;
  }

  function calcularDesempenhoPonderadoIndicador(indicadorId: number): number {
    const indicador = indicadores.find((i) => i.id === indicadorId);
    if (!indicador) return 0;

    const desempenho = calcularDesempenhoIndicador(indicadorId);
    const pesoNorm = pesoNormalizado(indicadorId);
    let desempenhoPonderado = desempenho * pesoNorm;
    if (indicador.penalidade) {
      desempenhoPonderado = -desempenhoPonderado; // Penalidade impacta negativamente
    }
    return desempenhoPonderado;
  }

  function calcularDesempenhoTotal(): number {
    return indicadores.reduce((acc, indicador) => {
      return acc + calcularDesempenhoPonderadoIndicador(indicador.id);
    }, 0);
  }

  function calcularExcedentePerdaIndicador(indicadorId: number): {
    excedente: number;
    perda: number;
  } {
    const valoresIndicador = valoresMembroIndicador.filter(
      (v) => v.indicadorId === indicadorId
    );
    const somaCumprido = valoresIndicador.reduce(
      (acc, v) => acc + v.cumprido,
      0
    );
    const somaPlanejado = valoresIndicador.reduce(
      (acc, v) => acc + v.planejado,
      0
    );

    if (somaCumprido > somaPlanejado) {
      return { excedente: somaCumprido - somaPlanejado, perda: 0 };
    } else {
      return { excedente: 0, perda: somaPlanejado - somaCumprido };
    }
  }

  return (
    <OKRContext.Provider
      value={{
        indicadores,
        membros,
        equipes,
        valoresMembroIndicador,
        adicionarIndicador,
        editarIndicador, // Adicionado
        adicionarMembro,
        setValoresMembroIndicador,
        calcularDesempenhoMembroIndicador,
        calcularDesempenhoIndicador,
        calcularDesempenhoPonderadoIndicador,
        calcularDesempenhoTotal,
        calcularExcedentePerdaIndicador,
        adicionarEquipe,
        editarEquipe,
        importarIndicadores,
      }}
    >
      {children}
    </OKRContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useOKR() {
  const context = useContext(OKRContext);
  if (!context) {
    throw new Error("useOKR deve ser usado dentro de um OKRProvider");
  }
  return context;
}
