function capturarDados() {
    const a = parseFloat(document.getElementById("campo1").value);
    const b = parseFloat(document.getElementById("campo2").value);
    const c = parseFloat(document.getElementById("campo3").value);

    const delta = b * b - 4 * a * c;
    let resultado = "";

    if (delta > 0) {
        resultado = `1° caso - Discriminante Maior que Zero:<br>
        <img src="https://latex.codecogs.com/svg.image?X_n%20%3D%20C_1%20%5Cleft(%5Cfrac%7B%7C${b}%7C%20%2B%20%5Csqrt%7B${delta}%7D%7D%7B2*${a}%7D%5Cright)%5En%20%2B%20C_2%20%5Cleft(%5Cfrac%7B%7C${b}%7C%20-%20%5Csqrt%7B${delta}%7D%7D%7B2*${a}%7D%5Cright)%5En" alt="Expressão LaTeX">
        `;
    } else if (delta < 0) {
        const real = -b / (2 * a);
        const imaginaria = Math.sqrt(Math.abs(delta)) / (2 * a);
        const angulo = (Math.atan(real / imaginaria) * (180 / Math.PI)).toFixed(0);

        const P1 = Math.sqrt(real*real + imaginaria*imaginaria).toFixed(0);

        resultado = `3° caso - Discriminante menor que zero:<br><br>
        <img src="https://latex.codecogs.com/svg.image?X_n%20%3D%20${P1}%5En%20%5Ccdot%20%28k_1%20%5Ccdot%20%5Ccos%28n%20%5Ccdot%20${angulo}%5E%7B%5Ccirc%7D%29%20%2B%20k_2%20%5Ccdot%20%5Csin%28n%20%5Ccdot%20${angulo}%5E%7B%5Ccirc%7D%29%29" alt="Expressão LaTeX">
        `;
    } else { //delta = 0
        resultado = `2° caso - Discriminante igual a zero:<br><br>
        <img src="https://latex.codecogs.com/svg.image?X_n%20%3D%20C_1%20%5Ccdot%20${Math.abs(b)/(2*a)}%5En%20%2B%20C_2%20%5Ccdot%20n%20%5Ccdot%20${Math.abs(b)/(2*a)}%5En" alt="Expressão LaTeX">
        `;
        //Já que o delta é 0 - Para se calcular a raíz real, temos o B/2*a
    }

document.getElementById("resultado").innerHTML = resultado;
}