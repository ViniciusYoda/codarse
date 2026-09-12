# CodarSe

Plataforma de cursos gratuitos de programação que utiliza playlists públicas do YouTube como catálogo e ambiente de aprendizagem. A aplicação permite navegar pelos cursos, acompanhar as aulas, marcar conteúdos como concluídos e continuar assistindo de onde parou.

## Funcionalidades

- Catálogo de cursos obtido pela YouTube Data API v3.
- Página com detalhes, descrição e módulos de cada curso.
- Player do YouTube integrado à plataforma.
- Navegação entre aulas e indicação da próxima aula.
- Marcação local de aulas concluídas.
- Atalho para continuar assistindo ao último conteúdo acessado.
- Descrições com links clicáveis e timestamps que controlam o player.
- Exibição de visualizações, curtidas e comentários das aulas.
- Compartilhamento do endereço do curso.
- Interface responsiva para desktop e dispositivos móveis.
- Geração estática das páginas de cursos com revalidação periódica.

## Tecnologias

- [Next.js 16](https://nextjs.org/) com App Router e Turbopack.
- [React 19](https://react.dev/).
- [TypeScript](https://www.typescriptlang.org/).
- [Tailwind CSS 4](https://tailwindcss.com/).
- [YouTube Data API v3](https://developers.google.com/youtube/v3).
- [React Player](https://github.com/cookpete/react-player).
- [Radix UI](https://www.radix-ui.com/) para menus e abas acessíveis.
- [Interweave](https://interweave.dev/) para renderização segura das descrições.
- [date-fns](https://date-fns.org/) para formatação de datas.
- `localStorage` para progresso e histórico local.

## Pré-requisitos

Antes de iniciar, instale:

- Node.js 20 ou superior.
- npm.
- Uma conta Google.
- Um projeto no Google Cloud com a YouTube Data API v3 ativada.

## Instalação

Clone o repositório e entre na pasta do projeto:

```bash
git clone <url-do-repositorio>
cd codarse
```

Instale as dependências:

```bash
npm install
```

## Configuração da YouTube Data API

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. Crie ou selecione um projeto.
3. Abra **APIs e serviços → Biblioteca**.
4. Procure por **YouTube Data API v3** e clique em **Ativar**.
5. Abra **APIs e serviços → Credenciais**.
6. Clique em **Criar credenciais → Chave de API**.
7. Em **Restrições de API**, permita somente a **YouTube Data API v3**.

Para desenvolvimento local, copie o arquivo de exemplo:

```powershell
Copy-Item .env.example .env.local
```

No Linux ou macOS:

```bash
cp .env.example .env.local
```

Edite `.env.local` e informe a chave:

```env
YOUTUBE_API_KEY=sua_chave_da_youtube_data_api
```

Não utilize o prefixo `NEXT_PUBLIC_`: a chave deve permanecer disponível somente no servidor. Arquivos `.env*`, com exceção de `.env.example`, são ignorados pelo Git.

Depois de alterar uma variável de ambiente, reinicie o servidor de desenvolvimento.

## Executando o projeto

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

Para validar e executar a versão de produção:

```bash
npm run build
npm start
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com atualização automática. |
| `npm run build` | Compila e valida a aplicação para produção. |
| `npm start` | Inicia a aplicação usando o build de produção. |
| `npm run lint` | Executa as regras do ESLint. |
| `npx tsc --noEmit` | Verifica os tipos sem gerar arquivos. |

## Rotas

| Rota | Descrição | Renderização |
| --- | --- | --- |
| `/` | Página inicial e atalho para continuar assistindo. | Estática com revalidação. |
| `/cursos` | Catálogo completo de cursos. | Estática com revalidação. |
| `/cursos/[id]` | Detalhes, módulos e aulas de uma playlist. | Gerada estaticamente. |
| `/player/[courseId]/[classId]` | Player, playlist, descrição e comentários da aula. | Renderizada sob demanda. |

No Next.js 16, os parâmetros de rotas dinâmicas são Promises e devem ser acessados com `await params` nos Server Components.

## Estrutura do projeto

```text
src/
├── app/
│   ├── (default)/
│   │   ├── cursos/
│   │   │   ├── [id]/page.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── player/
│   │   └── [courseId]/[classId]/page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── card/
│   ├── course-content/
│   ├── course-header/
│   ├── header/
│   ├── player/
│   └── section/
└── shared/
    └── services/
        ├── api-youtube/
        └── local-storage/
```

### Camada de aplicação

`src/app` contém layouts, páginas e rotas dinâmicas. As páginas de catálogo e detalhes consultam o serviço do YouTube no servidor.

### Componentes

`src/components` reúne os elementos visuais e interativos. Componentes que utilizam estado, eventos ou APIs do navegador possuem a diretiva `'use client'`.

### Serviços

- `api-youtube`: centraliza chamadas, cache e transformação dos dados da YouTube Data API.
- `local-storage`: armazena no navegador o último conteúdo acessado e as aulas concluídas.

## Organização do conteúdo no YouTube

O catálogo não utiliza todas as playlists do canal. Para uma playlist aparecer como curso, sua descrição deve conter:

```text
#CODARSE
```

Os módulos são identificados a partir da descrição de cada item da playlist. Utilize uma linha neste formato:

```text
CODARSE - Nome do módulo
```

Aulas consecutivas com o mesmo nome de módulo são agrupadas na mesma seção. A ordem das aulas segue a posição dos itens na playlist.

## Cache e revalidação

As consultas utilizam o cache do `fetch` do Next.js:

- Cursos e informações de vídeos: 48 horas.
- Aulas e itens das playlists: 24 horas.
- Comentários: 8 horas.

Páginas de cursos são pré-geradas. As páginas individuais do player são renderizadas sob demanda para evitar centenas de requisições à API durante o build e reduzir o consumo da cota diária.

## Persistência local

O progresso não é enviado para um banco de dados. Ele permanece no navegador do usuário usando estas chaves:

- `KEEP_WATCHING`: última aula acessada.
- `WATCHED_CONTENT`: IDs das aulas concluídas, agrupados por curso.

Limpar os dados do navegador remove esse progresso. Como o armazenamento é local, ele não é sincronizado entre dispositivos.

## Personalização visual

As cores globais estão definidas em `src/app/globals.css` por variáveis CSS:

```css
:root {
  --color-text: #f4f8f7;
  --color-text-muted: #9aabaa;
  --color-paper: #121716;
  --color-paper-elevated: #1a211f;
  --color-border: #2a3532;
  --color-primary: #20c9b5;
  --color-background: #070a09;
}
```

Esses tokens geram classes Tailwind como `bg-primary`, `bg-paper`, `text-text` e `text-text-muted`.

## Solução de problemas

### `YOUTUBE_API_KEY não configurada`

Confirme que `.env.local` está na raiz, ao lado de `package.json`, e reinicie `npm run dev`.

### `Method doesn't allow unregistered callers`

A chamada chegou ao YouTube sem uma chave. Verifique o nome `YOUTUBE_API_KEY`, o conteúdo de `.env.local` e se o servidor foi reiniciado.

### `API has not been used in project` ou `accessNotConfigured`

Ative a YouTube Data API v3 no mesmo projeto do Google Cloud que gerou a chave.

### Erro 403 ao carregar comentários

Alguns vídeos têm comentários desativados ou indisponíveis. Nesse caso, a aplicação exibe um estado vazio e mantém o restante da aula funcionando.

### Falha ao carregar imagens externas

As imagens permitidas são configuradas em `next.config.ts`. Atualmente são aceitos os domínios `i.ytimg.com` e `yt3.ggpht.com`.

### Falha ao baixar a fonte Nunito no build

O `next/font` precisa acessar o Google Fonts durante o build. Verifique a conexão de rede ou configure uma fonte local.

## Segurança

- Nunca envie a chave da API para o repositório, capturas de tela ou logs públicos.
- Revogue imediatamente qualquer chave exposta.
- Restrinja a chave somente à YouTube Data API v3.
- Em produção, utilize as variáveis de ambiente da plataforma de hospedagem.
- Não exponha a chave usando `NEXT_PUBLIC_YOUTUBE_API_KEY`.

## Qualidade do código

Antes de enviar alterações, execute:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

O projeto utiliza ESLint, TypeScript em modo estrito e o React Compiler.
