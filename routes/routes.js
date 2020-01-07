module.exports = app => {
    app.route('/').get((req, res) => { res.send("Pagina inicial - Caminho Raiz")})

    app.route('/countries')
        .post(app.api.Countries.index.save)
        .get(app.api.Countries.index.get)
    app.route('/countries/:slug')
        .put(app.api.Countries.index.save)
        .get(app.api.Countries.index.getBySlug)

    app.route('*').get((req, res) => {res.send("Pagina Não Encontrada")})
}