const yup = require('yup')

const schema = yup.object().shape({
    nom: yup.string().required('Le nom est obligatoire'),
    email: yup.string().email('L\'email est invalide').required('L\'email est obligatoire'),
    comment: yup.string().min(10,'Le commentaire doit contenir au moins 10 caractères')
})

function home(req,res) {
    res.render('pages/home')
}

async function contact(req, res) {
    try {
        await schema.validate(req.body, {abortEarly: false})
        res.status(200).json(req.body)
    } catch (err) {
        res.status(400).json(err.inner)
    }
}

module.exports={
    home,
    contact
}