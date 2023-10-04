function capturarDados() {
    const a = parseFloat(document.getElementById("campo1").value);
    const b = parseFloat(document.getElementById("campo2").value);
    const c = parseFloat(document.getElementById("campo3").value);
    const delta = b * b - 4 * a * c;
    let resultado = "";

    alert(delta);
    if (delta > 0) {
        let operator1 = `-`;
        let operator2 = `+`;
        let operator3 = `-`;
        let operator4 = `-`;
        if (b < 0) {
            operator1 = ``;
            operator3 = ``;
        }
        resultado = `1° caso - Discriminante Maior que Zero:<br>
        <img src="https://latex.codecogs.com/svg.image?X_n%20%3D%20C_1%20%5Cleft(%5Cfrac%7B%7C${b}%7C%20%2B%20%5Csqrt%7B${delta}%7D%7D%7B2*${a}%7D%5Cright)%5En%20%2B%20C_2%20%5Cleft(%5Cfrac%7B%7C${b}%7C%20-%20%5Csqrt%7B${delta}%7D%7D%7B2*${a}%7D%5Cright)%5En" alt="Expressão LaTeX">
        `;
    } else if (delta < 0) {
        resultado = `3° caso - Discriminante menor que zero:<br>
        Utilizar Latex
        `;
    } else { //delta = 0
        let operator1 = `-`;
        if (b < 0) {
            operator1 = ``;
        }
        resultado = `2° caso - Discriminante igual a zero:<br>
        Utilizar Latex
        `;
    }

document.getElementById("resultado").innerHTML = resultado;

}