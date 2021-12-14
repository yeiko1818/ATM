var caja = [];
var imagenes = [];
var historytransaction = [];
imagenes[5] = "5.png";
imagenes[10] = "10.png";
imagenes[20] = "20.png";
imagenes[50] = "50.png";
imagenes[100] = "100.png";

var dinero;
var div = 0;
var papeles = 0;

class Billete {
    constructor(v, c) {
        this.valor = v;
        this.cantidad = c;
    }
}

function entregarDinero() {
    resultado.innerHTML = "";
    var entregado = [];
    var t = document.getElementById("dinero");
    dinero = parseInt(t.value);
    for (var bi of caja) {
        if (dinero > 0) {
            div = Math.floor(dinero / bi.valor);
            if (div > bi.cantidad) {
                papeles = bi.cantidad;
            } else {
                papeles = div;
            }
            entregado.push(new Billete(bi.valor, papeles));
            dinero -= bi.valor * papeles;
        }
    }
    if (dinero > 0) {
        resultado.innerHTML = "Fondos insuficientes";
    } else {
        var conteo = -1;
        for (var e of entregado) {
            conteo++;
            if (e.cantidad > 0) {
                for (let i = 0; i < e.cantidad; i++) {
                    resultado.innerHTML +=
                        "<br /><img class='billetesImg' src='" +
                        imagenes[e.valor] +
                        "'>";
                }
                caja.splice(
                    conteo,
                    1,
                    new Billete(e.valor, caja[conteo].cantidad - e.cantidad)
                );
            }
        }
        atmTotal(entregado);
    }
}

caja.push(new Billete(100, 10));
caja.push(new Billete(50, 10));
caja.push(new Billete(20, 10));
caja.push(new Billete(10, 10));
caja.push(new Billete(5, 10));

function atmTotal(p) {
    if (caja != null) {
        var total = 0;
        for (var i of caja) {
            total += i.valor * i.cantidad;
        }
        document.getElementById("total").innerHTML =
            "Total en el cajero: $" + total;
    }
    if (p != null) {
        var total = 0;
        for (const i of p) {
            if (i.cantidad > 0) {
                total += i.valor * i.cantidad;
            }
        }
        var fh = new Date();
        historytransaction.push({ total: total, fecha: fh });
        a.innerHTML = "";
        for (const i of historytransaction) {
            a.innerHTML +=
                "<p>Retiro de dinero por la cantidad de $" +
                i.total +
                " --- " +
                i.fecha +
                "</p>";
        }
    }
}

atmTotal();
var resultado = document.getElementById("resultado");
var b = document.getElementById("extraer");
var a = document.getElementById("registro");
var screenTransaction = document.getElementById("screenTransaction");
b.addEventListener("click", entregarDinero);
