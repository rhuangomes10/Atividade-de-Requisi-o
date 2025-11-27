const http = require("http");
const https = require("https");

const API_KEY = "a40cf2b9ce0e4462aad142723252711";
const cidade = "Recife";

const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cidade}&lang=pt`;

http.createServer((req, res) => {

    https.get(url, (response) => {
        let data = "";

        response.on("data", chunk => {
            data += chunk;
        });

        response.on("end", () => {
            let json = JSON.parse(data);

            if (json.error) {
                res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
                res.end(`
                    <h1>Erro na API WeatherAPI</h1>
                    <p>${json.error.message}</p>
                `);
                return;
            }

            const temperatura = json.current.temp_c;
            const condicao = json.current.condition.text;

            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.write(`<h1>Clima em ${cidade}</h1>`);
            res.write(`<p>Temperatura: ${temperatura}°C</p>`);
            res.write(`<p>Condição: ${condicao}</p>`);
            res.end();
        });

    }).on("error", err => {
        res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
        res.end("Erro na requisição: " + err.message);
    });

}).listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
