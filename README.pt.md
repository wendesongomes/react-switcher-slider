# Biblioteca react-switcher-slider

## Descrição

A biblioteca react-switcher-slider fornece um componente React para criar barras de controle interativas que permitem ajustar intervalos de áudio. É altamente personalizável e fácil de integrar em projetos React.

Diferencial: Ao contrário de sliders tradicionais, esta biblioteca não exige definição fixa de botões "início" e "fim". O botão que estiver na posição inicial será o início, e, se ultrapassar o outro, seus papéis serão alternados dinamicamente.

---

## Instalação

Instale a biblioteca via npm ou yarn:

```bash
npm install react-switcher-slider
```

ou

```bash
yarn add react-switcher-slider
```

Certifique-se de importar o arquivo CSS personalizado `Range-slider.css` no seu projeto para estilização.

---

## Como usar

### Importação

Importe o componente no seu projeto:

```tsx
import React from "react";
import { TrackBar } from "react-switcher-slider";
import "trackbar-library/dist/react-switcher-slider.css";
```

### Propriedades disponíveis

| Propriedade           | Tipo                         | Descrição                                                                            | Obrigatório |
| --------------------- | ---------------------------- | ------------------------------------------------------------------------------------ | ----------- |
| `url`                 | `string`                     | URL do arquivo de áudio.                                                             | Sim         |
| `setValueA`           | `(start: number) => void`    | Função para definir o valor inicial do intervalo.                                    | Sim         |
| `setValueB`           | `(end: number) => void`      | Função para definir o valor final do intervalo.                                      | Sim         |
| `trackValueA`         | `number`                     | Valor inicial do intervalo (em segundos).                                            | Não         |
| `trackValueB`         | `number`                     | Valor final do intervalo (em segundos).                                              | Não         |
| `handleOnLoading`     | `(loading: boolean) => void` | Função callback chamada durante o carregamento do áudio.                             | Não         |
| `skeleton`            | `ReactElement`               | Elemento exibido enquanto o áudio está carregando.                                   | Não         |
| `showValueInTracking` | `boolean`                    | Exibe os valores atuais do intervalo ao interagir com os botões.                     | Não         |
| `customStyle`         | `object`                     | Estilizações personalizadas para diferentes partes do componente (detalhado abaixo). | Não         |

### Estrutura do `customStyle`

| Chave                | Tipo                  | Descrição                             |
| -------------------- | --------------------- | ------------------------------------- |
| `trackBar`           | `React.CSSProperties` | Estilização da barra principal.       |
| `track`              | `React.CSSProperties` | Estilização da faixa do intervalo.    |
| `button`             | `React.CSSProperties` | Estilização dos botões.               |
| `viewValueContainer` | `React.CSSProperties` | Estilização do container dos valores. |

---

### Exemplo de Uso

Aqui está um exemplo completo de como usar o componente `TrackBar` em um projeto React:

```tsx
import React, { useState } from "react";
import { TrackBar } from "react-switcher-slider";

const App = () => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  return (
    <div>
      <h1>TrackBar Demo</h1>
      <TrackBar
        url="/videoplayback.m4a"
        setValueA={setStart}
        setValueB={setEnd}
        trackValueA={100}
        trackValueB={20}
        skeleton={<p>Loading.....</p>}
        showValueInTracking
        customStyle={{
          button: {
            background: "black",
          },
          track: {
            background: "black",
          },
          trackBar: {
            background: "blue",
          },
          viewValueContainer: {
            background: "red",
          },
        }}
      />
      <p>
        Intervalo selecionado: {start.toFixed(2)}s - {end.toFixed(2)}s
      </p>
    </div>
  );
};

export default App;
```

---

## Estilização Personalizada

Certifique-se de incluir o arquivo `Range-slider.css` para aplicar estilos básicos. Você pode personalizar os estilos usando a propriedade `customStyle` para atender às suas necessidades específicas.

### Exemplo de `Range-slider.css`

```css
.trackBar {
  position: relative;
  width: 100%;
  height: 10px;
  background: #ccc;
}

.track {
  position: absolute;
  height: 100%;
  background: #007bff;
}

.button {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #007bff;
  cursor: pointer;
}

.viewValueContainer {
  position: absolute;
  top: -25px;
  background: white;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
```

---

## Dicas

- Certifique-se de que o arquivo de áudio esteja acessível no caminho fornecido na propriedade `url`.
- Utilize a propriedade `skeleton` para melhorar a experiência do usuário enquanto o áudio carrega.
- Personalize o estilo para se alinhar com a identidade visual do seu projeto.

---

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests no repositório da biblioteca.

---

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para obter mais informações.
