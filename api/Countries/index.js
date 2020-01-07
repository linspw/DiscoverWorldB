module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.Validations;

    const save = async (req, res) => {
        const country = { ...req.body }
        if(req.params.id){
            country.id =  req.params.id; //Verificando se é para salvar ou adicionar ( com isso atribui para a variavel o ID)
        }

        try {
            existsOrError(country.name, "Nome não Informado")
            existsOrError(country.initials, "Íniciais não Informadas")
            existsOrError(country.slug, "Slug não Informado")
            existsOrError(country.initials, "Slug não Informado")


            const countryFromDB = await app.db('Countries').where({ name: country.name }).orWhere({ initials: country.initials }).orWhere({ slug: country.slug }).orWhere({ iso_n3: country.iso_n3 }).first()
            notExistsOrError(countryFromDB, 'País já cadastrado')

        } catch(msg){
            console.log("Error")
            return res.status(400).send(msg);
        }
        if(country.id){
            app.db('Countries')
                .update(country)
                .where({ id: country.id})
                .then( _ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else{
            app.db('Countries')
                .insert(country)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('Countries')
            .select('*')
            .then(country => res.json(country))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        const id = parseInt(req.params.id);
        app.db('Countries')
            .select('*')
            .where({ id })
            .first()
            .then(country => {
                if(!country){
                    res.status(500).send("Não Encontrado")
                }
                res.json(country)
            })
            .catch(err => res.status(500).send(err))
    }
    const getBySlug = (req, res) => {
        const slug = req.params.slug;
        app.db('Countries')
            .select('*')
            .where({ slug })
            .first()
            .then(country => {
                if(!country){
                    res.status(500).send("Não Encontrado")
                }
                res.json(country)
            })
            .catch(err => res.status(500).send(err))
    }
    return { save, get, getById, getBySlug }
}