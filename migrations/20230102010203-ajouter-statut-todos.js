"use strict"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("todos", "statut", {
      type: Sequelize.STRING,
      defaultValue: "EN_COURS",
      allowNull: false
    })
    // Il manque quelque chose ici...  A vous de l'ajouter !
    // Indice : vous aurez besoin de await queryInterface.sequelize.query(...)
    await queryInterface.sequelize.query(
      `UPDATE todos SET statut = "EN_RETARD" WHERE date_echeance < date('now') AND statut`
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("todos", "statut")
  }
}
