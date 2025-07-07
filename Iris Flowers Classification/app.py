from flask import Flask, request, jsonify, send_from_directory
import joblib
import numpy as np
import os

app = Flask(__name__)
model = joblib.load('model.pkl')

# Serve the frontend
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(path):
        return send_from_directory('.', path)
    return 'Not Found', 404

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = [
        data.get('sepal_length', 0),
        data.get('sepal_width', 0),
        data.get('petal_length', 0),
        data.get('petal_width', 0)
    ]
    prediction = model.predict([features])[0]
    class_names = ['Setosa', 'Versicolor', 'Virginica']
    return jsonify({'class': int(prediction), 'class_name': class_names[prediction]})

if __name__ == '__main__':
    app.run(debug=True)
