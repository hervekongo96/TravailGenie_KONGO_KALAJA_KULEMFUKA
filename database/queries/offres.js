const offre = {
    listar: `SELECT * FROM offre`,

    offre: (Numero)=>{
            return `SELECT * FROM offre WHERE offre.Numero =${Numero}`
    },
   
};

module.exports = offre;