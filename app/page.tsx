"use client";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sistema OKR</h1>
      <section className="my-8">
        <h2 className="text-2xl font-semibold">
          🚀 Por que adotar OKRs?{" "}
          <span className="text-blue-600">Seu aliado estratégico</span>
        </h2>
        <p className="mt-4 text-gray-700">
          Transforme metas em conquistas tangíveis com <strong>OKRs</strong>{" "}
          (Objectives and Key Results). Experimente uma abordagem que
          proporciona:
        </p>
        <ul className="list-disc ml-8 mt-2 text-gray-700">
          <li>🔥 Foco absoluto em prioridades 🎯</li>
          <li>💪 Transparência organizacional 🤝</li>
          <li>🔄 Adaptabilidade e inovação contínua 💡</li>
          <li>🌟 Alinhamento entre equipes e objetivo comum 🌐</li>
        </ul>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold">
          🔧 Explore nosso Algoritmo{" "}
          <span className="text-blue-600">Poder de Decisão</span>
        </h2>
        <p className="mt-4 text-gray-700">
          Nosso algoritmo intuitivo para gestão de OKRs é um pilar robusto que
          oferece:
        </p>
        <ul className="list-disc ml-8 mt-2 text-gray-700">
          <li>
            ✨ Agregação hierárquica: Compreenda o progresso a partir de
            diversos ângulos 📊
          </li>
          <li>
            ⚖️ Priorização automática: Avalie o impacto de cada objetivo 🚀
          </li>
          <li>
            🔗 Gestão de dependências: Visualize e ajuste metas interligadas ⏳
          </li>
          <li>
            🎯 Feedback contínuo: Afine suas estratégias com dados reais 💡
          </li>
        </ul>
        <p className="mt-4 text-gray-700">
          A matemática no coração deste sistema garante que suas metas não
          apenas sejam acompanhadas, mas que cada ação conte. Descubra a
          transformação de processos e colha os frutos do sucesso.
        </p>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold">
          💬 O que nossos clientes dizem?
        </h2>
        <blockquote className="mt-4 bg-gray-100 p-4 italic rounded">
          "Desde que adotamos o sistema de OKRs desta empresa, nossa
          produtividade disparou e nosso alinhamento melhorou drasticamente.
          Recomendo fortemente!" -{" "}
          <strong>Eduardo Lima, Diretor de Operações da Empresa Z</strong>
        </blockquote>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold">
          🤔 FAQs{" "}
          <span className="text-blue-600">- Perguntas Transformadoras</span>
        </h2>
        <div className="mt-4">
          <div className="faq-item">
            <h3 className="faq-toggle text-blue-700 font-bold">
              ❓ "Estou familiarizado com metas SMART. Por que devo mudar para
              OKRs?" 👇
            </h3>
            <p className="faq-content text-gray-700">
              Enquanto SMART mantém foco, OKRs dinamizam seu alcance, permitindo
              flexibilidade e crescimento acelerado sem abrir mão da clareza.
              Experimente a sinergia!
            </p>
          </div>

          <div className="faq-item mt-4">
            <h3 className="faq-toggle text-blue-700 font-bold">
              ❓ "Como evito que OKRs se tornem apenas mais uma tarefa?" 👇
            </h3>
            <p className="faq-content text-gray-700">
              Nosso sistema facilita a definição de metas impactantes e
              transforma seu acompanhamento em um jogo motivador e estratégico.
              Cada conquista avança um nível!
            </p>
          </div>

          <div className="faq-item mt-4">
            <h3 className="faq-toggle text-blue-700 font-bold">
              ❓ "OKRs funcionam para equipes pequenas?" 👇
            </h3>
            <p className="faq-content text-gray-700">
              Absolutamente! OKRs são escaláveis e adaptáveis, perfeitos para
              focar energias coletivas em qualquer tamanho de equipe, trazendo
              clareza e propósito.
            </p>
          </div>

          <div className="faq-item mt-4">
            <h3 className="faq-toggle text-blue-700 font-bold">
              ❓ "Posso integrar OKRs com nossas ferramentas atuais?" 👇
            </h3>
            <p className="faq-content text-gray-700">
              Nossa plataforma é compatível com uma ampla variedade de sistemas,
              garantindo que você não perca o ritmo com seu stack tecnológico
              atual.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
