
  

  

document.addEventListener('DOMContentLoaded', async () => {
    let printer0 = "printer0";
    let printer1 = "printer1";
    let printer2 = "printer2";


    let firstPrinter = document.getElementById(printer0);
    let secondPrinter = document.getElementById(printer1);
    let thirdPrinter = document.getElementById(printer2);

    let imprimir0 = document.getElementById("imprimir0");
    let imprimir1 = document.getElementById("imprimir1");
    let imprimir2 = document.getElementById("imprimir2");

    let sendButton = document.getElementById('enviar');
    let info = document.getElementById('info');
    let idImpresora = document.getElementById('idImpresora');

    let rellenar0 = document.getElementById('rellenar0');
    let rellenar1 = document.getElementById('rellenar1');
    let rellenar2 = document.getElementById('rellenar2');

    let data = await getPrinters();

   

    rellenarColores(printer0, data[0]);
    rellenarColores(printer1, data[1]);
    rellenarColores(printer2, data[2]);

    limpiar(printer0);
    limpiar(printer1);
    limpiar(printer2);

    sendButton.addEventListener('click', () => {
        let printer = "printer" + idImpresora.value;
        let queuePrinter = JSON.parse(sessionStorage.getItem(printer)) || [];
        queuePrinter.push(info.value);

        sessionStorage.setItem(printer, JSON.stringify(queuePrinter));

        limpiar(printer);
    });

    imprimir0.addEventListener('click', async () => {
        let queuePrinter = JSON.parse(sessionStorage.getItem(printer0)) || [];
        let work = queuePrinter.shift();
        let data = await getPrinters();
        let cost = ajustarValores(work, data[0], black, yellow, magenta, cyan);
        if (cost) {
            fetch('/impresoras/' + 1, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cost)
            }).then(() => {
                sessionStorage.setItem(printer0, JSON.stringify(queuePrinter));
                limpiar(printer0);
            }).then(() => {
                rellenarColores(printer0, data[0]);
                location.reload();
            });
        } else {
            console.log("No hay tinta suficiente");
        }
    });

    imprimir1.addEventListener('click', async () => {
        let queuePrinter = JSON.parse(sessionStorage.getItem(printer1)) || [];
        let work = queuePrinter.shift();
        let data = await getPrinters();
        let cost = ajustarValores(work, data[1], black, yellow, magenta, cyan);

        if (cost) {
            fetch('/impresoras/' + 2, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cost)
            }).then(() => {
                sessionStorage.setItem(printer1, JSON.stringify(queuePrinter));
                limpiar(printer1);

            }).then(() => {
                rellenarColores(printer1, data[1]);
                location.reload();
            });
        } else {
            console.log("No hay tinta suficiente");
        }

    });

    imprimir2.addEventListener('click', async () => {
        let queuePrinter = JSON.parse(sessionStorage.getItem(printer2)) || [];
        let work = queuePrinter.shift();
        let data = await getPrinters();
        let cost = ajustarValores(work, data[2], black, yellow, magenta, cyan);

        if (cost) {
            fetch('/impresoras/' + 3, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cost)
            }).then(() => {
                sessionStorage.setItem(printer2, JSON.stringify(queuePrinter));
                limpiar(printer2);
            }).then(() => {
                rellenarColores(printer2, data[2]);
                location.reload();
            });
        } else {
            console.log("No hay tinta suficiente");
        }

    });


    rellenar0.addEventListener('click', () => {
        fetch('/impresoras/' + 1, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                negro: 100,
                amarillo: 100,
                magenta: 100,
                cian: 100
            })
        }).then(() => {
            location.reload();
        })
    });

    rellenar1.addEventListener('click', () => {
        fetch('/impresoras/' + 2, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                negro: 100,
                amarillo: 100,
                magenta: 100,
                cian: 100
            })
        }).then(() => {
            location.reload();
        })
    });

    rellenar2.addEventListener('click', () => {
        fetch('/impresoras/' + 3, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                negro: 100,
                amarillo: 100,
                magenta: 100,
                cian: 100
            })
        }).then(() => {
            location.reload();
        })
    });

});