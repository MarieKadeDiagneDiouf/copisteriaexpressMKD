

document.addEventListener('DOMContentLoaded', async () => {
    let imprimirIds = ["imprimir0", "imprimir1", "imprimir2"];
    let rellenarIds = ["rellenar0", "rellenar1", "rellenar2"];
    let printerIds = ["printer0", "printer1", "printer2"];
  

    let printers = [];
    let imprimirElements = [];
    let rellenarElements = [];

    for (let i = 0; i < printerIds.length; i++) {
    printers.push(printerIds[i]);
    console.log(printers)
    imprimirElements.push(document.getElementById(imprimirIds[i]));
    rellenarElements.push(document.getElementById(rellenarIds[i]));
    }

    let boton = document.getElementById('enviar');
    let info = document.getElementById('info');
    let idImpresora = document.getElementById('idImpresora');


    let data = await getPrinters();

   

    rellenarColores(printers[0], data[0]);
    rellenarColores(printers[1], data[1]);
    rellenarColores(printers[2], data[2]);

    limpiar(printers[0]);
    limpiar(printers[1]);
    limpiar(printers[2]);

    boton.addEventListener('click', () => {
        let printer = "printer" + idImpresora.value;
        let queuePrinter = JSON.parse(sessionStorage.getItem(printer)) || [];
        queuePrinter.push(info.value);

        sessionStorage.setItem(printer, JSON.stringify(queuePrinter));

        limpiar(printer);
    });

    imprimirElements[0].addEventListener('click', async () => {
        let queuePrinter = JSON.parse(sessionStorage.getItem(printers[0])) || [];
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
                sessionStorage.setItem(printers[0], JSON.stringify(queuePrinter));
                limpiar(printers[0]);
            }).then(() => {
                rellenarColores(printers[0], data[0]);
                location.reload();
            });
        } else {
            console.log("No hay tinta suficiente");
        }
    });

    imprimirElements[1].addEventListener('click', async () => {
        let queuePrinter = JSON.parse(sessionStorage.getItem(printers[1])) || [];
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
                sessionStorage.setItem(printers[1], JSON.stringify(queuePrinter));
                limpiar(printers[1]);

            }).then(() => {
                rellenarColores(printers[1], data[1]);
                location.reload();
            });
        } else {
            console.log("No hay tinta suficiente");
        }

    });

    imprimirElements[2].addEventListener('click', async () => {
        let queuePrinter = JSON.parse(sessionStorage.getItem(printers[2])) || [];
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
                sessionStorage.setItem(printers[2], JSON.stringify(queuePrinter));
                limpiar(printers[2]);
            }).then(() => {
                rellenarColores(printers[2], data[2]);
                location.reload();
            });
        } else {
            console.log("No hay tinta suficiente");
        }

    });


   rellenarElements[0].addEventListener('click', () => {
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

    rellenarElements[1].addEventListener('click', () => {
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

    rellenarElements[2].addEventListener('click', () => {
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