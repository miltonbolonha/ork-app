# Modelo Matemático Escalável e Composto para OKRs

### Autor: Milton Bolonha  
### Afiliado: [Sua Instituição]

## Resumo

Este paper apresenta um modelo matemático atualizado e escalável para o sistema OKR (Objectives and Key Results). O modelo proposto permite que o utilizador customize o comportamento e a granularidade dos indicadores conforme necessário, mantendo a precisão na medição e a flexibilidade na agregação de dados. 

Introduz-se uma pirâmide de informação que organiza os indicadores em níveis operacionais, táticos e estratégicos, permitindo a escalabilidade do modelo para diferentes horizontes temporais, desde diários até anuais. 

O modelo integra cronogramas trimestrais, semestrais e anuais, com indicadores que fluem hierarquicamente, do nível operacional ao estratégico, proporcionando uma visão gerencial e tática flexível e escalável.

## 1. Introdução

O sistema OKR tem se mostrado uma ferramenta essencial para o alinhamento organizacional e a medição de metas em diversas escalas. 

No entanto, com a crescente complexidade dos ambientes empresariais, há uma necessidade crescente de customização e escalabilidade na aplicação dos OKRs. Este trabalho visa preencher essa lacuna ao propor um modelo que seja, ao mesmo tempo, preciso e flexível, permitindo que cada utilizador defina como os indicadores se comportam em diferentes níveis da organização, através de uma abordagem hierárquica e composta. 

O modelo também oferece a capacidade de adaptação aos diferentes períodos de tempo, escalando para horizontes diários, semanais, mensais, trimestrais, semestrais e anuais, além de garantir uma integração de cronogramas e planejamentos anuais.

## 2. Definições e Notações Gerais

### 2.1 Conjuntos Básicos

- **Setores** (\( S \)): Conjunto de setores organizacionais.
- **Equipes** (\( E \)): Conjunto de equipes dentro dos setores.
- **Membros** (\( M \)): Conjunto de membros pertencentes a uma equipe.
- **Indicadores** (\( K \)): Conjunto de indicadores (Key Results), com customização determinada pelo utilizador.

### 2.2 Relações

- Cada setor \( s \in S \) contém um conjunto de equipes \( E_s \subseteq E \).
- Cada equipe \( e \in E \) pertence a um setor e é composta por membros \( M_e \subseteq M \).
- Cada membro \( m \in M \) está associado a uma equipe \( e \) e indicadores.
- Os indicadores podem ser agrupados hierarquicamente, com indicadores filhos \( F_k \) contribuindo para indicadores pais \( k_p \).

### 2.3 Customização do Modelo

O utilizador tem a liberdade de definir como os indicadores são agregados e quais os métodos de cálculo aplicáveis para cada nível da organização. A pirâmide de informação permite que indicadores operacionais sejam agregados em níveis táticos e estratégicos, permitindo diferentes composições de acordo com a necessidade de análise.

## 3. Dimensão Temporal e Escalabilidade

### 3.1 Períodos de Tempo

A dimensão temporal é um componente essencial da escalabilidade do modelo, permitindo a personalização em diferentes horizontes temporais:

- **Diário** (\( D \)): Indicadores que medem o progresso em ciclos diários.
- **Semanal** (\( W \)): Indicadores ajustados para monitoramento semanal.
- **Mensal** (\( Mo \)): Indicadores focados em metas mensais.
- **Trimestral, Semestral, Anual**: Indicadores escaláveis para períodos mais longos.

Os indicadores podem ser reavaliados periodicamente com base no tipo de OKR (operacional, tático ou estratégico), permitindo uma adaptação contínua dos resultados em diferentes níveis da organização, com cronogramas que podem ser ajustados trimestralmente, semestralmente e anualmente.

## 4. Planejamento e Execução Escaláveis

### 4.1 Valores Planejados e Cumpridos

O modelo permite a customização de como os dados de indicadores planejados e cumpridos são armazenados e calculados para cada nível hierárquico:

- **Planejado**: \( P_{m,k,t} \) representa o valor planejado por um membro \( m \) para o indicador \( k \) em um período \( t \).
- **Cumprido**: \( C_{m,k,t,h} \) é o valor real registrado no período \( t \) e horário \( h \).

Os dados agregados escalam conforme os períodos temporais, e o utilizador pode determinar como esses dados são combinados em diferentes níveis da organização.

## 5. Indicadores Hierárquicos e Composição

### 5.1 Indicadores Hierárquicos

Os indicadores são organizados em uma estrutura hierárquica. Indicadores operacionais, capturados no nível de membros ou equipes, fluem para indicadores táticos, que são compostos e agregados nos indicadores estratégicos.

Para cada indicador \( k_p \), que é pai de indicadores filhos \( F_k \), o desempenho composto é calculado como:

\[ D_{k_p,t} = \frac{\sum_{k_f \in F_k} D_{k_f,t} \times w_{k_f}}{\sum_{k_f \in F_k} w_{k_f}} \]

O modelo permite que o utilizador customize como esses pesos \( w_{k_f} \) são atribuídos e ajustados.

## 6. Cálculo de Desempenho e Agregação

### 6.1 Desempenho do Membro

Para calcular o desempenho individual:

\[ d_{m,k,t} = \frac{\sum_{h \in H} C_{m,k,t,h}}{P_{m,k,t}} \]

### 6.2 Desempenho Total e Agregação

O desempenho total pode ser ajustado de acordo com o peso de cada indicador. Para os gerentes e níveis superiores, os dados de desempenho podem ser apresentados como uma agregação personalizada de acordo com o que cada nível quer visualizar, seja em OKR tático ou estratégico.

## 7. Indicadores por Setor, Equipe e Membro

### 7.1 Agregação por Setor

O modelo permite que o utilizador decida como os indicadores de cada setor são calculados e exibidos para o nível gerencial. O desempenho de um setor \( s \) é dado por:

\[ D_{s,t} = \frac{\sum_{e \in E_s} \sum_{k \in K} D_{k,t}^{(e)}}{|E_s|} \]

### 7.2 Equipe e Membro

O desempenho de equipes e membros pode ser visualizado de forma hierárquica e ajustada conforme as prioridades e indicadores operacionais selecionados.

## 8. Relatórios Personalizados

O modelo gera relatórios adaptados para diferentes níveis hierárquicos, com customizações definidas pelo utilizador:

- **Nível Estratégico**: Relatórios focados em metas de longo prazo.
- **Nível Tático**: Metas de médio prazo agregadas por setores.
- **Nível Operacional**: Acompanhamento granular de metas diárias e semanais.

## 9. Conclusão

O modelo matemático proposto oferece flexibilidade e escalabilidade, permitindo ao utilizador definir as regras de agregação e análise de dados conforme as necessidades organizacionais. Com uma abordagem hierárquica e a possibilidade de ajustes contínuos, o modelo garante que tanto pequenas equipes quanto grandes corporações possam utilizar OKRs de maneira eficaz e personalizada. O uso de cronogramas flexíveis, de curto a longo prazo, e a personalização dos indicadores por nível hierárquico permite que o modelo se adapte a qualquer necessidade de gestão de desempenho.



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
/components
NavBar.tsx
`"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          📊 Sistema OKR
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Button asChild variant="link">
              <Link href="/dashboard">🏠 Dashboard</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="link">
              <Link href="/indicadores">📈 Indicadores-Chave</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="link">
              <Link href="/equipes">🧑‍💼 Equipes</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="link">
              <Link href="/membros">👥 Membros</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="link">
              <Link href="/relatorios">📊 Relatórios</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="link">
              <Link href="/faqs">❓ FAQs</Link>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
`
/components/ui/button
/containers/
/context/OKRContext.tsx
`"use client";

import { createContext, useState, useContext, ReactNode } from "react";

interface Indicador {
  id: number;
  nome: string;
  prioridade: number;
  penalidade: boolean;
  indicadorPai?: Indicador;
  indicadoresFilhos?: Indicador[];
}

interface Membro {
  id: number;
  nome: string;
}

interface Equipe {
  id: number;
  nome: string;
  membros: Membro[];
}

interface DadosOKR {
  indicadores: Indicador[];
  membros: Membro[];
  equipes: Equipe[];
  // Outros dados e funções
}

const OKRContext = createContext<DadosOKR | undefined>(undefined);

export function OKRProvider({ children }: { children: ReactNode }) {
  const [indicadores, setIndicadores] = useState<Indicador[]>([]);
  const [membros, setMembros] = useState<Membro[]>([]);
  const [equipes, setEquipes] = useState<Equipe[]>([]);

  // Funções para manipular os dados
  const adicionarIndicador = (indicador: Indicador) => {
    setIndicadores([...indicadores, indicador]);
  };

  // Outras funções...

  return (
    <OKRContext.Provider
      value={{
        indicadores,
        membros,
        equipes,
        adicionarIndicador,
        // Outros valores e funções
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
`
/lib/utils.ts
`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
/tailwind.config.ts
`import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
`
/tsconfig.json
`{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@/app/*": ["../app/*"],
      "@/content/*": ["../content/*"],
      "@/components/*": ["./components/*"],
      "@/containers/*": ["./containers/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`
/components.json
`{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}`
/app
  /dashboard
    page.jsx
    `ta vazio o conteudo`
  /indicadores
    page.jsx
  /equipes
    page.jsx
    `ta vazio o conteudo`
  /membros
    page.jsx
    `export default function MembrosPage() {
  const { membros, indicadores } = useOKR();

  // Implementar a lógica para que os membros insiram os valores

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Membros</h1>
      {/* Lista de membros e formulários para inserir valores */}
    </div>
  );
}
`
  /relatorios
    page.jsx
    `ta vazio o conteudo`
  /faqs
    page.jsx
    `ta vazio o conteudo`
  layout.jsx
  page.jsx
  globals.css
```
