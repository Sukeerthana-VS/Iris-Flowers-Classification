document.getElementById('iris-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const data = {
        sepal_length: parseFloat(document.getElementById('sepal_length').value),
        sepal_width: parseFloat(document.getElementById('sepal_width').value),
        petal_length: parseFloat(document.getElementById('petal_length').value),
        petal_width: parseFloat(document.getElementById('petal_width').value)
    };
    const resultDiv = document.getElementById('result');
    const flowerDiv = document.getElementById('flower-image');
    resultDiv.textContent = 'Predicting...';
    flowerDiv.innerHTML = '';
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        resultDiv.textContent = 'Predicted class: ' + res.class_name;
        let imgUrl = '';
        if (res.class_name === 'Setosa') {
            imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/5/56/Iris_setosa_2.jpg';
        } else if (res.class_name === 'Versicolor') {
            imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/4/41/Iris_versicolor_3.jpg';
        } else if (res.class_name === 'Virginica') {
            imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Iris_virginica.jpg';
        }
        if (imgUrl) {
            flowerDiv.innerHTML = `<img src="${imgUrl}" alt="${res.class_name}"><div>${res.class_name}</div>`;
        }
    } catch (err) {
        resultDiv.textContent = 'Prediction failed.';
        flowerDiv.innerHTML = '';
    }
});
