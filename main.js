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
    
    // document.getElementById("result").textContent = "Array com valores aleatórios: " + arrayAleatorio.join(", ");
    console.log(arrayAleatorio)
    const median = medianOfMedians(arrayAleatorio);
      
    console.log("Array:", arrayAleatorio);
    console.log("Mediana das medianas:", median);
    
    const minArray = select(arrayAleatorio, 0); 
    const maxArray = select(arrayAleatorio, arrayAleatorio.length - 1); 
    console.log("Elemento mínimo:", minArray);
    console.log("Elemento máximo:", maxArray);

    document.getElementById("result").style.display = "block"
    document.getElementById("result").innerHTML = `<h3>Relatório das distâncias encontradas:</h3>` 
    for (let i = 0; i<25; i++) {
        document.getElementById("result").innerHTML += `<p>Planeta ${i+1}: ${arrayAleatorio[i]} anos luz</p>`
    }

    document.getElementById("result").innerHTML += `
        <p>Mediana das medianas calculada: ${median}</p>
        <p>Distância do planeta mais próximo: ${minArray}</p>
        <p>Distância do planeta mais distante: ${maxArray}</p>
        <p>Traçando rota para planeta mais próximo...</p>
    ` 

    function medianOfMedians(arr) {
        
        const groups = [];
        for (let i = 0; i < arr.length; i += 5) {
            groups.push(arr.slice(i, i + 5));
        }
        
        
        const medians = groups.map(group => {
            return group.sort((a, b) => a - b)[Math.floor(group.length / 2)];
        });
        
        // Encontra a mediana das medianas
        const medianOfMedians = select(medians, Math.floor(medians.length / 2));
        
        return medianOfMedians;
    }
        
    function select(arr, k) {
        if (arr.length === 1) {
            return arr[0];
        }

        const groups = [];
        for (let i = 0; i < arr.length; i += 5) {
            groups.push(arr.slice(i, i + 5));
        }

        const medians = groups.map(group => {
            return group.sort((a, b) => a - b)[Math.floor(group.length / 2)];
        });

        const pivot = select(medians, Math.floor(medians.length / 2));

        const lesser = [];
        const greater = [];
        const equal = [];

        arr.forEach(num => {
            if (num < pivot) {
            lesser.push(num);
            } else if (num > pivot) {
            greater.push(num);
            } else {
            equal.push(num);
            }
        });

        if (k < lesser.length) {
            return select(lesser, k);
        } else if (k < lesser.length + equal.length) {
            return equal[0];
        } else {
            return select(greater, k - lesser.length - equal.length);
        }
    }
}

