// models/User.js
module.exports = (sequelize, Sequelize) => {
    const Freelancer = sequelize.define(
      "Freelancer",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        skills: {
          type: Sequelize.ARRAY(Sequelize.STRING), 
          allowNull: true, 
          defaultValue: [] 
        },
        experience: {
          type: Sequelize.ENUM('Beginner', 'Intermediate', 'Expert'), // Define experience as an ENUM
          allowNull: false,
          defaultValue: 'Beginner',
        },
      },
      {
        timestamps: true,
      }
    );

    return Freelancer;
};
