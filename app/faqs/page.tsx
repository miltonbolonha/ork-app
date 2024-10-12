"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQsPage() {
  const faqs = [
    {
      question: "O que é o algoritmo de cálculo de desempenho?",
      answer:
        "O algoritmo de cálculo de desempenho usa valores planejados e cumpridos para avaliar o desempenho de membros e indicadores, considerando hierarquias, pesos e penalidades.",
    },
    {
      question: "Como o desempenho individual é calculado?",
      answer:
        "O desempenho individual é a razão entre o valor cumprido e o valor planejado para cada indicador. Por exemplo, se planejou 100 e cumpriu 90, o desempenho é 90%.",
    },
    {
      question: "O que são pesos (prioridades) no algoritmo?",
      answer:
        "Os pesos refletem a importância de cada indicador. Indicadores com maior prioridade têm maior impacto no desempenho total, podendo ser Alta, Média ou Baixa.",
    },
    {
      question: "Como os indicadores com penalidades funcionam?",
      answer:
        "Indicadores com penalidade afetam negativamente o desempenho total. Se o desempenho for baixo em um indicador penalizado, isso reduzirá o desempenho final.",
    },
    {
      question: "Como o algoritmo lida com hierarquia de indicadores?",
      answer:
        "O algoritmo calcula primeiro os indicadores filhos, e depois usa esses resultados para os indicadores pais, ponderando os resultados com base nos pesos.",
    },
    {
      question: "Como excedentes e perdas são calculados?",
      answer:
        "Excedentes ocorrem quando o valor cumprido excede o planejado, enquanto perdas acontecem quando o valor cumprido é menor que o planejado. Esses valores indicam metas superadas ou não alcançadas.",
    },
    {
      question:
        "Estou familiarizado com metas SMART. Por que devo mudar para OKRs?",
      answer:
        "Enquanto metas SMART são úteis para foco, os OKRs trazem flexibilidade e crescimento acelerado sem perder clareza. Eles dinamizam o processo, permitindo maior adaptação e inovação.",
    },
    {
      question: "Como evito que OKRs se tornem apenas mais uma tarefa?",
      answer:
        "Nosso sistema transforma o acompanhamento de metas em um jogo estratégico, onde cada conquista se torna um avanço. O processo é motivador e ajuda a alinhar estratégias com resultados.",
    },
    {
      question: "OKRs funcionam para equipes pequenas?",
      answer:
        "Sim, OKRs são altamente escaláveis e podem ser adaptados para qualquer tamanho de equipe, garantindo foco, clareza e propósito, independentemente do tamanho.",
    },
    {
      question: "Posso integrar OKRs com nossas ferramentas atuais?",
      answer:
        "Nossa plataforma é compatível com várias ferramentas, garantindo que sua equipe mantenha o fluxo de trabalho, enquanto aproveita o poder dos OKRs.",
    },
    {
      question: "Por que adotar OKRs?",
      answer:
        "OKRs ajudam a transformar metas em conquistas tangíveis, proporcionando foco nas prioridades, adaptabilidade e inovação contínua, além de um forte alinhamento entre equipes e objetivos.",
    },
    {
      question: "Como o algoritmo de OKRs gerencia dependências entre metas?",
      answer:
        "Nosso algoritmo visualiza e ajusta metas interligadas, permitindo que a gestão de dependências entre metas seja eficiente e previsível.",
    },
    {
      question: "Como OKRs ajudam na inovação contínua?",
      answer:
        "OKRs incentivam ciclos de feedback contínuo, permitindo que suas estratégias sejam constantemente ajustadas com base em dados reais e oportunidades emergentes.",
    },
    {
      question: "OKRs podem melhorar a transparência organizacional?",
      answer:
        "Sim! Com OKRs, cada equipe pode ver claramente como suas metas se alinham com os objetivos maiores da organização, aumentando a transparência e a coesão interna.",
    },
    {
      question: "Como OKRs se ajustam às mudanças rápidas no mercado?",
      answer:
        "OKRs são flexíveis e projetados para serem adaptáveis, o que significa que você pode ajustá-los conforme as prioridades do mercado mudam, sem perder o foco nas metas principais.",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Perguntas Frequentes (FAQs)</h1>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
