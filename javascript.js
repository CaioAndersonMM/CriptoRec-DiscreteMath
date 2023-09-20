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
        resultado = `1° caso - Discriminante maior que zero:<br>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mrow>
                <msub>
                    <mi>X</mi>
                    <mn>n</mn>
                </msub>
                <mo>
                    =
                </mo>

                <msub>
                        <mi>C</mi>
                        <mn>1</mn>
                </msub>
                <mo>
                    *
                </mo>
                <msup>
                    <mrow>
                        <mo>(</mo>
                        <mfrac>
                            <mrow>
                                <mrow>
                                        <mo>|</mo>
                                        <mo>${operator1}${Math.abs(b)}</mo>
                                        <mo>|</mo>
                                </mrow>
                                <mo>
                                    ${operator2}
                                </mo>
                                <mrow>
                                    <msqrt>
                                        <mi>${delta}</mi>
                                    </msqrt>
                                </mrow>
                            </mrow>
                            <mrow>
                                <mn>2</mn>
                                <mi>a</mi>
                            </mrow>
                        </mfrac>
                        <mo>)</mo>
                    </mrow>
                    <mi>n</mi>
                </msup>

                <mo>+</mo>
                
                <msub>
                    <mi>C</mi>
                    <mn>2</mn>
                </msub>
                <mo>*</mo>
                <msup>
                    <mrow>
                        <mo>(</mo>
                        <mfrac>
                            <mrow>
                                <mrow>
                                    <mrow>
                                        <mo>|</mo>
                                        <mo>${operator3}${Math.abs(b)}</mo>
                                        <mo>|</mo>
                                    </mrow>
                                </mrow>
                                <mo>${operator4}</mo>
                                <mrow>
                                <msqrt>
                                    <mi>${delta}</mi>
                                </msqrt>
                                </mrow>
                            </mrow>
                            <mrow>
                                <mn>2</mn>
                                <mi>a</mi>
                            </mrow>
                        </mfrac>
                        <mo>)</mo>
                    </mrow>
                    <mi>n</mi>
                </msup>
            </mrow>
        </math>`;
    } else if (delta < 0) {
        resultado = `3° caso - Discriminante menor que zero:<br>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
        </math>`;
    } else { //delta = 0
        let operator1 = `-`;
        if (b < 0) {
            operator1 = ``;
        }
        resultado = `2° caso - Discriminante igual a zero:<br>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mrow>
                
            </mrow>
        </math>`;
    }

document.getElementById("resultado").innerHTML = resultado;

}