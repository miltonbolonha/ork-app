# Modelo Matemático Escalável e Composto para OKRs

### Autor: Milton Bolonha  
### Afiliado: [Sua Instituição]

---

## Resumo

Este paper apresenta um modelo matemático escalável para o sistema OKR (Objectives and Key Results). O modelo permite customizar o comportamento e a granularidade dos indicadores, mantendo precisão e flexibilidade na agregação de dados. Introduz-se uma pirâmide de informação que organiza os indicadores em níveis operacionais, táticos e estratégicos, permitindo escalabilidade para diferentes horizontes temporais, de diários a anuais. O modelo integra cronogramas trimestrais, semestrais e anuais, proporcionando uma visão gerencial e tática flexível.

---

## 1. Introdução

O sistema OKR tem se mostrado essencial para o alinhamento organizacional e a medição de metas em diferentes escalas. Com o aumento da complexidade organizacional, a customização e escalabilidade dos OKRs se tornam cada vez mais necessárias. Este trabalho propõe um modelo flexível e preciso, com adaptação para diferentes períodos de tempo, abrangendo desde metas diárias até anuais, com integração de cronogramas trimestrais, semestrais e anuais.

---

## 2. Definições e Notações Gerais

### 2.1 Conjuntos Básicos

- **Setores** (`S`): Conjunto de setores organizacionais.
- **Equipes** (`E`): Conjunto de equipes dentro dos setores.
- **Membros** (`M`): Conjunto de membros pertencentes a uma equipe.
- **Indicadores** (`K`): Conjunto de indicadores (Key Results), com customização pelo utilizador.

### 2.2 Relações

- Cada setor `s ∈ S` contém um conjunto de equipes `E_s ⊆ E`.
- Cada equipe `e ∈ E` pertence a um setor e é composta por membros `M_e ⊆ M`.
- Cada membro `m ∈ M` está associado a uma equipe e indicadores.
- Indicadores podem ser agrupados hierarquicamente, com indicadores filhos `F_k` contribuindo para indicadores pais `k_p`.

### 2.3 Customização do Modelo

O utilizador pode definir como os indicadores são agregados e os métodos de cálculo para cada nível da organização. A pirâmide de informação permite que indicadores operacionais sejam agregados em níveis táticos e estratégicos conforme necessário.

---

## 3. Dimensão Temporal e Escalabilidade

### 3.1 Períodos de Tempo

A escalabilidade do modelo permite personalização para diferentes horizontes temporais:

- **Diário** (`D`): Indicadores que medem o progresso em ciclos diários.
- **Semanal** (`W`): Indicadores ajustados para monitoramento semanal.
- **Mensal** (`Mo`): Indicadores focados em metas mensais.
- **Trimestral, Semestral, Anual**: Indicadores escaláveis para períodos mais longos.

Esses indicadores podem ser reavaliados periodicamente, permitindo adaptação contínua em níveis operacionais, táticos e estratégicos, com cronogramas trimestrais, semestrais e anuais.

---

## 4. Planejamento e Execução Escaláveis

### 4.1 Valores Planejados e Cumpridos

O modelo permite customizar como os dados de indicadores planejados e cumpridos são calculados em cada nível hierárquico:

- **Planejado**: `P_{m,k,t}` representa o valor planejado por um membro `m` para o indicador `k` em um período `t`.
- **Cumprido**: `C_{m,k,t,h}` é o valor real registrado no período `t` e horário `h`.

Os dados escalam conforme os períodos temporais e o utilizador pode definir como eles são combinados nos diferentes níveis da organização.

---

## 5. Indicadores Hierárquicos e Composição

### 5.1 Indicadores Hierárquicos

Os indicadores são organizados hierarquicamente. Indicadores operacionais fluem para indicadores táticos, que são agregados em indicadores estratégicos.

Para um indicador pai `k_p`, o desempenho composto é calculado como:

```
D_{k_p,t} = (Σ_{k_f ∈ F_k} D_{k_f,t} * w_{k_f}) / Σ_{k_f ∈ F_k} w_{k_f}
```

O utilizador pode ajustar os pesos `w_{k_f}` conforme necessário.

---

## 6. Cálculo de Desempenho e Agregação

### 6.1 Desempenho do Membro

Para calcular o desempenho individual:

```
d_{m,k,t} = Σ_{h ∈ H} C_{m,k,t,h} / P_{m,k,t}
```

### 6.2 Desempenho Total e Agregação

O desempenho total pode ser ajustado conforme o peso de cada indicador. Dados de desempenho são apresentados de forma agregada, de acordo com o que cada nível da organização deseja visualizar (OKR tático ou estratégico).

---

## 7. Indicadores por Setor, Equipe e Membro

### 7.1 Agregação por Setor

O desempenho de um setor `s` é calculado por:

```
D_{s,t} = Σ_{e ∈ E_s} Σ_{k ∈ K} D_{k,t}^{(e)} / |E_s|
```

### 7.2 Equipe e Membro

O desempenho de equipes e membros pode ser visualizado de forma hierárquica, ajustada conforme os indicadores operacionais selecionados.

---

## 8. Relatórios Personalizados

O modelo gera relatórios personalizados para diferentes níveis hierárquicos:

- **Nível Estratégico**: Focado em metas de longo prazo.
- **Nível Tático**: Metas de médio prazo, agregadas por setor.
- **Nível Operacional**: Acompanhamento granular de metas diárias e semanais.

---

## 9. Conclusão

O modelo matemático proposto oferece flexibilidade e escalabilidade, permitindo personalização nas regras de agregação e análise de dados conforme as necessidades organizacionais. Com uma estrutura hierárquica e cronogramas flexíveis, o modelo garante que equipes pequenas ou grandes corporações possam utilizar OKRs de forma eficaz e personalizada.




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
