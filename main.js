function numerosAleatorios(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function geraArrayAleatorio() {
    const minInput = document.getElementById("minimo").value;
    const maxInput = document.getElementById("maximo").value;

    const min = parseInt(minInput);
    const max = parseInt(maxInput);   
    const arrayAleatorio = [];

    for (let i = 0; i<25; i++) {
        const valorAleatorio = numerosAleatorios(min, max);
        arrayAleatorio.push(valorAleatorio);
    }
    document.getElementById("result").textContent = "Array com valores aleatórios: " + arrayAleatorio.join(", ");
}

