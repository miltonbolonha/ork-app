"use client";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQsPage() {
  // Categoria: Performance e Cálculo
  const performanceCalculationFaqs = [
    {
      question: "Como atualmente você avalia o desempenho da sua equipe?",
      answer:
        "Muitos gestores enfrentam desafios ao obter uma visão precisa do desempenho individual e coletivo, especialmente quando depende de processos manuais ou sistemas desconectados.",
    },
    {
      question:
        "Você tem dificuldade em identificar áreas específicas onde o desempenho pode ser melhorado?",
      answer:
        "Sem ferramentas adequadas, pode ser difícil pinpointar exatamente onde estão os gargalos, o que impede ações corretivas eficazes e pode levar a metas não alcançadas.",
    },
    {
      question:
        "Qual o impacto na sua organização ao não analisar profundamente o desempenho?",
      answer:
        "Isso pode resultar em perdas financeiras, baixa moral da equipe e queda na produtividade, afetando a competitividade e o crescimento da empresa.",
    },
    {
      question: "Como nosso sistema de cálculo de desempenho pode ajudar você?",
      answer:
        "Ele fornece análises detalhadas e em tempo real do desempenho, considerando hierarquias, pesos e penalidades. Isso permite identificar rapidamente áreas de melhoria, otimizar recursos e impulsionar resultados.",
    },
  ];

  // Categoria: OKRs (Objectives and Key Results)
  const okrFaqs = [
    {
      question: "Como você define e acompanha suas metas atualmente?",
      answer:
        "Muitas empresas usam métodos tradicionais que podem ser inflexíveis e não refletem as rápidas mudanças do mercado.",
    },
    {
      question:
        "Enfrenta desafios em alinhar os objetivos da equipe com os da organização?",
      answer:
        "Objetivos desalinhados podem causar retrabalho, desperdício de recursos e falta de direção clara para a equipe.",
    },
    {
      question:
        "Quais são as consequências de não adaptar rapidamente suas metas estratégicas?",
      answer:
        "A empresa pode perder oportunidades de mercado, ficar atrás dos concorrentes e não atender às necessidades dos clientes de forma eficaz.",
    },
    {
      question:
        "Como a implementação de OKRs com nosso sistema pode beneficiar sua organização?",
      answer:
        "Os OKRs promovem alinhamento, foco e flexibilidade. Nosso sistema facilita a definição, acompanhamento e ajuste de metas em tempo real, incentivando a inovação e a colaboração entre equipes.",
    },
  ];

  // Categoria: Funcionalidades do Sistema
  const systemFeaturesFaqs = [
    {
      question:
        "Quão eficiente é o seu processo atual de gerenciamento de metas e desempenho?",
      answer:
        "Processos manuais ou sistemas desintegrados podem consumir tempo valioso e estão sujeitos a erros.",
    },
    {
      question:
        "Você encontra dificuldades ao integrar diferentes ferramentas utilizadas pela sua equipe?",
      answer:
        "A falta de integração pode levar à duplicação de esforços, informações inconsistentes e perda de dados importantes.",
    },
    {
      question:
        "Quais riscos você corre ao continuar com sistemas sem segurança robusta?",
      answer:
        "Riscos incluem vazamento de informações confidenciais, compliance comprometida e danos à reputação da empresa.",
    },
    {
      question: "Como nosso sistema pode otimizar suas operações diárias?",
      answer:
        "Oferecemos uma plataforma integrada com recursos de segurança avançados, automação de tarefas repetitivas e facilidade de uso, liberando sua equipe para se concentrar em estratégias de crescimento.",
    },
    {
      question:
        "Você tem problemas em coordenar equipes remotas ou distribuídas globalmente?",
      answer:
        "Fusos horários diferentes e falta de comunicação eficaz podem levar a atrasos e desalinhamento nas metas.",
    },
    {
      question:
        "De que forma nosso sistema facilita a colaboração em equipes distribuídas?",
      answer:
        "Com ferramentas de comunicação integradas, notificações em tempo real e acessibilidade global, nosso sistema mantém todos conectados e alinhados, independentemente da localização.",
    },
  ];

  // Categoria: Recursos Extras
  const additionalResourcesFaqs = [
    {
      question: "Você sabe em quais momentos sua equipe é mais produtiva?",
      answer:
        "Sem essas informações, pode ser desafiador otimizar agendas e alocar recursos de forma eficaz.",
    },
    {
      question:
        "Qual o impacto de não aproveitar os períodos de maior produtividade da sua equipe?",
      answer:
        "Pode resultar em menor eficiência, prazos perdidos e oportunidades desperdiçadas, afetando os resultados gerais da empresa.",
    },
    {
      question: "Como nosso sistema pode ajudar a maximizar a produtividade?",
      answer:
        "Analisamos dados de desempenho para identificar padrões de produtividade, permitindo que você ajuste processos e horários para obter o melhor da sua equipe.",
    },
  ];

  // Montando a lista completa de FAQs
  const faqs = [
    { title: "Performance e Cálculo", data: performanceCalculationFaqs },
    { title: "OKRs (Objectives and Key Results)", data: okrFaqs },
    { title: "Funcionalidades do Sistema", data: systemFeaturesFaqs },
    { title: "Recursos Extras", data: additionalResourcesFaqs },
  ];
  return (
    <div>
      {faqs.map((faq, index) => (
        <React.Fragment key={index}>
          <section>
            <h1 className="text-2xl font-bold mb-4">{faq?.title}</h1>
            <Accordion type="single" collapsible>
              {faq.data.map((data, idt) => (
                <AccordionItem key={idt} value={`faq-${idt}`}>
                  <AccordionTrigger>{data.question}</AccordionTrigger>
                  <AccordionContent>{data.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}
