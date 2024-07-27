from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from prophet import Prophet

app = Flask(__name__)
CORS(app)  # Activer CORS pour toutes les routes

# Charger le modèle pré-entraîné
#model = joblib.load('../iot-dashboard/model/prophet_models/prophet_model.pkl')
model = joblib.load('../model/prophet_models/prophet_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Recevoir les données JSON
    print('Data received:', data)
    
    # Extraire la date de début et la date de fin de la requête
    start_date = pd.to_datetime(data['start_date'], errors='coerce')
    end_date = pd.to_datetime(data['end_date'], errors='coerce')
    
    # Vérifier si les dates sont valides
    if pd.isna(start_date) or pd.isna(end_date):
        return jsonify({'error': 'Invalid start_date or end_date'}), 400
    
    print('Start date:', start_date)
    print('End date:', end_date)
    
    # Générer une liste de dates dans l'intervalle
    date_range = pd.date_range(start=start_date, end=end_date, freq='H')
    
    # Créer un DataFrame avec les dates
    df = pd.DataFrame(date_range, columns=['ds'])
    
    # Faire la prédiction
    forecast = model.predict(df)
    
    # Extraire les colonnes d'intérêt
    result = forecast[['ds', 'yhat']]
    
    # Calculer la consommation totale en kWh
    total_consumption = result['yhat'].sum()
    
    # Convertir en JSON et retourner la réponse avec la consommation totale
    response = {
        'predictions': result.to_dict(orient='records'),
        'total_consumption_kWh': total_consumption
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)

