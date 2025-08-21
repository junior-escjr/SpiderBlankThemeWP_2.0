# Spider Theme

Um tema WordPress moderno e responsivo construído com Tailwind CSS, perfeito para blogs e sites simples.

## Características

- 🎨 **Design moderno** com Tailwind CSS
- 📱 **Totalmente responsivo** (mobile-first)
- ⚡ **Performance otimizada** com CDN do Tailwind v4.1.12
- 🏗️ **Estrutura modular** com templates separados
- 🎛️ **Menu de navegação** personalizável com mobile toggle
- 📊 **Sistema de grid** para layout de posts
- 🎭 **Áreas de widgets** (sidebar + footer)
- 💬 **Sistema de comentários** integrado
- 🔍 **SEO otimizado** com markup semântico
- 🖼️ **Suporte a thumbnails** de posts
- 🎨 **Custom logo** support
- 🌙 **Configuração Tailwind** incluída para desenvolvimento

## Instalação

1. Faça o download do tema
2. Acesse o painel do WordPress
3. Vá em **Aparência > Temas**
4. Clique em **Adicionar novo**
5. Clique em **Upload do tema**
6. Selecione o arquivo ZIP do tema
7. Clique em **Instalar agora**
8. Ative o tema

## Personalização

### Menu Principal
1. Vá em **Aparência > Menus**
2. Crie um novo menu
3. Adicione as páginas/posts desejados
4. Selecione "Menu Principal" como localização do tema
5. Salve o menu

### Widgets
O tema possui três áreas de widgets:
- **Sidebar Principal**: Aparece na lateral dos posts/páginas
- **Footer 1**: Primeira coluna do rodapé
- **Footer 2**: Segunda coluna do rodapé

### Logo Personalizado
1. Vá em **Aparência > Personalizar**
2. Clique em **Identidade do site**
3. Faça upload do seu logo
4. Ajuste o tamanho conforme necessário

## Estrutura de Arquivos Organizada

O tema agora utiliza uma **estrutura organizada** com design patterns modernos:

### 📁 Estrutura Principal

```
spider-theme/
├── 📁 src/                # Arquivos fonte para desenvolvimento
│   ├── 📁 scss/           # Arquivos SCSS
│   │   ├── style.scss     # Arquivo principal
│   │   ├── _variables.scss # Variáveis e cores
│   │   ├── _mixins.scss   # Mixins SCSS
│   │   ├── components/    # Componentes organizados
│   │   ├── pages/         # Estilos por página
│   │   ├── theme/         # Tema customizado
│   │   └── utilities/     # Utilitários
│   └── 📁 js/             # JavaScript modular
│       ├── main.js        # Arquivo principal
│       └── modules/       # Módulos JS organizados
├── 📁 static/             # Arquivos compilados e assets
│   ├── 📁 css/            # CSS compilado e minificado
│   ├── 📁 js/             # JS compilado e minificado
│   ├── 📁 images/         # Imagens do tema
│   └── 📁 fonts/          # Fontes customizadas
├── 📄 functions.php       # Funções WordPress
├── 📄 tailwind.config.js  # Configuração Tailwind
├── 📄 webpack.config.js   # Configuração Webpack
├── 📄 package.json        # Dependências NPM
└── 📄 README.md          # Documentação
```

### 🎨 Sistema de Design

#### **Cores**
- **Primária**: Azul (#3b82f6) com variações
- **Secundária**: Cinza (#64748b) para texto e backgrounds
- **Estados**: Success (verde), Warning (amarelo), Error (vermelho)

#### **Tipografia**
- **Sans-serif**: Sistema de fonte otimizado
- **Tamanhos**: Escaláveis e responsivos
- **Espaçamento**: Line-height otimizado para leitura

#### **Espaçamento**
- **Sistema de grid**: 12 colunas responsivo
- **Padding/Margin**: Baseado em rem para escalabilidade
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)

## 🚀 Desenvolvimento

### Instalação das Dependências

```bash
npm install
```

### Scripts Disponíveis

```bash
# Compilar assets para produção (minificado)
npm run build

# Compilar CSS para desenvolvimento (expandido)
npm run build:css:dev

# Assistir mudanças nos arquivos
npm run watch

# Otimizar imagens
npm run optimize:images

# Limpar arquivos compilados
npm run clean

# Lint dos arquivos
npm run lint

# Otimizar todos os assets
npm run optimize
```

### Desenvolvimento Local

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Desenvolvimento com watch**:
   ```bash
   npm run dev
   ```

3. **Build para produção**:
   ```bash
   npm run build
   ```

### Estrutura SCSS

O CSS está organizado em módulos:

- **`variables`**: Cores, fontes, espaçamentos
- **`mixins`**: Funções reutilizáveis
- **`components`**: Estilos de componentes específicos
- **`pages`**: Estilos específicos por página
- **`theme`**: Overrides e customizações
- **`utilities`**: Classes utilitárias

## 🔧 Configuração

### Tailwind CSS

O tema utiliza **Tailwind CSS v4.1.12** (versão mais recente) com configuração extendida:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './*.php',
    './**/*.php',
    './assets/**/*.{js,css}',
    './src/**/*.{js,scss}',
    './dist/**/*.{js,css}'
  ],
  theme: {
    extend: {
      colors: {
        primary: { /* paleta de cores */ },
        secondary: { /* paleta secundária */ }
      },
      // + mais customizações...
    }
  }
}
```

### JavaScript Modular

O JavaScript está organizado em módulos ES6:

- **`main.js`**: Arquivo principal
- **`modules/navigation.js`**: Navegação e menu
- **`modules/scroll-reveal.js`**: Animações de scroll
- **`modules/theme-toggle.js`**: Toggle de tema
- **`modules/form-validation.js`**: Validação de formulários

## 📦 Build System

### Webpack
- **Entry points**: main.js, navigation.js
- **Output**: dist/js/ com split chunks
- **Source maps**: Para desenvolvimento
- **Optimization**: Minificação em produção

### Sass/PostCSS
- **Sass**: Compilação para CSS
- **PostCSS**: Processamento e otimização
- **Autoprefixer**: Prefixos de browser
- **CSSNano**: Minificação CSS

## 🎯 Boas Práticas Implementadas

- ✅ **Estrutura organizada** por tipo de arquivo
- ✅ **Build system** automatizado
- ✅ **Source maps** para debugging
- ✅ **Code splitting** para performance
- ✅ **Minificação** de assets
- ✅ **PurgeCSS** - Remove estilos não utilizados
- ✅ **Tree shaking** - Elimina código morto
- ✅ **Linting** de código
- ✅ **Versionamento** de assets
- ✅ **Responsive design** first
- ✅ **Accessibility** considerations
- ✅ **Performance** optimization
- ✅ **CSS otimizado** automaticamente

## 🔄 Fluxo de Trabalho

1. **Desenvolvimento**: Edite arquivos em `src/`
2. **Build**: Execute `npm run build`
3. **Teste**: Verifique em ambiente local
4. **Deploy**: Use arquivos de `dist/` em produção

Esta estrutura garante **manutenibilidade**, **escalabilidade** e **performance** para o desenvolvimento do tema.

## Suporte

Este tema é compatível com:
- WordPress 5.0+
- PHP 7.0+
- Todos os navegadores modernos

## Desenvolvimento

Para modificar o tema:
1. Edite os arquivos PHP para alterar a estrutura
2. Modifique o `style.css` para alterar o visual
3. Adicione JavaScript em `js/navigation.js` ou crie novos arquivos

## Licença

Este tema é distribuído sob a licença GPL v2 ou posterior.

## Créditos

Desenvolvido por [Seu Nome]
Tema base para WordPress
