# Lucky Digit 

Um simples sistema de sorteio de números construído com Python (Flask).

Este projeto foi criado como um exercício prático de desenvolvimento web , cobrindo desde a API backend até o deploy em uma plataforma moderna (Fly.io).

---

## ✨ Funcionalidades

* **Sorteio Parametrizado:** Escolha a quantidade de números a sortear.
* **Intervalo Definido:** Defina um intervalo com valor mínimo e máximo.
* **Contagem Regressiva:** Opção com uma contagem regressiva de 5 segundos.

---

## 🛠️ Tecnologias Utilizadas

Este projeto utiliza uma variedade de tecnologias modernas de desenvolvimento web:

### Backend
* **Python 3.10+**
* **Flask:** Micro-framework para criar a API (`/sortear`).
* **Flask-CORS:** Para permitir a comunicação entre o frontend e a API.
* **Gunicorn:** Servidor WSGI para rodar o Flask em produção.

### Frontend
* **HTML5**
* **Materialize CSS:** Framework CSS para um design responsivo e moderno.
* **JavaScript (ES6+):**
    * **Fetch API:** Para fazer chamadas assíncronas à API Flask.
    * **Async/Await:** Para gerenciar o código assíncrono.
    * **DOM:** Para criar e atualizar os resultados na tela dinamicamente.

### Deploy (Implantação)
* **Fly.io:** Plataforma para hospedar a aplicação.
* **Docker:** O projeto é "conteinerizado" para o deploy (via `Dockerfile`).
* **GitHub Actions:** Configurado para fazer deploy automático (CI/CD) a cada `push` na branch `master`.

---
