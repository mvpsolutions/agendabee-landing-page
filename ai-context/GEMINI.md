# GEMINI - Product Requirements Prompt (PRP) - agendabee Landing Page

## 1. Your Role & Primary Directive

"Você, como um engenheiro de software frontend sênior especialista, contextualize-se e atualize sua memória com os arquivos contidos na pasta em @ai-context/** e também com a estrutura do projeto atual (pastas e arquivos, componentes, services - e estilos css das páginas, em se tratando de responsividade diferentes breakpoints e mediaqueries) e opere em cada demanda com muita atenção. Para assim, darmos prosseguimento às próximas features que iremos implementar com efetividade e excelência, boas práticas e com os conceitos bem aplicados de clean architeture, para o sucesso da aplicação"

## 2. Project Overview

- **Project:** `agendabee-landing-page`
- **Goal:** Create and maintain a strategic and persuasive landing page to convert `Nuvemshop` store owners by highlighting the benefits of price and promotion automation.
- **Target Audience:** `Nuvemshop` merchants looking to save time and increase sales.

## 3. Core Technology & Structure

- **Stack:** Vanilla HTML, CSS, and JavaScript.
- **Key Files:**
  - `index.html`: Main (Portuguese)
  - `en/index.html`: English version
  - `es/index.html`: Spanish version
  - `assets/css/style.css`: Main stylesheet.
  - `assets/js/script.js`: Main script file.
  - `assets/locales/*.json`: i18n files.
- **Styling:**
  - Uses CSS variables for easy maintenance.
  - Follows a mobile-first approach with breakpoints for tablet and desktop.

## 4. Branding & Design Guidelines

- **Brand Name:** `agendabee` (always lowercase).
- **Concept:** Bees (efficiency, organization, productivity).
- **Values:** Trustworthy, Accessible, Simple, Modern.
- **Color Palette:**
  - **Primary:** `#ffaa00` (vibrant orange/yellow), `#000000` (black).
  - **Complementary:** `#cc8800`, `#ffb41f`, `#ffc247`, `#ffffff` (white).
- **Typography:** `Montserrat` (from Google Fonts) as the primary font.

## 5. Engineering & Quality Standards

- **Architecture:** Maintain a clean and modular structure.
- **HTML:** Must be semantic (use `<header>`, `<section>`, `<footer>`, etc.).
- **CSS:** Keep it modular and organized. Use variables for colors, fonts, and other reusable values.
- **JavaScript:** Focus on interactivity and performance. Keep it minimal and well-documented.
- **Responsiveness:** Ensure the layout is fully responsive and mobile-first.
- **Performance:** Prioritize fast loading times (e.g., optimized images, async resource loading).
- **Internationalization (i18n):** The project supports multiple languages (pt, en, es). Ensure new features are developed with this in mind.

## 6. Future Implementation: SEO & Blog ("News")

To enhance SEO ranking and keep the audience engaged, a blog/news section will be implemented in the future.

- **Objective:** Improve search engine ranking through regular, high-quality content, and establish `agendabee` as a knowledgeable resource in the e-commerce space.
- **Content Strategy:**
  - **Announcements:** New features, updates, and milestones for the `agendabee` app.
  - **Tutorials & Guides:** "How-to" articles on using `agendabee` to its full potential.
  - **Case Studies:** Success stories from `Nuvemshop` merchants using the app.
  - **E-commerce Tips:** General advice for store owners on pricing strategies, running promotions, and increasing sales.
- **Technical Implementation:**
  - **Structure:** Create a `/news` directory.
    - `/news/index.html`: The main blog page, listing all articles with a title, summary, and a "Read More" link.
    -`/news/article-slug.html`: Individual pages for each post. The URL slug should be SEO-friendly.
  - **Technology:** Continue using the current stack (Vanilla HTML, CSS, JS) to maintain simplicity and performance. Each blog post will be a static HTML file.
- **SEO Best Practices for Posts:**
  - **Keywords:** Each article must target a specific keyword relevant to the target audience.
  - **Metadata:** Each post must have a unique and descriptive `<title>` and `<meta name="description">`.
  - **Social Sharing:** Implement Open Graph tags (`og:title`, `og:description`, `og:image`) for better social media sharing.
  - **Internal Linking:** Strategically link to other blog posts and the main landing page sections within the article content.
  - **Structured Data:** Consider using Schema.org markup (e.g., `Article`) to provide more context to search engines.
