# Plano da Landing Page - agendabee

## 1. Objetivo

Criar uma landing page persuasiva e estratégica para o agendabee, focando na conversão de lojistas Nuvemshop, destacando os benefícios da automação de preços e promoções.

## 2. Público-Alvo

Lojistas da Nuvemshop que buscam otimizar a gestão de preços e promoções, aumentar vendas e economizar tempo.

## 3. Elementos de Branding (Baseado em `prp.md`)

- **Marca:** `agendabee` (sempre em minúsculas)
- **Fonte:** Museo Sans (Será simulada com uma fonte similar do Google Fonts, como 'Montserrat' ou 'Open Sans', ou será utilizada uma fonte padrão do sistema caso a Museo Sans não esteja disponível via CDN de forma gratuita e fácil de implementar em HTML/CSS puro).
- **Conceito:** Abelhas (eficiência, organização, trabalho em equipe, produtividade).
- **Valores:** Confiável, Acessível, Determinada, Simples, Moderna, Sutil, Tranquila, Nerd.
- **Cores Principais:** `#ffaa00` (laranja/amarelo vibrante), `black`.
- **Cores Complementares:** `#ffb41f`, `#ffc247`, `#cc8800`, `white`.

## 4. Estrutura da Landing Page

### 4.1. Seção Hero (Acima da dobra)

- **Título Impactante:** Gatilho de dor/solução. Ex: "Automatize suas promoções na Nuvemshop e veja suas vendas decolarem."
- **Subtítulo:** Benefício claro e conciso. Ex: "Agende alterações de preços e promoções com facilidade, economize tempo e maximize seus lucros."
- **Chamada para Ação (CTA) Principal:** Botão proeminente. Ex: "Experimente Grátis por 3 Dias" ou "Comece Agora".
- **Imagem/Vídeo de Fundo:** Visual atraente e relevante (ex: interface do agendabee, gráfico de vendas subindo, abelhas trabalhando).
- **Prova Social (Opcional):** Pequeno texto com depoimento ou número de usuários/lojas impactadas.

### 4.2. Seção de Problema/Solução

- **Problema:** Abordar as dores do lojista (tempo gasto, erros manuais, promoções perdidas).
- **Solução (agendabee):** Apresentar como o agendabee resolve esses problemas de forma eficiente.

### 4.3. Seção de Recursos/Benefícios

- **Lista de Benefícios:** Destacar as principais funcionalidades e seus respectivos benefícios.
  - Agendamento flexível de preços e promoções.
  - Reversão automática de preços.
  - Gestão simplificada de campanhas.
  - Atualização de variantes (preço e preço promocional).
  - Economia de tempo e redução de erros.
  - Aumento de vendas e lucratividade.
- **Ícones/Ilustrações:** Visuais para cada benefício.

### 4.4. Seção de Como Funciona (Opcional, se houver espaço)

- **Passos Simples:** Explicar o processo em 3-4 passos curtos e claros.

### 4.5. Seção de Prova Social (Depoimentos)

- **Depoimentos:** 2-3 depoimentos de lojistas satisfeitos (usar os do `index.html` e `project_context.md`).
- **Logos de Clientes (Opcional):** Se disponível.

### 4.6. Seção de Preços/Planos (Se aplicável, ou CTA para teste grátis)

- **Plano de Teste Grátis:** Reforçar a oferta de 3 dias grátis.
- **CTA Secundário:** Ex: "Ver Planos" (se houver planos pagos detalhados).

### 4.7. Seção de Perguntas Frequentes (FAQ - Opcional)

- **Respostas para Dúvidas Comuns:** Abordar objeções e esclarecer pontos.

### 4.8. Seção de CTA Final

- **Chamada para Ação Final:** Repetir o CTA principal de forma persuasiva.

### 4.9. Rodapé

- **Links Essenciais:** Privacidade, Termos de Uso, Suporte.
- **Informações de Contato:** Email.
- **Redes Sociais:** Ícones.

## 5. Gatilhos Persuasivos a Serem Utilizados

- **Urgência/Escassez:** "Não perca mais tempo...", "Comece hoje e veja resultados em dias."
- **Prova Social:** Depoimentos, números de usuários.
- **Autoridade:** Se houver menção a Nuvemshop, reforçar a integração.
- **Benefício vs. Característica:** Focar no que o lojista ganha, não apenas no que o software faz.
- **Dor vs. Prazer:** Abordar a dor de gerenciar preços manualmente e o prazer da automação.
- **Exclusividade/Oportunidade:** "A ferramenta que seus concorrentes ainda não descobriram."
- **Garantia/Risco Zero:** Teste grátis de 3 dias.

## 6. Boas Práticas e Clean Code

- **HTML Semântico:** Usar tags HTML5 apropriadas (`<header>`, `<main>`, `<section>`, `<footer>`, etc.).
- **CSS Modular:** Organizar o CSS em seções lógicas, usar variáveis CSS para cores e fontes.
- **Responsividade:** Design fluido com Media Queries para diferentes tamanhos de tela.
- **Performance:** Otimização de imagens, carregamento assíncrono de scripts (se necessário).
- **Acessibilidade:** Uso de atributos `alt` em imagens, estrutura de cabeçalhos correta.
- **JavaScript:** Mínimo e focado em interatividade (ex: scroll suave, validação de formulário se houver).

## 7. Imagens e Mídias

- **Favicon:** `assets/img/favicon.ico` (do `index.html` original).
- **Logo:** `agendabee-icon.png` (do `index.html` original).
- **Imagens de Prova Social/Hero:** Utilizar as URLs fornecidas no `index.html` original, se relevantes, ou gerar novas imagens que representem o conceito de abelhas, eficiência, ou gráficos de vendas.
  - `https://firebasestorage.googleapis.com/v0/b/agendabee-prd.appspot.com/o/agendabee-social.jpg?alt=media&token=a600adec-0064-4c1b-a0ce-29f1292def31`
  - `https://firebasestorage.googleapis.com/v0/b/agendabee-prd.appspot.com/o/screenshot-agendabee.png?alt=media&token=2d611bd8-e47c-4c24-8a78-e07b6f359d17`

## 8. Considerações Finais

- A landing page será desenvolvida em um diretório `landing_page` na raiz do projeto.
- Será criada uma estrutura de arquivos `index.html`, `style.css`, `script.js` dentro deste diretório.
- A fonte Museo Sans será substituída por uma similar do Google Fonts para facilitar a implementação em HTML/CSS puro sem a necessidade de arquivos de fontes locais complexos ou licenças específicas para o contexto do projeto.
