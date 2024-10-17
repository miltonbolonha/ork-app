"use client";

import { createContext, useState, useContext, ReactNode, useMemo } from "react";

// Interfaces

export interface Indicador {
  tipo?: any;
  id: number;
  nome: string;
  peso: number; // Peso w_k personalizado
  penalidade: boolean; // p_k: true ou false
  importancia: number; // Nível de importância: 1 - estratégico, 2 - gerenciamento de objetivos, 3 - operacional/tático
  indicadorPaiId?: number; // ID do indicador pai, se houver
  indicadoresFilhosIds?: number[]; // IDs dos indicadores filhos, se houver
  setor?: string; // Setor relacionado ao indicador, se aplicável
}

export interface Membro {
  avatarUrl: any;
  id: number;
  nome: string;
  equipeId?: number; // Para relacionar o membro a uma equipe
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
  setor: string; // Setor
  tipo: "Operacional" | "Gerencia" | "Executivo"; // Tipo da Equipe
  areaId?: number; // Campo para associar a equipe a uma área, se necessário
}

export interface RegiaoMetropolitana {
  id: number;
  nome: string;
  cidades: Cidade[];
}

export interface Cidade {
  id: number;
  nome: string;
  regioesMetropolitanasId: number;
  zonas: Zona[];
}

export interface Zona {
  id: number;
  nome: string;
  cidadeId: number;
  distritos: Distrito[];
}

export interface Distrito {
  id: number;
  nome: string;
  zonaId: number;
  areas: Area[];
}

export interface Area {
  id: number;
  nome: string;
  distritoId: number;
  equipes: Equipe[];
}

interface HierarchicalSelection {
  regiaoMetropolitanaId?: number;
  cidadeId?: number;
  zonaId?: number;
  distritoId?: number;
  areaId?: number;
  equipeId?: number;
}

interface DadosOKR {
  adicionarEquipe: (equipe: Equipe) => void;
  editarEquipe: (equipeAtualizada: Equipe) => void;
  indicadores: Indicador[];
  membros: Membro[];
  equipes: Equipe[];
  valoresMembroIndicador: ValoresMembroIndicador[];
  adicionarIndicador: (indicador: Indicador) => void;
  editarIndicador: (indicadorAtualizado: Indicador) => void;
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

  // Membro atual logado
  membroAtual: Membro;

  // Função para verificar se o membro pode visualizar o indicador
  podeVisualizarIndicador: (membro: Membro, indicador: Indicador) => boolean;

  regioesMetropolitanas: RegiaoMetropolitana[];
  hierarchicalSelection: HierarchicalSelection;
  setHierarchicalSelection: React.Dispatch<
    React.SetStateAction<HierarchicalSelection>
  >;

  getCidadesByRegiaoMetropolitana: (regiaoMetropolitanaId: number) => Cidade[];
  getZonasByCidade: (cidadeId: number) => Zona[];
  getDistritosByZona: (zonaId: number) => Distrito[];
  getAreasByDistrito: (distritoId: number) => Area[];
  getEquipesByArea: (areaId: number) => Equipe[];
}

const OKRContext = createContext<DadosOKR | undefined>(undefined);

export function OKRProvider({ children }: { children: ReactNode }) {
  const [indicadores, setIndicadores] = useState<Indicador[]>([
    {
      id: 1,
      nome: "Vendas Mensais",
      peso: 1,
      penalidade: false,
      importancia: 3, // Nível Operacional/Tático
      indicadorPaiId: undefined,
      indicadoresFilhosIds: [],
      setor: "Vendas",
      tipo: "",
    },
    {
      id: 2,
      nome: "Satisfação do Cliente",
      peso: 2,
      penalidade: false,
      importancia: 2, // Nível Gerenciamento de Objetivos
      indicadorPaiId: undefined,
      indicadoresFilhosIds: [],
      setor: "Backoffice",
      tipo: "",
    },
    {
      id: 3,
      nome: "Crescimento Anual",
      peso: 3,
      penalidade: false,
      importancia: 1, // Nível Estratégico
      indicadorPaiId: undefined,
      indicadoresFilhosIds: [],
      setor: undefined,
      tipo: "",
    },
  ]);

  const [membros, setMembros] = useState<Membro[]>([
    {
      id: 1,
      nome: "João",
      avatarUrl: "", // Forneça um valor vazio ou uma URL válida
      equipeId: 1,
    },
    {
      id: 2,
      nome: "Maria",
      avatarUrl: "", // Forneça um valor vazio ou uma URL válida
      equipeId: undefined, // Membro de nível estratégico
    },
  ]);

  const [equipes, setEquipes] = useState<Equipe[]>([
    {
      id: 1,
      nome: "Equipe de Vendas",
      membrosIds: [1],
      indicadoresIds: [1],
      setor: "Vendas",
      tipo: "Operacional",
    },
    {
      id: 2,
      nome: "Gerência Regional",
      membrosIds: [2],
      indicadoresIds: [2],
      setor: "Gerencia",
      tipo: "Gerencia",
    },
  ]);

  const [valoresMembroIndicador, setValoresMembroIndicador] = useState<
    ValoresMembroIndicador[]
  >([
    {
      membroId: 1, // João
      indicadorId: 1, // Vendas Mensais
      planejado: 100,
      cumprido: 80,
    },
  ]);
  // Initial data (replace with your actual data)
  const [regioesMetropolitanas, setRegioesMetropolitanas] = useState<
    RegiaoMetropolitana[]
  >([
    {
      id: 1,
      nome: "Região Metropolitana 1",
      cidades: [
        {
          id: 1,
          nome: "Cidade 1",
          regioesMetropolitanasId: 1,
          zonas: [
            {
              id: 1,
              nome: "Zona 1",
              cidadeId: 1,
              distritos: [
                {
                  id: 1,
                  nome: "Distrito 1",
                  zonaId: 1,
                  areas: [
                    {
                      id: 1,
                      nome: "Área 1",
                      distritoId: 1,
                      equipes: [
                        {
                          id: 1,
                          nome: "Equipe de Vendas",
                          membrosIds: [1],
                          indicadoresIds: [1],
                          setor: "Vendas",
                          tipo: "Operacional",
                          areaId: 1,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  // Membro atual logado
  const [membroAtual, setMembroAtual] = useState<Membro>(membros[0]);

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

  // Função para adicionar membro
  const adicionarMembro = (membro: Membro) => {
    setMembros([...membros, membro]);
  };

  // Função para verificar se o membro pode visualizar o indicador
  const podeVisualizarIndicador = (
    membro: Membro,
    indicador: Indicador
  ): boolean => {
    // Lógica de acesso baseada na importância do indicador
    if (!indicador.importancia) return false;
    const equipeDoMembro = equipes.find((e) => e.id === membro.equipeId);

    if (equipeDoMembro) {
      if (equipeDoMembro.tipo === "Operacional") {
        // Membros operacionais veem indicadores operacionais
        return indicador.importancia === 3;
      } else if (equipeDoMembro.tipo === "Gerencia") {
        // Membros de gerência veem indicadores de gerenciamento e operacionais
        return indicador.importancia === 2 || indicador.importancia === 3;
      } else if (equipeDoMembro.tipo === "Executivo") {
        // Executivos veem todos os indicadores
        return true;
      }
    } else {
      // Membros sem equipe (talvez executivos ou consultores)
      return indicador.importancia === 1 || indicador.importancia === 2;
    }
    return false;
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

  // Hierarchical selection state
  const [hierarchicalSelection, setHierarchicalSelection] =
    useState<HierarchicalSelection>({});

  // Functions to get options based on selection
  const getCidadesByRegiaoMetropolitana = (
    regiaoMetropolitanaId: number
  ): Cidade[] => {
    const regiao = regioesMetropolitanas.find(
      (r) => r.id === regiaoMetropolitanaId
    );
    return regiao ? regiao.cidades : [];
  };

  const getZonasByCidade = (cidadeId: number): Zona[] => {
    for (const regiao of regioesMetropolitanas) {
      const cidade = regiao.cidades.find((c) => c.id === cidadeId);
      if (cidade) {
        return cidade.zonas;
      }
    }
    return [];
  };

  const getDistritosByZona = (zonaId: number): Distrito[] => {
    for (const regiao of regioesMetropolitanas) {
      for (const cidade of regiao.cidades) {
        const zona = cidade.zonas.find((z) => z.id === zonaId);
        if (zona) {
          return zona.distritos;
        }
      }
    }
    return [];
  };

  const getAreasByDistrito = (distritoId: number): Area[] => {
    for (const regiao of regioesMetropolitanas) {
      for (const cidade of regiao.cidades) {
        for (const zona of cidade.zonas) {
          const distrito = zona.distritos.find((d) => d.id === distritoId);
          if (distrito) {
            return distrito.areas;
          }
        }
      }
    }
    return [];
  };

  const getEquipesByArea = (areaId: number): Equipe[] => {
    for (const regiao of regioesMetropolitanas) {
      for (const cidade of regiao.cidades) {
        for (const zona of cidade.zonas) {
          for (const distrito of zona.distritos) {
            const area = distrito.areas.find((a) => a.id === areaId);
            if (area) {
              return area.equipes;
            }
          }
        }
      }
    }
    return [];
  };

  return (
    <OKRContext.Provider
      value={{
        indicadores,
        membros,
        equipes,
        valoresMembroIndicador,
        adicionarIndicador,
        editarIndicador,
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
        membroAtual,
        podeVisualizarIndicador,
        regioesMetropolitanas,
        hierarchicalSelection,
        setHierarchicalSelection,
        getCidadesByRegiaoMetropolitana,
        getZonasByCidade,
        getDistritosByZona,
        getAreasByDistrito,
        getEquipesByArea,
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
