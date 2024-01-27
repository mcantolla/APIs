const selectValue = document.getElementById("coinSelect")
const inputValue = document.getElementById("coinInput")
const searchButton = document.getElementById("searchBtn")
const conversionResult = document.getElementById("result")
let myChart
let conversionFinal


searchButton.addEventListener("click", () => {
    const coin = selectValue.value

    if (myChart) {
        myChart.destroy()
    }
//Dolares
    if (coin == "dolar") {

    async function getDolar() {
        try {
        const endpoint = "https://mindicador.cl/api/dolar";
        const res = await fetch(endpoint);
        const dolares = await res.json();
        return dolares;
        } catch (error) {
            alert("Error: ", error.message)
        }
    }

    function prepareChartConfig(dolares) {
        const graphType = "line"
        const dateDolar = dolares.serie.slice(0, 10).map((dolar) => dolar.fecha)
        const title = "Dolar"
        const lineColor = "red"
        const pointColor = "white"
        const values = dolares.serie.map((dolar) => {
            const value = dolar.valor
            return Number(value)
        })

        const config = {
            type: graphType,
            data: {
                labels: dateDolar,
                datasets: [
                    {
                        label: title,
                        borderColor: lineColor,
                        backgroundColor: pointColor,
                        data: values
                    }
                ]
            }
        }
    return config
    }

    async function renderGraph() {
        const dolares = await getDolar()
        const config = prepareChartConfig(dolares)
        const chartDOM = document.getElementById("myChart")
        myChart = new Chart(chartDOM, config)
    }

    async function renderResult() {
        const dolares = await getDolar()
        const amountToConvert = inputValue.value
        const conversion = dolares.serie[0].valor
        conversionFinal = (amountToConvert / conversion).toFixed(2)
        conversionResult.innerHTML = `Resultado: ${conversionFinal}`
    }

    renderGraph()
    renderResult()

//Euros
    } else if (coin == "euro") {
        async function getEuro() {
            try {
            const endpoint = "https://mindicador.cl/api/euro";
            const res = await fetch(endpoint);
            const euros = await res.json();
            return euros;
            } catch (error) {
                alert("Error: ", error.message)
            }
        }
    
        function prepareChartConfig(euros) {
            const graphType = "line"
            const dateDolar = euros.serie.slice(0, 10).map((euro) => euro.fecha)
            const title = "Euro"
            const lineColor = "red"
            const pointColor = "white"
            const values = euros.serie.map((euro) => {
                const value = euro.valor
                return Number(value)
            })
    
            const config = {
                type: graphType,
                data: {
                    labels: dateDolar,
                    datasets: [
                        {
                            label: title,
                            borderColor: lineColor,
                            backgroundColor: pointColor,
                            data: values
                        }
                    ]
                }
            }
        return config
        }
    
        async function renderGraph() {
            const euros = await getEuro()
            const config = prepareChartConfig(euros)
            const chartDOM = document.getElementById("myChart")
            myChart = new Chart(chartDOM, config)
        }

        async function renderResult() {
            const euros = await getEuro()
            const amountToConvert = inputValue.value
            const conversion = euros.serie[0].valor
            conversionFinal = (amountToConvert / conversion).toFixed(2)
            conversionResult.innerHTML = `Resultado: ${conversionFinal}`
        }
    
        renderGraph()
    
        renderResult()
    }
})