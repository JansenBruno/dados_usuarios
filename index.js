const fetch = require('node-fetch');
const fs = require('fs');

fs.writeFile("usuarios.csv", `Primeiro_nome,Sobrenome,Email,Idade,Genero,Username,Password\n`,

    (err) => {
        if (err) {
            console.log(err)
        }
        console.log('Arquivo criado');
    })

async function generate() {

    let resp = await fetch("http://randomuser.me/api/?results=500");
    if (resp.ok) {

        const usuarios = await resp.json();
        console.log(usuarios.results);

        usuarios.results.forEach(user =>
            fs.createWriteStream('usuarios.csv', { flags: "a" }).write(`${user.name.first},${user.name.last},${user.email},${user.dob.age},${user.gender},${user.login.username},${user.login.password}\n`,
                (er) => {
                    if (er) throw err;
                    console.log('OK');
                }
            ));
    }
}
generate();
