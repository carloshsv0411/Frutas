from flask import Flask, jsonify, request
from flask_cors import CORS
import random

api = Flask(__name__)
CORS(api)
frutas = ["Abacaxi", "Maçã", "Banana", "Laranja", "Manga", "Uva", "Morango", "Melancia", "Pera", "Kiwi", "Acerola", "Goiaba", "Tangerina", "Framboesa", "Pêssego"]

@api.route('/fruta', methods = ['GET'])
def getFruta():
    frutaAleatoria = random.choice(frutas)
    return jsonify({"fruta": frutaAleatoria}), 200

@api.route('/fruta/<int:id>', methods=['GET'])  
def getFrutaById(id: int):  
    if id < 0:  
        return jsonify({"erro": "Id não pode ser negativo"}), 400  
    if id >= len(frutas):  
        return jsonify({"erro": "Fruta não encontrada"}), 404  
    fruta = frutas[id]  
    return jsonify({'fruta': fruta}), 200

@api.route('/fruta', methods=['POST'])
def adicionarFruta():
    data = request.get_json()
    if "fruta" in data:
        novaFruta = data["fruta"].strip()
        if not novaFruta: return jsonify({"erro":"Nome invalido."}), 400
        if novaFruta in frutas: return jsonify({"erro":"Essa fruta já existe!"}), 400

    frutas.append(novaFruta)
    return jsonify({"info": f"Fruta {novaFruta} adicionada com sucesso!"}), 201

@api.route('/fruta/<int:id>', methods=['DELETE'])
def deletarFruta(id: int):
    if id < 0:
        return jsonify({"erro": "ID inválido"}), 404
    if id >= len(frutas):
        return jsonify({"erro": "Fruta não encontrada"}), 404

    fruta_deletada = frutas.pop(id)
    print(f"Fruta {fruta_deletada} deletada com sucesso!")
    return jsonify({"mensagem": f"Fruta {fruta_deletada} deletada com sucesso!"}), 200
