from flask import Flask, render_template, request, jsonify
from flask_cors import CORS # Importante para permitir requisições do frontend
import random

# Inicir app flask
app = Flask(__name__)
# Habilita o CORS para permitir que o JavaScript do frontend acesse esta API
CORS(app)


# Rota principal pra pagina html
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/sortear', methods=['POST'])
def realizar_sorteio():
    data = request.json
    try:
        qty = int(data['quantidade'])
        min_val = int(data['min'])
        max_val = int(data['max'])

        if min_val >= max_val:
            return jsonify({'error': 'O valor mínimo deve ser menor que o máximo.'}), 400

        if qty <= 0:
            return jsonify({'error': 'A quantidade deve ser maior que zero.'}), 400

        numeros_possiveis = max_val - min_val + 1
  
        if qty > numeros_possiveis:
            msg = f'Não é possível sortear {qty} números únicos no intervalo de {min_val} a {max_val}. (Máx: {numeros_possiveis})'
            return jsonify({'error': msg}), 400

        numeros_sorteados = random.sample(range(min_val, max_val + 1), qty)

        return jsonify({'numeros': numeros_sorteados})

    except (KeyError, ValueError, TypeError):
        # Captura erros se os dados não forem enviados corretamente
        return jsonify({'error': 'Dados inválidos. Envie "quantidade", "min" e "max" como números.'}), 400


if __name__ == '__main__':
    app.run(debug=True, port=5000)
